import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { Permission } from 'src/app/core/enums/permission';

@Component({
  selector: 'app-createupdate-role',
  templateUrl: './create-update-role.component.html',
  styleUrls: ['./create-update-role.component.scss']
})
export class CreateUpdateRoleComponent implements OnInit {

  public permission: any = Permission;
  roleForm = new FormGroup({
    roleName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)]),
  })
  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<CreateUpdateRoleComponent>
    ) {
    
  }

  ngOnInit(): void {
    if (this.data && this.data.roleId) {
      this.roleForm.controls.roleName.setValue(this.data.roleName);
    }
  }

  saveItem(){
    const value = this.roleForm.value;
  
    if (this.data && this.data.roleId) {
      this.dialog.close({
        ...value,
        roleId: this.data.roleId
      })
    } else {
      this.dialog.close(value);
      this.createRole(value);
    }
  }

  createRole(role: any){
    this.rolesPermissionsService.createRole(role);
  }

}
