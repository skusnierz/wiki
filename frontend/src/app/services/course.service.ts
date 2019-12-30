import { async } from '@angular/core/testing';
import { UserService } from './user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Course } from './../model/Course';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  baseurl = 'http://localhost:3000';
  baseurl1 = 'http://localhost:8080/api/courses/';
  constructor(private http: HttpClient) { }

  private currentCourses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);
  private currentCourse: BehaviorSubject<Course> = new BehaviorSubject<Course>(null);
  private userService: UserService;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  subscribeCourseList() {
    this.getCourses().subscribe(res => {
      this.currentCourses.next(res['data']);
    });
    return this.currentCourses.asObservable();
  }

  subscribeCourse(id: string) {
    this.getCourse(id).subscribe(res => {
      this.currentCourse.next(res['data']);
    });
    return this.currentCourse.asObservable();
  }


  getCourses() {
    return this.http.get<Course[]>(this.baseurl1, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getCourse(id: string) {
    return this.http.get<Course>(this.baseurl1 + id);
  }

  updateCourse(course: Course, id: string) {
    return this.http.put<Course>(this.baseurl1 + id, course, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      res => {
        this.getCourses().subscribe(resp => {
          this.currentCourses.next(resp['data']);
        });
        this.getCourse(id).subscribe(resp => {
          this.currentCourse.next(resp['data']);
        });
      },
      error => {
        console.log(error);
      });

  }

  addNewCourse(course: Course) {
    this.http.post(this.baseurl1, course).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }

  deleteCourse(id: string) {
    const response = this.http.delete(this.baseurl1 + id);
    response.subscribe(() => this.getCourses().subscribe(res =>
      this.currentCourses.next(res['data'])
    ));
  }

  async rateCourse(courseId: string, userId: string, rate: number) {
    let course;
    await this.getCourse(courseId).toPromise().then(res => {
      course = res['data'];
      for (const index in course.ratings) {
        if (course.ratings[index].studentId === userId) {
          course.ratings.splice(index, 1);
        }
      }
    });
    course.ratings.push({ studentId: userId, rating: rate });
    const response = this.updateCourse(course, courseId);
  }

  async removeStudentFromCourse(courseId: string, userId: string) {
    let course;
    await this.getCourse(courseId).toPromise().then(res => { course = res['data']; });
    course.enrolledStudents.splice(course.enrolledStudents.indexOf(userId), 1);
    this.updateCourse(course, courseId);
  }

  async addStudtenToCourse(courseId: string, userId: string) {
    let course;
    await this.getCourse(courseId).toPromise().then(res => { course = res['data']; });
    course.enrolledStudents.push(userId);
    this.updateCourse(course, courseId);
  }

}

