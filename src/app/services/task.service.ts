import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // ✅ Only access localStorage in browser
    if (this.isBrowser) {
      const data = localStorage.getItem('tasks');
      if (data) this.tasks = JSON.parse(data);
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.save();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  toggleTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.save();
  }

  private save() {
    // ✅ Save only in browser
    if (this.isBrowser) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}