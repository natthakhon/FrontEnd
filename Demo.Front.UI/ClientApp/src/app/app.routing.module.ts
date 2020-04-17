import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from '../app/form/studentform/student.form.component';
import { StudentComponent } from '../app/student/student.component'
import { EnrollmentComponent } from '../app/enrollment/enrollment.component'

const routes: Routes = [
  { path: '', redirectTo: '/student', pathMatch: 'full' },
  { path: 'student/:id', component: StudentFormComponent },
  { path: 'enroll/:id', component: EnrollmentComponent },
  { path: 'newstudent', component: StudentFormComponent },
  { path: 'student', component: StudentComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
