import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo-list/todo-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() todo: Todo | null = null;
  @Output() save = new EventEmitter<{name: string, description: string}>();
  @Output() close = new EventEmitter<void>();

  name = "";
  description = "";

  ngOnChanges(){
    if(this.todo){
      this.name = this.todo.name;
      this.description = this.todo.description || '';
    } else{
      this.name = ""
      this.description = ""
    }
  }

  onSave(){
    if(this.name.trim()){
      this.save.emit({
        name: this.name.trim(),
        description: this.description.trim()
      })
    }
  }

  onClose(){
    this.close.emit()
  }
}
