import { User } from './../auth/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

userList: any = [];

constructor(
) { }

setUsers(users: User[]) {
  this.userList = users;
}

userIsThere(user: User) {
  let isDone: boolean;
  this.userList.forEach(element => {
    if ( element.email === user.email ) {
      isDone = true;
    }
  });
  return isDone;
}

}
