import { Component, OnInit } from '@angular/core';
import { filteredData } from './data';
@Component({
    templateUrl: 'filtering.html'
})
export class GanttFilteringComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public timelineSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public toolbar: string[];
    public splitterSettings: object;
    public dayWorkingTime: object[];
    public ngOnInit(): void {
        this.data = filteredData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        this.columns = [
            { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate', headerText: 'Start Date' },
            { field: 'Duration', headerText: 'Duration' },
            { field: 'EndDate', headerText: 'End Date' },
            { field: 'Predecessor', headerText: 'Predecessor' }
        ];
        this.timelineSettings = {
            timelineUnitSize: 60,
            topTier: {
                format: 'MMM dd, yyyy',
                unit: 'Day',
            },
            bottomTier: {
                unit: 'Hour',
                format: 'h.mm a'
            }
        };
        this.splitterSettings = {
            columnIndex: 3
        };
        this.toolbar = ['Search'];
        this.labelSettings = {
            rightLabel: 'TaskName',
        };
        this.dayWorkingTime = [{ from: 0, to: 24 }];
        this.projectStartDate = new Date('07/16/1969 01:00:00 AM');
        this.projectEndDate = new Date('07/25/1969');
    }
    public onActionComplete(args: any): void {
        if (args.requestType == "filterafteropen" && (args.columnName === "StartDate" || args.columnName === "EndDate")) {
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(1969, 5, 1);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(1969, 8, 30);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].showTodayButton = false;
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
        }
    }
}
