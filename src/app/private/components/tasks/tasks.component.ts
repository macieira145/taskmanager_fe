import { Component, OnInit } from '@angular/core';
import { TaskItemComponent } from 'src/app/components/task-item/task-item.component';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks))
  }

  deleteTask(task: Task) {

  }

  completeTask(task: Task) {

  }
} 
