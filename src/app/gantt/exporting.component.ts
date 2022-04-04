import { Component, OnInit, ViewChild } from '@angular/core';
import { editingData, editingResources } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { GanttComponent } from '@syncfusion/ej2-angular-gantt';

@Component({
    selector: 'ej2-ganttexporting',
    templateUrl: 'exporting.html'
})
export class GanttExportingComponent implements OnInit {
    @ViewChild('ganttExcel')
    public ganttObj: GanttComponent;
    public data: object[];
    public resources: object[];
    public resourceFields: object ;
    public taskSettings: object;
    public timelineSettings: object;
    public gridLines: string;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public toolbar: string[];
    public splitterSettings: object;
    public columns: object[];
    public ngOnInit(): void {
        this.data = editingData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            resourceInfo: 'resources'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        this.toolbar = ['ExcelExport', 'CsvExport', 'PdfExport'];
        this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
                count: 1
            },
        };
        this.gridLines = 'Both';
        this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        this.projectStartDate = new Date('03/25/2019');
        this.projectEndDate = new Date('07/28/2019');
        this.resources = editingResources;
        this.splitterSettings = {
            columnIndex: 2
        };
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'resources' },
            { field: 'Progress' }
        ];
    }
    toolbarClick(args?: ClickEventArgs): void {
        debugger;
        if (args.item.id === 'GanttExport_excelexport') {
            this.ganttObj.excelExport();
        }
        else if (args.item.id === "GanttExport_csvexport") {
            this.ganttObj.csvExport();
        }
        else if (args.item.id === "GanttExport_pdfexport") {
            this.ganttObj.pdfExport();
        }
    }
}
