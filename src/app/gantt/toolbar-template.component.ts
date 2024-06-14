import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { projectNewData } from './data';
import { GanttComponent, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-gantttoolbartemplate',
    templateUrl: 'toolbar-template.html',
    styleUrls: ['toolbar-template.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttToolbarTemplateComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public columns: object[];
    public toolbar: any;
    public splitterSettings: object;
    @ViewChild('ganttToolbar')
    public ganttObj: GanttComponent;
    public ngOnInit(): void {
        this.data = projectNewData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        this.columns = [
            { field: 'TaskID', width: 80 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
        ];
        this.toolbar = ['ExpandAll', 'CollapseAll', { text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'Quick Filter', prefixIcon: 'e-quickfilter' },{ text: 'Clear Filter', tooltipText: 'Clear Filter', id: 'Clear Filter' }];
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.projectStartDate = new Date('03/24/2024');
        this.projectEndDate = new Date('07/06/2024');
    }
    public toolbarClick(args: ClickEventArgs): void {
        if (args.item.text === 'Quick Filter') {
            this.ganttObj.filterByColumn('TaskName', 'startswith', 'Identify');
        }
        if (args.item.text === 'Clear Filter') {
            this.ganttObj.clearFiltering();
        }
    }
}
