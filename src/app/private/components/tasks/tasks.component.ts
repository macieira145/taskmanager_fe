import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import {Response} from 'src/app/interfaces/response.interface'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = []
  task: Task = { id: 0, title: "", description: "", completed: false }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      console.log(tasks)

      this.tasks = tasks;
    })
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => (
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    ))
  }

  completeTask(task: Task) {

  }

  addTask(task: Task) {
    this.taskService.create({ 
      title: task.title,
      description: task.description,
      completed : false
    }).subscribe((taskReturn: Response) => {
      this.tasks.push(taskReturn.data as Task)
      console.log(this.tasks)
    })
  }
} 
