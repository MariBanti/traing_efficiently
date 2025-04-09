import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo! : Todo;
  @Output() showDescription = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onClick(){
    this.showDescription.emit();
  }

  onEdit(){
    this.edit.emit();
  }

  onDelete(){
    this.delete.emit();
  }
}
