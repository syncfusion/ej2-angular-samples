import { Component, OnInit, ViewChild } from '@angular/core';
import { projectNewData } from './data';
import { DropDownListAllModule, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { ActionEventArgs, Column } from '@syncfusion/ej2-grids';
import { DayMarkersService, GanttComponent, GanttModule, ReorderService, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttreorder',
    templateUrl: 'reorder.html',
    standalone: true,
    providers: [ReorderService, SelectionService, DayMarkersService],
    imports: [SBActionDescriptionComponent, GanttModule, DropDownListAllModule, SBDescriptionComponent]
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
            id: "TaskID",
            name: "TaskName",
            startDate: "StartDate",
            endDate: "EndDate",
            duration: "Duration",
            progress: "Progress",
            dependency: "Predecessor",
            parentID: "ParentID"
        };
        this.dropDownFields = { text: "name", value: "id" };
        this.columnNames = [
            { id: "TaskID", name: "ID" },
            { id: "TaskName", name: "Name" },
            { id: "StartDate", name: "Start Date" },
            { id: "EndDate", name: "End Date" },
            { id: "Duration", name: "Duration" },
            { id: "Progress", name: "Progress" },
            { id: "Predecessor", name: "Dependency" }
        ];
        this.columnsIndex = [
            { id: "0", name: "1" },
            { id: "1", name: "2" },
            { id: "2", name: "3" },
            { id: "3", name: "4" },
            { id: "4", name: "5" },
            { id: "5", name: "6" },
            { id: "6", name: "7" }
        ];
        this.splitterSettings = {
            columnIndex: 2
        };
        this.columns = [
            { field: "TaskID", headerText: "ID", width: 100 },
            { field: "TaskName", headerText: "Name", width: 290 },
            { field: "StartDate" },
            { field: "EndDate" },
            { field: "Duration" },
            { field: "Progress" },
            { field: "Predecessor", headerText: "Dependency" }
        ];
        this.projectStartDate = new Date("03/31/2025");
        this.projectEndDate = new Date("07/20/2025");
        this.labelSettings = {
            rightLabel: "TaskName"
        };
    }
    public columnNameChange(e: ChangeEventArgs): void {
        const columnName: string = e.value as string;
        const index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
        this.columnIndexDropdownObj.value = index.toString();
    }
    public columnIndexChange(e: ChangeEventArgs): void {
        const columnName: string = this.columnsDropdownObj.value as string;
        const toColumnIndex: number = e.value as number;
        this.ganttObj.reorderColumns(columnName, (this.ganttObj.treeGrid.columns[toColumnIndex] as Column).field);
    }
    public actionComplete(args: ActionEventArgs): void {
        if (args.requestType === "reorder") {
            const columnName: string = this.columnsDropdownObj.value as string;
            const index: number = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
            this.columnIndexDropdownObj.value = index.toString();
        }
    }
}
