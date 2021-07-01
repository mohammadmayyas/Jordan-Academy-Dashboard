import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/core/enums/permission';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  public permission: any = Permission;
  constructor() { }

  ngOnInit(): void {
  }

}
