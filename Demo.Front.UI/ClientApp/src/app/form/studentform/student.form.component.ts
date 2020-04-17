import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student'
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../student.service'
import { StudentBE } from '../../model/backend/studentbe'
import { Enrollment } from '../../model/enrollment';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-student-form',
  templateUrl: './student.form.component.html',
  styleUrls: ['./student.form.component.css']
})
export class StudentFormComponent implements OnInit {

  student: Student;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null)
      this.getstudentbyId(parseInt(id));
    else {
      const arr = new Array<Enrollment>();
      this.student = new Student(undefined, '', '', true, false, arr);
    }
  }

  constructor(private route: ActivatedRoute,
    private service: StudentService,
    private snackBar: MatSnackBar) { }

  onSubmit() {
    const studentbe: StudentBE = new StudentBE(this.student.name, this.student.lastname);
    this.service.post(studentbe).subscribe(res => {
      this.student.id = res.ID;
    }, err => window.alert(err.message)
      , () => this.openSaveSnackBar());
  }

  getstudentbyId(id) {
    this.service.getById(id).subscribe(res => {
      const arr = new Array<Enrollment>();
      this.student = new Student(res.ID, res.FirstName, res.LastName, false, false, arr)
    }, err => window.alert(err.message));
  }

  openSaveSnackBar() {
    this.snackBar.open("saved", '', {
      duration: 2000,
    });
  }
}
