import { UserService } from './../services/user.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  getUserName() {
    return this.userService.name;
  }

  onLogout() {
    this.authService.logout();
  }
}
