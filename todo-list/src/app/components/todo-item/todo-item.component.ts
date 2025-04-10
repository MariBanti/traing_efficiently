import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo! : Todo;
  @Output() toggleComplete = new EventEmitter<void>()
  @Output() showDescription = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  public onClick():void{
    this.showDescription.emit();
  }

  public onEdit():void{
    this.edit.emit();
  }

  public onDelete():void{
    this.delete.emit();
  }
}
