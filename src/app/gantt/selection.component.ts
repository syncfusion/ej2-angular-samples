import { Component, OnInit, ViewChild } from '@angular/core';
import { projectNewData } from './data';
import { DropDownListComponent, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DayMarkersService, GanttComponent, GanttModule, ResizeService, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

// Type definitions for selection modes and types
type SelectionMode = 'Row' | 'Cell';
type SelectionType = 'Single' | 'Multiple';

interface DropDownItem {
  id: string | boolean;
  type: string;
}
@Component({
  selector: 'ej2-ganttselection',
  templateUrl: 'selection.html',
  styleUrls: ['selection.component.css'],
  standalone: true,
  providers: [SelectionService, DayMarkersService, ResizeService],
  imports: [GanttModule, DropDownListAllModule, ButtonAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class GanttSelectionComponent implements OnInit {
  public data: object[];
  public taskSettings: object;
  public labelSettings: object;
  public splitterSettings: object;
  public selectionSettings: object;
  public projectStartDate: Date;
  public columns: object[];
  public projectEndDate: Date;

  @ViewChild('selection')
  public ganttObj!: GanttComponent;

  @ViewChild('selectionModeList')
  public selectionModeList!: DropDownListComponent;

  @ViewChild('selectionTypeList')
  public selectionTypeList!: DropDownListComponent;

  @ViewChild('selectionToggleList')
  public selectionToggleList!: DropDownListComponent;

  public dropDownModeListData: DropDownItem[];
  public dropDownModeListFields: object;
  public dropDownTypeListData: DropDownItem[];
  public dropDownTypeListFields: object;
  public dropDownToggleListData: DropDownItem[];
  public dropDownToggleListFields: object;
  public enableHover: boolean;
  public enableToggle: boolean;
  public defaultSelectionMode: SelectionMode;
  public defaultSelectionType: SelectionType;
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
      parentID: 'ParentID'
    };
    this.columns = [
      { field: 'TaskID', width: 70 },
      { field: 'TaskName', width: 280 },
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
      columnIndex: 2
    };
    this.selectionSettings = {
      mode: 'Row',
      type: 'Single',
      enableToggle: false
    };
    this.projectStartDate = new Date('03/26/2025');
    this.projectEndDate = new Date('07/20/2025');

    // Initialize dropdown data
    this.dropDownModeListData = [
      { id: 'Row', type: 'Row' },
      { id: 'Cell', type: 'Cell' }
    ];
    this.dropDownModeListFields = { text: 'type', value: 'id' };

    this.dropDownTypeListData = [
      { id: 'Single', type: 'Single' },
      { id: 'Multiple', type: 'Multiple' }
    ];
    this.dropDownTypeListFields = { text: 'type', value: 'id' };

    this.dropDownToggleListData = [
      { id: true, type: 'Enable' },
      { id: false, type: 'Disable' }
    ];
    this.dropDownToggleListFields = { text: 'type', value: 'id' };

    // Initialize default values for UI controls
    this.enableHover = true;
    this.enableToggle = false;
    this.defaultSelectionMode = 'Row';
    this.defaultSelectionType = 'Single';
  }
  public perform(): void {
    // Validate that all required components are initialized
    if (!this.selectionModeList || !this.selectionTypeList || !this.selectionToggleList || !this.ganttObj) {
      console.error('Selection dropdowns or Gantt component not initialized');
      return;
    }

    const mode = this.selectionModeList.value as SelectionMode;
    const type = this.selectionTypeList.value as SelectionType;
    const toggle = this.selectionToggleList.value as boolean;

    // Apply selection settings to Gantt component
    if (this.ganttObj.selectionSettings) {
      this.ganttObj.selectionSettings.mode = mode;
      this.ganttObj.selectionSettings.type = type;
      this.ganttObj.selectionSettings.enableToggle = toggle;
    }
  }

  public onHoverChange(event: Event): void {
    if (!this.ganttObj) {
      console.error('Gantt component not initialized');
      return;
    }

    const target = event.target as HTMLInputElement | null;
    if (target && target.checked !== undefined) {
      this.ganttObj.enableHover = target.checked;
    }
  }
}
