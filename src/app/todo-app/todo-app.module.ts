import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAppComponent } from './todo/todo-app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { TodoAppRoutingModule } from './todo-app-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { MatDialogModule } from '@angular/material';
import { TodoModalComponent } from './todo-modal/todo-modal.component';
import { DateSwitcherComponent } from './date-switcher/date-switcher.component';

@NgModule({
  declarations: [TodoListComponent, TodoAppComponent, TodoItemComponent, TodoModalComponent, DateSwitcherComponent],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    TodoAppRoutingModule,
    LayoutModule,
    MatDialogModule,
  ],
  exports: [
    TodoAppComponent
  ],
  entryComponents: [
    TodoModalComponent
  ],
})
export class TodoAppModule { }
