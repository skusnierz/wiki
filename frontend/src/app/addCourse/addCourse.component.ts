import { Router, ActivatedRoute } from '@angular/router';
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

  addedCourseComplete = false;
  submitted = false;
  courseForms: NgOption[] = [
    { id: 1, name: 'Lecture' },
    { id: 2, name: 'Excercise' },
    { id: 3, name: 'Project' },
    { id: 4, name: 'Lab' }
  ];
  selectedCourseForm: any;

  valueSemester: number = 5;
  optionsSemester: Options = {
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

  valueEtcs: number = 5;
  optionsEtcs: Options = {
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
      { value: 11 },
      { value: 12 },
      { value: 13 },
      { value: 14 },
      { value: 15 }
    ]
  };

  addCoursesForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) { }



  ngOnInit() {
    this.addCoursesForm = this.fb.group({
      courseName: ['', [Validators.required]],
      maxAttendees: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern('^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpeg|jpg|gif|png)$')]],
      description: ['', [Validators.required]]
    });
  }

  get f() {
    return this.addCoursesForm.controls;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async submit() {
    this.submitted = true;
    if (this.addCoursesForm.valid && !this.courseFormIsEmpty()) {
      const course: Course = {
        _id: '',
        name: this.addCoursesForm.value.courseName,
        ects: this.valueEtcs,
        semester: this.valueSemester,
        maxStudents: this.addCoursesForm.value.maxAttendees,
        courseForm: this.courseForms[this.selectedCourseForm - 1].name,
        ratings: [],
        description: this.addCoursesForm.value.description,
        image: this.addCoursesForm.value.imageUrl,
        enrolledStudents: []
      };
      this.courseService.addNewCourse(course);
      this.addedCourseComplete = true;
      await this.delay(2000);
      this.router.navigate(['/home']);
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
