import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { Router } from '@angular/router';
import { Permission } from 'src/app/core/enums/permission';

@Component({
  selector: 'app-create-update-permission',
  templateUrl: './create-update-permission.component.html',
  styleUrls: ['./create-update-permission.component.scss']
})
export class CreateUpdatePermissionComponent implements OnInit {

  public permission: any = Permission;
  permissionForm = new FormGroup({
    permissionName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)]),
  })
  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CreateUpdatePermissionComponent>,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.permissionId) {
      this.permissionForm.controls.permissionName.setValue(this.data.permissionName);
    }
  }

  saveItem(){
    const value = this.permissionForm.value;
  
    if (this.data && this.data.permissionId) {
      this.dialog.close({
        ...value,
        permissionId: this.data.permissionId
      })
    } else {
      this.dialog.close(value);
      this.createPermission(value);
    }
  }

  
  createPermission(permission: any){
    this.rolesPermissionsService.createPermission(permission);
    this.sharedService.reload(this.router.url);
  }

}
