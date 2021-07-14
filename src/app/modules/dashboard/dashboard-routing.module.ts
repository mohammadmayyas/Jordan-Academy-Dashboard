import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateCertificatesGuard } from 'src/app/core/guards/can-activate-certificates.guard';
import { CanActivateCoursesGuard } from 'src/app/core/guards/can-activate-courses.guard';
import { CanActivateEnrollsGuard } from 'src/app/core/guards/can-activate-enrolls.guard';
import { CanActivateHomeGuard } from 'src/app/core/guards/can-activate-home.guard';
import { CanActivatePermissionsGuard } from 'src/app/core/guards/can-activate-permissions.guard';
import { CanActivateRolesGuard } from 'src/app/core/guards/can-activate-roles.guard';
import { CanActivateTestimonialsGuard } from 'src/app/core/guards/can-activate-testimonials.guard';
import { CanActivateUsersGuard } from 'src/app/core/guards/can-activate-users.guard';
import { TestimonialsComponent } from '../dashboard/testimonials/testimonials.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { GetCertificatesRequestsComponent } from './certificates/get-certificates-requests/get-certificates-requests.component';
import { CourseDetialsComponent } from './courses/course-detials/course-detials.component';
import { CoursesComponent } from './courses/courses.component';
import { EnrollToCourseRequestsListComponent } from './courses/enroll-to-course-requests-list/enroll-to-course-requests-list.component';
import { TraineeInfoComponent } from './courses/trainee-info/trainee-info.component';
import { HomeComponent } from './home/home.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [CanActivateUsersGuard]
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [CanActivateRolesGuard]
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [CanActivatePermissionsGuard]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [CanActivateCoursesGuard]
  },
  {
    path: 'course-details/:courseId',
    component: CourseDetialsComponent,
    canActivate: [CanActivateCoursesGuard]
  },
  {
    path: 'trainee-info/:traineeId',
    component: TraineeInfoComponent
  },
  {
    path: 'enrolls',
    component: EnrollToCourseRequestsListComponent,
    canActivate: [CanActivateEnrollsGuard]
  },
  {
    path: 'certificates',
    component: CertificatesComponent,
    canActivate: [CanActivateCertificatesGuard]
  },
  {
    path: 'certificate-requests',
    component: GetCertificatesRequestsComponent,
    canActivate: [CanActivateCertificatesGuard]
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent,
    canActivate: [CanActivateTestimonialsGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CanActivateHomeGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
