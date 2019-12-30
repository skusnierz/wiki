import { Subscription } from 'rxjs';
import { UserService } from './../services/user.service';
import { CourseService } from './../services/course.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-courseDetails',
  templateUrl: './courseDetails.component.html',
  styleUrls: ['./courseDetails.component.css']
})
export class CourseDetailsComponent implements OnInit {

  rate;
  course;
  course1;
  currentRate;
  isEnrolled = false;
  averageRating: number;
  starIcons = {
    empty: '../assets/curvy-star-empty.svg',
    half: '../assets/curvy-star-half.svg',
    full: '../assets/curvy-star-full.svg'
  };
  courseSubscription: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    this.course = history.state;
    this.courseSubscription = this.courseService.subscribeCourse(this.course._id).subscribe(message => {
      if (message) {
        this.course1 = message;
        const sum = this.course1.ratings.reduce((acc, cur) => acc + cur.rating, 0);
        const ratingsQuantity = this.course1.ratings.length;
        if (ratingsQuantity === 0) {
          this.averageRating = 0;
        } else {
          this.averageRating = sum / ratingsQuantity;
        }
      } else {
        this.course1 = null;
      }
    });

    // check is user enrolled tp course
    this.isEnrolled = ((this.course.enrolledStudents.find((ele) => ele === this.userService.id)) === this.userService.id);
    this.rate = this.course.ratings.find((ele) => ele.studentId === this.userService.id);
    if (this.rate === undefined) {
      this.currentRate = 2.5;
    } else {
      this.currentRate = this.rate.rating;
    }
  }

  onRatingSet($event) {
    this.currentRate = $event;
  }

  submit() {
    this.courseService.rateCourse(this.course._id, this.userService.id, this.currentRate);
  }

  unsubscribe() {
    if (this.isEnrolled) {
      this.isEnrolled = false;
      this.courseService.removeStudentFromCourse(this.course._id, this.userService.id);
    }
  }

  joinIn() {
    if (!this.isEnrolled) {
      this.isEnrolled = true;
      this.courseService.addStudtenToCourse(this.course._id, this.userService.id);
    }
  }
}
