import { Component, OnInit } from '@angular/core';
import { projectNewData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'ej2-ganttcolumnmenu',
  templateUrl: 'column-menu.html',
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttColumnMenuComponent implements OnInit {
  public data: object[];
  public taskSettings: object;
  public splitterSettings: object;
  public labelSettings: object;
  public projectStartDate: Date;
  public columns: object[];
  public projectEndDate: Date;
  public ngOnInit(): void {
    this.data = projectNewData;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      parentID: 'ParentId'
    },
      this.columns = [
        { field: 'TaskID', headerText: 'ID', width: 100 },
        { field: 'TaskName', headerText: 'Name', width: 250 },
        { field: 'StartDate' },
        { field: 'EndDate' },
        { field: 'Duration' },
        { field: 'Progress' },
        { field: 'Predecessor', headerText: 'Dependency', width: 190 }
      ];
    this.splitterSettings = {
      columnIndex: 4
    },
      this.projectStartDate = new Date('03/26/2025');
    this.projectEndDate = new Date('07/20/2025');
    this.labelSettings = {
      leftLabel: 'TaskName',
    };
  }
}
