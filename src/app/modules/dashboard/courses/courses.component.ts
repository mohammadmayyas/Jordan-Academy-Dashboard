import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from 'src/app/core/enums/permission';
import { CreateUpdateCourseComponent } from './create-update-course/create-update-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public permission: any = Permission;
  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }
 
  openDialog() {
    this.dialog.open(CreateUpdateCourseComponent);
  }

}
