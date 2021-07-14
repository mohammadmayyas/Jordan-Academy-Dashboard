import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-trainee-info',
  templateUrl: './trainee-info.component.html',
  styleUrls: ['./trainee-info.component.css']
})
export class TraineeInfoComponent implements OnInit {

  traineeId: string = '';
  trainee: any;
  apiRoot: string = env.apiRoot;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.paramMap.get('traineeId')!;
    this.getUserInfo();
  }

  getUserInfo(){
    this.spinner.show();
    this.userService.getAllUserInfoById(this.traineeId).subscribe((res: any) => {
      if(res)
        this.trainee = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    });
  }

}
