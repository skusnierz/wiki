import { NgOption } from '@ng-select/ng-select';
import { Options } from 'ng5-slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from './../model/Course';
import { CourseService } from './../services/course.service';
import { Component, OnInit, Input } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-editCourse',
  templateUrl: './editCourse.component.html',
  styleUrls: ['./editCourse.component.css']
})

export class EditCourseComponent implements OnInit {
  addedCourseComplete = false;
  submitted = false;
  _id: string;
  course: Course;
  private sub: any;
  editCourseForm: FormGroup;

  courseForms: NgOption[] = [
    { id: 1, name: 'Lecture' },
    { id: 2, name: 'Excercise' },
    { id: 3, name: 'Project' },
    { id: 4, name: 'Lab' }
  ];
  selectedCourseForm: any;

  valueSemester = 5;
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

  valueEtcs = 5;
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
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  returnIdOfCourseForm(name) {
    let formId = 0;
    this.courseForms.forEach(element => {
      if (element.name === name) {
        formId = element.id;
      }
    });
    return formId;
  }

  doStuff() {
    console.log(this.selectedCourseForm);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this._id = params.id;
      console.log(this._id);
    });

    this.editCourseForm = this.fb.group({
      courseName: ['', [Validators.required]],
      maxAttendees: ['', [Validators.required]],
      imageUrl: ['', [Validators.required, Validators.pattern('^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpeg|jpg|gif|png)$')]],
      description: ['', [Validators.required]]
    });

    this.courseService.getCourse(this._id).subscribe(ele => {
      this.course = ele['data'];
      this.selectedCourseForm = this.returnIdOfCourseForm(this.course.courseForm);
      this.editCourseForm.patchValue({
        courseName: this.course.name,
        maxAttendees: this.course.maxStudents,
        imageUrl: this.course.image,
        description: this.course.description
      });
      this.valueSemester = this.course.semester;
      this.valueEtcs = this.course.ects;
      this._id = this.course._id;
    });
  }
  get f() {
    return this.editCourseForm.controls;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async submit() {
    this.submitted = true;
    if (this.editCourseForm.valid && !this.courseFormIsEmpty()) {
      const course: Course = {
        _id: this.editCourseForm.value.courseName,
        name: this.editCourseForm.value.courseName,
        ects: this.valueEtcs,
        semester: this.valueSemester,
        maxStudents: this.editCourseForm.value.maxAttendees,
        courseForm: this.courseForms[this.selectedCourseForm - 1].name,
        ratings: [],
        description: this.editCourseForm.value.description,
        image: this.editCourseForm.value.imageUrl,
        enrolledStudents: [],
      };
      this.courseService.updateCourse(course, this.course._id);
      this.addedCourseComplete = true;
      await this.delay(2000);
      this.router.navigate(['/home']);
    }
  }

  courseFormIsEmpty() {
    return this.selectedCourseForm === undefined || this.selectedCourseForm === null;
  }

  maxAttendeesValid() {
    return this.editCourseForm.value.maxAttendees < 0 && this.editCourseForm.value.maxAttendees !== null
      && this.editCourseForm.value.maxAttendees !== undefined;
  }
}
