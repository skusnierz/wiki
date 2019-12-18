import { Course } from './../model/Course';
import { CourseService } from './../services/course.service';
import { Options } from 'ng5-slider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addCourse',
  templateUrl: './addCourse.component.html',
  styleUrls: ['./addCourse.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForms: NgOption[] = [
    { id: 1, name: 'Lecture' },
    { id: 2, name: 'Excercise' },
    { id: 2, name: 'Project' },
    { id: 3, name: 'Lab' }
  ];
  selectedCourseForm: any;

  value: number = 5;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
    ]
  };

  addCoursesForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) { }

  submitted = false;

  ngOnInit() {
    this.addCoursesForm = this.fb.group({
      courseName: ['', [Validators.required]],
      maxAttendees: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern('^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpeg|jpg|gif|png)$')]],
    });
  }

  public removed(): void {
    console.log('Removed value is: ');
  }

  get f() {
    return this.addCoursesForm.controls;
  }

  submit() {
    this.submitted = true;
    if ( this.addCoursesForm.valid && !this.courseFormIsEmpty()) {
      const course: Course = {
        id: this.addCoursesForm.value.courseName,
        name: this.addCoursesForm.value.courseName,
        ects: this.addCoursesForm.value.maxAttendees,
        semester: this.value,
        maxStudents: this.addCoursesForm.value.maxAttendees,
        courseForm: this.courseForms[this.selectedCourseForm - 1].name,
        ratings: [],
        description: 'description',
        image: this.addCoursesForm.value.imageUrl,
        enrolledStudents: []
      };
      console.log(course);
      this.courseService.addNewCourse(course);
    }
  }

  courseFormIsEmpty() {
    return this.selectedCourseForm === undefined || this.selectedCourseForm === null;
  }

  maxAttendeesValid() {
    return this.addCoursesForm.value.maxAttendees < 0 && this.addCoursesForm.value.maxAttendees !== null
      && this.addCoursesForm.value.maxAttendees !== undefined;
  }
}
