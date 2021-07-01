import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from 'src/app/core/enums/permission';
import { CreateUpdatePermissionComponent } from './create-update-permission/create-update-permission.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  public permission: any = Permission;
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  
  }

  openDialog() {
    this.dialog.open(CreateUpdatePermissionComponent);
  }



}
