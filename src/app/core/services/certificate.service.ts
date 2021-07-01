import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  getAllCertificates(){
    return this.http.get(`${env.apiRoot}/api/Certificate/GetAllCertificatesApporved`);
  }

  deleteCertificate(certificateId: number){
    this.spinner.show();
    return this.http.delete(`${env.apiRoot}/api/Certificate/${certificateId}`).subscribe(res => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  getAllCertificatesRequests(){
    return this.http.get(`${env.apiRoot}/api/Certificate/GetAllCertificatesRequests`);
  }

  getAllCertificatesRequests2(){
    return this.http.get(`${env.apiRoot}/api/Certificate/GetAllCertificatesRequests`);
  }
}
