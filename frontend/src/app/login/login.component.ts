import { Router } from '@angular/router';
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
  public formSubmitAttempt: boolean;
  invalidData = false;
  public p: any;
  users: Array<User>;
  constructor(
    public courses: CourseService,
    public fb: FormBuilder,
    public authService: AuthService,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.courses.getCourses();
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/home']);
      this.authService.loggedIn.next(true);
      this.userService.getUser().subscribe(
        res => {
          this.userService.setName(res['data'].name);
          this.userService.setId(res['data']._id);
          this.userService.setRole(res['data'].role);
        },
        err => {
          localStorage.removeItem('token');
          console.log(err);
        }
      );
    }
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
    this.authService.loggedIn.next(true);
    this.router.navigate(['/home']);
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
      async res => {
        this.userService.setId(res['_id']);
        this.userService.setToken(res['token']);
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
