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

  role: string;
  name: string;
  id: string;
  baseurl = 'http://localhost:3000';
  baseurl1 = 'http://localhost:8080/api/auth';
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
    return this.http.post(this.baseurl1 + '/register/', user);
  }

  getUsers() {
    return this.http.get<User[]>(this.baseurl1 + '/users');
  }

  login(user) {
    return this.http.post<User[]>(this.baseurl1 + '/login/', user);
  }

  setRole(role: string) {
    this.role = role;
    console.log(this.role);
  }

  setName(name: string) {
    this.name = name;
  }

  setId(id: string) {
    this.id = id;
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
