import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Pipe({
  name: 'getCheckedPermissions',
  pure: true
})
export class GetCheckedPermissionsPipe implements PipeTransform {

  roleId: number = 0;
  rolesList: any[] = [] ;

  constructor(
    private sharedService: SharedService,
    ){}

  transform(args: any[], value: number): boolean {
    return this.getCheckedPermissions(args, value);
   
  }

  getCheckedPermissions(args: any[], value: number): boolean{
    let isChecked: boolean = false
    this.rolesList = args;
    this.sharedService.currentRoleId.subscribe(roleId => this.roleId = roleId);
    this.rolesList.forEach((element: any) => {
      if(element.roleId == this.roleId){
        element.permissions.forEach((element2: any) => {
          if(value == element2.permissionId ){
            isChecked = true;
          }
        });
      }
    });
    return isChecked;
  }
}
