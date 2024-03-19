import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, EventRenderedArgs, YearService, TimelineYearService, GroupModel, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'year.html',
    styles: [`
    .year-view.e-schedule .e-timeline-year-view .e-resource-column-table,
    .year-view.e-schedule .e-timeline-year-view .e-resource-left-td {
      width: 120px;
    }

    .col-lg-2.property-section .property-panel-table td {
        padding-bottom: 1rem;
    }`],
    providers: [YearService, TimelineYearService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, DropDownListModule, NumericTextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class YearComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public eventSettings: EventSettingsModel = { dataSource: this.generateEvents() };
  public isSelected = true;
  public allowMultiple = true;
  public groupSettings: GroupModel = { resources: ['Categories'] };
  public resourceDataSource: Record<string, any>[] = [
    { text: 'Nancy', id: 1, color: '#df5286' },
    { text: 'Steven', id: 2, color: '#7fa900' },
    { text: 'Robert', id: 3, color: '#ea7a57' },
    { text: 'Smith', id: 4, color: '#5978ee' },
    { text: 'Michael', id: 5, color: '#df5286' }
  ];
  public months: Record<string, any>[] = [
    { text: 'January', value: 0 },
    { text: 'February', value: 1 },
    { text: 'March', value: 2 },
    { text: 'April', value: 3 },
    { text: 'May', value: 4 },
    { text: 'June', value: 5 },
    { text: 'July', value: 6 },
    { text: 'August', value: 7 },
    { text: 'September', value: 8 },
    { text: 'October', value: 9 },
    { text: 'November', value: 10 },
    { text: 'December', value: 11 }
  ];
  public fields = { text: 'text', value: 'value' };

  public onEventRendered(args: EventRenderedArgs): void {
    const eventColor: string = args.data.EventColor as string;
    if (!args.element || !eventColor) {
      return;
    } else {
      args.element.style.backgroundColor = eventColor;
    }
  }

  public firstMonthOfYear(args: Record<string, number>): void {
    this.scheduleObj.firstMonthOfYear = args.value;
  }

  public numberOfMonths(args: Record<string, number>): void {
    this.scheduleObj.monthsCount = args.value;
  }

  public generateEvents(count: number = 250, date: Date = new Date()): Record<string, any>[] {
    const names: string[] = [
      'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
      'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day',
      'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
      'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
    ];
    const colors: string[] = [
      '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
      '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
      '#fec200', '#5978ee', '#00bdae', '#ea80fc'
    ];
    const startDate: Date = new Date(date.getFullYear() - 2, 0, 1);
    const endDate: Date = new Date(date.getFullYear() + 2, 11, 31);
    const dateCollections: Record<string, any>[] = [];
    for (let a = 0, id = 1; a < count; a++) {
      const start: Date = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
      const end: Date = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
      const nCount: number = Math.floor(Math.random() * names.length);
      const n: number = Math.floor(Math.random() * colors.length);
      dateCollections.push({
        Id: id,
        Subject: names[nCount],
        StartTime: new Date(start.getTime()),
        EndTime: new Date(end.getTime()),
        IsAllDay: (id % 10) ? true : false,
        EventColor: colors[n],
        TaskId: (id % 5) + 1
      });
      id++;
    }
    return dateCollections;
  }

}
