import { Component, OnInit } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { Gantt, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'ej2-ganttremotedata',
  templateUrl: 'remote-data.html',
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent, DropDownListAllModule]
})
export class GanttRemoteDataComponent implements OnInit {
  public data: Object;
  public taskSettings: object;
  public columns: object[];
  public timelineSettings: object;
  public rowHeight: string;
  public gridLines: string;
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public rowMark: string = "1,000 Rows"
  public DLData: object[] = [
    { Text: '1,000 Rows', Value: '1000' },
    { Text: '2,500 Rows', Value: '2500' },
    { Text: '5,000 Rows', Value: '5000' },
  ];
  public dropdownFields = { text: 'Text', value: 'Value' };
  public recordCount: string = '1000';
  public startLoadTime?: Date;
  public endLoadTime?: Date;
  public loadTime: string = '';
  public shouldCalculateLoadTime: boolean = true;

  public onChange(event: any): void {
    this.recordCount = event.value;
    this.shouldCalculateLoadTime = true;
    this.loadGanttData(); // Reload data source
  }
  public startTime: number;
  public endTime: number;

  public loadGanttData(): void {
    this.data = new DataManager({
      url: `https://ej2services.syncfusion.com/angular/development/api/GanttWebApiRemoteData?count=${this.recordCount}`,
      adaptor: new WebApiAdaptor,
      crossDomain: true
    });
    this.startLoadTime = new Date();
  }
  public ngOnInit(): void {
    this.loadGanttData();
    this.taskSettings = {
      id: 'TaskId',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      parentID: 'ParentId',
      dependency: 'Predecessor'
    };
    this.columns = [
      { field: 'TaskId' },
      { field: 'TaskName', headerText: 'Project Activity', width: '250', clipMode: 'EllipsisWithTooltip' },
      { field: 'StartDate', headerText: 'Planned Start Date', width: 200 },
      { field: 'Duration', headerText: 'Duration', width: 160 },
      { field: 'Progress', headerText: 'Completion (%)', width: 200 }
    ];
    this.timelineSettings = {
      timelineUnitSize: 50,
      topTier: {
        unit: 'Week',
        format: 'MMM dd, y',
      },
      bottomTier: {
        unit: 'Day',
        format: 'dd'
      }
    };

    this.gridLines = 'Horizontal';
    this.labelSettings = {
      rightLabel: 'TaskName',
      taskLabel: 'Progress'
    };
    this.projectStartDate = new Date('12/28/2024');
    this.projectEndDate = new Date('03/19/2025')
  }
  load(): void {
    if (this.shouldCalculateLoadTime) {
      this.endLoadTime = new Date();
      this.calculateLoadTime();
      this.shouldCalculateLoadTime = false; // Reset the flag
    }
  }
  public calculateLoadTime(): void {
    if (this.startLoadTime && this.endLoadTime) {
      const difference = (this.endLoadTime.getTime() - this.startLoadTime.getTime()) / 1000;
      this.loadTime = difference.toFixed(3);
    }
  }
}
