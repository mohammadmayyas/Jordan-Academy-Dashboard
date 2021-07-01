import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  
  getAllUsers(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUsers`);
  }

  createUser(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/CreateUser`, data).subscribe(res => {
      this.spinner.hide();
      this.toastr.success("User created successfully");
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong!");
    });
  }

  getFullUserNameById(userId: number){
    return this.http.get(`${env.apiRoot}/api/User/GetFullUserNameById/${userId}`);
  }

  getAllUsersWithRoles(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUsers`);
  }

  updateUserRoles(userRoles: any[]){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/User/UpdateUserRoles`, userRoles).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  deleteUser(userId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/User/${userId}`).subscribe(res => {
      this.spinner.hide();
      this.toastr.success("User deleted successfully");
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong!");
    });
  }

  responsForEnrollToCourseRequest(data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/User/ResponseForEnrollToCourseRequest`, data, { responseType: 'text' }).subscribe(res => {
      this.spinner.hide();
      if(res == "Successfully added")
        this.toastr.success("User add to the course successfully");
      else if(res == "Successfully rejected")
        this.toastr.success("User request rejected successfully");
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong!");
      console.log(err);
    });
  }

  ResponseForGetCertificateRequest(data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/User/ResponseForGetCertificateRequest`, data, { responseType: 'text' }).subscribe(res => {
      this.spinner.hide();
      this.toastr.success("Certificate sent to user successfully");
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong!");
    });
  }

  enrollToCourseRequest(data: any){
    return this.http.post(`${env.apiRoot}/api/User/AddEnrollToCourseRequest`, data,{ responseType: 'text' });
  }

  getAllTrainers(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllTrainers`);
  }

  getAllTrainers2(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllTrainers`);
  }

  getAllUserEnrollments(userId: number){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUserCourses/${userId}`);
  }

  getUserCourseInfoByIds(data: any){
    return this.http.post(`${env.apiRoot}/api/User/GetUserEnrolledCourseInfoByIds`, data);
  }

  addCertificateRequest(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/User/AddCertificateRequest`, data).subscribe(res => {
      this.spinner.hide();
    },err =>{
      this.spinner.hide();
    });
  }

  resetPassword(userId: string, data: any){
    return this.http.put(`${env.apiRoot}/api/Account/ResetPassword/${userId}`, data,{ responseType: 'text'});
  }

  forgotPassword(userId: string, data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Account/ForgotPassword/${userId}`, data).subscribe(any => {
      this.toastr.success("Your password changed successfully");
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong!");
    });
  }

  sendResetPasswordLinkToEmail(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/sendResetPasswordLinkToEmail`, data).subscribe(any => {
      this.spinner.hide();
      this.toastr.success("Password reset link sent to youre email")
    }, err => {
      this.spinner.hide();
      this.toastr.error("Email not exist");
    });
  }

  getAllUserInfoById(userId: string){
    return this.http.get(`${env.apiRoot}/api/User/UserInfo/${userId}`);
  }

  getAllUserCourses(userId: number){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUserCourses/${userId}`);
  }

  updateUserImageById(userId: string ,userImage: any){
    return this.http.post(`${env.apiRoot}/api/User/UpdateUserImageById/${userId}`, userImage,{ responseType: 'text' });
  }

  updateUserIInfoById(userId: string ,data: any){
    return this.http.post(`${env.apiRoot}/api/User/UpdateUserInfoById/${userId}`, data,{ responseType: 'text' });
  }

}
