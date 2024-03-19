import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { fifaEventsData } from './data';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, TimeScaleModel, GroupModel, View, DragAndDropService, CallbackFunction, ScheduleComponent, DayService, WeekService, MonthService, AgendaService, ResizeService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

const instance: Internationalization = new Internationalization();
(window as TemplateFunction).getTimeString = (value: Date) => {
  return instance.formatDate(value, { skeleton: 'Hm' });
};
interface TemplateFunction extends Window {
  getTimeString?: CallbackFunction;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'view-configuration.html',
    providers: [DayService, WeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    styleUrls: ['view-configuration.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ViewConfigComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2021, 5, 20);
  public currentView: View = 'Month';
  public eventSettings: EventSettingsModel = { dataSource: extend([], fifaEventsData, null, true) as Record<string, any>[] };
  public agendaTemplate: string = '<div><div class="subject">${Subject}</div>' +
    '${if(Description !== null && Description !== undefined)}<div class="group">${Description}</div>${/if}' +
    '<div class="location">${getTimeString(data.StartTime)}${if(City !== null && City !== undefined)}, ${City}${/if}</div></div>';
  public showWeekend = false;
  public timeScale: TimeScaleModel = { interval: 60, slotCount: 4 };
  public group: GroupModel = { resources: ['Owners'] };
  public monthEventTemplate = '<div class="e-subject">${Subject}</div>';
  public resourceDataSource: Record<string, any>[] = [
    { GroupText: 'Group A', GroupId: 1, GroupColor: '#1aaa55' },
    { GroupText: 'Group B', GroupId: 2, GroupColor: '#357cd2' }
  ];

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['view-configuration.style.css'];
  }

}
