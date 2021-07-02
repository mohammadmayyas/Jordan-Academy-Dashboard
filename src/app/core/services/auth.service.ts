import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { SharedService } from './shared.service';
import { Permission } from '../enums/permission';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  clearTimeout: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private sharedService: SharedService
    ) { }

  login(user: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Account/Login`, user,{ responseType: 'text' }).subscribe(res => {
      this.spinner.hide();
      const data: any = jwt_decode(res);

      if(this.checkIfUserCanAccessDashboard(data))
      {
        this.router.navigate([''])
        this.sharedService.currentUser.next(data);
        localStorage.setItem('user', JSON.stringify({ ...data }));
        localStorage.setItem('token', res);
        
        let user = JSON.parse(localStorage.getItem('user')!);
        this.autoLogout(user.exp * 1000 - new Date().getTime());
      }
      else
      {
        this.toastr.error('Un-Authorized account');
      }
      
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error)
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(["auth/login"]);
    if(this.clearTimeout)
      clearTimeout(this.clearTimeout);
  }

  isLoggedIn(){
    return localStorage.getItem('token');
  }

  autoLogout(expirationDate: number){
    this.clearTimeout=  setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  checkIfUserCanAccessDashboard(user: any){
    const canAccess= user.Permissions.find((x: any) => x === Permission.CanAccessDashboard);
    if(canAccess)
      return true;
    else
      return false;
  }

}
