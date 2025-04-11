import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ModalComponent } from '../modal/modal.component';
import { Task } from '../model/todo';
import { todoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule, TodoItemComponent, ModalComponent],
  providers: [todoListService],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  constructor(public tasks : todoListService){}
  public currentTask: Task | null = null;
  public isModalOpen = false;

  public deleteTodo(id: number):void{
    this.tasks.deleteItem(id)
  }

  public showDescription(id : number):void{
    this.tasks.showDescription(id)
  }

  public toggleComplete(id: number):void{
    this.tasks.toggleComplete(id)
  }

  public openModal(task?: Task):void{
    this.currentTask = task ? {...task} : null;
    this.isModalOpen = true;
  }

  public closeModal():void{
    this.isModalOpen = false
  }

  public handleModalSave(data : {name: string; description: string}):void{
    if(this.currentTask){
      this.tasks.updateItem({
        ...this.currentTask,
        ...data
      })
    } else {
      this.tasks.addItem(data)
    }
    this.closeModal
  }

  public trackById(task: any):number{
    return task.id
  }
}
