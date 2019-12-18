import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../auth/user';
import { SearchPipe } from './../pipe/search.pipe';
import { CourseService } from './../services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUserRole: any;
  coursesList: any = [];
  filtredCoursesList: any = [];
  private sub: any;
  baseurl = 'http://localhost:3000';
  isAdmin = false;

  constructor(
    private courseService: CourseService,
    private searchPipe: SearchPipe,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isAdmin = this.userService.havePermission('adminDashboard');
    this.courseService.getCourses().subscribe((data: {}) => {
      this.coursesList = data;
      this.filtredCoursesList = data;
    });
  }

  filterCourses(data) {
    this.filtredCoursesList = this.searchPipe.transform(this.coursesList, data.text, data.minEtcs, data.maxEtcs,
      data.minRating, data.maxRating, data.semesters);
  }

}
