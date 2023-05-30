import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { Response } from 'src/app/interfaces/response.interface'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: Task[] = []
  action: string = "create"
  task: Task = { id: 0, title: "", description: "", completed: false }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => (
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    ))
  }

  editTask(task: Task) {
    this.action = "update"
    this.task = task
  }

  completeTask(task: Task) {
    task.completed = !task.completed
    console.log(task)
    this._updateTask(task)
  }

  updateTask(task: Task) {
    this._updateTask(task)

    this.action = "create"
  }

  addTask(task: Task) {
    this.taskService.createTask({
      title: task.title,
      description: task.description,
      completed: false
    }).subscribe((taskReturn: Response) => {
      this.tasks.push(taskReturn.data as Task)
      console.log(this.tasks)
    })
  }

  _updateTask(task: Task) {
    this.taskService.updateTask({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed === null ? false : task.completed
    }).subscribe((taskReturn: Response) => {
      let updatedTask = taskReturn.data as Task
      this.tasks.forEach(u => {
        if (u.id == updatedTask.id) {
          u.title = updatedTask.title
          u.description = updatedTask.description
          u.completed = updatedTask.completed
        }
      })
    })
  }
} 
