import { Component, OnInit} from '@angular/core';
import { criticalPathData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttModule, CriticalPathService, EditService, DayMarkersService, SelectionService, ToolbarService } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttcritical',
    templateUrl: 'critical-path.html',
    standalone: true,
    providers: [CriticalPathService, EditService, DayMarkersService, SelectionService, ToolbarService],
    imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
})
export class GanttCriticalPathComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public toolbar: string[];
    public editSettings: object;
    public projectStartDate: Date;
    public timelineSettings: object;
    public splitterSettings: object;
    public eventMarkers: object[];
    public ngOnInit(): void {
        this.data = criticalPathData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            parentID: 'ParentID',
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.toolbar = ['Add','Edit','Delete','CriticalPath'];
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', headerText: 'Job Name', width: 250, clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' },
            { field: 'Predecessor' }
        ];
        this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, yyyy',
            },
            bottomTier: {
                unit: 'Day',
                count: 1
            },
            viewEndDate: new Date('06/07/2025')
        };
        this.labelSettings = {
            rightLabel: 'TaskName'
        };
        this.eventMarkers = [
            {
                day: new Date('2025-04-02'),
                cssClass: 'e-custom-event-marker',
                label: 'Project planning and kickoff',
                top: '138px',
            }
        ];
        this.splitterSettings = {
            columnIndex: 2
        },
        this.projectStartDate = new Date('03/30/2025')
    }
}
