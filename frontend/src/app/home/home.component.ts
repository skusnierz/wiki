import { Course } from './../model/Course';
import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../auth/user';
import { SearchPipe } from './../pipe/search.pipe';
import { CourseService } from './../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUserRole: any;
  coursesList: Course[] = [];
  filtredCoursesList: Course[] = [];
  public p: any;
  isAdmin = false;
  itemsPerPage = 10;
  courseSubscription: Subscription;
  constructor(
    private courseService: CourseService,
    private searchPipe: SearchPipe,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isAdmin = this.userService.havePermission('adminDashboard');
    this.courseSubscription = this.courseService.subscribeCourseList().subscribe(message => {
      if (message) {
        this.coursesList = message;
      } else {
        this.coursesList = null;
      }
      this.filtredCoursesList = this.coursesList;
    });
  }

  filterCourses(data) {
    this.filtredCoursesList = this.searchPipe.transform(this.coursesList, data.text, data.minEtcs, data.maxEtcs,
      data.minRating, data.maxRating, data.semesters);
  }

  setItemsPerPage(number) {
    this.itemsPerPage = number;
  }
}
