import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task = { id: 0, title: "Default", description: "Default", completed: false };
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onCompleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();

  constructor() { }

  completeTask(task: Task) {
    this.onCompleteTask.emit(task)
  }

  editTask(task: Task) {
    this.onEditTask.emit(task)
  }

  deleteTask(task: Task) {
    this.onDeleteTask.emit(task)
  }
}
