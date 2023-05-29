import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from '../components/task-item/task-item.component';
import { HeaderComponent } from '../components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    TasksComponent,
    TaskItemComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class PrivateModule { }
