import { Component, OnInit} from '@angular/core';
import { templateData, editingResources } from './data';

@Component({
    selector: 'ej2-ganttheadertemplate',
    templateUrl: 'header-template.html'
})

export class HeaderTemplateComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public resources: object[];
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
        this.splitterSettings = {
            columnIndex: 4
        },
        this.labelSettings = {
            rightLabel: 'TaskName'
        };
        this.resources = editingResources;
        this.projectStartDate= new Date('03/25/2019');
        this.projectEndDate= new Date('07/28/2019');
    }
}
