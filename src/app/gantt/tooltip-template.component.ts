import { Component, OnInit} from '@angular/core';
import { tooltipData, editingResources } from './data';
import { Internationalization } from '@syncfusion/ej2-base';
let instance: Internationalization = new Internationalization();
@Component({
    selector: 'ej2-gantttooltiptemplate',
    templateUrl: 'tooltip-template.html'
})
export class GanttTooltipTemplateComponent implements OnInit {
    public data: object[];
    public resources: object[];
    public resourceFields: object ;
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public columns: object[];
    public splitterSettings: object;
    public tooltipSettings: object;
    public ngOnInit(): void {
        this.data = tooltipData;
        this.resources = editingResources;
        this.taskSettings = {
            id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                endDate: 'EndDate',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                resourceInfo: 'resources',
                baselineStartDate: 'BaselineStartDate',
                baselineEndDate: 'BaselineEndDate',
                child: 'subtasks'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        this.columns = [
            { field: 'TaskID', width: 80 },
                { field: 'TaskName', width: 250 },
                { field: 'StartDate' },
                { field: 'EndDate' },
                { field: 'Duration' },
                { field: 'Predecessor' },
                { field: 'Progress' },
                { field: 'BaselineStartDate' },
                { field: 'BaselineEndDate' },
                { field: 'resources' },
        ];
        this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.tooltipSettings =  {
            showTooltip: true
        },
        this.projectStartDate = new Date('03/24/2019');
        this.projectEndDate = new Date('05/04/2019');
    }
    public format(value: Date): string {
        return instance.formatDate(value, { format: 'MM/dd/yyyy' });
    }
}
export interface DateFormat extends Window {
    format?: Function;
}
