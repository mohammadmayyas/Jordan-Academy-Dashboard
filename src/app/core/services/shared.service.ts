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

  textDirection: string= 'ltr';
  textAlign: string= 'left';
  float: string= 'left';
  currentLang: string;

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentUser: BehaviorSubject<User| null> = new BehaviorSubject<User| null>(null); ;
  
  constructor(private router: Router) {
    this.currentLang = localStorage.getItem('currentLang')!;
    this.onLangChange(this.currentLang);
   }

  onRoleIdChange(roleId: number){
    this.roleIdSource.next(roleId);
  }

  onUserIdChange(userId: number){
    this.userIdSource.next(userId);
  }

  onCoursesListChange(coursesList: any[]){
    this.coursesListSource.next(coursesList);
  }

  onLangChange(lang: string){
    if(lang == 'ar')
    { 
      this.textDirection= 'rtl';
      this.textAlign= 'right';
      this.float= 'right';
    }
    else
    {
      this.textDirection= 'ltr';
      this.textAlign= 'left';
      this.float= 'left';
      
    }
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

// interface Iuser {
//   firstNameEn: string;
//   lastNameEn: string;
// }