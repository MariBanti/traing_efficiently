import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Todo } from '../model/todo';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() todo: Todo | null = null;
  @Output() save = new EventEmitter<{name: string, description: string}>();
  @Output() close = new EventEmitter<void>();

  public todoForm: FormGroup;

  constructor(private td: FormBuilder){
    this.todoForm = this.td.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: [""]
    })
  }

  public ngOnChanges():void{
    if(this.todo){
      this.todoForm.patchValue({
        name: this.todo.name,
        description: this.todo.description || ''
      })
    } else {
      this.todoForm.reset
    }
  }

  public onSave():void{
    if(this.todoForm.valid){
      this.save.emit({
        name: this.todoForm.value.name.trim(),
        description: this.todoForm.value.description.trim()
      })
    }
  }

  public onClose():void{
    this.close.emit()
    this.todoForm.patchValue({
      name: '',
      description: ''
    })
  }
}
