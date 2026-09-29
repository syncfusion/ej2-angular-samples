import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { hierarchyCheckboxData } from './data';
import { DropDownListComponent, DropDownListAllModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { DayMarkersService, GanttComponent, GanttModule, SelectionService, ToolbarService, FilterService } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

// Type definitions for checkbox selection modes:
type CheckboxSelectionMode = 'self' | 'hierarchy' | 'filteredHierarchy';

interface DropDownItem {
  id: string | boolean;
  type: string;
}
@Component({
  selector: 'ej2-ganttcheckboxselection',
  templateUrl: 'checkbox-selection.html',
  standalone: true,
  styleUrls: ['checkbox-selection.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [SelectionService, DayMarkersService, ToolbarService, FilterService],
  imports: [GanttModule, DropDownListAllModule, ButtonAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class GanttCheckboxSelectionComponent implements OnInit {
  public data: object[];
  public taskSettings: object;
  public labelSettings: object;
  public splitterSettings: object;
  public selectionSettings: object;
  public projectStartDate: Date;
  public columns: object[];
  public toolbar: string[];
  public projectEndDate: Date;

  @ViewChild('checkboxselection')
  public ganttObj!: GanttComponent;

  @ViewChild('selectionModeList')
  public selectionModeList!: DropDownListComponent;

  public dropDownModeListData: DropDownItem[];
  public dropDownModeListFields: object;
  public enableHover: boolean;
  public enableToggle: boolean;
  public defaultCheckboxSelectionMode: CheckboxSelectionMode;
  public ngOnInit(): void {
    this.data = hierarchyCheckboxData;
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
      { field: 'CheckBox', headerText: '', showCheckbox: true, width: 70, allowFiltering: false },
      { field: 'TaskID', width: 70, visible: false },
      { field: 'TaskName', width: 190 },
      { field: 'StartDate' },
      { field: 'EndDate' },
      { field: 'Duration' },
      { field: 'Predecessor' },
      { field: 'Progress' },
    ],
    this.labelSettings = {
      leftLabel: 'TaskName',
    };
    this.splitterSettings = {
      columnIndex: 3
    };
    this.toolbar = ["Search"];
    this.selectionSettings = {
      mode: 'Row',
      type: 'Multiple',
      enableToggle: false
    };
    this.projectStartDate = new Date('03/26/2025');
    this.projectEndDate = new Date('07/20/2025');

    // Initialize dropdown data
    this.dropDownModeListData = [
      { id: 'self', type: 'self' },
      { id: 'hierarchy', type: 'hierarchy' },
      { id: 'filteredHierarchy', type: 'filteredHierarchy' }
    ];
    this.dropDownModeListFields = { text: 'type', value: 'id' };

    // Initialize default values for UI controls
    this.enableHover = true;
    this.defaultCheckboxSelectionMode = 'hierarchy';

  }
  public change(e: ChangeEventArgs): void {
    let mode: any = e.value as string;
    this.ganttObj.hierarchyCheckboxMode = mode;
    this.ganttObj.refresh();
  }

}
