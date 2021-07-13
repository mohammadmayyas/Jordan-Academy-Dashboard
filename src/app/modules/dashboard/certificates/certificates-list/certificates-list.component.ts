import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CertificateService } from 'src/app/core/services/certificate.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Permission } from 'src/app/core/enums/permission';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogModel } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.scss']
})
export class CertificatesListComponent implements OnInit {

  certificatesList: any[] = [];
  displayedColumns: string[] = ['No', 'TraineeName', 'Course', 'ReleaseDate', 'AdminName', 'Operations'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public permission: any = Permission;
  
  constructor(
    private certificateService: CertificateService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCertificates();
  }

  getAllCertificates(){
    this.spinner.show();
    this.certificateService.getAllCertificates().subscribe((res: any) => {
      this.certificatesList = res;
      this.dataSource = new MatTableDataSource(this.certificatesList);
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

  deleteCertificate(certificateId: number){
    this.certificateService.deleteCertificate(certificateId);
  }

  confirmDialog(certificateId: number): void {
    const message = `Are you sure you want to do this certificate ?`;

    const dialogData = new ConfirmationDialogModel(message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "500px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
        if(isConfirmed)
          this.deleteCertificate(certificateId);
    });
  }

}
