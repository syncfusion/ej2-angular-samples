import { Component, OnInit} from '@angular/core';
import { labelData, editingResources } from './data';
@Component({
    selector: 'ej2-gantttasklabeltemplate',
    templateUrl: 'tasklabel-template.html'
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
    public customFunction(data: any): string {
      var container = document.createElement('div');
      if (data.ganttProperties.resourceNames) {
        var resources = data.resources.split(',');
        for (var i = 0; i < resources.length; i++) {
          var subContainer = document.createElement('div');
          var img = document.createElement('img');
          var span = document.createElement('span');
          debugger;
          span.className = 'labelClass';
          span.innerHTML = resources[i];
          img.src =
            'https://ej2.syncfusion.com/angular/demos/assets/gantt/images/' +
            resources[i] +
            '.png';
          img.height = 40;
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
        { field: 'TaskName', width: 250 },
        { field: 'StartDate' },
        { field: 'EndDate' },
        { field: 'Duration' },
        { field: 'Predecessor' },
        { field: 'Progress' },
        { field: 'resources' },
      ];
      this.splitterSettings = {
        columnIndex: 2,
      };
      this.projectStartDate = new Date('03/24/2019');
      this.projectEndDate = new Date('05/04/2019');
      this.labelSettings = {
        taskLabel: '${Progress}%',
      };
    }  
}