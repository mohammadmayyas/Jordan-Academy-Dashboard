import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();
  currentUser = this.sharedService.currentUser;
  apiRoot: string = env.apiRoot;
  public showSearch = false;

  constructor(
    public authService: AuthService,
    public sharedService: SharedService
    ) {}

    logout(){
      this.authService.logout();
    }
}
