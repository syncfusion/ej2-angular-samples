import { Component, OnInit, ViewChild } from '@angular/core';
import { filteredData } from './data';
import { GanttComponent, FilterService, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttfiltering',
    templateUrl: 'filtering.html',
    providers: [FilterService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, DropDownListAllModule, SBDescriptionComponent]
})
export class GanttFilteringComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public timelineSettings: object;
    public filterSettings: Object;
    public labelSettings: object;
    public projectStartDate: Date;
    @ViewChild('gantt')
    public gantt: GanttComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    public d1data: Object;
    public d1data2: Object;
    public typefields: Object;
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
        this.filterSettings = { type: 'Menu',hierarchyMode:'Parent' };
        this.typefields = { text: 'mode' , value: 'id'};
        this.d1data= [ { id: 'Menu', mode: 'Menu' },
                       { id: 'Excel', mode: 'Excel' }
        ];
        this.d1data2= [ { id: 'Parent', mode: 'Parent' },
                       { id: 'Child', mode: 'Child' },
                       { id: 'Both', mode: 'Both' },
                       { id: 'None', mode: 'None' },
        ];
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
        this.labelSettings = {
            rightLabel: 'TaskName',
        };
        this.dayWorkingTime = [{ from: 0, to: 24 }];
        this.projectStartDate = new Date('07/16/2024 01:00:00 AM');
        this.projectEndDate = new Date('07/25/2024');
    }

    change (e: ChangeEventArgs) : void {
        let type: any = <string>e.value;
        this.gantt.filterSettings.type = type;
        this.gantt.clearFiltering();
    }
    change1 (e: ChangeEventArgs) : void {
        let mode: any = <string>e.value;
        this.gantt.filterSettings.hierarchyMode = mode;
        this.gantt.clearFiltering();
    }
    public onActionComplete(args: any): void {
        if (args.requestType == "filterafteropen" && (args.columnName === "StartDate" || args.columnName === "EndDate")
            && this.gantt.filterSettings.type === "Menu") {
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(2024, 5, 1);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(2024, 8, 30);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].showTodayButton = false;
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
        }
    }
}
