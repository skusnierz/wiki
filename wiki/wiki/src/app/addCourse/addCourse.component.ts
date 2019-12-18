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
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pabradė' }
  ];
  selectedCourse: any;

  number = 5;
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
    private fb: FormBuilder
  ) { }

  submitted = false;

  ngOnInit() {
    this.addCoursesForm = this.fb.group({
      courseName: ['', [Validators.required]],
      maxAttendees: ['', [Validators.required]],
      courseForm: ['', [Validators.required]],
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
  }

  courseFormIsEmpty() {
    return this.selectedCourse === undefined || this.selectedCourse === null;
  }

  maxAttendeesValid() {
    return this.addCoursesForm.value.maxAttendees < 0 && this.addCoursesForm.value.maxAttendees !== null
    && this.addCoursesForm.value.maxAttendees !== undefined;
  }
}
