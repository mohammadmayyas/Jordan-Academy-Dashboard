import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import {  MatDialog } from '@angular/material/dialog';
import { RolePermissionsComponent } from '../role-permissions/role-permissions.component';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdateRoleComponent } from '../create-update-role/create-update-role.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Permission } from 'src/app/core/enums/permission';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  @Input() rolesList: any[] = [];
  displayedColumns: string[] = ['No', 'Role', 'Permissions', 'Operations'];
  dataSource = new MatTableDataSource();
  permissionsIds: any[] = [];
  public permission: any = Permission;
  
  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    private router: Router,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
    ) { }


  ngOnInit(): void {
    this.spinner.show();
    this.rolesPermissionsService.getAllRolesWithPermissions().subscribe((res: any) => {
      this.rolesList = res;
      this.dataSource = new MatTableDataSource(this.rolesList);
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

  openUpdateRolePermissionsDialog(roleId: number){
    this.dialog.open(RolePermissionsComponent);
    this.sharedService.onRoleIdChange(roleId);
  }

  deleteRole(roleId: number){
    this.rolesPermissionsService.deleteRole(roleId);
    this.sharedService.reload(this.router.url);
  }

  updateRole(element: any){
    const data = {
      roleId: element.roleId,
      roleName: element.roleName
    };

    this.dialog.open(CreateUpdateRoleComponent, {
      data: data
    }).afterClosed().subscribe((result) => {
      if (result && result.roleId) {
        this.rolesPermissionsService.updateRole(result.roleId, result);
      }
    });
  }

}
