import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { actionEventData } from './data';
import { ScheduleComponent, EventSettingsModel, EventRenderedArgs, DayService, WeekService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'action-event-buttons.html',
  styleUrls: ['action-event-buttons.style.css'],
  providers: [DayService, WeekService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ActionEventButtonsComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public data: Record<string, any>[] = extend([], actionEventData, null, true) as Record<string, any>[];
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public selectedDate: Date = new Date(new Date().getFullYear(), 0, 16);
  private instance: Internationalization = new Internationalization();

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['action-event-buttons.style.css'];
  }

  public getTimeString(value: Date): string {
    return this.instance.formatDate(value, { format: 'HH:mm' });
  }

  public editEvent(eventData: Record<string, any>): void {
    if (this.scheduleObj) {
      this.scheduleObj.openEditor(eventData, 'Save');
    }
  }

  public deleteEvent(eventData: Record<string, any>): void {
    if (this.scheduleObj) {
      this.scheduleObj.deleteEvent(eventData);
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const eventData = args.data as Record<string, any>;
    const categoryColor = eventData.CategoryColor;
    if (categoryColor) {
      args.element.style.backgroundColor = categoryColor;
    }
  }
}
