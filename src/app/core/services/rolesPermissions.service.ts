import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  getAllRoles(){
    return this.http.get(`${env.apiRoot}/api/Role`);
  }

  getAllRolesWithPermissions(){
    return this.http.get(`${env.apiRoot}/api/Role/GetAllRolesWithPermissions`);
  }

  createRole(role: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Role`, role, { responseType: 'text'}).subscribe(res =>{
      this.spinner.hide();
      this.toastr.success("Role added successfuly");
    }, err =>{
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  }

  getAllPermissions(){
    return this.http.get(`${env.apiRoot}/api/Permission`);
  }

  createPermission(permission: any){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Permission`, permission, {responseType: 'text'}).subscribe(res =>{
      this.spinner.hide();
      this.toastr.success("Permission added successfuly");
    }, err =>{
      this.spinner.hide();
      this.toastr.error(err.error);
    });
  }

  getRolesPermissionsIds(){
    return this.http.get(`${env.apiRoot}/api/Role/GetRolesPermissionsIds`);
  }

  deletePermission(permissionId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Permission/${permissionId}`).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  updatePermission(permissionId: number, permission: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Permission/${permissionId}`, permission).subscribe((res : any) => {
      this.spinner.hide();
      this.toastr.success("Permission updated successfuly");
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.error);
    });
  }

  updateRolePermissions(rolePermissions: any[]){
    this.spinner.show();
    return this.http.post(`${env.apiRoot}/api/Role/UpdateRolePermissions`, rolePermissions, { responseType: 'text'}).subscribe((res : any) => {
      this.spinner.hide();
      this.toastr.success("Role permissions updated successfuly");
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");

    });
  }

  deleteRole(roleId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Role/${roleId}`, { responseType: 'text'}).subscribe((res : any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  updateRole(roleId: number, role: any){
    this.spinner.show();
    return this.http.put(`${env.apiRoot}/api/Role/${roleId}`, role).subscribe((res : any) => {
      this.spinner.hide();
      this.toastr.success("Role updated successfuly");
    }, err => {
      this.spinner.hide();
      this.toastr.error("Somthing went wrong..");
    });
  }

}
