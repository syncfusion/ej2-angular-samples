import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { VirtualScroll, GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-ganttloadondemand',
    templateUrl: 'load-on-demand.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttLoadOnDemandComponent implements OnInit {
    public data: object;
    public taskSettings: object;
    public columns: object[];
    public labelSettings: object;
    public splitterSettings: object;
    public tooltipSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public ngOnInit(): void {
      this.data = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/GanttLoadOnDemand',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
        this.taskSettings = {
            id: 'taskId',
            name: 'taskName',
            startDate: 'startDate',
            endDate: 'endDate',
            duration: 'duration',
            progress: 'progress',
            hasChildMapping: "isParent",
            parentID: "parentID"
        };
        this.tooltipSettings= {
          showTooltip: true
        };
        this.splitterSettings = {
          columnIndex: 3
        };
        this.columns =  [
            { field: 'taskId', width:80 },
            { field: 'taskName', headerText: 'Name', width: '200', clipMode: 'EllipsisWithTooltip' },
            { field: 'startDate' },
            { field: 'duration' },
            { field: 'progress' },
        ];
        this.projectStartDate = new Date('01/02/2000');
        this.projectEndDate = new Date('01/06/2002');
    }
}
