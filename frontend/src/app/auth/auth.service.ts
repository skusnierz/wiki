import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  login() {
    this.userService.getUser().subscribe(
      res => {
        this.userService.setName(res['data'].name);
        this.userService.setRole(res['data'].role);
        this.loggedIn.next(true);
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    );
  }

  navigateRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
