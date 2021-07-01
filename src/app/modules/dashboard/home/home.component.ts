import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/core/enums/permission';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public permission: any = Permission;
  constructor() { }

  ngOnInit(): void {
  }

}
