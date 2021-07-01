import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/core/services/shared.service';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/core/enums/permission';

export class AdminResponse{
  certificateId: number;
  adminResponse: string;
  adminName: string;
  constructor(certificateId: number, adminResponse: string, adminName: string){
    this.certificateId = certificateId;
    this.adminResponse = adminResponse;
    this.adminName = adminName;
  }
}

@Component({
  selector: 'app-get-certificates-requests',
  templateUrl: './get-certificates-requests.component.html',
  styleUrls: ['./get-certificates-requests.component.scss']
})
export class GetCertificatesRequestsComponent implements OnInit {

  requestsList: any[] = [];
  No: number = 0;
  adminResponse: any;
  displayedColumns: string[] = ['No', 'TraineeName', 'Course', 'RequestDate', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public permission: any = Permission;
  
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private userService: UserService,
    private sharedService: SharedService,
    private certificateService: CertificateService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllCertificatesRequests();
  }

  getAllCertificatesRequests(){
    this.spinner.show();
    this.certificateService.getAllCertificatesRequests().subscribe((res: any) => {
      this.requestsList = res;
      this.dataSource = new MatTableDataSource(this.requestsList);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  rejectCertificateRequest(certificateId: number){
    let user: any= localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      let userName= user.User_Name;
      this.adminResponse = new AdminResponse(certificateId, 'Reject', userName);
      this.userService.ResponseForGetCertificateRequest(this.adminResponse);
      this.sharedService.reload(this.router.url);
    }
  }

  approveCertificateRequest(certificateId: number){
    let user: any= localStorage.getItem('user');
    if(user){
      user = JSON.parse(user);
      let userName= user.User_Name;
      this.adminResponse = new AdminResponse(certificateId, 'Approve', userName);
      this.userService.ResponseForGetCertificateRequest(this.adminResponse);
      this.sharedService.reload(this.router.url);
    }
  }
}
