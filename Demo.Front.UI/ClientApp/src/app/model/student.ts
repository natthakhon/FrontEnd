import {Enrollment } from './enrollment';
export class Student {
  
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public isnew: boolean = false,
    public isHidden: boolean = false,
    public enrollments: Enrollment[]
  ) {}
}
