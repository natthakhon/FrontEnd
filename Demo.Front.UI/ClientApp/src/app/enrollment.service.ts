import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnrollmentBE } from '../app/model/backend/EnrollmentBE'
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EnrollmentService {
  apiURL: string; 

  constructor(private http: HttpClient)
  {
    this.apiURL = environment.apiUrl;
  }

  post(enroll: EnrollmentBE) {
    return this.http.post<EnrollmentBE>(this.apiURL + '/api/enrollment', enroll);
  }

  getById(id: number) {
    return this.http.get<EnrollmentBE[]>(this.apiURL + '/api/enrollment/' + id);
  }

  put(enroll: EnrollmentBE) {
    return this.http.put<EnrollmentBE>(this.apiURL + '/api/enrollment', enroll);
  }

  delete(id: number) {
    return this.http.delete<EnrollmentBE[]>(this.apiURL + '/api/enrollment/' + id);
  }
}
