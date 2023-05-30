import { Component, EventEmitter, Output, Input } from '@angular/core';
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
export class HeaderComponent {

  @Input() task: Task = { id: 0, title: "Default", description: "Default", completed: false };

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  form: FormGroup = new FormGroup({
    title: new FormControl(this.task.title, [Validators.required]),
    description: new FormControl(this.task.description, [Validators.required])
  })

  constructor(private taskService: TaskService) { }

  create() {
    if (this.form.valid) {

      this.onAddTask.emit({
        title: this.title.value,
        description: this.description.value
      })

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
