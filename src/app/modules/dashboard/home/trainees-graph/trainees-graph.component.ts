import { Component, ElementRef, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import * as Chart from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-trainees-graph',
  templateUrl: './trainees-graph.component.html',
  styleUrls: ['./trainees-graph.component.css']
})
export class TraineesGraphComponent implements OnInit {

  @ViewChild('canvas') chartElementRef: ElementRef | undefined;

  coursesList: any[] = [];
  barchart= new Chart('canvas', {})
  trainees: any[]= [];
  courseName: any[]= [];
  
  constructor(
    private courseService: CourseService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllCoursesWithStudents();
    
  }

  getAllCoursesWithStudents(){
    this.courseService.getAllCoursesWithStudents().subscribe((res: any) => {
      this.coursesList = res;
      this.spinner.hide();
      this.setChartData();
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    });
  }

  setChartData(){
    this.coursesList.forEach((element: any) => {
      if(element.users.length > 0){
        this.trainees.push(element.users.length);
        this.courseName.push(element.courseName);
      }
    });
    
    this.barchart = new Chart(this.chartElementRef?.nativeElement, {  
      type: 'bar',  
      data: {  
        labels: this.courseName,  
        datasets: [  
          {  
            data: this.trainees,  
            borderColor: '#3cba9f',  
            backgroundColor: [  
              "#cc0000",  
              "#0000FF",  
              "#9966FF",  
              "#4C4CFF",  
              "#00FFFF",  
              "#f990a7",  
              "#aad2ed",  
              "#FF00FF",  
              "Blue",  
              "Red",  
              "Blue"  
            ],  
            fill: true  
          }  
        ]  
      },  
      options: {  
        legend: {  
          display: false  
        },  
        scales: {  
          xAxes: [{  
            display: true  
          }],  
          yAxes: [{  
            display: true  
          }],  
        }  
      }  
    });  
  }

}


