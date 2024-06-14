import { Component, OnInit, ViewChild} from '@angular/core';
import { projectNewData } from './data';
import { DropDownListComponent, ChangeEventArgs, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonComponent, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttshowhide',
    templateUrl: 'show-hide-column.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, DropDownListAllModule, ButtonAllModule, SBDescriptionComponent]
})
export class ShowHideComponent implements OnInit {

    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public columns: object[];
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public dropDownData: Object;
    public dropDownFields: Object;

    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    @ViewChild('dropdownObj')
    public dropdownObj: DropDownListComponent;
    @ViewChild('hideButtonObj')
    public hideButtonObj: ButtonComponent;
    @ViewChild('showButtonObj')
    public showButtonObj: ButtonComponent;

    public ngOnInit(): void {
        this.data = projectNewData;
        this.dropDownFields = { text: 'name' , value: 'id'};
        this.dropDownData= [ { id: 'TaskID', name: 'ID' },
        { id: 'StartDate', name: 'Start Date' },
        { id: 'EndDate', name: 'End Date' },
        { id: 'Duration', name: 'Duration' },
        { id: 'Predecessor', name: 'Dependency' },
        { id: 'Progress', name: 'Progress' }]

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
        this.columns =  [
            { field: 'TaskID', headerText: 'ID', width: 100 },
            { field: 'TaskName', headerText: 'Name', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor', headerText: 'Dependency' }
        ];
        this.splitterSettings = {
            columnIndex: 3
        },
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
    change (e: ChangeEventArgs) : void {
        let columnName: string = <string>e.value;
        let column  = this.ganttObj.treeGrid.grid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            this.showButtonObj.disabled = true;
            this.hideButtonObj.disabled = false;
        } else {
            this.hideButtonObj.disabled = true;
            this.showButtonObj.disabled = false;
        }
    }

    public showButtonClick(e: MouseEvent): void {
        let dropValue: string = <string>this.dropdownObj.value;
        let columnName  = this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
        let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
        this.ganttObj.showColumn(columnName);
        this.showButtonObj.disabled = true;
        this.hideButtonObj.disabled = false;
        hiddenColumns.value = hiddenColumns.value.replace(columnName + '\n', '');
    }
    hideButtonClick(): void {
        let dropValue: string = <string>this.dropdownObj.value;
        let columnName = this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
        let hiddenColumns: HTMLTextAreaElement = document.getElementById('hiddencolumns') as HTMLTextAreaElement;
        this.ganttObj.hideColumn(columnName, 'headerText');
            this.hideButtonObj.disabled = true;
            this.showButtonObj.disabled = false;
            hiddenColumns.value = hiddenColumns.value + columnName + '\n';
        };

        public created(): void {
           this.showButtonObj.disabled = true;
        }
    }
