import { Component, OnInit, ViewChild } from '@angular/core';
import { projectNewData } from './data';
import { DropDownListComponent, ChangeEventArgs, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GanttComponent, GridLine, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttgridlines',
    templateUrl: 'grid-lines.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, DropDownListAllModule, SBDescriptionComponent]
})
export class GanttGridLinesComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public columns: object[];
    public splitterSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public gridLines: string;
    @ViewChild('ganttGrid')
    public ganttObj: GanttComponent;
    @ViewChild('dropDownGridLines')
    public dropDownGridLines: DropDownListComponent;
    public dropDownGridLinesData: object[];
    public dropDownGridLinesFields: object;
    public defaultLines: string = 'Both';
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
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
        ];
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.gridLines = 'Both';
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
        this.dropDownGridLinesData = [
            { id: 'Both', type: 'Both' },
            { id: 'Vertical', type: 'Vertical' },
            { id: 'Horizontal', type: 'Horizontal' },
            { id: 'None', type: 'None' }
        ];
        this.dropDownGridLinesFields = { text: 'type', value: 'id' };
    }
    public changeLines(e: ChangeEventArgs): void {
        let lines: GridLine = <GridLine>e.value;
        this.ganttObj.gridLines = lines;
        this.ganttObj.refresh();
    }
}
