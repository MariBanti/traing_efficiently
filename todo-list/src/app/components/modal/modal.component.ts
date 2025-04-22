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
import { ChoosePriorityComponent } from '../controls/priority.control/priority.control.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ChoosePriorityComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<
    Omit<Task, 'id' | 'isCompleted' | 'isDescriptionShow'>>();
  @Output() close = new EventEmitter<void>();

  public taskForm!: FormGroup;

  private errorMessages = {
    name: {
      required: 'Это поле обязательно для заполнения',
      minLength: 'Имя должно содержать хотя бы 3 символа',
      maxWords: 'Имя должно содержать менее 4 слов'
    },
    
    description: {
      required: "Описание не может содержать более 256 символов",
    },

    deadlineDate: {
      futureDate: "Дата не может быть в прошлом",
      required: "Выберите дату выполнения",
    }
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (('task' in changes) && this.taskForm) {
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
      priority: [0],
    });

    if (this.task) {
      this.updateForm();
    }
  }

  public hasAnyErrors(field: string, errorKey:string): boolean{
    return this.taskForm.get(field)?.errors?.[errorKey]
  }

  public getErrorText(field: string, errorKey:string): string | null {
    return (this.errorMessages as any)[field]?.[errorKey] || null;
  }

  private updateForm(): void {
    if (this.task) {
      this.taskForm.patchValue({
        name: this.task.name,
        description: this.task.description || '',
        deadlineDate: this.task.deadlineDate || '',
        priority: this.task.priority || ''
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
        priority: this.taskForm.value?.priority || 0
      });
    }
  }

  public onClose(): void {
    this.close.emit();
    this.taskForm.reset();
  }
}
