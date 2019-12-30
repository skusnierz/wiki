import { CourseService } from './../services/course.service';
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
  ) { }

  ngOnInit() {

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

  loginAsGuest() {
    this.userService.setRole('');
    this.userService.setId('');
    this.userService.setName('guest');
    this.authService.login();
  }

  displayRegisterForm() {
    this.authService.navigateRegister();
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.invalid) {
      return;
    }
    this.userService.login(this.form.value).subscribe(
      res => {
        console.log(res);
        this.userService.setRole(res['user'].role);
        this.userService.setId(res['user']._id);
        this.userService.setName(res['user'].name);
        this.invalidData = false;
        this.authService.login();
      },
      err => {
        console.log(err);
        this.invalidData = true;
      }
    );
  }

}
