import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/core/enums/permission';
import { CourseService } from 'src/app/core/services/course.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';
import { UpdateTraineeMarksComponent } from './update-trainee-marks/update-trainee-marks.component';

@Component({
  selector: 'app-course-detials',
  templateUrl: './course-detials.component.html',
  styleUrls: ['./course-detials.component.scss']
})
export class CourseDetialsComponent implements OnInit{

  courseId: string = "N/A";
  course: any;
  apiRoot: string = env.apiRoot;
  No: number = 0;
  displayedColumns: string[] = ['No', 'Trainee', 'EnrollDate', 'FirstMark', 'SecondMark', 'ThirdMark', 'FinalMark', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public permission: any = Permission;
  
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId')!;
    this.getTraineesAcademyInfoByCourseId(this.courseId);
  }
  
  getTraineesAcademyInfoByCourseId(courseId: string){
    this.spinner.show();
    this.courseService.getTraineesAcademyInfoByCourseId(courseId).subscribe((res: any) => {
      this.course = res;
      this.spinner.hide();
      this.dataSource = new MatTableDataSource(this.course);
      this.dataSource.paginator = this.paginator;
      console.log(this.course);
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateTraineeMarks(element: any){
    const data = {
      userCourseId: element.userCourseId,
      firstMark: element.firstMark,
      secondMark: element.secondMark,
      thirdMark: element.thirdMark,
      finalMark : element.finalMark
    };

    this.dialog.open(UpdateTraineeMarksComponent, {
      data: data
    }).afterClosed().subscribe((result) => {
      if (result && result.userCourseId) {
        this.courseService.updateTraineeMarks(result.userCourseId, result);
        this.sharedService.reload(this.router.url);
      }
    });
  }

}
