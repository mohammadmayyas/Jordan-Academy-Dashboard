import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Permission } from 'src/app/core/enums/permission';


@Component({
  selector: 'app-update-trainee-marks',
  templateUrl: './update-trainee-marks.component.html',
  styleUrls: ['./update-trainee-marks.component.scss']
})
export class UpdateTraineeMarksComponent implements OnInit {

  public permission: any = Permission;
  marksForm = new FormGroup({
    firstMark: new FormControl(),
    secondMark: new FormControl(),
    thirdMark: new FormControl(),
    finalMark: new FormControl(),
  });
  isDisabled= true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<UpdateTraineeMarksComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.userCourseId) {
      this.marksForm.controls.firstMark.setValue(this.data.firstMark);
      this.marksForm.controls.secondMark.setValue(this.data.secondMark);
      this.marksForm.controls.thirdMark.setValue(this.data.thirdMark);
      this.marksForm.controls.finalMark.setValue(this.data.finalMark);
    }
  }

  saveItem(){
    const value = this.marksForm.value;
  
    if (this.data && this.data.userCourseId) {
      this.dialog.close({
        ...value,
        userCourseId: this.data.userCourseId
      })
    } else {
      this.dialog.close(value);
    }
  }

}
