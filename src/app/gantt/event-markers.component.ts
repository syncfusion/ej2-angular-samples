import { Component, OnInit } from '@angular/core';
import { EventmarkerData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'ej2-gantteventmarker',
  templateUrl: 'event-markers.html',
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttEventMarkersComponent implements OnInit {
  public data: object[];
  public taskSettings: object;
  public columns: object[];
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public timelineSettings: object;
  public eventMarkers: object[];
  public splitterSettings: object;
  public ngOnInit(): void {
    this.data = EventmarkerData;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      parentID: 'ParentId'
    };
    this.columns = [
      { field: 'TaskID', width: 80 },
      { field: 'TaskName', width: 250 },
      { field: 'StartDate' },
      { field: 'EndDate' },
      { field: 'Duration' },
      { field: 'Predecessor' },
      { field: 'Progress' },
    ];
    this.projectStartDate = new Date('03/26/2025');
    this.projectEndDate = new Date('07/20/2025');
    this.labelSettings = {
      leftLabel: 'TaskName',
    };

    this.timelineSettings = {
      topTier: {
        unit: 'Week',
        format: 'EEE MMM dd'
      },
      bottomTier: {
        unit: 'Day',
        format: ''
      }
    };
    this.splitterSettings={
        columnIndex: 2,
    };
    this.eventMarkers = [
      {
        day: new Date("04/01/2025"),
        label: "Product Concept Analysis"
      },{
        day: new Date("04/07/2025"),
        label: "Research Phase"
      },{
        day: new Date("04/07/2025"),
        label: "Demand Analysis",
        top: '150px'
      },{
        day: new Date("04/17/2025"),
        label: "Design Phase",
        top: '200px'
      },{
        day: new Date("04/17/2025"),
        label: "Competitor Analysis",
        top: '422px'
      },{
        day: new Date("05/23/2025"),
        label: "Prototype Testing Phase"
      },{
        day: new Date("05/29/2025"),
        label: "Production Launch",
        top: '5px'
      },{
        day: new Date("06/26/2025"),
        label: "Market Deployment"
      }
    ];
  }
}
