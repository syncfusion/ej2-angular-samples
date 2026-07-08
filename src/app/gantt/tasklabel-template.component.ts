import { Component, OnInit } from '@angular/core';
import { labelData, editingResources } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { DayMarkersService, GanttModule, SelectionService } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';

interface TaskData {
    ganttProperties?: { resourceNames?: string };
    resources?: string;
}
@Component({
    selector: 'ej2-gantttasklabeltemplate',
    templateUrl: 'tasklabel-template.html',
    styleUrls: ['tasklabel-template.component.css'],
    standalone: true,
    providers: [SelectionService, DayMarkersService],
    imports: [SBActionDescriptionComponent, GanttModule, SBDescriptionComponent]
})
export class GanttTasklabelTemplateComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public columns: object[];
    public splitterSettings: object;
    public resources: object[];
    public resourceFields: object;
    public customFunction(data: TaskData): string {
        const container = document.createElement('div');
        if (data?.ganttProperties?.resourceNames && data?.resources) {
            const resources = data.resources.split(',');
            for (const resource of resources) {
                const subContainer = document.createElement('div');
                const img = document.createElement('img');
                const span = document.createElement('span');
                span.className = 'labelClass';
                span.textContent = resource;
                img.src = 'assets/gantt/images/' + resource + '.png';
                img.height = 40;
                img.alt = resource;
                subContainer.append(img);
                subContainer.append(span);
                container.append(subContainer);
            }
        }
        return container.innerHTML;
    }
    public ngOnInit(): void {
      this.data = labelData;
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
        child: 'subtasks',
      };
      this.resourceFields = {
        id: 'resourceId',
        name: 'resourceName',
      };
      this.columns = [
        { field: 'TaskID', width: 80 },
        { field: 'TaskName', width: 280 },
        { field: 'StartDate' },
        { field: 'EndDate' },
        { field: 'Duration' },
        { field: 'Predecessor' },
        { field: 'Progress' },
        { field: 'resources' },
      ];
      this.splitterSettings = {
        columnIndex: 3
      };
      this.projectStartDate = new Date('03/24/2025');
      this.projectEndDate = new Date('06/10/2025');
      this.labelSettings = {
        taskLabel: '${Progress}%',
      };
    }
}
