import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ModalComponent } from '../modal/modal.component';
import { Task } from '../model/todo';
import { TaskSearchPipe } from '../pipes/task-search.pipe';
import { Store } from '@ngrx/store';
import { selectAllTasks } from '../server/todo-list.selectors';
import * as TodoActions from '../server/todo-list.actions'
import { Observable } from 'rxjs';
import { TrackByFunction } from '@angular/core';

import { RxjsInputComponent } from '../rxjs-input/rxjs-input.component';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule, TodoItemComponent, ModalComponent, TaskSearchPipe, RxjsInputComponent],
  providers: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  private store = inject(Store)

  constructor() {}
  public currentTask: Task | null = null;
  public isModalOpen:boolean = false;
  public searchText: string = ''

  public tasks$: Observable<Task[]> = this.store.select(selectAllTasks)

  public deleteTodo(id: string): void {
    this.store.dispatch(TodoActions.deleteItem({id}))
  }

  public showDescription(id: string): void {
    this.store.dispatch(TodoActions.showDescription({id}))
  }

  filterByDate(): void {
    this.store.dispatch(TodoActions.filterByDate())
  }

  public toggleComplete(id: string): void {
    this.store.dispatch(TodoActions.toggleComplete({id}))  
  }

  public openModal(task?: Task): void {
    this.currentTask = task ? { ...task } : null;
    this.isModalOpen = true;
  }

  public closeModal(): void {
    this.isModalOpen = false;
  }

  public handleModalSave(data: {
    name: string;
    description: string;
    deadlineDate: Date;
    priority: number;
  }): void {
    if (this.currentTask) {
      this.store.dispatch(TodoActions.updateItem({
        updatedTask:
        {
          ...this.currentTask,
          ...data,
        }
      }))
    } else {
      this.store.dispatch(TodoActions.addItem({
        task:
        {
          ...data,
        }
      }))
    }
    this.closeModal();
    this.tasks$.subscribe(tasks => {
      console.log('Current tasks:', tasks);
    });
  }

  trackById: TrackByFunction<Task> = (i, item)=>item.id;
}
