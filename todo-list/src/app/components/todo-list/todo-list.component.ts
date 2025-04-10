import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ModalComponent } from '../modal/modal.component';
import { Todo } from '../model/todo';
import { TodoList } from '../todo-list.service';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule, TodoItemComponent, ModalComponent],
  providers: [TodoList],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: true
})
export class TodoListComponent {
  constructor(public todos : TodoList){}
  public currentTodo: Todo | null = null;
  public isModalOpen = false;

  public deleteTodo(id: number):void{
    this.todos.deleteItem(id)
  }

  public showDescription(id : number):void{
    const todo = this.todos.items.find(t => t.id === id); 
    
    if(todo){
      todo.isDescriptionShow = !todo.isDescriptionShow
    }
  }

  public toggleComplete(id: number):void{
    const todo = this.todos.items.find(item => item.id === id)
    if (todo){
      todo.isCompleted = !todo.isCompleted
    }
  }

  public openModal(todo?: Todo):void{
    this.currentTodo = todo ? {...todo} : null;
    this.isModalOpen = true;
  }

  public closeModal():void{
    this.isModalOpen = false
  }

  public handleModalSave(data : {name: string; description: string}):void{
    if(this.currentTodo){
      this.todos.updateItem({
        ...this.currentTodo,
        ...data
      })
    } else {
      this.todos.addItem(data)
    }
    this.closeModal
  }
}
