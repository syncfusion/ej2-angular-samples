import { Component, OnInit } from '@angular/core';
import { GanttComponent, VirtualScroll, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { virtualData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttvirtualscroll',
    templateUrl: 'virtual-scroll.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})

export class GanttVirtualScrollComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public splitterSettings: object;
    public columns: object[];
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
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
        this.projectStartDate = new Date('04/01/2024');
        this.projectEndDate = new Date('12/31/2030');
    }
}
