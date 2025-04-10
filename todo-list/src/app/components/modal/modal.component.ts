import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../model/todo';
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

  public name = "";
  public description = "";

  public ngOnChanges():void{
    if(this.todo){
      this.name = this.todo.name;
      this.description = this.todo.description || '';
    } else{
      this.name = ""
      this.description = ""
    }
  }

  public onSave():void{
    if(this.name.trim()){
      this.save.emit({
        name: this.name.trim(),
        description: this.description.trim()
      })
    }
  }

  public onClose():void{
    this.close.emit()
  }
}
