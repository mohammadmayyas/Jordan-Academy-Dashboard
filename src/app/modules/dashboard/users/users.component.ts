import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { Permission } from 'src/app/core/enums/permission';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public permission: any = Permission;
  constructor(
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    
  }

  openDialog() {
    this.dialog.open(CreateUserComponent);
  }

}
