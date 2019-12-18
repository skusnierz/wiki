import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courseDetails',
  templateUrl: './courseDetails.component.html',
  styleUrls: ['./courseDetails.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course;
  selected = 0;
  hovered = 0;
  readonly = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
}

ngOnInit() {
    this.course = history.state;
}

}
