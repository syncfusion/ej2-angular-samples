import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { WeekService, EventSettingsModel,TimelineViewsService, ResizeService, WorkHoursModel, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { webinarData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'events-template.html',
    styleUrls: ['event-template.style.css'],
    providers: [WeekService, ResizeService, DragAndDropService, TimelineViewsService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class EventsTemplateComponent {
  public data: Record<string, any>[] = extend([], webinarData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public readonly = true;
  public selectedDate: Date = new Date(2021, 1, 15);
  public workHours: WorkHoursModel = { start: '08:00' };
  public startHour = '08:00';
  public endHour = '18:00';
  private instance: Internationalization = new Internationalization();

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['event-template.style.css'];
  }

  public getTimeString(value: Date): string {
    return this.instance.formatDate(value, { skeleton: 'hm' });
  }

}
