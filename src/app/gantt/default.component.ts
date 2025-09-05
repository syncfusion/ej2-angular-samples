import { Component, OnInit, ViewChild } from '@angular/core';
import { projectNewData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';

import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'ej2-ganttdefault',
  templateUrl: 'default.html',
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttDefaultComponent implements OnInit {
  @ViewChild('ganttDefault')
  public ganttObj: GanttComponent
  public data: object[];
  public taskSettings: object;
  public columns: object[];
  public splitterSettings: object;
  public labelSettings: object;
  public projectStartDate: Date;
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
    };
    this.splitterSettings = { columnIndex: 3 };

    this.columns = [
      { field: 'TaskID', width: 80 },
      { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
      { field: 'StartDate' },
      { field: 'Duration' },
      { field: 'Progress' },
      { field: 'Predecessor' }
    ];

    this.projectStartDate = new Date('03/26/2025');
    this.projectEndDate = new Date('07/20/2025');
    this.labelSettings = {
      leftLabel: 'TaskName',
    };
  }
  created(): void {

    if (document.querySelector('.e-bigger')) {

      this.ganttObj.rowHeight = 48;
      this.ganttObj.taskbarHeight = 28;
    }
  }
}
