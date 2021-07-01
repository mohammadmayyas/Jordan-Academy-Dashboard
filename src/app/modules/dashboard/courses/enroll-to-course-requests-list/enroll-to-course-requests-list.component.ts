import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/core/enums/permission';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';

export class EnrollResponse{
  userId: number;
  courseId: number;
  adminResponse: string;
  constructor(userId: number,courseId: number, adminResponse: string){
    this.userId = userId;
    this.courseId = courseId;
    this.adminResponse = adminResponse;
  }
}

@Component({
  selector: 'app-enroll-to-course-requests-list',
  templateUrl: './enroll-to-course-requests-list.component.html',
  styleUrls: ['./enroll-to-course-requests-list.component.scss']
})
export class EnrollToCourseRequestsListComponent implements OnInit {

  public permission: any = Permission;
  requestsList: any[] = [];
  No: number = 0;
  adminResponse: any;
  displayedColumns: string[] = ['No', 'UserName', 'Course', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private courseService: CourseService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.courseService.getAllEnrollToCourseRequests()
    .subscribe((res: any) => {
      this.requestsList = res;
      this.dataSource = new MatTableDataSource(this.requestsList);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  rejectRequest(userId: number, courseId: number){
    this.adminResponse = new EnrollResponse(userId, courseId, 'Reject')
    this.userService.responsForEnrollToCourseRequest(this.adminResponse);
    this.sharedService.reload(this.router.url);
  }

  approveRequest(userId: number, courseId: number){
    this.adminResponse = new EnrollResponse(userId, courseId, 'Approve')
    this.userService.responsForEnrollToCourseRequest(this.adminResponse);
    this.sharedService.reload(this.router.url);
  }

}
