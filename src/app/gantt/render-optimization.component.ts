import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttComponent, GanttModule, SelectionService, VirtualScrollService } from '@syncfusion/ej2-angular-gantt';
import { DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { generateVirtualData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-render-optimization',
    templateUrl: 'render-optimization.html',
    standalone: true,
    imports: [ GanttModule, DropDownListModule, SBDescriptionComponent, SBActionDescriptionComponent ],
    providers: [ SelectionService, VirtualScrollService ]
})
export class GanttRenderOptimizationComponent implements OnInit {
    @ViewChild('ganttObj')
    public ganttObj: GanttComponent;
    public data: Object[];
    public count: number = 5000;
    public loadTime: string = '';
    private startLoadTime: Date;
    private shouldCalculateLoadTime: boolean = true;
    public dropdownData: Object[] = [
        { Text: '5,000 Rows', Value: 5000 },
        { Text: '10,000 Rows', Value: 10000 }
    ];
    public dropdownFields: Object = {
        text: 'Text',
        value: 'Value'
    };
    public taskSettings: Object;
    public splitterSettings: Object;
    public labelSettings: Object;
    public columns: Object[];
    public projectStartDate: Date;
    public projectEndDate: Date;

    public ngOnInit(): void {
        this.loadData();
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            parentID: 'parentID',
            dependency: 'Predecessor'
        };
        this.splitterSettings = {
            columnIndex: 2
        };
        this.labelSettings = {
            taskLabel: 'Progress'
        };
        this.columns = [
            { field: 'TaskID' },
            { field: 'TaskName', headerText: 'Task Name', width: 300 },
            { field: 'StartDate' },
            { field: 'Duration' },
            { field: 'Progress' }
        ];
        this.projectStartDate = new Date('03/29/2026');
        this.projectEndDate = new Date('09/20/2026');
    }

    private loadData(): void {
        this.startLoadTime = new Date();
        this.shouldCalculateLoadTime = true;
        this.data = generateVirtualData(this.count);
    }

    public onDropdownChange(args: ChangeEventArgs): void {
        this.count = Number(args.value);
        this.loadData();
    }

    public onDataBound(): void {
        if (this.shouldCalculateLoadTime) {
            this.shouldCalculateLoadTime = false;
            const endTime: Date = new Date();
            const diff = endTime.getTime() - this.startLoadTime.getTime();
            this.loadTime = (diff / 1000).toFixed(2);
        }
    }

    public created(): void {
        if (document.querySelector('.e-bigger')) {
            this.ganttObj.rowHeight = 48;
            this.ganttObj.taskbarHeight = 28;
        }
    }
}