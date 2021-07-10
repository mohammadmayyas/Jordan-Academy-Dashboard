import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/core/services/course.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Permission } from 'src/app/core/enums/permission';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-create-update-course',
  templateUrl: './create-update-course.component.html',
  styleUrls: ['./create-update-course.component.scss']
})
export class CreateUpdateCourseComponent implements OnInit {

  public permission: any = Permission;
  public apiRoot: string = env.apiRoot;
  public isImageNotValid: boolean = false;
  courseForm = new FormGroup({
    courseName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10000)]),
    courseLevel: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)]),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    trainerId: new FormControl(''),
    courseImage: new FormControl('', [
      Validators.required]),
    courseImagePath: new FormControl(''),
  });

  trainersList: any[]= [];
  trainerId: string= '';
  constructor(
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CreateUpdateCourseComponent>,
    private router: Router,
    private sharedService: SharedService,
    public datepipe: DatePipe,
    private userService: UserService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getAllTrainers();
    if (this.data && this.data.courseId) {
      this.courseForm.controls.courseName.setValue(this.data.courseName);
      this.courseForm.controls.description.setValue(this.data.description);
      this.courseForm.controls.courseLevel.setValue(this.data.courseLevel);
      this.courseForm.controls.startDate.setValue(this.data.startDate);
      this.courseForm.controls.endDate.setValue(this.data.endDate);
      this.courseForm.controls.trainerId.setValue(this.data.trainerId);
      this.courseForm.controls.courseImagePath.setValue(this.data.courseImagePath);
      this.courseForm.controls.courseImage.setValue(this.data.courseImagePath);
    }
  }

  getAllTrainers(){
    this.spinner.show();
    this.userService.getAllTrainers().subscribe((res: any) => {
      this.trainersList= res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    })
  }

  saveItem(){
    const value = this.courseForm.value;
    if (this.data && this.data.courseId) {
      this.dialog.close({
        ...value,
        courseId: this.data.courseId
      })
    } else {
      this.dialog.close(value);
      this.createCourse(value);
    }
  }

  createCourse(course: any){
    const formData: FormData = new FormData();
    let startDateTime = this.courseForm.controls.startDate.value;
    let endDateTime = this.courseForm.controls.endDate.value;
    let startDate =this.datepipe.transform(startDateTime, 'yyyy-MM-dd');
    let endDate =this.datepipe.transform(endDateTime, 'yyyy-MM-dd');
    formData.append('courseName', this.courseForm.controls.courseName.value);
    formData.append('description', this.courseForm.controls.description.value);
    formData.append('courseLevel', this.courseForm.controls.courseLevel.value);
    formData.append('startDate', `${startDate}`);
    formData.append('endDate', `${endDate}`);
    formData.append('trainerId', this.courseForm.controls.trainerId.value);
    formData.append('courseImage', this.courseForm.controls.courseImage.value);

    this.courseService.createCourse(formData);
    this.sharedService.reload(this.router.url);
  }

  courseImageValidation(){
    if (!(/\.(jpe?g|png|gif|bmp)$/i.test(this.courseForm.controls.courseImage.value.name)))
      this.courseForm.controls.courseImage.setErrors({'incorrect': true});
  }
  
}
