import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { customizedData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gantttaskbartemplate',
    templateUrl: 'taskbar-template.html',
    styleUrls: ['taskbar-template.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GanttAllModule, NgIf, SBDescriptionComponent]
})
export class GanttTaskbarTemplateComponent implements OnInit {
    public data: object[];
    public dateFormat: string;
    public taskSettings: object;
    public columns: object[];
    public splitterSettings: Object;
    public dayWorkingTime: object;
    public durationUnit: string;
    public timelineSettings: object;
    public taskbarTemplate: string;
    public milestoneTemplate: string;
    public tooltipSettings: object;
    public labelSettings: object;
    public projectStartDate: Date;
    public projectEndDate: Date;
    public eventMarkers: object[];
    public customFunction(data: any): string {
        var container = document.createElement('div');
        var subContainer = document.createElement('div');
        var img = document.createElement('img');
        if (data.TaskName == 'Oscar moments') {
          subContainer.className = 'e-gantt-child-taskbar e-custom-moments';
          if (data.ganttProperties.duration < 4) {
            img.className = 'moments';
            img.height = 32;
            img.width = 32;
            img.alt = 'Oscar Moments svg';
            subContainer.append(img);
          } else {
            img.className = 'moments';
            img.height = 32;
            img.width = 32;
            img.alt = 'Oscar Moments svg';
            var span1 = document.createElement('span');
            span1.innerHTML = data.Performance;
            span1.className = 'e-span';
            subContainer.append(img);
            subContainer.append(span1);
          }
        } else if (data.TaskName == 'Oscar performance') {
          subContainer.className = 'e-gantt-child-taskbar e-custom-performance';
          if (data.ganttProperties.duration <= 5) {
            img.className = 'face-mask';
            img.height = 32;
            img.alt = 'Oscar Performance svg';
            subContainer.append(img);
          } else {
            img.className = 'face-mask';
            img.height = 32;
            img.alt = 'Oscar Performance svg';
            var span2 = document.createElement('span');
            span2.innerHTML = data.Performance;
            span2.className = 'e-span';
            subContainer.append(img);
            subContainer.append(span2);
          }
        } else {
          subContainer.className = 'e-gantt-child-taskbar e-custom-performance';
          if (data.ganttProperties.duration < 4) {
            img.className = 'oscar';
            img.height = 32;
            img.width = 32;
            img.alt = 'Oscar svg';
            subContainer.append(img);
          } else {
            if (data.Movie && data.Winner) {
              img.className = 'oscar';
              img.height = 32;
              img.width = 32;
              img.alt = 'Oscar svg';
              var span3 = document.createElement('span');
              span3.innerHTML = data.taskData.Movie;
              span3.className = 'e-span';
              subContainer.append(img);
              subContainer.append(span3);
            } else if (data.Movie && !data.Winner) {
              img.className = 'oscar';
              img.height = 32;
              img.width = 32;
              img.alt = 'Oscar svg';
              var span4 = document.createElement('span');
              span4.innerHTML = data.taskData.Movie;
              span4.className = 'e-span';
              subContainer.append(img);
              subContainer.append(span4);
            } else {
              var span5 = document.createElement('span');
              span5.className = 'e-span';
              subContainer.append(span5);
            }
          }
        }
        container.append(subContainer);
        return container.innerHTML;
      }
    public ngOnInit(): void {
        this.data = customizedData;
        this.taskSettings = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            dependency: 'Predecessor',
         };
        this.columns = [
            { field: 'TaskId', headerText: 'Event Id' },
            { field: 'TaskName', headerText: 'Event Name', width: '250', clipMode: 'EllipsisWithTooltip' },
            { field: 'StartDate', headerText: 'Start Time' },
            { field: 'EndDate', headerText: 'End Time' },
            { field: 'Winner', headerText: 'Winner' },
            { field: 'Movie', headerText: 'Movie' },
            { field: 'Performance', headerText: 'Moments / Performance Details' }
        ];
        this.splitterSettings = {
            columnIndex: 1
        };
        this.dayWorkingTime = [{ from: 0, to: 24 }];
        this.durationUnit = 'Minute';
        this.timelineSettings = {
            timelineUnitSize: 60,
            topTier: {
                unit: 'Hour',
                format: 'MMM dd, yyyy'
            },
            bottomTier: {
                unit: 'Minutes',
                count: 2,
                format: 'h:mm a'
            },
        };
        this.eventMarkers = [
            {
                day: new Date('03/05/2024 07:09:00 PM'),
                label: 'Performance'
            }, {
                day: new Date('03/05/2024 07:46:00 PM'),
                label: 'Moments'
            }, {
                day: new Date('03/05/2024 07:59:00 PM'),
                label: 'Performance'
            }, {
                day: new Date('03/05/2024 08:08:00 PM'),
                label: 'Moments'
            }, {
                day: new Date('03/05/2024 08:24:00 PM'),
                label: 'Moments'
            }, {
                day: new Date('03/05/2024 08:31:00 PM'),
                label: 'Performance'
            }, {
                day: new Date('03/05/2024 08:47:00 PM'),
                label: 'Moments'
            }
        ];
        this.labelSettings = {
            leftLabel: 'TaskName',
        };
        this.projectStartDate = new Date('03/05/2024 06:00 PM'),
        this.projectEndDate = new Date('03/05/2024 09:50 PM')
    }
}
