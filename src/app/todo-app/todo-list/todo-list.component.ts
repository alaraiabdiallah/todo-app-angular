import { Component, Input } from '@angular/core';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'todolist,[todolist]',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent{

  @Input() title: string;
  @Input() todos: Todo[];

}
