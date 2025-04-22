import { createReducer, on } from "@ngrx/store";
import { Task } from "../model/todo";
import { generateUUID } from '../utils/generateUUID'
import { addItem, deleteItem, updateItem, toggleComplete, showDescription, filterByDate } from "./todo-list.actions";

export const initialState: Task[] = []

export const todoListReducer = createReducer(
    initialState,
    on(addItem, (state, { task }) => [
      ...state, 
      {
        id: generateUUID(), 
        ...task, 
        isCompleted: false,
        isDescriptionShow: false,
      }
    ]),
    on(updateItem, (state, {updatedTask}) => (
        state.map(task => task.id === updatedTask.id ? updatedTask: task)
    )),
    on(deleteItem, (state, {id})=>(
        state.filter((task) => task.id !== id)
    )),
    on(toggleComplete, (state, {id}) => (
        state.map(task => task.id === id ?
            {...task, isCompleted: !task.isCompleted}
            : task
        )
    )),
    on(showDescription, (state, {id}) => (
        state.map(task => task.id === id ?
        {...task, isDescriptionShow: !task.isDescriptionShow}
        : task
    )
    )),
    on(filterByDate, (state) => (
        [...state].sort((a, b) => {
            const dateA = a.deadlineDate ? new Date(a.deadlineDate).getTime() : 0;
            const dateB = b.deadlineDate ? new Date(b.deadlineDate).getTime() : 0;
            return dateA - dateB;
          })
    ))
);