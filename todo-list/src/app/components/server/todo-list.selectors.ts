import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from '../model/todo';

export const selectTodoState = createFeatureSelector<Task[]>('tasks');

export const selectAllTasks = createSelector(
  selectTodoState,
  (state) => state ?? []
);