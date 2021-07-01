import { Component } from '@angular/core';
import { SharedService } from './core/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Jordan-Academy';

  constructor(
    public sharedService: SharedService
    ){}

  ngOnInit(): void {
    let user: any = localStorage.getItem('user');
    if(user){
    user = JSON.parse(user);
    this.sharedService.currentUser.next(user);
    }
  }

}
