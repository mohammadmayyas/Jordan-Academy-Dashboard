import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Permission } from '../enums/permission';

@Injectable({
  providedIn: 'root'
})
export class CanActivateTestimonialsGuard implements CanActivate {
  constructor(
    private route: Router,
    private toastr: ToastrService
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('token');
      if(token){
        let user: any = localStorage.getItem('user');
        if(state.url.indexOf('testimonials') >= 0){
          if (user) {
            user = JSON.parse(user);
            if (user.Permissions.includes(Permission.EditDisplayedTestimonials)) {
              return true;
            } else {
              this.route.navigate(['auth/login']);
              this.toastr.warning('Un-Authorized')
              return false;
            }
        } else {
          this.route.navigate(['auth/login']);
          this.toastr.warning('Un-Authorized')
          return false;
        }  
      }
      return true;
    } else {
      this.route.navigate(['auth/login']);
      this.toastr.warning('Un-Authorized')
      return false;
    }
  }
  
}
