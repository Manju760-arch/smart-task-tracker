import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-form.html'
})
export class TaskFormComponent {

  task = {
    title: '',
    description: '',
    category: 'Work',
    dueDate: ''
  };

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.task.title) return;

    const newTask = {
      ...this.task,
      id: Date.now(),
      completed: false
    };

    this.taskService.addTask(newTask);

    this.task = {
      title: '',
      description: '',
      category: 'Work',
      dueDate: ''
    };
  }
}