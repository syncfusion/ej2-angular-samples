import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { holidayData, birthdayData, companyData, personalData } from './data';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { ScheduleComponent, EventSettingsModel, GroupModel, MonthService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'add-remove-resources.html',
    styleUrls: ['add-remove-resources.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MonthService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AddRemoveResourcesComponent {
  public calendarCollections: Record<string, any>[] = [
    { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
    { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
    { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
    { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
  ];
  public group: GroupModel = { resources: ['Calendars'] };
  public resourceDataSource: Record<string, any>[] = [this.calendarCollections[0]];
  public allowMultiple = true;
  public selectedDate: Date = new Date(2021, 3, 1);
  public eventSettings: EventSettingsModel = { dataSource: this.generateCalendarData() };
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['add-remove-resources.style.css'];
  }

  // custom code start
  public generateCalendarData(): Record<string, any>[] {
    return [...personalData, ...companyData, ...birthdayData, ...holidayData];
  }
  // custom code end

  public onChange(args: ChangeEventArgs): void {
    const value: number = parseInt((args.event.currentTarget as Element).querySelector('input').getAttribute('value'), 10);
    const resourceData: Record<string, any>[] =
      this.calendarCollections.filter((calendar: Record<string, any>) => calendar.CalendarId === value);
    if (args.checked) {
      this.scheduleObj.addResource(resourceData[0], 'Calendars', value - 1);
    } else {
      this.scheduleObj.removeResource(value, 'Calendars');
    }
  }
}
