import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  
  getAllUsers(){
    return this.http.get(`${env.apiRoot}/api/User/GetAllUsers`);
  }

  createUser(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/CreateUser`, data, { responseType: 'text' }).subscribe(res => {
      this.spinner.hide();
      this.toastr.success("User created successfully");
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong!");
      console.log(err.error)
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
    return this.http.post(`${env.apiRoot}/api/User/UpdateUserRoles`, userRoles, { responseType: 'text'}).subscribe((res : any) => {
      this.spinner.hide();
      this.toastr.success("User roles updated successfully");
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  }

  deleteUser(userId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/User/${userId}`, { responseType: 'text' }).subscribe(res => {
      this.spinner.hide();
      this.toastr.success("User deleted successfully");
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  }

  responsForEnrollToCourseRequest(data: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/User/ResponseForEnrollToCourseRequest`, data, { responseType: 'text' }).subscribe(res => {
      this.spinner.hide();
      if(res == "Successfully added")
        this.toastr.success("User enrolled to the course successfully");
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
      if(data.adminResponse == 'Approve')
        this.toastr.success("Certificate sent to user successfully");
      else
        this.toastr.success("Certificate request rejected successfully");
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong!");
    });
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

}
