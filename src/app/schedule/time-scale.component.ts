import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs as DropDownChangeArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleComponent, View, TimeScaleModel, EventSettingsModel, DayService, WeekService, TimelineViewsService, ResizeService, DragAndDropService, CallbackFunction, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

const instance: Internationalization = new Internationalization();
(window as TemplateFunction).majorSlotTemplate = (date: Date) => {
  return instance.formatDate(date, { skeleton: 'hm' });
};
(window as TemplateFunction).minorSlotTemplate = (date: Date) => {
  return instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
};
interface TemplateFunction extends Window {
  majorSlotTemplate?: CallbackFunction;
  minorSlotTemplate?: CallbackFunction;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'time-scale.html',
    styleUrls: ['time-scale.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, WeekService, TimelineViewsService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class TimescaleComponent {
  @ViewChild('schedule') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2021, 0, 10);
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 6 };
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };
  public currentView: View = 'TimelineWeek';
  public data: string[] = ['Day', 'Week', 'WorkWeek'];
  public workDays: number[] = [0, 1, 2, 3, 4, 5];
  public intervalValue = '60';
  public intervalData: string[] = ['30', '60', '90', '120', '150', '180', '240', '300', '720'];
  public slotCountValue = '6';
  public slotCountData: string[] = ['1', '2', '3', '4', '5', '6'];
  public timescaleValue = 'Show';
  public timescaleData: string[] = ['Show', 'Hide'];
  public templateValue = 'No';
  public templateData: string[] = ['No', 'Yes'];

  public changeInterval(e: DropDownChangeArgs): void {
    this.scheduleObj.timeScale.interval = parseInt(e.value as string, 10);
    this.scheduleObj.dataBind();
  }

  public changeSlotCount(e: DropDownChangeArgs): void {
    this.scheduleObj.timeScale.slotCount = parseInt(e.value as string, 10);
    this.scheduleObj.dataBind();
  }

  public changeTimescale(e: DropDownChangeArgs): void {
    this.scheduleObj.timeScale.enable = (e.value === 'Show') ? true : false;
    this.scheduleObj.dataBind();
  }

  public changeTemplate(e: DropDownChangeArgs): void {
    const majorSlotTemplate = '<div>${majorSlotTemplate(data.date)}</div>';
    const minorSlotTemplate = '<div style="text-align: center">${minorSlotTemplate(data.date)}</div>';
    this.scheduleObj.timeScale.majorSlotTemplate = (e.value === 'Yes') ? majorSlotTemplate : null;
    this.scheduleObj.timeScale.minorSlotTemplate = (e.value === 'Yes') ? minorSlotTemplate : null;
    this.scheduleObj.dataBind();
  }

}
