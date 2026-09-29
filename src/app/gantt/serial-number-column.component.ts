import { Component, OnInit, ViewChild } from '@angular/core';
import { DayMarkersService, EditService, FilterService, GanttComponent, GanttModule, SelectionService, SortService, ToolbarService, ContextMenuService, RowDDService } from '@syncfusion/ej2-angular-gantt';
import { SerialNumberData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'ej2-ganttserialnumber',
  templateUrl: 'serial-number-column.html',
  standalone: true,
  providers: [SelectionService, DayMarkersService, EditService, ToolbarService, FilterService, SortService, ContextMenuService, RowDDService],
  imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
  })
export class GanttSerialNumberComponent implements OnInit {
  @ViewChild('gantt')
  public ganttObj: GanttComponent;
  public data: object[];
  public taskSettings: object;
  public gridLines: string;
  public columns: object[];
  public toolbar: string[];
  public editSettings: object;
  public splitterSettings: object;
  public filterSettings: object;
  public timelineSettings: object;
  public labelSettings: object;
  public allowUnscheduledTasks: boolean;
  public projectStartDate: Date;
  public projectEndDate: Date;

  ngOnInit(): void {
    this.data = SerialNumberData;
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
      { field: 'SerialNumber', headerText: 'S.No',width: '100px', allowFiltering: false },
      { field: 'TaskName', headerText: 'Task Name', allowReordering: false, width: '280px'  },
      { field: 'StartDate', headerText: 'Start Date', width: '140px'  },
      { field: 'Predecessor', headerText: 'Predecessor',width: '190px' },
      { field: 'Duration', headerText: 'Duration', allowEditing: false , width: '130px'},
      { field: 'Progress', headerText: 'Progress'},
    ];
    this.gridLines = 'Both';
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true
    };
    this.toolbar = ["Add", "Edit", "Update", "Delete", "Cancel", "Indent", "Outdent", "ExpandAll", "CollapseAll", "Search"];
    this.splitterSettings = { columnIndex: 2 };
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
    this.projectStartDate = new Date('03/30/2025');
    this.projectEndDate = new Date('05/30/2025');
  }
}
