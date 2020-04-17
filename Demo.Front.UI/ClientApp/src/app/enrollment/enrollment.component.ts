import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Grade } from '../model/grade'
import { ActivatedRoute } from '@angular/router';
import { EnrollmentService } from '../enrollment.service'
import { StudentService } from '../student.service';
import { Student } from '../model/student';
import { Course } from '../model/Course'
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnrollmentBE } from '../model/backend/enrollmentbe';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
    selector: 'app-enrollment-form',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.css']
})

export class EnrollmentComponent implements OnInit{

  enrollBEs: EnrollmentBE[] = [];
  student: Student;
  courses = Course;
  courseOption = [];
  grades = Grade;
  gradeOption = [];
  MAX = 4;
  canAdd = true;
  id: number;
  formGroup: FormGroup;

  constructor(private route: ActivatedRoute,
    private service: EnrollmentService
    , private studentservice: StudentService
    , private fb: FormBuilder
    , private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    const coursekeys = Object.keys(this.courses);
    this.courseOption = coursekeys.slice(coursekeys.length / 2, coursekeys.length);
    this.MAX = this.courseOption.length;
    
    const gradekeys = Object.keys(this.grades);
    this.gradeOption = gradekeys.slice(gradekeys.length / 2, gradekeys.length);

    this.getstudent();

    this.formGroup = this.fb.group({
      enrolls: this.fb.array([]),
    });

    this.getEnrollmentById(this.id);    
  }
  
  getEnrollmentById(id) {
    this.enrollBEs = [];
    this.formGroup.setControl('enrolls', this.fb.array([]));
    this.service.getById(id).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.enrolls.push(this.createEnrollFormGroup(res[i].EnrollmentID
          , false
          , false
          , Course[Object.keys(this.courses).find(key => this.courses[key] === res[i].CourseID)]
          , Grade[Object.keys(this.grades).find(key => this.grades[key] === res[i].Grade)]
          , new Date(res[i].EnrollmentDate)));
      }
    });
  }

  getstudent() {
    this.studentservice.getById(this.id).subscribe(res => {
      this.student = new Student(res.ID, res.FirstName, res.LastName, false, false, null);
    }, err => window.alert(err.message));
  }

  canaddMore() {
    return this.MAX > this.enrolls.controls.filter(p => p.get('isdelete').value === false).length;
  }

  async onSubmit() {
    await this.callapi();
    this.getEnrollmentById(this.id);
    this.openSaveSnackBar();
  }

  async callapi() {
    for (let i = 0; i < this.enrolls.length; i++) {
      const enrollbe = new EnrollmentBE(this.enrolls.controls[i].get('course').value
        , this.id
        , this.enrolls.controls[i].get('grade').value
        , this.enrolls.controls[i].get('enrolldate').value.toLocaleDateString());
      enrollbe.EnrollmentID = this.enrolls.controls[i].get('id').value;
      if (this.enrolls.controls[i].get('isdelete').value &&
          !this.enrolls.controls[i].get('isnew').value) {
        await this.delete(this.enrolls.controls[i].get('id').value);
      }
      if (this.enrolls.controls[i].get('isnew').value &&
        !this.enrolls.controls[i].get('isdelete').value) {
          await this.add(enrollbe);
        }
      if (!this.enrolls.controls[i].get('isnew').value &&
          !this.enrolls.controls[i].get('isdelete').value) {
          await this.update(enrollbe);
        }
      }    
  }

  async delete(id) {
    await this.service.delete(id).toPromise();
  }
  async add(enroll) {
    await this.service.post(enroll).toPromise();
  }
  async update(enroll) {
    await this.service.put(enroll).toPromise();
  }

  openSaveSnackBar() {
    this.snackBar.open("saved", '', {
      duration: 2000,
    });
  }

  get enrolls(): FormArray {
    return this.formGroup.get("enrolls") as FormArray
  }  

  createEnrollFormGroup(i,n,d,c,g,e ) {
    return this.fb.group({
      id:i,
      isnew:[n],
      isdelete: [d],
      course: [c, [Validators.required]],
      grade: [g, [Validators.required]],
      enrolldate: [e, [Validators.required]],
    })
  }

  addEnroll() {
    this.enrolls.push(this.createEnrollFormGroup(undefined,true,false,null, null, new Date()));
  }

  duplicatedCourses() {
    const coursesSelected: Course[]=[];
    const object = {};
    const duplicated: string[]=[];
    this.enrolls.controls.forEach(c => {
      if (c.get('isdelete') !== null && c.get('isdelete').value === false) {
        if (c.get('course') !== null && c.get('course').value !== null) {
          coursesSelected.push(c.get('course').value);
        }
      }
    });

    coursesSelected.forEach(function (item) {
      if (!object[item])
        object[item] = 0;
      object[item] += 1;
    })

    for (const prop in object) {
      if (object[prop] >= 2) {
        duplicated.push(prop);
      }
    }

    return duplicated;
  }

  onChange(courseValue, i) {
    if (this.duplicatedCourses().find(p => p === courseValue) !== undefined) {
      this.enrolls.controls[i].get('course').setValue(null);
      this.snackBar.open("duplicated course", '', {duration: 2000,});
    }
  }
}
