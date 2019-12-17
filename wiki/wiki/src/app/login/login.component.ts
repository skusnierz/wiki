import { CourseService } from './../services/course.service';
import { RegisterService } from './../services/register.service';
import { UserService } from './../services/user.service';
import { User } from './../auth/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userList: any = [];
  form: FormGroup;
  private formSubmitAttempt: boolean;
  invalidData = false;

  users: Array<User>;
  constructor(
    private courses: CourseService,
    private fb: FormBuilder,
    private authService: AuthService,
    public userService: UserService,
    public Users: RegisterService
  ) { }

  ngOnInit() {
    this.userService.GetUsers().subscribe((data: {}) => {
      this.userList = data;
      this.Users.setUsers(this.userList);
    });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.courses.getCourses();

  }

  get f() {
    return this.form.controls;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  displayRegisterForm() {
    this.authService.navigateRegister();
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.invalid) {
      return;
    }
    this.invalidData = this.authService.login(this.form.value, this.userList);
  }

}
