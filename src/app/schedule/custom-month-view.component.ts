import { Component } from '@angular/core';
import { generateObject } from './data';
import { EventSettingsModel, MonthService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'custom-month-view.html',
    providers: [MonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class CustomMonthViewComponent {
    public displayDate: Date = new Date(2022, 0, 16);
    public eventSettings: EventSettingsModel = { dataSource: generateObject(new Date(2021, 11, 19).getTime(), new Date(2022, 2, 12).getTime(), true) };
}
