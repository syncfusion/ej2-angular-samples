import { Component, OnInit} from '@angular/core';
import { zoomingData } from './data';
@Component({
    templateUrl: 'zooming.html'
})
export class GanttZoomingComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public toolbar: string[];
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
        this.toolbar = ['ZoomIn','ZoomOut','ZoomToFit'];
        this.projectStartDate = new Date('03/24/2019');
        this.projectEndDate = new Date('07/06/2019');
        this.labelSettings = {
            leftLabel: 'TaskName'
        };
    }
}
