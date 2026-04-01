import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form';
import { TaskListComponent } from '../../components/task-list/task-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {}