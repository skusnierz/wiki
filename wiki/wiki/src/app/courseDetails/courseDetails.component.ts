import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courseDetails',
  templateUrl: './courseDetails.component.html',
  styleUrls: ['./courseDetails.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state);
}

ngOnInit() {
    console.log(history.state);
    this.course = history.state;
}

}
