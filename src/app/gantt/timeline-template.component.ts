import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { timelineTemplateData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'ej2-gantttimelinetemplate',
    templateUrl: 'timeline-template.html',
    styleUrls: ['timeline-template.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, SBDescriptionComponent]
})
export class GanttTimelineTemplateComponent implements OnInit {
    public data: object[];
    public taskSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public timelineSettings: object;
    public columns: object[];
    public splitterSettings: object;
  public weekDate(dateString: any) {
    const date = new Date(dateString);
    const options: any = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  }
    public formatDate(dateString: any) {
      const date = new Date(dateString);
      const options: any = { day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
    public imageString(value: any){
      return "assets/gantt/images/"+ value.toLowerCase() +".svg" ;
    }
    public ngOnInit(): void {
      this.data = timelineTemplateData;
      this.taskSettings = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency:'Predecessor',
        child: 'subtasks'
      };
      this.columns = [
        { field: 'TaskID',visible: false},
        { field: 'TaskName', width: 300 },
        { field: 'StartDate' },
        { field: 'EndDate' },
        { field: 'Duration' },
        { field: 'Progress' }
      ];
      this.splitterSettings = {
        columnIndex: 1
      };
      this.timelineSettings = {
        topTier: {
          unit: 'Day',
      },
      timelineUnitSize: 200,
    };
      this.projectStartDate = new Date('03/31/2024');
      this.projectEndDate = new Date('04/23/2024');
      this.labelSettings = {
        leftLabel: 'TaskName',
        taskLabel: 'Progress'
      };
    }
}
