import { UserService } from './../services/user.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  public isCollapsed: boolean;
  constructor(
    private authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.isCollapsed = true;
  }

  getUserName() {
    return this.userService.name;
  }

  onLogout() {
    this.authService.logout();
  }
}
