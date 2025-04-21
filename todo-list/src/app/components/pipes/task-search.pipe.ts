import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "../model/todo";
  
@Pipe({
    name: "search",
    standalone: true
})
export class TaskSearchPipe implements PipeTransform {
  transform(tasks: Task[], searchText: string): any {
      
    if(!searchText) return tasks

    return tasks.filter(task => task.name.toLowerCase().includes(searchText.toLowerCase().trim()))
  }
}