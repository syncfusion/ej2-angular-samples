import { Component, OnInit} from '@angular/core';
import { templateData, editingResources } from './data';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttcolumntemplate',
    templateUrl: 'column-template.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, NgIf, SBDescriptionComponent]
})

export class ColumnTemplateComponent implements OnInit {
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
            columnIndex: 3
        },
        this.labelSettings = {
            rightLabel: 'TaskName'
        };
        this.resources = editingResources;
        this.projectStartDate= new Date('03/25/2024');
        this.projectEndDate= new Date('07/28/2024');
    }
    public queryCellInfo(args: any): void {
        let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.column.field === 'resources' && args.data.ganttProperties.resourceNames && !isNullOrUndefined(args.cell.getElementsByClassName('image')[0])) {
           if (gantt.enableRtl) {
              args.cell.getElementsByClassName('image')[0].children[1].style.right = '30px';
           }
           else {
               args.cell.getElementsByClassName('image')[0].children[1].style.left = '30px';
           }
        }
    }
}
