import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from 'src/app/core/enums/permission';
import { TestimonialsListComponent } from './testimonials-list/testimonials-list.component';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  public permission: any = Permission;
  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }
 
  openDialog() {
    this.dialog.open(TestimonialsListComponent);
  }

}
