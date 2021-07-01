import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  getAllTestimonials(){
    return this.http.get(`${env.apiRoot}/api/Testimonial`);
  }

  addTestimonial(data: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Testimonial`, data).subscribe((res: any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  updateDisplayedTestimonials(data: any[]){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Testimonial/UpdateDisplayedTestimonials`, data).subscribe((res: any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  deleteTestimonial(testimonialId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Testimonial/${testimonialId}`).subscribe((res: any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getAllAllowedTestimonials(){
    return this.http.get(`${env.apiRoot}/api/Testimonial/GetAllAllowedTestimonials`);
  }
}
