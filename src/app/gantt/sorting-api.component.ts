import { Component, OnInit, ViewChild } from '@angular/core';
import { editingData } from './data';
import { DropDownListComponent, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GanttComponent, SortDirection, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttdynamicsort',
    templateUrl: 'sorting-api.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, DropDownListAllModule, ButtonAllModule, SBDescriptionComponent]
})
export class GanttSortingAPIComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public columns: object[];
    public splitterSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    @ViewChild('sortingApi')
    public ganttObj: GanttComponent;
    @ViewChild('dropDownColumnList')
    public dropDownColumnList: DropDownListComponent;
    @ViewChild('dropDownDirectionList')
    public dropDownDirectionList: DropDownListComponent;
    public dropDownColumnListData: object[];
    public dropDownColumnListFields: object;
    public dropDownDirectionListData: object[];
    public dropDownDirectionListFields: object;
    public columnValue: string = 'TaskID';
    public directionValue: string = 'Ascending';
    public ngOnInit(): void {
        this.data = editingData;
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
        this.columns = [
            { field: 'TaskID', headerText: 'ID', width: 80 },
            { field: 'TaskName', headerText: 'TaskName', width: 250 },
            { field: 'StartDate', headerText: 'StartDate' },
            { field: 'EndDate', headerText: 'EndDate' },
            { field: 'Duration', headerText: 'Duration' },
            { field: 'Progress', headerText: 'Progress' },
        ];
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.projectStartDate = new Date('03/25/2024');
        this.projectEndDate = new Date('07/28/2024');
        this.dropDownColumnListData = [
            { id: 'TaskID', type: 'TaskID' },
            { id: 'TaskName', type: 'TaskName' },
            { id: 'StartDate', type: 'StartDate' },
            { id: 'EndDate', type: 'EndDate' },
            { id: 'Duration', type: 'Duration' },
            { id: 'Progress', type: 'Progress' }
        ];
        this.dropDownColumnListFields = { text: 'type', value: 'id' };
        this.dropDownDirectionListData = [
            { id: 'Ascending', type: 'Ascending' },
            { id: 'Descending', type: 'Descending' },
        ];
        this.dropDownDirectionListFields = { text: 'type', value: 'id' };
    }
    public sortColumn(): void {
        let columnName: string = <string>this.dropDownColumnList.value;
        let sortType: SortDirection = <SortDirection>this.dropDownDirectionList.value;
        this.ganttObj.sortModule.sortColumn(columnName, sortType, false);
    };
    public clearSort(): void {
        this.ganttObj.clearSorting();
    };
}
