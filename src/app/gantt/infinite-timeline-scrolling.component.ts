import { Component, OnInit, ViewChild} from '@angular/core';
import { infiniteTimelineScrollData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { EditService, GanttComponent, GanttModule, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttinfinitetimelinescrolling',
    templateUrl: 'infinite-timeline-scrolling.html',
    standalone: true,
    providers: [EditService, SelectionService],
    imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
})
export class GanttInfiniteTimelineScrollingComponent implements OnInit {
  @ViewChild('gantt')
  public ganttObj: GanttComponent;
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public timelineSettings: object;
    public gridLines: string;
    public labelSettings: object;
    public editSettings: object;
    public splitterSettings: object;

    public ngOnInit(): void {
        this.data = infiniteTimelineScrollData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
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
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
                count: 1
            },
            viewStartDate: new Date('12/29/2025'),
            viewEndDate: new Date('04/05/2026')
        };
        this.gridLines = 'Both';
        this.labelSettings = {
            leftLabel: 'TaskID',
            rightLabel: 'TaskName',
            taskLabel: '${Progress}%'
        };
        this.splitterSettings = {
           columnIndex: 3
        }; 
    }
}
