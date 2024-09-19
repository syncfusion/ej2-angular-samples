import { Component, OnInit } from '@angular/core';
import { zoomingData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttzooming',
    templateUrl: 'zooming.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttZoomingComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public toolbar: string[];
    public columns: object[];
    public splitterSettings: object;
    public ngOnInit(): void {
        this.data = zoomingData;
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
        this.toolbar = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];
        this.labelSettings = {
            leftLabel: 'TaskName'
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
        this.splitterSettings = {
            position: "35%"
        };
    }
}
