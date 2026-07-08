import { Component, OnInit, ViewChild } from '@angular/core';
import { virtualData } from './data';
import { DayMarkersService, FilterService, GanttComponent, GanttModule, SelectionService, SortService, VirtualScrollService } from '@syncfusion/ej2-angular-gantt';
import { DropDownListComponent, ChangeEventArgs, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-ganttloadinganimation',
    templateUrl: 'loading-animation.html',
    standalone: true,
    providers: [SelectionService, VirtualScrollService, DayMarkersService, FilterService, SortService],
    imports: [SBActionDescriptionComponent, GanttModule, DropDownListAllModule, SBDescriptionComponent]
})
export class GanttLoadingAnimationComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public loadingIndicator:object;
    public splitterSettings: object;
    public columns: object[];
    public labelSettings: object;
    public projectEndDate: Date;
    @ViewChild('gantt')
    public gantt: GanttComponent;
    @ViewChild('dropdown1')
    public dropdown1: DropDownListComponent;
    public d1data: Object;
    public typefields: Object;
    public ngOnInit(): void {
        this.data = virtualData;
        this.taskSettings = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            parentID: 'ParentID'
        };
        this.loadingIndicator = { indicatorType: 'Shimmer' };
        this.typefields = { text: 'mode', value: 'id' };
        this.d1data = [
            { id: 'Shimmer', mode: 'Shimmer' },
            { id: 'Spinner', mode: 'Spinner' }
        ];
        this.columns = [
            { field: 'TaskID' },
            { field: 'TaskName', width: 300 },
            { field: 'StartDate', width: 170 },
            { field: 'Duration' },
            { field: 'Progress' }
        ];
        this.splitterSettings = {
            columnIndex: 2
        };
        this.labelSettings = {
            rightLabel: 'TaskName',
        };
        this.projectEndDate = new Date('09/21/2025');
    }
    
    change(e: ChangeEventArgs): void {
        let type: any = e.value as string;
        if (type === "Shimmer") {
            this.gantt.loadingIndicator.indicatorType = "Shimmer";
            this.gantt.enableVirtualMaskRow = true;
            this.gantt.refresh();
        } else {
            this.gantt.loadingIndicator.indicatorType = "Spinner";
            this.gantt.enableVirtualMaskRow = false;
            this.gantt.refresh();
        }
    }
}
