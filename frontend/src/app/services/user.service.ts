import { environment } from './../../environments/environment';
import { User } from './../auth/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

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
  token: string;
  name: string;
  id: string;
  public isDone: boolean;
  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.token}`
    })
  };

  getIsDone() {
    return this.isDone;
  }

  addUser(user: User) {
    return this.http.post(environment.apiUrl + 'auth/register/', user);
  }

  getUsers() {
    return this.http.get<User[]>(environment.apiUrl + 'users');
  }

  getUser() {
    return this.http.get<User>(environment.apiUrl + 'users/' + localStorage.getItem('id'), { headers: this.setUpHeaders() });
  }

  login(user) {
    return this.http.post<User[]>(environment.apiUrl + 'auth/login/', user);
  }

  setUpHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
  }

  setRole(role: string) {
    this.role = role;
  }

  setName(name: string) {
    this.name = name;
  }

  setId(id: string) {
    this.id = id;
    localStorage.setItem('id', id);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
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
