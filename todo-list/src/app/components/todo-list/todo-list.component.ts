import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ModalComponent } from '../modal/modal.component';

export interface Todo {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  isDescriptionShow: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, CommonModule, TodoItemComponent, ModalComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: Todo[] = [];
  currentTodo: Todo | null = null;
  isModalOpen = false;
  editingTodo: Todo | null = null;

  addTodo(todo: Omit<Todo, 'id' | 'isCompleted' | 'isDescriptionShow'>){
      this.todos.push({
        id: Date.now(),
        ...todo,
        isCompleted: false,
        isDescriptionShow: false
      })
  }

  updateTodo(updatedTodo : Todo){
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      if(index !== -1){
        this.todos[index] = updatedTodo
      }
  }

  deleteTodo(id: number){
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  showDescription(id : number){
    const todo = this.todos.find(t => t.id === id)
    if(todo){
      todo.isDescriptionShow = !todo.isDescriptionShow
    }
  }

  toggleComplete(id: number){
    const todo = this.todos.find(item => item.id === id)
    if (todo){
      todo.isCompleted = !todo.isCompleted
    }
  }

  openModal(todo?: Todo){
    this.currentTodo = todo ? {...todo} : null;
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false
  }

  handleModalSave(data : {name: string; description: string}){
    if(this.currentTodo){
      this.updateTodo({
        ...this.currentTodo,
        ...data
      })
    } else {
      this.addTodo(data)
    }
    this.closeModal
  }
}
