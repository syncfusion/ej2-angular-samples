import { Component, OnInit, ViewChild } from '@angular/core';
import { projectNewData } from './data';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';
@Component({
    selector: 'ej2-ganttselection',
    templateUrl: 'selection.html'
})
export class GanttSelectionComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public splitterSettings: object;
    public selectionSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    @ViewChild('selection')
    public ganttObj: GanttComponent;
    @ViewChild('SelectionModeList')
    public SelectionModeList: DropDownListComponent;
    @ViewChild('SelectionTypeList')
    public SelectionTypeList: DropDownListComponent;
    @ViewChild('SelectionToggleList')
    public SelectionToggleList: DropDownListComponent;
    public dropDownModeListData: object[];
    public dropDownModeListFields: object;
    public dropDownTypeListData: object[];
    public dropDownTypeListFields: object;
    public dropDownToggleListData: object[];
    public dropDownToggleListFields: object;
    public toggleValue: boolean;
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
        this.projectStartDate = new Date('03/27/2019');
        this.projectEndDate = new Date('07/06/2019');
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
        this.toggleValue = false;
    }
    public perform(): void {
        let mode: any = this.SelectionModeList.value;
        let type: any = this.SelectionTypeList.value;
        let toggle: boolean = this.SelectionToggleList.value as boolean;
        this.ganttObj.selectionSettings.mode = mode;
        this.ganttObj.selectionSettings.type = type;
        this.ganttObj.selectionSettings.enableToggle = toggle;
    };
}