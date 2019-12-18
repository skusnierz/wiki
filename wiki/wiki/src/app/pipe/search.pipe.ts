import { Rating } from './../model/Rating';
import { Course } from './../model/Course';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  checkSemester(num: number, array: number[]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === num) { return true; }
    }
    return false;
  }

  transform(courses: Course[], searchText: string, minEtcs: number, maxEtcs: number,
            minRating: number, maxRating: number, semesters: number[]): Course[] {

    if (!courses) {
      return [];
    }

    if (searchText === '' || searchText === undefined) {
      return courses.filter(course => {
        const sum = course.ratings.reduce((acc, cur) => acc + cur.rating, 0);
        const ratingsQuantity = course.ratings.length;
        if (ratingsQuantity === 0) {
          return course.ects >= minEtcs && course.ects <= maxEtcs && this.checkSemester(course.semester, semesters);
        }
        return course.ects >= minEtcs && course.ects <= maxEtcs
          && (sum / ratingsQuantity) >= minRating && (sum / ratingsQuantity) <= maxRating && this.checkSemester(course.semester, semesters);
      });
    }

    searchText = searchText.toLocaleLowerCase();

    return courses.filter(course => {
      const sum = course.ratings.reduce((acc, cur) => acc + cur.rating, 0);
      const ratingsQuantity = course.ratings.length;
      if (ratingsQuantity === 0) {
        return course.ects >= minEtcs && course.ects <= maxEtcs && this.checkSemester(course.semester, semesters);
      }
      return course.name.toLowerCase().includes(searchText) && course.ects >= minEtcs && course.ects <= maxEtcs
        && (sum / ratingsQuantity) >= minRating && (sum / ratingsQuantity) <= maxRating && this.checkSemester(course.semester, semesters);
    });
  }

}
