import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/private/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {
  @Input() task : Task = { id: 0, title: "Default", description: "Default", completed : false };
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onCompleteTask: EventEmitter<Task> = new EventEmitter();

  completed = new FormControl(this.task.completed)

  constructor(taskService : TaskService) {}

  completeTask() {
    
  }
}
