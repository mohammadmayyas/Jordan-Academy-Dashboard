import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  getAllCertificates(){
    return this.http.get(`${env.apiRoot}/api/Certificate/GetAllCertificatesApporved`);
  }

  deleteCertificate(certificateId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Certificate/${certificateId}`, {responseType: 'text'}).subscribe(res => {
      this.spinner.hide();
      this.toastr.success('Certificate deleted successfully');
      this.sharedService.reload(this.router.url);
    }, err => {
      this.spinner.hide();
      this.toastr.error('Somthing went wrong');
    });
  }

  getAllCertificatesRequests(){
    return this.http.get(`${env.apiRoot}/api/Certificate/GetAllCertificatesRequests`);
  }

  getAllCertificatesRequests2(){
    return this.http.get(`${env.apiRoot}/api/Certificate/GetAllCertificatesRequests`);
  }
}
