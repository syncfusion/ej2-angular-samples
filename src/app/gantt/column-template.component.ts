import { Component, OnInit} from '@angular/core';
import { templateData, editingResources } from './data';
import{isNullOrUndefined} from '@syncfusion/ej2-base';

@Component({
    selector: 'ej2-ganttcolumntemplate',
    templateUrl: 'column-template.html'
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
        this.projectStartDate= new Date('03/25/2019');
        this.projectEndDate= new Date('07/28/2019');
    }
    public queryCellInfo(args: any): void {
        let gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
        if (args.column.field === 'resources' && args.data.ganttProperties.resourceNames && !isNullOrUndefined(args.cell.getElementsByClassName('image')[0]) ) {
           if (gantt.enableRtl) {
              args.cell.getElementsByClassName('image')[0].children[1].style.right = '30px';
           }
           else {
               args.cell.getElementsByClassName('image')[0].children[1].style.left = '30px';
           }
        }
    }
}
