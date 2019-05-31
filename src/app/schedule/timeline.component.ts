import { Component } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, TimelineViewsService, TimelineMonthService, AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData, timelineData } from './data';

@Component({
    selector: 'control-content',
    templateUrl: 'timeline.html',
    providers: [TimelineViewsService, TimelineMonthService, AgendaService, ResizeService, DragAndDropService]
})
export class TimelineComponent {
    public selectedDate: Date = new Date(2019, 0, 10);
    public currentView: View = 'TimelineWeek';
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData.concat(timelineData), null, true) };
}