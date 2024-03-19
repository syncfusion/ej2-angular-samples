import { extend } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import { ScheduleComponent, EventSettingsModel, ActionEventArgs, View, WeekService, ResizeService, DragAndDropService, ExcelExportService, ExportOptions, ExportFieldInfo, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { scheduleData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for excel exporting
 */

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'excel-export.html',
    styleUrls: ['excel-export.style.css'],
    providers: [WeekService, ResizeService, DragAndDropService, ExcelExportService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ExcelExportComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date(2021, 0, 10);
  public currentView: View = 'Week';
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };

  public onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const exportItem: ItemModel = {
        align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
        text: 'Excel Export', cssClass: 'e-excel-export', click: this.onExportClick.bind(this)
      };
      args.items.push(exportItem);
    }
  }

  public onExportClick(): void {
    const exportFields: ExportFieldInfo[] = [
      { name: 'Id', text: 'Id' },
      { name: 'Subject', text: 'Summary' },
      { name: 'StartTime', text: 'Start Date' },
      { name: 'EndTime', text: 'End Date' },
      { name: 'Location', text: 'Place' }
    ];
    const exportValues: ExportOptions = { fieldsInfo: exportFields };
    this.scheduleObj.exportToExcel(exportValues);
  }

}
