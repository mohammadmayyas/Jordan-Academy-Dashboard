import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { RolesComponent } from './roles/roles.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionsListComponent } from './permissions/permissions-list/permissions-list.component';
import { CreateUpdatePermissionComponent } from './permissions/create-update-permission/create-update-permission.component';
import { RolePermissionsComponent } from './roles/role-permissions/role-permissions.component';
import { CreateUpdateRoleComponent } from './roles/create-update-role/create-update-role.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CreateUpdateCourseComponent } from './courses/create-update-course/create-update-course.component';
import { GetCheckedPermissionsPipe } from 'src/app/core/pipes/get-checked-permissions.pipe';
import { CourseDetialsComponent } from './courses/course-detials/course-detials.component';
import { EnrollToCourseRequestsListComponent } from './courses/enroll-to-course-requests-list/enroll-to-course-requests-list.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CertificatesListComponent } from './certificates/certificates-list/certificates-list.component';
import { GetCertificatesRequestsComponent } from './certificates/get-certificates-requests/get-certificates-requests.component';
import { UpdateTraineeMarksComponent } from './courses/course-detials/update-trainee-marks/update-trainee-marks.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TestimonialsListComponent } from './testimonials/testimonials-list/testimonials-list.component';
import { UserRolesComponent } from './users/user-roles/user-roles.component';
import { GetCheckedRolesPipe } from 'src/app/core/pipes/get-checked-roles.pipe';
import { HomeComponent } from './home/home.component';
import { TraineesGraphComponent } from './home/trainees-graph/trainees-graph.component';
import { CreateUserComponent } from './users/create-user/create-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    RolesComponent,
    RolesListComponent,
    PermissionsComponent,
    PermissionsListComponent,
    CreateUpdatePermissionComponent,
    RolePermissionsComponent,
    CreateUpdateRoleComponent,
    CoursesComponent,
    CoursesListComponent,
    CreateUpdateCourseComponent,
    GetCheckedPermissionsPipe,
    CourseDetialsComponent,
    EnrollToCourseRequestsListComponent,
    CertificatesComponent,
    CertificatesListComponent,
    GetCertificatesRequestsComponent,
    UpdateTraineeMarksComponent,
    TestimonialsComponent,
    TestimonialsListComponent,
    UserRolesComponent,
    GetCheckedRolesPipe,
    HomeComponent,
    TraineesGraphComponent,
    CreateUserComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
