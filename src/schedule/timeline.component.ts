import { Component } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, TimelineViewsService, TimelineMonthService, AgendaService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData, timelineData } from './datasource';

@Component({
    selector: 'control-content',
    templateUrl: 'timeline.html',
    providers: [TimelineViewsService, TimelineMonthService, AgendaService, ResizeService]
})
export class TimelineComponent {
    public selectedDate: Date = new Date(2018, 1, 15);
    public currentView: View = 'TimelineWeek';
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData.concat(timelineData), null, true) };
}