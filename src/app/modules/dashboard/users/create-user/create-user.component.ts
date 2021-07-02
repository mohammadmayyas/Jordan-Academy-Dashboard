import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/core/enums/permission';
import { RolesPermissionsService } from 'src/app/core/services/rolesPermissions.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  rolesList: any[] = [];
  public permission: any = Permission;
  userForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5), 
      Validators.maxLength(50)
    ]),       
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
      Validators.minLength(10), 
      Validators.maxLength(13)
    ]),
    roles: new FormControl([], [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8), 
      Validators.maxLength(200)
    ]),
  }); 
  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.getAllRole();
  }

  getAllRole(){
    this.spinner.show();
    this.rolesPermissionsService.getAllRoles().subscribe((res: any) => {
      this.rolesList = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  }

  createUser(){
    this.user.createUser(this.userForm.value);
  }

}
