import { Component, ViewEncapsulation } from '@angular/core';
import { readonlyEventsData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { View, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService, PopupOpenEventArgs, DragEventArgs, ResizeEventArgs, ActionEventArgs, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'read-only.html',
    styles: [`
    .e-schedule .e-read-only {
        opacity: .8;
    }`],
    providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ReadOnlyComponent {
  public data: Record<string, any>[] = extend([], readonlyEventsData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if ((args.target && !args.target.classList.contains('e-appointment') && (args.type === 'QuickInfo')) || (args.type === 'Editor')) {
      args.cancel = this.onEventCheck(args);
    }
  }

  public onDragStop(args: DragEventArgs): void {
    args.cancel = this.onEventCheck(args);
  }

  public onResizeStop(args: ResizeEventArgs): void {
    args.cancel = this.onEventCheck(args);
  }

  public onActionBegin(args: ActionEventArgs): void {
    if ((args.requestType === 'eventCreate') || args.requestType === 'eventChange') {
      args.cancel = this.onEventCheck(args);
    }
  }

  public onEventCheck(args: any): boolean {
    const eventObj: any = args.data instanceof Array ? args.data[0] : args.data;
    return (eventObj.StartTime < new Date());
  }

}
