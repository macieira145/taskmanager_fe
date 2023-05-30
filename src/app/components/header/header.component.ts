import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/private/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class HeaderComponent implements OnChanges {

  @Input() task: Task = { id: 0, title: "Default", description: "Default", completed: false };
  @Input() action: string = "create"

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask : EventEmitter<Task> = new EventEmitter();

  form: FormGroup = new FormGroup({
    title: new FormControl(this.task.title, [Validators.required]),
    description: new FormControl(this.task.description, [Validators.required])
  })

  constructor(private taskService: TaskService) { }

  ngOnChanges(changes: SimpleChanges): void {
    let taskChange = changes['task']
    let actionChange = changes['action']

    if(taskChange !== undefined)
      this.task = taskChange.currentValue

    if(actionChange !== undefined)
      this.action = actionChange.currentValue

    this.form.patchValue({
      title: this.task.title,
      description: this.task.description
    })

  }

  create() {
    if (this.form.valid) {
      if (this.action == "create") {
        this.onAddTask.emit({
          title: this.title.value,
          description: this.description.value
        })
      } else {
        this.onUpdateTask.emit({
          id: this.task.id,
          title: this.title.value,
          description: this.description.value
        })
      }
      
      this.form.patchValue({
        title: "",
        description: ""
      })
    }
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl
  }

  updateTitle(value: string) {
    this.task.title = value
  }

  updateDescription(value: string) {
    this.task.description = value
  }
}
