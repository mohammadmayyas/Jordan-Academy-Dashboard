import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Permission } from 'src/app/core/enums/permission';
import { CreateUpdateRoleComponent } from './create-update-role/create-update-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public permission: any = Permission;
  constructor(
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(CreateUpdateRoleComponent);
  }

}
