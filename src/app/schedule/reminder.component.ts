import { Component, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService, ScheduleComponent, CallbackFunction, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { compile } from '@syncfusion/ej2-base';
import { ToastComponent, ToastPositionModel, ToastAnimationSettingsModel, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { getReminderEvents } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'reminder.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, ToastModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ReminderComponent implements OnDestroy {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('toastObj') private toastOj: ToastComponent;
  public reminderInterval: any = setInterval(this.refreshEventReminder.bind(this), 5000);
  public data: Record<string, any>[] = getReminderEvents();
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public timeOut = 0;
  public customPosition: ToastPositionModel = { X: 'Right', Y: 'Top' };
  public customAnimation: ToastAnimationSettingsModel = {
    hide: { effect: 'SlideRightOut' },
    show: { effect: 'SlideRightIn' }
  };

  public ngOnDestroy(): void {
    if (this.reminderInterval) {
      clearInterval(this.reminderInterval);
    }
  }

  public refreshEventReminder(): void {
    const eventCollection = this.scheduleObj.getCurrentViewEvents();
    eventCollection.forEach((event: Record<string, any>, i: number) => {
      const dateFormat: CallbackFunction = (date: Date): Date =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
      const startTime: Date = dateFormat(event[this.scheduleObj.eventFields.startTime] as Date);
      const currentTime: Date = dateFormat(new Date(new Date().toUTCString().slice(0, -3)));
      const difference = startTime.getTime() - currentTime.getTime();
      if (startTime.getTime() >= currentTime.getTime() && difference > -1 && difference <= 5000) {
        const obj: HTMLElement = this.cardTemplateFn(event)[0] as HTMLElement;
        this.toastOj.show({ template: obj.outerHTML });
      }
    });
  }

  public cardTemplateFn(data: Record<string, any>): NodeList {
    const template: string = '<div class="e-toast-template"><div class="e-toast-message"><div class="e-toast-title">${Subject}</div>' +
      '<div class="e-toast-content">${StartTime.toLocaleTimeString()} - ${EndTime.toLocaleTimeString()}</div></div></div>';
    return compile(template.trim())(data) as NodeList;
  }

}
