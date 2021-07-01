import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private permissions = [];
  private logicalOp = 'AND';
  private isHidden = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {
  }

  @Input()
  set hasPermission(val: any) {
    this.permissions = val;
    this.updateView();
  }

  @Input()
  set hasPermissionOp(permop: any) {
    this.logicalOp = permop;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
      if(this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;
    let currentUser: any = localStorage.getItem('user');
    if(currentUser){
      currentUser = JSON.parse(currentUser);

      if(this.permissions.length == 0)
        return true;

      else if (currentUser.Permissions) {
        for (const checkPermission of this.permissions) {
          const permissionFound = currentUser.Permissions.find((x: any) => x === checkPermission);
  
          if (permissionFound) {
            hasPermission = true;
  
            if (this.logicalOp === 'OR') {
              break;
            }
          } else {
            hasPermission = false;
            if (this.logicalOp === 'AND') {
              break;
            }
          }
        }
      }
  
      return hasPermission;
    }

    return false;
    
  }
}