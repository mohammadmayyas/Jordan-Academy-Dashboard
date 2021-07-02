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

  updateDisplayedTestimonials(data: any[]){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Testimonial/UpdateDisplayedTestimonials`, data, {responseType: 'text'}).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.success('Displayed testimonials updated successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error('Somthing went wrong');
    });
  }

  deleteTestimonial(testimonialId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Testimonial/${testimonialId}`, {responseType: 'text'}).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.success('Testimonials deleted successfully');
    }, err => {
      this.spinner.hide();
      this.toastr.error('Somthing went wrong');
    });
  }

}
