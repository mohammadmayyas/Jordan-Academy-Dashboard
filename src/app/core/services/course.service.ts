import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  getAllCourses(){
    return this.http.get(`${env.apiRoot}/api/Course`);
  }

  getAllCoursesWithStudents(){
    return this.http.get(`${env.apiRoot}/api/Course/GetAllCoursesWithStudents`);
  }

  createCourse(course: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Course`, course).subscribe(res => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  deleteCourse(courseId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Course/${courseId}`, {responseType: 'text'}).subscribe((res : any) => {
      this.spinner.hide();
      this.toastr.success('Course deleted successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.success('Somthing went wrong..');
    });
  }

  updateCourse(courseId: number, course: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Course/${courseId}`, course).subscribe((res : any) => {
      this.spinner.hide();
      this.toastr.success('Course updated successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.success('Somthing went wrong..');
    });
  }

  getAllEnrollToCourseRequests(){
    return this.http.get(`${env.apiRoot}/api/Course/GetAllEnrollToCourseRequests`);
  }

  getAllPendingEnrollRequests(){
    return this.http.get(`${env.apiRoot}/api/Course/GetAllPendingEnrollRequests`);
  }

  getAllApprovedEnrollRequests(){
    return this.http.get(`${env.apiRoot}/api/Course/GetAllApprovedEnrollRequests`);
  }

  getTraineesAcademyInfoByCourseId(courseId: string){
    return this.http.get(`${env.apiRoot}/api/Course/GetTraineesAcademyInfoByCourseId/${courseId}`);
  }

  updateTraineeMarks(userCourseId: number, marks: any){
    this.spinner.show();
    return this.http.patch(`${env.apiRoot}/api/Course/UpdateTraineeMarks/${userCourseId}`, marks, {responseType: 'text'}).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.success('Somthing went wrong..');
    });
  }

}
