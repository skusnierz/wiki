import { Course } from './../model/Course';
import { SearchPipe } from './../pipe/search.pipe';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  courses: any = [];
  searchText: string;

  setCourseList(courses: Course[]) {
    this.courses = courses;
  }

}
