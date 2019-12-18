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
  constructor(private router: Router) {}
  submitted = false;
  ngOnInit() {
  }

  goToDetails() {
    this.router.navigateByUrl('/details', { state: this.course });
  }


}
