import { Teacher } from './Teacher';
import { Rating } from './Rating';
import { CommentCategory } from './Comment';

export enum CourseTypes {
    Lecture,
    Exercise,
    Lab,
    Project
}

export interface Course {
    id: string;
    name: string;
    ects: number;
    semester: number;
    maxStudents: number;
    courseForm: CourseTypes;
    ratings: Rating[];
    description: string;
    image: string;
    enrolledStudents: string[];
}
export interface CourseToBeAdded {
    name: string;
    ects: number;
    semester: number;
    maxStudents: number;
    courseForm: CourseTypes;
    ratings: Rating[];
    description: string;
    image: string;
    enrolledStudents: string[];
}