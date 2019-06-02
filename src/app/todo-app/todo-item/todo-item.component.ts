import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Todo } from 'src/app/todo';
import { AngularFirestore } from '@angular/fire/firestore';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { MatDialog } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'todoitem,[todoitem]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, AfterViewInit {

  @Input() todo: Todo;
  @ViewChild('titleInput') titleInput: ElementRef;

  isLoading = false;

  dialogSize: any;

  constructor(private afs: AngularFirestore, private dialog: MatDialog, private deviceService: DeviceDetectorService) { 
    this.dialogSize = { width: '600px'}
    if (this.deviceService.isMobile()){
      this.dialogSize = {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'}
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    const { props } = this.todo
    if ((props != undefined) && (props.onEdit))
      this.titleInput.nativeElement.focus()
  }

  save() {
    if (this.todo.title != '') {
      const fs = this.afs.collection<Todo>('todos');
      delete this.todo.props;
      fs.add(this.todo);
    } else {
      delete this.todo;
    }
  }

  cancelForm() {
    delete this.todo;
  }

  deleteTodo(id: string) {
    this.afs.doc<Todo>('todos/' + id).delete();
  }

  view() {
    const dialogRef = this.dialog.open(TodoModalComponent, {
      ...this.dialogSize,
      data: { action: "view", todo: this.todo }
    });

    dialogRef.afterClosed().subscribe();
  }
  

}
