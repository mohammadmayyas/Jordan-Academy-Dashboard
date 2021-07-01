import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdatePermissionComponent } from '../create-update-permission/create-update-permission.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Permission } from 'src/app/core/enums/permission';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss']
})
export class PermissionsListComponent implements OnInit {

  permissionsList: any[] = [];
  displayedColumns: string[] = ['No', 'Permission', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public permission: any = Permission;

  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    private toaster: ToastrService,
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.rolesPermissionsService.getAllPermissions().subscribe((res: any) =>{
      this.permissionsList = res;
      this.dataSource = new MatTableDataSource(this.permissionsList);
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

  deletePermission(permissionId: number){
    this.rolesPermissionsService.deletePermission(permissionId);
    this.sharedService.reload(this.router.url);
  }

  updatePermission(element: any){
    const data = {
      permissionId: element.permissionId,
      permissionName: element.permissionName
    };

    this.dialog.open(CreateUpdatePermissionComponent, {
      data: data
    }).afterClosed().subscribe((result) => {
      if (result && result.permissionId) {
        this.rolesPermissionsService.updatePermission(result.permissionId, result);
      }
    });
    this.sharedService.reload(this.router.url);
  }

}
