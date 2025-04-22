import { createAction, props } from "@ngrx/store";
import { Task } from "../model/todo";

export const addItem = createAction("[Todo] Add Item", props<{ task: Omit<Task, 'id' | 'isCompleted' | 'isDescriptionShow'> }>())
export const updateItem = createAction("[Todo] Update Item", props<{updatedTask: Task}>())
export const deleteItem = createAction("[Todo] Delete Item", props<{id: string}>())
export const showDescription = createAction("[Todo] Show Description",  props<{id: string}>())
export const toggleComplete = createAction("[Todo] Toggle Complete", props<{id: string}>())
export const filterByDate = createAction("[Todo] Filter By Date")