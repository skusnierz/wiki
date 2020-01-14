import { CourseService } from './../services/course.service';
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
    public userService: UserService,
    private courseService: CourseService
    ) {}
  submitted = false;

  ngOnInit() {
  }

  goToDetails() {
    this.router.navigateByUrl('/details', { state: this.course });
  }

  deleteCourse() {
    console.log(this.course._id);
    this.courseService.deleteCourse(this.course._id);
  }

  goToEditCourse() {
    this.router.navigate(['/edit', this.course._id]);
  }
}
