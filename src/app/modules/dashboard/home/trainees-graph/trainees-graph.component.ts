import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/core/services/course.service';

@Component({
  selector: 'app-trainees-graph',
  templateUrl: './trainees-graph.component.html',
  styleUrls: ['./trainees-graph.component.css']
})
export class TraineesGraphComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = []
  //  ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  coursesList: any[] = [];
  //public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Course'}];
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];


  constructor(
    private courseService: CourseService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    this.getAllCoursesWithStudents();
    
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

  getAllCoursesWithStudents(){
    this.courseService.getAllCoursesWithStudents().subscribe((res: any) => {
      this.coursesList = res;
      this.spinner.hide();
      this.setChartData();
      console.log(this.coursesList);
    }, err => {
      this.spinner.hide();
      this.toaster.error("Somthing went wrong..");
    });
  }

  setChartData(){
    this.barChartLabels = [];
    this.barChartData = [];
    const dataSets = [];
    this.coursesList.forEach((element: any) => {
      if(element.users.length > 0){
        this.barChartLabels.push(element.courseName);
        this.barChartData.push({data:[element.users.length], label: 'trainees'});
      }
    });
    console.log(this.barChartData);
  }

}

