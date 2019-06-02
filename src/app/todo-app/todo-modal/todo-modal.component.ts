import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoModalData } from 'src/app/todo-modal-data';
import { AngularFirestore } from '@angular/fire/firestore';
import { Todo } from 'src/app/todo';

const todoTypes = ["Todo","Doing","Done"]

@Component({
  selector: 'todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent {

  todoTypes = todoTypes

  constructor(
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<TodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoModalData) {}

  getTypeName(code){
    return todoTypes[code - 1];
  }

  edit(){
    this.data.action = "edit"
  }

  view(){
    this.data.action = "view"
  }

  save(){
    let todo = this.data.todo;
    this.afs.collection<Todo>('todos')
      .doc(todo.id).update(todo);
    this.data.action = "view"
  }

  close(){
    this.dialogRef.close();
  }
}
