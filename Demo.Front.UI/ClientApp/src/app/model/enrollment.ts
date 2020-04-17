import { Student } from './student'
import { Course } from './Course'
import { Grade } from './Grade'

export class Enrollment {

  public isnew: boolean;
  public isdelete: boolean;

  constructor(
    public id: number,
    public enrolldate: Date,
    public student: Student,
    public course: Course,
    public grade: Grade
    ) {}
}
