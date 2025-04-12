import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../model/todo';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { dateNotInPastValidator } from '../validators/date-not-in-past.validator';
import { maxWordsValidator } from '../validators/max-words.validator';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<{
    name: string;
    description: string;
    deadlineDate: Date;
  }>();
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
      name: [
        '',
        [Validators.required, Validators.minLength(3), maxWordsValidator(4)],
      ],
      description: ['', [Validators.maxLength(256)]],
      deadlineDate: ['', [dateNotInPastValidator(), Validators.required]],
    });

    if (this.task) {
      this.updateForm();
    }
  }

  private updateForm(): void {
    if (this.task) {
      this.taskForm.patchValue({
        name: this.task.name,
        description: this.task.description || '',
        deadlineDate: this.task.deadlineDate || '',
      });
    } else {
      this.taskForm.reset();
    }
  }

  public onSave(): void {
    if (this.taskForm.valid) {
      this.save.emit({
        name: this.taskForm.value.name?.trim() || '',
        description: this.taskForm.value.description?.trim() || '',
        deadlineDate: this.taskForm.value?.deadlineDate
          ? this.taskForm.value.deadlineDate
          : new Date(),
      });
    }
  }

  public onClose(): void {
    this.close.emit();
    this.taskForm.reset();
  }
}
