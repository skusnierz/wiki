import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { Course } from '../model/Course';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Input() isAdmin: boolean;

  constructor(
    private router: Router,
    private userService: UserService
    ) {}
  submitted = false;
  
  ngOnInit() {
  }

  goToDetails() {
    this.router.navigateByUrl('/details', { state: this.course });
  }


}
