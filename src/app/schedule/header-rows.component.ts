import { Component } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, View, TimelineMonthService, ResizeService, EventRenderedArgs, DragAndDropService, CellTemplateArgs, getWeekNumber, getWeekLastDate, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { headerRowData } from './data';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Schedule header rows
 */

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'header-rows.html',
    providers: [TimelineMonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeaderRowsComponent {
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2021, 0, 1);
  public eventSettings: EventSettingsModel = { dataSource: extend([], headerRowData, null, true) as Record<string, any>[] };
  public monthInterval = 12;
  public currentView: View = 'TimelineMonth';
  public instance: Internationalization = new Internationalization();

  public getMonthDetails(value: CellTemplateArgs): string {
    return this.instance.formatDate((value as CellTemplateArgs).date, { skeleton: 'yMMMM' });
  }

  public getWeekDetails(value: CellTemplateArgs): string {
    return 'Week ' + getWeekNumber(getWeekLastDate((value as CellTemplateArgs).date, 0));
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

}
