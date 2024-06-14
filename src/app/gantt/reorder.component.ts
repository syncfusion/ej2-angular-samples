import { Component, OnInit, ViewChild} from '@angular/core';
import { projectNewData } from './data';
import { DropDownListAllModule, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ActionEventArgs, Column } from '@syncfusion/ej2-grids';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttreorder',
    templateUrl: 'reorder.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, DropDownListAllModule, SBDescriptionComponent]
})
export class ColumnReorderComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public columns: object[];
    public dropDownFields: Object;
    public columnsIndex: Object;
    public columnNames: Object;

    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    @ViewChild('columnsDropdownObj')
    public columnsDropdownObj: DropDownListComponent;
    @ViewChild('columnIndexDropdownObj')
    public columnIndexDropdownObj: DropDownListComponent;

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
            child: 'subtasks'
        };
        this.dropDownFields = { text: 'name' , value: 'id'};
        this.columnNames = [{ id: 'TaskID', name: 'ID' },
        { id: 'TaskName', name: 'Name' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Progress', name: 'Progress' },
        { id: 'Predecessor', name: 'Dependency'
        }];
        this.columnsIndex = [{ id: '0', name: '1' },
            { id: '1', name: '2' },
            { id: '2', name: '3' },
            { id: '3', name: '4' },
            { id: '4', name: '5' },
            { id: '5', name: '6' },
            { id: '6', name: '7' }];
        this.splitterSettings = {
            columnIndex: 2
        },
        this.columns =  [
            { field: 'TaskID', headerText: 'ID', width: 100 },
            { field: 'TaskName', headerText: 'Name', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor', headerText: 'Dependency' }
        ];
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
    }
    public columnNameChange(e: ChangeEventArgs): void {
        debugger;
        let columnName: string = <string>e.value;
        let index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
        this.columnIndexDropdownObj.value = index.toString();
     }
     public columnIndexChange(e: ChangeEventArgs): void {
         debugger;
        let columnName: string = <string>this.columnsDropdownObj.value;
        let toColumnIndex: number = <number>e.value;
        this.ganttObj.reorderColumns(columnName, (<Column>this.ganttObj.treeGrid.columns[toColumnIndex]).field);
      }
     public actionComplete (args: ActionEventArgs): void {
        if (args.requestType === 'reorder') {
            let columnName: string = <string>this.columnsDropdownObj.value;
            let index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
            this.columnIndexDropdownObj.value = index.toString();
        }

    }

}
