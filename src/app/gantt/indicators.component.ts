import { Component, ViewEncapsulation, OnInit} from '@angular/core';
import { projectNewData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { DayMarkersService, GanttModule, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttindicators',
    templateUrl: 'indicators.html',
    styleUrls: ['indicators.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [SelectionService, DayMarkersService],
    imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
})
export class GanttIndicatorsComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public splitterSettings: object;
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
            parentID: 'ParentID',
            indicators: 'Indicators'
        };
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 300 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' }
        ];
        this.splitterSettings = {
            columnIndex: 2
        },
        this.projectStartDate = new Date('03/26/2025');
        this.projectEndDate = new Date('07/20/2025');
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
    }
}
