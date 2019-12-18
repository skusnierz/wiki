import { Rating } from './Rating';

export enum CourseTypes {
    Lecture,
    Exercise,
    Lab,
    Project
}

export interface Course {
    id: string;
    name: string;
    image: string;
    description: string;
    ects: number;
    semester: number;
    courseForm: CourseTypes;
    maxStudents: number;
    ratings: Rating[];
    enrolledStudents: string[];
}