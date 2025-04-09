import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [BrowserModule, FormsModule, CommonModule, ReactiveFormsModule],
    declarations: [AppComponent, TodoListComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}