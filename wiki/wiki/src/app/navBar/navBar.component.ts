import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  @Input() canDisplayDashboard: Boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }
}
