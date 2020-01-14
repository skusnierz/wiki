import { CourseService } from './../services/course.service';
import { UserService } from './../services/user.service';
import { User } from './../auth/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  public formSubmitAttempt: boolean;
  public emailAlreadyExist: boolean;
  public registrationComplete: boolean;
  userList = [];
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
  ) { }

  onLogout() {
    this.authService.logout();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(ele => {
      this.userList = ele['data'];
    });
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      conPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  passwordsMustMatch() {
    return this.form.value.password === this.form.value.conPassword;
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    this.emailAlreadyExist = false;
    const user: User = {
      _id: '',
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      role: undefined
    };

    this.userList.forEach(ele => {
      if (ele.email === this.form.value.email) { this.emailAlreadyExist = true; }
    });

    if (!this.passwordsMustMatch()) { return; }

    if (this.emailAlreadyExist) {
      return;
    }
    this.userService.addUser(user).subscribe(
      async response => {
        this.registrationComplete = true;
        await this.delay(1000);
        this.onLogout();
      },
      async error => {
        if (error.status === 200) {
          this.registrationComplete = true;
          await this.delay(1000);
          this.onLogout();
        }
      }
    );
  }

}
