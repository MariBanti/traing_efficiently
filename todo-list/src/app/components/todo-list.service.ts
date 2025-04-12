import { Task } from './model/todo';

export class todoListService {
  public items: Task[] = [];

  public addItem(
    task: Omit<Task, 'id' | 'isCompleted' | 'isDescriptionShow'>
  ): void {
    this.items.push({
      id: this.generateUUID(),
      ...task,
      isCompleted: false,
      isDescriptionShow: false,
    });
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public updateItem(updatedTask: Task): void {
    const index = this.items.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.items[index] = updatedTask;
    }
  }

  public deleteItem(id: string): void {
    this.items = this.items.filter((task) => task.id !== id);
  }

  public showDescription(id: string): void {
    const task = this.items.find((t) => t.id === id);

    if (task) {
      task.isDescriptionShow = !task.isDescriptionShow;
    }
  }

  public toggleComplete(id: string): void {
    const task = this.items.find((item) => item.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
    }
  }

  public filterByDate(): Task[] {
    return this.items.sort((a, b) => {
      const dateA = a.deadlineDate ? new Date(a.deadlineDate).getTime() : 0;
      const dateB = b.deadlineDate ? new Date(b.deadlineDate).getTime() : 0;
      return dateA - dateB;
    });
  }
}
