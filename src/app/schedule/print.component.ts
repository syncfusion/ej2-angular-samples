import { extend } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import {
  ScheduleComponent, EventSettingsModel, ActionEventArgs, ToolbarActionArgs, View,
  MonthService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { scheduleData } from './data';

/**
 * Sample for print
 */

@Component({
  selector: 'control-content',
  templateUrl: 'print.html',
  styleUrls: ['print.style.css'],
  providers: [MonthService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class PrintComponent {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2019, 0, 10);
  public currentView: View = 'Month';
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };

  public onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const exportItem: ItemModel = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-print',
        text: 'Print', cssClass: 'e-print', click: this.onPrintIconClick.bind(this)
      };
      args.items.push(exportItem);
    }
  }

  public onPrintIconClick(): void {
    // this.scheduleObj.print();
  }
}
