import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { dialogData, dataResources } from './data'; // Assuming data is in a separate file
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';
import { getUniqueID } from '@syncfusion/ej2-base';

@Component({
  selector: 'ej2-ganttdialog',
  templateUrl: 'dialog-editing.html',
  standalone: true,
  imports: [GanttAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class GanttDialogComponent implements OnInit {
  public data: object[] = dialogData;
  public resources: object[] = dataResources;
  public taskSettings: object;
  public editSettings: object;
  public resourceFields: object;
  public columns: object[];
  public gridLines: string;
  public toolbar: string[];
  public taskMode: string;
  public addDialogFields: object[];
  public editDialogFields: object[];
  public splitterSettings: object;
  public timelineSettings: object;
  public eventMarkers: object[];
  public labelSettings: object;
  public projectStartDate: Date = new Date('03/30/2025');
  public projectEndDate: Date = new Date('08/07/2025');

  @ViewChild('gantt')
  public ganttObj: GanttComponent;

  public ngOnInit(): void {
    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      dependency: 'Predecessor',
      child: 'subtasks',
      progress: 'Progress',
      segments: 'Segments',
      constraintType: 'ConstraintType',
      constraintDate: 'ConstraintDate',
      resourceInfo: 'Resources',
      manual: 'isManual',
      work: 'Work',
    };
    this.resourceFields = {
      id: 'resourceId',
      name: 'resourceName',
    };
    this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true,
      mode: 'Dialog'
    };
    this.taskMode = "Custom"
    this.gridLines = 'Both';
    this.columns = [
      { field: 'TaskID', headerText: 'Task ID', width: 130 },
      { field: 'TaskName', headerText: 'Task Name', width: 200 },
      { field: 'StartDate', headerText: 'Start Date' },
      { field: 'Duration', headerText: 'Duration' },
      { field: 'ConstraintType', width: 173 },
      { field: 'ConstraintDate', width: 176 },
      { field: 'isManual', width: 150 },
      { field: 'Work' },
    ];
    this.addDialogFields = [
      { type: 'General', fields: ['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress'] },
      { type: 'Dependency' },
      {
        type: 'Resources',
        additionalParams: {
          allowFiltering: true,
          allowSorting: true,
          allowResizing: true,
          showColumnMenu: true,
          columns: [
            { field: 'resourceId', width: 70 },
            {
              field: 'resourceName',
              headerText: 'Resource Name',
              width: 204
            },
            { field: 'unit', width: 84 },
            {
              field: 'role',
              headerText: 'Role',
              allowEditing: false,
              width: 201
            },
          ],
          filterSettings: { type: 'Menu' },
        }
      },
      { type: 'Segments' },
      { type: 'Advanced', fields: ['ConstraintType', 'ConstraintDate', 'isManual', 'Work'] },
    ];
    this.editDialogFields = [
      {
        type: 'General',
        fields: ['TaskID', 'TaskName', 'StartDate', 'Duration', 'EndDate', 'Progress']
      },
      {
        type: 'Dependency',
        additionalParams: {
          allowPaging: true,
          allowSorting: true,
          pageSettings: { pageSize: 5, pageCount: 5 },
          toolbar: ['Add', 'Edit', 'Delete', 'Search'],
          editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
          searchSettings: { fields: ['name'], ignoreCase: true }
        }
      },
      {
        type: 'Resources',
        additionalParams: {
          allowFiltering: true,
          allowSorting: true,
          allowResizing: true,
          showColumnMenu: true,
          columns: [
            { field: 'resourceId', width: 70 },
            {
              field: 'resourceName',
              headerText: 'Resource Name',
              width: 204
            },
            { field: 'unit', width: 84 },
            {
              field: 'role',
              headerText: 'Role',
              allowEditing: false,

              width: 201
            },
          ],
          filterSettings: { type: 'Menu' },
        }
      },
      {
        type: 'Segments',
        additionalParams: {
          allowFiltering: true,
          allowPaging: true,
          allowSorting: true,
          allowReordering: true,
          allowResizing: true,
          pageSettings: { pageSize: 5, pageCount: 5 },
          toolbar: ['Add', 'Edit', 'Delete'],
          editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
          filterSettings: { type: 'Menu' },
        }
      },
      { type: 'Advanced', fields: ['ConstraintType', 'ConstraintDate', 'isManual', 'Work'] },
    ];
    this.splitterSettings = {
      position: '50%'
    };
    this.timelineSettings = {
      showTooltip: true,
      topTier: {
        unit: 'Week',
        format: 'dd/MM/yyyy'
      },
      bottomTier: {
        unit: 'Day',
        count: 1
      }
    };
    this.eventMarkers = [
      {
        day: '07/11/2025',
        cssClass: 'e-custom-event-marker',
        label: 'Project approval and kick-off'
      }
    ];
    this.labelSettings = {
      rightLabel: 'TaskName'
    };
  }

  public actionComplete(args: any): void {
    const comboValue: string = '';
    if (args.requestType === 'openAddDialog' || args.requestType === 'openEditDialog') {
      const tabObj = (document.getElementById('Dialog_Tab') as any).ej2_instances[0];
      tabObj.selected = (selectArgs: any) => {
        if (selectArgs.selectedIndex === 1) {
          const gridObj = (document.getElementById('DialogDependencyTabContainer') as any).ej2_instances[0];
          gridObj.queryCellInfo = (queryArgs: any) => {
            if (queryArgs.column.field === 'name') {
              queryArgs.cell.innerText = queryArgs.data.name.substring(queryArgs.data.id.length + 1);
            }
          };
          const cols = gridObj.columns;
          cols[1].edit.write = (editArgs: any) => {
            if (editArgs.requestType === 'add') {
              editArgs.rowData.uniqueId = getUniqueID('gantt');
            }
            const field = 'name';
            const gantt = this.ganttObj;
            const dependencygridData = gantt?.editModule.dialogModule['idCollection'];
            for (let i = 0; i < dependencygridData.length; i++) {
              dependencygridData[i].text = dependencygridData[i].text.substring(dependencygridData[i].id.length + 1);
            }
            let comboValue = '';
            if (editArgs.rowData[field]) {
              comboValue = editArgs.rowData[field].substring(0, editArgs.rowData.id.length);
            }
            const autoObj = new ComboBox({
              dataSource: new DataManager(dependencygridData),
              popupHeight: '180px',
              allowCustom: false,
              enableRtl: this.ganttObj?.enableRtl,
              fields: { value: 'value', text: 'text' },
              value: comboValue,
              change: (arg: any) => {
                const tr = arg.element.closest('tr');
                const idInput = tr.querySelector(`#${this.ganttObj?.element.id}DependencyTabContainerid`);
                if (idInput) {
                  if (arg.itemData && arg.item) {
                    idInput.value = arg.itemData.value;
                  } else {
                    idInput.value = '';
                  }
                }
              },
              autofill: true,
            });
            autoObj.appendTo(editArgs.element);
          }
            cols[1].edit.read = (readArgs: any) => {
              const ej2Instance = readArgs.ej2_instances[0];
              return ej2Instance.value + '-' + ej2Instance.text;
            };
            gridObj.refresh();
        };
      }
    }
  }
}