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
            child: 'subtasks',
            resourceInfo: 'resources'
        };
        this.holidays = [
            {
                from: new Date('04/04/2024'),
                to: new Date('04/04/2024'),
                label: 'Local Holiday'
            }, {
                from: new Date('04/19/2024'),
                to: new Date('04/19/2024'),
                label: 'Good Friday'
            }, {
                from: new Date('04/30/2024'),
                to: new Date('04/30/2024'),
                label: 'Release Holiday'
            },
        ];
        this.eventMarkers = [
            {
                day: new Date('04/02/2024'),
            }, {
                day: new Date("04/09/2024"),
                label: 'Research phase'
            }, {
                day: new Date("04/30/2024"),
                label: 'Design phase'
            }, {
                day: new Date("05/23/2024"),
                label: 'Production phase'
            }, {
                day: new Date("06/20/2024"),
                label: 'Sales and marketing phase'
            }
        ];
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
        this.projectStartDate = new Date('03/25/2024');
        this.projectEndDate = new Date('07/28/2024');
        this.resources = editingResources;
        this.splitterSettings = {
            position: "35%"
        };
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 230 }
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
