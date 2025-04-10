import { Todo } from "./model/todo";

export class TodoList{
    public items: Todo[] = [];

    public addItem(todo: Omit<Todo, 'id' | 'isCompleted' | 'isDescriptionShow'>):void{
        this.items.push({
          id: Date.now(),
          ...todo,
          isCompleted: false,
          isDescriptionShow: false
        })
    }
  
    public updateItem(updatedTodo : Todo):void{
        const index = this.items.findIndex(t => t.id === updatedTodo.id);
        if(index !== -1){
          this.items[index] = updatedTodo
        }
    }
  
    public deleteItem(id: number):void{
      this.items = this.items.filter(todo => todo.id !== id)
    }
}