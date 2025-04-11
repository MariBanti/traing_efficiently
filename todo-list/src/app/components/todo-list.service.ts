import { Task } from "./model/todo";

export class todoListService{
    public items: Task[] = [];

    public addItem(task: Omit<Task, 'id' | 'isCompleted' | 'isDescriptionShow'>):void{
        this.items.push({
          id: Date.now(),
          ...task,
          isCompleted: false,
          isDescriptionShow: false
        })
    }
  
    public updateItem(updatedTask : Task):void{
        const index = this.items.findIndex(t => t.id === updatedTask.id);
        if(index !== -1){
          this.items[index] = updatedTask
        }
    }
  
    public deleteItem(id: number):void{
      this.items = this.items.filter(task => task.id !== id)
    }

    public showDescription(id : number):void{
      const task = this.items.find(t => t.id === id); 
      
      if(task){
        task.isDescriptionShow = !task.isDescriptionShow
      }
    }

    public toggleComplete(id: number):void{
      const task = this.items.find(item => item.id === id)
      if (task){
        task.isCompleted = !task.isCompleted
      }
    }
}