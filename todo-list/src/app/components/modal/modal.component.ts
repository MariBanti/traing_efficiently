import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../model/todo';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<{name: string, description: string}>();
  @Output() close = new EventEmitter<void>();

  public taskForm!: FormGroup; 

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.taskForm) {
      this.updateForm();
    }
  }

  private initializeForm(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
    
    if (this.task) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.task) {
      this.taskForm.patchValue({
        name: this.task.name,
        description: this.task.description || ''
      });
    } else {
      this.taskForm.reset();
    }
  }

  public onSave(): void {
    if (this.taskForm.valid) {
      this.save.emit({
        name: this.taskForm.value.name?.trim() || '',
        description: this.taskForm.value.description?.trim() || ''
      });
    }
  }

  public onClose(): void {
    this.close.emit();
    this.taskForm.reset();
  }
}