import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  login() {
    this.loggedIn.next(true);
    this.router.navigate(['/home']);
  }

  navigateRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
