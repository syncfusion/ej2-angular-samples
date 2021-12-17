import { Component } from '@angular/core';
import { generateObject } from './data';
import { EventSettingsModel, MonthService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'custom-month-view.html',
    providers: [MonthService, ResizeService, DragAndDropService]
})
export class CustomMonthViewComponent {
    public displayDate: Date = new Date(2022, 0, 16);
    public eventSettings: EventSettingsModel = { dataSource: generateObject(new Date(2021, 11, 19).getTime(), new Date(2022, 2, 12).getTime(), true) };
}
