import { Component, OnInit, ViewChild} from '@angular/core';
import { editingData, editingResources } from './data';
import { GanttComponent, ContextMenuOpenEventArgs, ContextMenuClickEventArgs, IGanttData } from '@syncfusion/ej2-angular-gantt';

@Component({
    templateUrl: 'context-menu.html'
})
export class GanttContextMenuComponent implements OnInit {
    @ViewChild('gantt')
    public ganttObj: GanttComponent;
    public data: object[];
    public resources: object[];
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
    public ngOnInit(): void {
        this.data = editingData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            notes: 'info',
            resourceInfo: 'resources'
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.contextMenuItems = ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
        'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert',
        { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
        { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
        ],
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        this.columns =  [
            { field: 'TaskID', width:50 },
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
        this.projectStartDate= new Date('03/25/2019');
        this.projectEndDate= new Date('07/28/2019');
        this.eventMarkers = [
            { day: '4/17/2019', label: 'Project approval and kick-off' },
            { day: '5/3/2019', label: 'Foundation inspection' },
            { day: '6/7/2019', label: 'Site manager inspection' },
            { day: '7/16/2019', label: 'Property handover and sign-off' },
        ];
        this.resources = editingResources;
    }
    contextMenuClick (args?: ContextMenuClickEventArgs): void {
        let record: IGanttData = args.rowData;
                if (args.item.id === 'collapserow') {
                    this.ganttObj.collapseByID(Number(record.ganttProperties.taskId));
                }
                if (args.item.id === 'expandrow') {
                    this.ganttObj.expandByID(Number(record.ganttProperties.taskId));
                }
    }
    contextMenuOpen (args?: ContextMenuOpenEventArgs): void {
        let record: IGanttData = args.rowData;
        if (args.type !== 'Header') {
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
