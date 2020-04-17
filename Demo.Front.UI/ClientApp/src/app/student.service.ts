import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentBE } from './model/backend/StudentBE';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
  apiURL: string;  

  constructor(private http: HttpClient)
  {
    this.apiURL = environment.apiUrl;
  }

  getById(id: number) {
    return this.http.get<StudentBE>(this.apiURL + '/api/student/' + id);
  }

  getAll() {
    return this.http.get<StudentBE[]>(this.apiURL + '/api/student');
  }

  getByName(name: string) {
    return this.http.get<StudentBE[]>(this.apiURL + '/api/student/'+ name);
  }

  post(student: StudentBE) {
    return this.http.post<StudentBE>(this.apiURL + '/api/student', student);
  }
}
