import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { CreateUpdateCourseComponent } from '../create-update-course/create-update-course.component';
import { environment as env } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Permission } from 'src/app/core/enums/permission';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  coursesList: any[] = [];
  trainersList: any[] = [];
  displayedColumns: string[] = ['No', 'Name', 'CourseLevel', 'Duration', 'Trainer', 'Image', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  apiRoot = env.apiRoot;
  public permission: any = Permission;
  
  constructor(
    private courseService: CourseService,
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog,
    public datepipe: DatePipe,
    private userService: UserService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getAllTrainers2();
    this.courseService.getAllCourses().subscribe((res: any) =>{
      this.coursesList = res;
      this.dataSource = new MatTableDataSource(this.coursesList);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.toaster.error("Somthing went wrong..");
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCourse(courseId: number){
    this.courseService.deleteCourse(courseId);
    this.sharedService.reload(this.router.url); 
  }

  updateCourse(element: any){
    let startDateTime = element.startDate;
    let endDateTime = element.endDate;
    let startDate =this.datepipe.transform(startDateTime, 'yyyy-MM-dd');
    let endDate =this.datepipe.transform(endDateTime, 'yyyy-MM-dd');
    const data = {
      courseId: element.courseId,
      courseName: element.courseName,
      description: element.description,
      courseLevel: element.courseLevel,
      startDate : startDate,
      endDate : endDate,
      trainerId: element.trainerId,
      courseImage: element.courseImage,
    };

    this.dialog.open(CreateUpdateCourseComponent, {
      data: data
    }).afterClosed().subscribe((result) => {
      if (result && result.courseId) {
        const formData: FormData = new FormData();
        let startDateTime = result.startDate;
        let endDateTime = result.endDate;
        let startDate =this.datepipe.transform(startDateTime, 'yyyy-MM-dd');
        let endDate =this.datepipe.transform(endDateTime, 'yyyy-MM-dd');
        formData.append('courseName', result.courseName);
        formData.append('description', result.description);
        formData.append('courseLevel', result.courseLevel);
        formData.append('startDate', `${startDate}`);
        formData.append('endDate', `${endDate}`);
        formData.append('trainerId', result.trainerId);
        formData.append('courseImage', result.courseImage);
        this.courseService.updateCourse(result.courseId, formData);
        this.sharedService.reload(this.router.url);
      }
    });
  }

  getAllTrainers2(){
    this.userService.getAllTrainers().subscribe((res: any) => {
      this.trainersList= res;
    }, err => {
      this.toaster.error("Somthing went wrong..");
    })
  }
}
