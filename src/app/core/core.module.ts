import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GetCheckedPermissionsPipe } from './pipes/get-checked-permissions.pipe';
import { GetCheckedRolesPipe } from './pipes/get-checked-roles.pipe';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    GetCheckedPermissionsPipe,
    GetCheckedRolesPipe,
    
  ],
  imports: [
    CommonModule,
  ],
  //exports: [HasPermissionDirective]
})
export class CoreModule { }
