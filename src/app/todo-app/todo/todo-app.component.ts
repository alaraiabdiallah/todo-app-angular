import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from 'src/app/todo';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth/auth.service';
import { TodoAppExtension } from './todo-app.extension';

@Component({
  selector: 'todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent extends TodoAppExtension implements OnInit {

  constructor(public todoService: TodoService, public authService: AuthService) {
    super(todoService,authService)
  }

  ngOnInit() {
    this._setCurrentDate()
    this.fetchTodos()
  }

  fetchTodos(): void {
    const { formatted } = this.currDate
    this.todosSubscriber = this.todoService.getTodos(formatted)
      .subscribe(todos => this._handleTodoSubscription(todos))
  }

  drop(event: CdkDragDrop<string[]>) {
    const { previousContainer, container } = event
    if (previousContainer === container)
      this._onDropSameContainerHandler(event)
    else
      this._onDropDiffContainerHandler(event)
  }

  add(): void {
    const newTodo = this._buildNewTodo()
    this.todos.push(newTodo as Todo)
  }

  handleDateChange(e) {
    this.currDate = e
    this._clearData()
    this._setAllLoadingState(true)
    this.todosSubscriber.unsubscribe()
    this.fetchTodos()
  }

  ngOnDestroy() {
    if (this.todosSubscriber)
      this.todosSubscriber.unsubscribe()
  }
  
}
