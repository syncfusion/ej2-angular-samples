import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { constraintData } from './data';

@Component({
  selector: 'ej2-ganttconstraint',
  templateUrl: 'constraints.html',
  standalone: true,
  imports: [GanttAllModule]
})
export class GanttConstraintComponent implements OnInit {
  @ViewChild('gantt') ganttObj: GanttComponent;
  @ViewChild('rightLabel', { static: true }) public rightLabelTemplate: any;

  public data: object[];
  public taskSettings: object;
  public columns: object[];
  public editSettings: object;
  public toolbar: string[];
  public labelSettings: object;
  public splitterSettings: object;
  public timelineSettings: object;
  public resources: object[];
  public resourceFields: object;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public eventMarkers: object[];
  public gridLines: string;
  public highlightWeekends: boolean;
  public allowSelection: boolean;


  ngOnInit(): void {
    this.data = constraintData;

    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      constraintType: 'ConstraintType',
      constraintDate: 'ConstraintDate',
      dependency: 'Predecessor',
      parentID: 'parentID',
      notes: 'info',
      resourceInfo: 'resources'
    };

    this.columns = [
      { field: 'TaskID', visible: false },
      { field: 'TaskName', headerText: 'Job Name', width: '200', clipMode: 'EllipsisWithTooltip' },
      { field: 'StartDate' },
      { field: 'Duration' },
      { field: 'ConstraintType',width: '180' },
      { field: 'ConstraintDate', width: 200 }, 
      { field: 'EndDate' },
      { field: 'Predecessor' },
      { field: 'Progress' }
    ];

    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
    };

    this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
    this.splitterSettings = { columnIndex: 4 };
    this.labelSettings = {
      leftLabel: 'TaskName',
      rightLabel: this.rightLabelTemplate
    }
    this.timelineSettings = {
      topTier: { unit: 'Week', format: 'MMM dd, y' },
      bottomTier: { unit: 'Day' }
    };

    this.projectStartDate = new Date('03/25/2025');
    this.projectEndDate = new Date('09/10/2025');
    this.eventMarkers = [
      { day: new Date('03/25/2025'), label: 'Project StartDate' },
      { day: new Date('08/31/2025'), label: 'Project EndDate' }
    ];

    this.gridLines = 'Both';
    this.highlightWeekends = true;
    this.allowSelection = true;

  }

  public getConstraintText(value: number): string {
    const map: { [key: number]: string } = {
      0: 'As Soon As Possible',
      1: 'As Late As Possible',
      2: 'Must Start On',
      3: 'Must Finish On',
      4: 'Start No Earlier Than',
      5: 'Start No Later Than',
      6: 'Finish No Earlier Than',
      7: 'Finish No Later Than'
    };
    return map[value];
  }

}