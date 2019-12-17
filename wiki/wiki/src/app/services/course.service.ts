import { Observable } from 'rxjs';
import { Course } from './../Course';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseurl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseurl + '/Courses');
  }

}
