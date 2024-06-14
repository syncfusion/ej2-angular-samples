import { Component, OnInit} from '@angular/core';
import { templateData, editingResources } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttheadertemplate',
    templateUrl: 'header-template.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})

export class HeaderTemplateComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public resources: object[];
    public resourceFields: object ;
    public projectStartDate: Date;
    public splitterSettings: object;
    public projectEndDate: Date;
    public ngOnInit(): void {
        this.data = templateData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate:'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            resourceInfo: 'resources'
        };
        this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        this.splitterSettings = {
            columnIndex: 4
        },
        this.labelSettings = {
            rightLabel: 'TaskName'
        };
        this.resources = editingResources;
        this.projectStartDate= new Date('03/25/2024');
        this.projectEndDate= new Date('07/28/2024');
    }
}
