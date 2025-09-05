import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
import { WBSData } from './data';
import {  GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'ej2-ganttwbsview',
  templateUrl: 'wbs-column.html',
  standalone: true,
  imports: [SBActionDescriptionComponent, SwitchAllModule, GanttAllModule, SBDescriptionComponent]
  })
export class GanttWbsViewComponent implements OnInit {
  @ViewChild('gantt')
  public ganttObj: GanttComponent;

  public data: object[];
  public taskSettings: object;
  public columns: object[];
  public toolbar: string[];
  public editSettings: object;
  public splitterSettings: object;
  public selectionSettings: object;
  public tooltipSettings: object;
  public filterSettings: object;
  public timelineSettings: object;
  public labelSettings: object;
  public allowUnscheduledTasks: boolean;
  public enableWBS: boolean;
  public enableAutoWbsUpdate: boolean;
  public projectStartDate: Date;
  public projectEndDate: Date;
  public eventMarkers: object[];

  ngOnInit(): void {
    this.data = WBSData;
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      duration: 'Duration',
      progress: 'Progress',
      dependency: 'Predecessor',
      parentID: 'ParentId'
    };
    this.columns = [
      { field: 'TaskID', headerText: 'Task ID', visible: false },
      { field: 'WBSCode', headerText: 'WBS Code',width: '200px'  },
      { field: 'TaskName', headerText: 'Task Name', allowReordering: false, width: '260px'  },
      { field: 'StartDate', headerText: 'Start Date', width: '140px'  },
      { field: 'WBSPredecessor', headerText: 'WBS Predecessor',width: '190px' },
      { field: 'Duration', headerText: 'Duration', allowEditing: false , width: '130px'},
      { field: 'Progress', headerText: 'Progress'},
    ];
    this.eventMarkers = [
            {
                day: new Date('04/2/2025'),
                label: 'Project Initiation'
            }
    ];
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
    };
    this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    this.splitterSettings = { columnIndex: 4 };
    this.selectionSettings = { mode: 'Row', type: 'Single', enableToggle: false };
    this.tooltipSettings = { showTooltip: true };
    this.filterSettings = { type: 'Menu' };
    this.timelineSettings = {
      showTooltip: true,
      topTier: { unit: 'Week', format: 'dd/MM/yyyy' },
      bottomTier: { unit: 'Day', count: 1 }
    };
    this.labelSettings = {
      taskLabel: '${Progress}%'
    };
    
    this.allowUnscheduledTasks = true;
    this.enableWBS = true;
    this.enableAutoWbsUpdate = true;
    this.projectStartDate = new Date('03/30/2025');
    this.projectEndDate = new Date('05/30/2025');
  }
    public autoUpdate(args): void {
        if (args.checked) {
            this.ganttObj.enableAutoWbsUpdate = true;
        } else {
            this.ganttObj.enableAutoWbsUpdate = false;
        }
    }

    public dataBound(): void {
      this.ganttObj.element.getElementsByClassName('e-span-label')[0]['style'].top = '125px';
      this.ganttObj.element.getElementsByClassName('e-gantt-right-arrow')[0]['style'].top = '131px';
    }
}
