import { SearchPipe } from './../pipe/search.pipe';
import { CourseService } from './../services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  coursesList: any = [];
  filtredCoursesList: any = [];
  baseurl = 'http://localhost:3000';
  constructor(
    private courseService: CourseService,
    private searchPipe: SearchPipe
  ) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe((data: {}) => {
      this.coursesList = data;
      this.filtredCoursesList = data;
    });
  }

  filterCourses(data) {
    // console.log(data.semesters);
    // console.log(data.minEtcs);
    // console.log(data.maxEtcs);
    // console.log(data.minRating);
    // console.log(data.maxRating);
    this.filtredCoursesList = this.searchPipe.transform(this.coursesList, data.text, data.minEtcs, data.maxEtcs,
      data.minRating, data.maxRating, data.semesters);
  }

}
