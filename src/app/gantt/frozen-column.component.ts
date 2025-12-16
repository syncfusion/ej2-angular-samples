import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { frozenColumnsData , resourceCollection} from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { DropDownList, DropDownListAllModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns'
import { GanttComponent, GanttAllModule, ColumnModel } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { freezeDirection } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'ej2-frozenColumns',
  styleUrls: ['frozenColumn.css'],
  templateUrl: 'frozen-column.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent, DropDownListAllModule]
})
export class GanttFrozenColumnsComponent implements OnInit {
  @ViewChild('frozenColumns')
  public ganttObj: GanttComponent;
  @ViewChild('columnDD')
  public columnDropDown: DropDownList;
  @ViewChild('directionDD')
  public directionDropDown: DropDownList;
  public data: object[];
  public resources: object[];
  public taskSettings: object;
  public columns: object[];
  public splitterSettings: object;
  public labelSettings: object;
  public projectStartDate: Date| any;
  public projectEndDate: Date| any;
  public leftColumns: object[] =  [{ id: 'TaskID', name: 'Task ID' },
    { id: 'TaskName', name: 'Task Name' },
    { id: 'StartDate', name: 'Start Date' },
    { id: 'EndDate', name: 'End Date' },
    { id: 'Duration', name: 'Duration' },
    { id: 'Progress', name: 'Progress' },
    { id: 'Predecessor', name: 'Dependency'},
    { id: 'Resources', name: 'Assignee' },
    { id: 'Designation', name: 'Designation' },
    { id: 'Status', name: 'Status' },
  ];
  public directions: object[] = [
      { id: 'Left', name: 'Left' },
      { id: 'Right', name: 'Right' },
      { id: 'Fixed', name: 'Fixed' },
      { id: 'None', name: 'None' },
  ];
  public columnValue: string = "TaskID"; 
  public directionValue: string = "Left"; 
  public resourceFields : object;
  public ngOnInit(): void {
    this.data = frozenColumnsData;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency:'Predecessor',
      parentID: 'ParentID',
      resourceInfo: 'Resources',
    };
    this.resources = resourceCollection;
    this.resourceFields = {
        id: 'resourceId',
        name: 'resourceName',
    };
    this.columns = [
      { field: 'TaskID', headerText: 'Task ID', freeze: 'Left', },
      { field: 'TaskName', headerText: 'Task Name', width: 200, freeze: 'Left'},
      { field: 'StartDate', headerText: 'Start Date', },
      { field: 'Duration', headerText: 'Duration',},
      { field: 'EndDate', headerText: 'End Date', },
      { field: 'Progress', headerText: 'Progress', },
      { field: 'Predecessor', headerText: 'Dependency' },
      { field: 'Resources', headerText: 'Assignee', freeze: 'Right' },
      { field: 'Designation', headerText: 'Designation' },
      { field: 'Status', headerText: 'Status', },
    ];
    this.splitterSettings = {
      position: '70%'
    };
    this.projectStartDate = new Date('02/27/2025');
    this.projectEndDate = new Date('05/04/2025');
    this.labelSettings = {
      leftLabel: 'TaskName',
      taskLabel: 'Progress'
    };
  }
  public columnChange(e: ChangeEventArgs) : void {
      let columnName: any = e.value;
      let column: ColumnModel = this.ganttObj.getColumnByField(columnName, this.ganttObj.columns as ColumnModel[]);
      let value: string = column.freeze === undefined ? 'None' : column.freeze;
      this.directionDropDown.value = value;
  }
 
  public directionChange(e: ChangeEventArgs): void{
    let columnName: any = this.columnDropDown.value;
    let columns : ColumnModel[] = this.ganttObj.getGanttColumns();
    let column = columns.find((col) => col.field === columnName);
    if (column) {
        column.freeze = e.value === 'None' ? 'None' : e.value as freezeDirection;
        this.ganttObj.columns = columns;
    }
  }
}