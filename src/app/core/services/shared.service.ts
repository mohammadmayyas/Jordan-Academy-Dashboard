import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private roleIdSource = new BehaviorSubject<number>(0);
  currentRoleId = this.roleIdSource.asObservable();

  private userIdSource = new BehaviorSubject<number>(0);
  currentUserId = this.userIdSource.asObservable();

  private coursesListSource = new BehaviorSubject<any[]>([]);
  currentCoursesList = this.coursesListSource.asObservable();

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentUser: BehaviorSubject<User| null> = new BehaviorSubject<User| null>(null); ;
  
  constructor(private router: Router) {}

  onRoleIdChange(roleId: number){
    this.roleIdSource.next(roleId);
  }

  onUserIdChange(userId: number){
    this.userIdSource.next(userId);
  }

  onCoursesListChange(coursesList: any[]){
    this.coursesListSource.next(coursesList);
  }

  isLoggedIn(): boolean{
    let token= localStorage.getItem('token');
    if(token)
      return true;
    else
      return false;
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl('', { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
}
