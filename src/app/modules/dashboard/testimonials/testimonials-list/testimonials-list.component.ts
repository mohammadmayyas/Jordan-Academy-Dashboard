import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/core/services/shared.service';
import { TestimonialService } from 'src/app/core/services/testimonial.service';
import { environment as env } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Permission } from 'src/app/core/enums/permission';

export class Testimonial{
  testimonialId: number;
  is_Displayed: boolean;
  constructor(testimonialId: number, is_Displayed: boolean){
    this.testimonialId = testimonialId;
    this.is_Displayed = is_Displayed;
  }
}

@Component({
  selector: 'app-testimonials-list',
  templateUrl: './testimonials-list.component.html',
  styleUrls: ['./testimonials-list.component.scss']
})
export class TestimonialsListComponent implements OnInit {

  testimonialsList: any[] = [];
  apiRoot: string = env.apiRoot;
  updatedList: any[] = [];
  public permission: any = Permission;
  
  displayedColumns: string[] = ['No', 'UserName', 'Comment', 'Rating', 'Date', 'UserImage', 'IsDisplayed', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private testimonialService: TestimonialService,
    private sharedService: SharedService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllTestimonials();
  }

  getAllTestimonials(){
    this.spinner.show();
    this.testimonialService.getAllTestimonials().subscribe((res: any) => {
      this.testimonialsList = res;
      this.dataSource = new MatTableDataSource(this.testimonialsList);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    })
  }

  updateDisplayedTestimonialsList(testimonialId:number, isChecked: boolean){
    let index = this.updatedList.findIndex(m => m.testimonialId == testimonialId);
    if(index >= 0)
      this.updatedList.splice(index, 1);
    else
      this.updatedList.push(new Testimonial(testimonialId, isChecked));
  }

  updateDisplayedTestimonials(){
    this.testimonialService.updateDisplayedTestimonials(this.updatedList);
    this.sharedService.reload(this.router.url);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTestimonial(testimonialId: number){
    this.testimonialService.deleteTestimonial(testimonialId);
    this.sharedService.reload(this.router.url);
  }

}
