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
    private router: Router
  ) {}

  login(user: User, users: User[]) {
    // this.loggedIn.next(true);
    // this.router.navigate(['/']);
    users.forEach(element => {
      if ( element.email === user.email && element.password === user.password ) {
        this.loggedIn.next(true);
        this.router.navigate(['/home', element.role]);
        return false;
      }
    });
    return true;
  }

  navigateRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
