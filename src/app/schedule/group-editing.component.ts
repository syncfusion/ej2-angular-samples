import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { resourceConferenceData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, GroupModel, ResourceDetails, View, DayService, MonthService, WorkWeekService, TimelineViewsService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'group-editing.html',
    styleUrls: ['group-editing.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, MonthService, WorkWeekService, TimelineViewsService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class GroupEditingComponent {
  public data: Record<string, any>[] = extend([], resourceConferenceData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 5, 5);
  public currentView: View = 'WorkWeek';
  public resourceDataSource: Record<string, any>[] = [
    { Text: 'Margaret', Id: 1, Color: '#1aaa55' },
    { Text: 'Robert', Id: 2, Color: '#357cd2' },
    { Text: 'Laura', Id: 3, Color: '#7fa900' }
  ];
  public group: GroupModel = { allowGroupEdit: true, resources: ['Conferences'] };
  public allowMultiple = true;
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      subject: { title: 'Conference Name', name: 'Subject' },
      description: { title: 'Summary', name: 'Description' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' }
    }
  };

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['group-editing.style.css'];
  }

  public getEmployeeName(value: ResourceDetails): string {
    return ((value as ResourceDetails).resourceData) ?
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
      : value.resourceName;
  }

  public getEmployeeDesignation(value: ResourceDetails): string {
    const resourceName: string = this.getEmployeeName(value);
    return (resourceName === 'Margaret') ? 'Sales Representative' : (resourceName === 'Robert') ?
      'Vice President, Sales' : 'Inside Sales Coordinator';
  }

  public getEmployeeImage(value: ResourceDetails): string {
    const resourceName: string = this.getEmployeeName(value);
    return resourceName.replace(' ', '-').toLowerCase();
  }

}
