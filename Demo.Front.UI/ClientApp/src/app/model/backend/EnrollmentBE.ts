import { StudentBE } from './StudentBE' 
export class EnrollmentBE {
  EnrollmentID: number;
  Student: StudentBE;
  constructor(
    public CourseID: number,
    public StudentID: number,
    public Grade: number,
    public EnrollmentDate:string
  ) {}
}
