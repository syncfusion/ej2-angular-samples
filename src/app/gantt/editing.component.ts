import { Component, OnInit} from '@angular/core';
import { editingData, editingResources } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttediting',
    templateUrl: 'editing.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttEditingComponent implements OnInit {
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
    public splitterSettings: object;
    public startDate :any;
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
        this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
        this.columns =  [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip', validationRules: { required: true, minLength: [5, 'Task name should have a minimum length of 5 characters'], } },
            { field: 'StartDate' },
            { field: 'EndDate', validationRules: { required: [this.customFn.bind(this), 'Please enter a value greater than the start date.'] } },
            { field: 'Duration', validationRules: { required: true} },
            { field: 'Progress', validationRules: { required: true, min: 0, max: 100 } },
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
    actionBegin(args): void {
        if (args.columnName === "EndDate" || args.requestType === "beforeOpenAddDialog" || args.requestType === "beforeOpenEditDialog") {
            this.startDate = args.rowData.ganttProperties.startDate;
        }
        if (args.requestType === "taskbarediting" && args.taskBarEditAction === "ChildDrag") {
            this.startDate = args.data.ganttProperties.startDate;
        }   
    }
    public customFn(args) {
      var endDate;
      var gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
      if (args.element && args.value) {
        var dateOptions = { format: gantt.dateFormat, type: 'dateTime', skeleton: 'yMd' };
        endDate =  gantt.globalize.parseDate(args.value, dateOptions);
        if(!this.startDate && gantt.editModule.dialogModule['beforeOpenArgs']) {
          this.startDate = gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].startDate;
          endDate = (gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].endDate);
        }
        this.startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
      }
      return this.startDate <= endDate;
    }
}
