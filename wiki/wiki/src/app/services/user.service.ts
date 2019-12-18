import { User } from './../auth/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  roleList = [
    {
      name: 'admin',
      permissions: {
        deleteCourse: true,
        addCourse: true,
        adminDashboard: true
      }
    },
    {
      name: 'customUser',
      permissions: {
        deleteCourse: false,
        addCourse: false,
        adminDashboard: false
      }
    },
  ];

  role;
  baseurl = 'http://localhost:3000';
  public isDone: boolean;
  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getIsDone() {
    return this.isDone;
  }

  addUser(user: User) {
    return this.http.post(this.baseurl + '/users/', user).toPromise().then(
      res => {
        this.isDone = true;
      },
      err => {
        this.isDone = false;
      });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + '/users');
  }
  setRole(role: string) {
    this.role = role;
  }

  havePermission(permission: any) {
    for (const ele of this.roleList) {
      if (ele.name === this.role) {
        return ele.permissions[permission];
      }
    }
  }

  isAdmin() {
    return this.role === 'admin';
  }
}
