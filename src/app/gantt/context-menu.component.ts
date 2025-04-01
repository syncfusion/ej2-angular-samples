import { Component, OnInit, ViewChild} from '@angular/core';
import { editingData, editingResources } from './data';
import { GanttComponent, ContextMenuOpenEventArgs, ContextMenuClickEventArgs, IGanttData, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttcontextmenu',
    templateUrl: 'context-menu.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttContextMenuComponent implements OnInit {
    @ViewChild('gantt')
    public ganttObj: GanttComponent;
    public data: object[];
    public resources: object[];
    public resourceFields: object ;
    public taskSettings: object;
    public columns: object[];
    public timelineSettings: object;
    public gridLines: string;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public editSettings: object;
    public eventMarkers: object[];
    public toolbar: string[];
    public contextMenuItems: string[] | Object[];
    public splitterSettings: object;
    public ngOnInit(): void {
        this.data = editingData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            notes: 'info',
            resourceInfo: 'resources'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.contextMenuItems = ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
        'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert', 'Indent', 'Outdent',
        { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
        { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
        ],
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        this.columns =  [
            { field: 'TaskID', width:80 },
            { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' },
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
        };
        this.gridLines = 'Both';
        this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        this.projectStartDate= new Date('03/25/2024');
        this.projectEndDate= new Date('07/28/2024');
        this.eventMarkers = [
            { day: '4/17/2024', label: 'Project approval and kick-off' },
            { day: '5/3/2024', label: 'Foundation inspection' },
            { day: '6/7/2024', label: 'Site manager inspection' },
            { day: '7/16/2024', label: 'Property handover and sign-off' },
        ];
        this.resources = editingResources;
        this.splitterSettings = {
            position: "35%"
        };
    }
    contextMenuClick (args?: ContextMenuClickEventArgs): void {
        let record: IGanttData = args.rowData;
                if ((args as any).item.id === 'collapserow') {
                    this.ganttObj.collapseByID(Number(record.ganttProperties.taskId));
                }
                if ((args as any).item.id === 'expandrow') {
                    this.ganttObj.expandByID(Number(record.ganttProperties.taskId));
                }
    }
    contextMenuOpen (args?: ContextMenuOpenEventArgs): void {
        let record: IGanttData = args.rowData;
        if (args.type !== 'Header' && record) {
            if (!record.hasChildRecords) {
                args.hideItems.push('Collapse the Row');
                args.hideItems.push('Expand the Row');
            } else {
                if(record.expanded) {
                    args.hideItems.push('Expand the Row');
                  } else {
                      args.hideItems.push('Collapse the Row');
                  }
            }
        }
    }
}
