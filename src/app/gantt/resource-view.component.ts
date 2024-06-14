import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { resourcesData, resourceCollection } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttresourceview',
    templateUrl: 'resource-view.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})

export class GanttResourceViewComponent implements OnInit {
    public data: object[];
    public resources: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public splitterSettings: object;
    public editSettings: object;
    public toolbar: any;
    public resourceFields: object ;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public taskType: string;
    @ViewChild('resourceview')
    public ganttObj: GanttComponent;
    public ngOnInit(): void {
        this.data = resourcesData;
        this.resources = resourceCollection;
        this.taskType = "FixedWork"
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
			dependency: 'Predecessor',
            resourceInfo: 'resources',
            work: 'work',
            child: 'subtasks'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName',
            unit: 'resourceUnit',
            group: 'resourceGroup'
        };
        this.columns =  [
			{ field: 'TaskID', visible: false },
            { field: 'TaskName', headerText: 'Name', width: 250 },
            { field: 'work', headerText: 'Work' },
            { field: 'Progress' },
            { field: 'resourceGroup', headerText: 'Group' },
            { field: 'StartDate' },
            { field: 'Duration' },
        ];
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
        {text: 'Show/Hide Overallocation', tooltipText: 'Show/Hide Overallocation', id: 'showhidebar'}];
        this.splitterSettings = {
            columnIndex: 3
        }
        this.labelSettings = {
            rightLabel: 'resources',
            taskLabel: 'Progress'
        };
        this.projectStartDate= new Date('03/28/2024');
        this.projectEndDate= new Date('05/18/2024');
    }
    public toolbarClick(args: ClickEventArgs): void {
        if (args.item.id === 'showhidebar') {
            this.ganttObj.showOverAllocation = this.ganttObj.showOverAllocation ? false : true;
        }
};
}
