import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class UserRoles{
  userId: number;
  roleId: number ;
  constructor(userId: number, roleId: number){
    this.userId = userId;
    this.roleId = roleId;
  }
}

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

  rolesList: any[] = [];
  displayedColumns: string[] = ['User', 'Checkbox'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  userId: number = 0;
  usersList: any[] = [];
  userRoles: any[] = [];
  constructor(
    private userService: UserService,
    private rolePermissionsService: RolesPermissionsService,
    private sharedService: SharedService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
    this.sharedService.currentUserId.subscribe(userId => this.userId = userId);
  }

  getAllUsers(){
    this.spinner.show();
    this.userService.getAllUsers().subscribe((res: any) => {
      this.usersList = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  }

  getAllRoles(){
    this.spinner.show();
    this.rolePermissionsService.getAllRoles().subscribe((res: any) => {
      this.rolesList = res;
      this.dataSource = new MatTableDataSource(this.rolesList);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setUserRoles(roleId: number){
    let index = this.userRoles.findIndex(m => (m.userId == this.userId) && (m.roleId == roleId));
    if(index >= 0)
      this.userRoles.splice(index, 1);
    else
      this.userRoles.push(new UserRoles(this.userId, roleId));
    console.log(this.userRoles);
  }

  saveItem(){
    this.userService.updateUserRoles(this.userRoles);
    this.sharedService.reload(this.router.url);
  }

}
