import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required, CustomValidators.passwordMatching])
  })

  constructor(private userService: UserService, private router: Router) {  }

  register() {
    if (this.form.valid) {
      this.userService.create(
        {
          email: this.email.value,
          password: this.password.value,
          name: this.name.value
        }
      ).pipe(
        tap(() => this.router.navigate(["../login"]))
      ).subscribe()
    }
  }


  get name(): FormControl {
    return this.form.get('name') as FormControl
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl
  }
}
