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
            barPercentage: 0.5,
            barThickness: 60,
            maxBarThickness: 70,
            minBarLength: 30,
            data: this.trainees,  

            borderColor: [
              "rgba(105, 0, 132, .7)",
              "rgba(0, 137, 132, .7)",  
              "rgba(234, 49, 58, .7)",
              "rgba(76, 76, 255, .7)",  
              "rgba(0, 255, 255, .7)",  
              "rgba(249, 144, 176, .7)",  
              "rgba(170, 210, 237, .7)"
            ],
            borderWidth: 2,
            backgroundColor: [  
              "rgba(105, 0, 132, .2)",  
              "rgba(0, 137, 132, .2)",  
              "rgba(234, 49, 58, .2)",  
              "rgba(76, 76, 255, .2)",  
              "rgba(0, 255, 255, .2)",  
              "rgba(249, 144, 176, .2)",  
              "rgba(170, 210, 237, .2)"
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
            display: true,
            ticks: {
              beginAtZero: true
            }  
          }],  
        }  
      }  
    });  
  }

}


