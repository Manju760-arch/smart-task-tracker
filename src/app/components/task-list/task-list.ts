import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-list.html'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  searchText = '';
  selectedCategory = 'All';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  get filteredTasks() {
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCategory === 'All' || task.category === this.selectedCategory)
    );
  }

  get progress() {
    if (this.tasks.length === 0) return 0;
    const completed = this.tasks.filter(t => t.completed).length;
    return (completed / this.tasks.length) * 100;
  }

  isOverdue(task: Task) {
    return task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  }
}