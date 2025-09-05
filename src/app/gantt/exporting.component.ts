import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { editingData, editingResources } from './data';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { GanttComponent, PdfExportProperties, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SwitchAllModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttexporting',
    templateUrl: 'exporting.html',
    styleUrls: ['reasource-multi-taskbar.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SwitchAllModule, GanttAllModule, SBDescriptionComponent]
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
    public eventMarkers: object[];
    public holidays: object[];
    public ngOnInit(): void {
        this.data = editingData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentId',
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
            leftLabel: 'TaskName'
        };
        this.projectStartDate = new Date('03/26/2025');
        this.projectEndDate = new Date('09/01/2025');
        this.resources = editingResources;
        this.splitterSettings = {
            position: "35%"
        };
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 250 }
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
