import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, MonthService, View, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'cell-template.html',
    styleUrls: ['cells.style.css'],
    providers: [MonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CellTemplateComponent {
  public currentView: View = 'Month';
  public selectedDate: Date = new Date(2021, 11, 15);
  public eventSettings: EventSettingsModel = { dataSource: extend([], null, true) as Record<string, any>[] };

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['cells.style.css'];
  }

  public getCellContent(date: Date): string {
    if (date.getMonth() === 10 && date.getDate() === 23) {
      return '<img src="./assets/schedule/images/thanksgiving-day.svg" alt="Thanksgiving day"/><div class="caption">Thanksgiving day</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 9) {
      return '<img src="./assets/schedule/images/get-together.svg" alt="Party time"/><div class="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 13) {
      return '<img src="./assets/schedule/images/get-together.svg" alt="Party time"/><div class="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 22) {
      return '<img src="./assets/schedule/images/birthday.svg" alt="Happy birthday"/><div class="caption">Happy birthday</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 24) {
      return '<img src="./assets/schedule/images/christmas-eve.svg" alt="Christmas Eve"/><div class="caption">Christmas Eve</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 25) {
      return '<img src="./assets/schedule/images/christmas.svg" alt="Christmas Day"/><div class="caption">Christmas Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 1) {
      return '<img src="./assets/schedule/images/newyear.svg" alt="New year"/><div class="caption">New Year"s Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 14) {
      return '<img src="./assets/schedule/images/get-together.svg" alt="Get together"/><div class="caption">Get together</div>';
    } else {
      return '';
    }
  }

}
