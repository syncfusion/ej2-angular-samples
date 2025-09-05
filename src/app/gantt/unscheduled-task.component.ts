import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { unscheduledData } from './data';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  selector: 'control-content',
  templateUrl: 'unscheduled-task.html',
  styleUrls: ['unscheduled.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttUnscheduledComponent implements OnInit {
  @ViewChild('unscheduleGantt')
  public ganttObj: GanttComponent;
  public data: object[];
  public taskSettings: object;
  public editSettings: object;
  public splitterSettings: object;
  public toolbar: object[];
  public columns: object[];
  public labelSettings: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public ngOnInit(): void {
    this.data = unscheduledData;
    this.taskSettings = {
      id: 'TaskId',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
    };
    this.editSettings = {
      allowAdding: true,
      allowEditing: true
    };
    this.toolbar = [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }],
      this.labelSettings = {
        leftLabel: 'TaskName',
        rightLabel: 'TaskType'
      };
    this.columns = [
      { field: 'TaskId', width: 90 },
      { field: 'TaskName', width: 100 },
      { field: 'StartDate', width: 180 },
      { field: 'EndDate', width: 120 },
      { field: 'Duration', width: 150 }
    ];
    this.splitterSettings = {
      columnIndex: 4
    };
    this.projectStartDate = new Date('12/29/2024');
    this.projectEndDate = new Date('02/08/2025');
  }
  public toolbarClickAction(args: object): void {
    var data = {
      Duration: null,
      StartDate: null,
      EndDate: null,
      TaskType: ''
    };
    this.ganttObj.addRecord(data)
  }

}
