import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Pipe({
  name: 'getCheckedRoles',
  pure: true
})
export class GetCheckedRolesPipe implements PipeTransform {

  userId: number = 0;
  usersList: any[] = [] ;

  constructor(
    private sharedService: SharedService,
    ){}

  transform(args: any[], value: number): boolean {
    return this.getCheckedRoles(args, value);
  }

  getCheckedRoles(args: any[], value: number): boolean{
    let isChecked: boolean = false
    this.usersList = args;
    this.sharedService.currentUserId.subscribe(userId => this.userId = userId);
    this.usersList.forEach((element: any) => {
      if(element.userId == this.userId){
        element.roles.forEach((element2: any) => {
          if(value == element2.roleId ){
            isChecked = true;
          }
        });
      }
    });
    return isChecked;
  }

}
