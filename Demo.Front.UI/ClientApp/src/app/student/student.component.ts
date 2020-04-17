import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { StudentService } from '../student.service'
import { Enrollment } from '../model/enrollment';
import { EnrollmentService } from '../enrollment.service'
import { Course } from '../model/course'
import { Grade } from '../model/grade'

@Component({
  selector: 'app-students',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  searchString: string;
  students: Student[] = [];

  constructor(private service: StudentService
    , private enrollService: EnrollmentService) {
  }

  ngOnInit(): void {

    this.service.getAll().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        var arr = new Array<Enrollment>();
        this.students.push(new Student(res[i].ID, res[i].FirstName, res[i].LastName, false, false,arr));
      }
    } , err => window.alert(err.message))
  }

  search(search) {
    this.students.length = 0;
    this.service.getByName(search).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        const arr = new Array<Enrollment>();
        this.students.push(new Student(res[i].ID, res[i].FirstName, res[i].LastName, false, false, arr));
      }
    }, err => window.alert(err.message))
  }

  display(student: Student) {
    student.enrollments = [];
    if (!student.isHidden) {
      this.enrollService.getById(student.id).subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          const enroll = new Enrollment(
            res[i].EnrollmentID
            , new Date(res[i].EnrollmentDate)
            , null
            , Course[res[i].CourseID.toString()]
            , Grade[res[i].Grade.toString()]);
          enroll.isnew = false;
          enroll.isdelete = false;
          student.enrollments.push(enroll);
        }
      });
    }

    student.isHidden = !student.isHidden;    
  }
}
