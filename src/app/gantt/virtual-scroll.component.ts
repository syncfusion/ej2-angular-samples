import { Component, OnInit } from '@angular/core';
import { GanttComponent, VirtualScroll } from '@syncfusion/ej2-angular-gantt';
import { virtualData } from './data';
@Component({
    selector: 'ej2-ganttvirtualscroll',
    templateUrl: 'virtual-scroll.html'
})

export class GanttVirtualScrollComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public columns: object[];
    public labelSettings: object;
    public ngOnInit(): void {
        this.data = virtualData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            parentID: 'parentID'
        };
		this.columns = [
                { field: 'TaskID' },
                { field: 'TaskName' },
                { field: 'StartDate' },
                { field: 'Duration' },
                { field: 'Progress' }
            ];
        this.splitterSettings = {
            columnIndex: 2
        };
        this.labelSettings = {
            leftLabel: 'TaskName',
            taskLabel: 'Progress'
        };
    }
}