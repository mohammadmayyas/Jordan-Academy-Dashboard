import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment as env } from 'src/environments/environment';
import { UserRolesComponent } from '../user-roles/user-roles.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { Permission } from 'src/app/core/enums/permission';
import { ConfirmationDialogComponent, ConfirmationDialogModel } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  usersList: any[] = [];
  dataSource = new MatTableDataSource();
  apiRoot: string = env.apiRoot;
  public permission: any = Permission;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['No', 'UserName', 'FirstNameEn', 'LastNameEn', 'Roles', 'Email', 'PhoneNumber', 'City', 'Address', 'UserImage', 'Operations'];
  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.getAllUsers().subscribe((res: any) => {
      this.usersList = res;
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  } 

  deleteUser(userId: number){
    this.userService.deleteUser(userId);
  }

 applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUpdateUserRolesDialog(userId: number){
    this.dialog.open(UserRolesComponent);
    this.sharedService.onUserIdChange(userId);
  }
  
  confirmDialog(userId: number): void {
    const message = `Are you sure you want to do this user ?`;

    const dialogData = new ConfirmationDialogModel(message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
        if(isConfirmed)
          this.deleteUser(userId);
    });
  }

}
