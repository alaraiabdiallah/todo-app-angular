import { Todo } from "src/app/todo";
import { Subscription } from "rxjs";
import { moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import * as moment from "moment"
import { TodoService } from "../todo.service";
import { AuthService } from "src/app/auth/auth.service";

const types = {
    'todos': 1,
    'doings': 2,
    'dones': 3,
}

export class TodoAppExtension{
    todos: Todo[]
    doings: Todo[]
    dones: Todo[]

    currDate: any
    today: any

    todosSubscriber: Subscription

    loadingState = {
        todos: true,
        doings: true,
        dones: true
    }

    constructor(public todoService: TodoService, public authService: AuthService) {
        this.authService.redirectWhenUnauthenticated()
        this.today = moment().format("YYYY-MM-DD")
    }

    protected _buildNewTodo() {
        const { uid } = this.authService.getCurrentUser()
        const { formatted } = this.currDate
        const lastOrder = this._getTodosLastOrder()
        return {
            title: '',
            description: null,
            type: 1,
            date: formatted,
            order: lastOrder,
            uid: uid,
            props: { onEdit: true }
        }
    }

    protected _getDataContainer(event) {
        const prevData = this[event.previousContainer.id]
        const data = this[event.container.id]
        return { prevData, data }
    }

    protected _moveItemInList(event) {
        let { data } = this._getDataContainer(event)
        moveItemInArray(data, event.previousIndex, event.currentIndex)
    }

    protected _transferItem(event) {
        let { prevData, data } = this._getDataContainer(event)
        let { previousIndex, currentIndex } = event
        transferArrayItem(prevData, data, previousIndex, currentIndex)
    }

    protected _onDropSameContainerHandler(event){
        const { container } = event
        this._moveItemInList(event)
        this._rearrangeOrder(container.id)
    }

    protected _onDropDiffContainerHandler(event) {
        const { container, previousContainer } = event
        this._transferItem(event)
        this._rearrangeOrder(previousContainer.id)
        this._rearrangeOrder(container.id)
    }

    protected _rearrangeOrder(typeName: string) {
        this[typeName] = this[typeName].map((d, i) => {
            d.order = i
            d.type = types[typeName]
            return d
        })

        this[typeName].forEach(data => {
            this.todoService.getTodosCollection()
                .doc(data.id).update(data)
        })
    }

    protected _getTodosLastOrder() {
        return this.todos.length == 1 ? 1 : (this.todos.length + 1)
    }

    protected _setAllLoadingState(state) {
        this.loadingState = {
            todos: state, doings: state, dones: state
        }
    }

    protected _handleDataSort(a, b) {
        return a.order - b.order
    }

    protected _mapTodoDataByTypes(todos): void {
        this.todos = todos.filter(todo => todo.type == 1)
            .sort(this._handleDataSort);

        this.doings = todos.filter(todo => todo.type == 2)
            .sort(this._handleDataSort);

        this.dones = todos.filter(todo => todo.type == 3)
            .sort(this._handleDataSort);
    }

    protected _handleTodoSubscription(todos) {
        this._mapTodoDataByTypes(todos)
        this._setAllLoadingState(false)
    }

    protected _setCurrentDate() {
        const raw = moment()
        const formatted = raw.format('YYYY-MM-DD')
        this.currDate = { raw, formatted }
    }

    protected _clearData(): void {
        this.todos = []
        this.doings = []
        this.dones = []
    }
}