import { Component, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Timezone, WorkHoursModel } from '@syncfusion/ej2-schedule';
import {
    EventSettingsModel, View, EventRenderedArgs, ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { fifaEventsData } from './data';
declare var moment: any;

@Component({
    selector: 'control-content',
    templateUrl: 'timezone-event.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})

export class TimezoneComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public fifaEvents: Object[] = <Object[]>extend([], fifaEventsData, null, true);
    public selectedDate: Date = new Date(2018, 5, 20);
    public eventSettings: EventSettingsModel;
    public workHours: WorkHoursModel = { start: '11:00' };
    public currentView: View = 'Week';

    constructor() {
        // Here remove the local offset from events
        let timezone: Timezone = new Timezone();
        for (let fifaEvent of this.fifaEvents) {
            let event: { [key: string]: Object } = fifaEvent as { [key: string]: Object };
            event.StartTime = timezone.removeLocalOffset(<Date>event.StartTime);
            event.EndTime = timezone.removeLocalOffset(<Date>event.EndTime);
        }
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            Timezone.prototype.offset = (date: Date, timezone: string): number => {
                return moment.tz.zone(timezone).utcOffset(date.getTime());
            };
        }
        this.eventSettings = { dataSource: this.fifaEvents };
    }

    public oneventRendered(args: EventRenderedArgs): void {
        let categoryColor: string = args.data.CategoryColor as string;
        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }

    @ViewChild('timezoneDropdown')
    public timezoneDropdownObj: DropDownListComponent;
    public timezoneData: Object[] = [
        { timezone: 'America/New_York', text: '(UTC-05:00) Eastern Time' },
        { timezone: 'UTC', text: 'UTC' },
        { timezone: 'Europe/Moscow', text: '(UTC+03:00) Moscow+00 - Moscow' },
        { timezone: 'Asia/Kolkata', text: '(UTC+05:30) India Standard Time' },
        { timezone: 'Australia/Perth', text: '(UTC+08:00) Western Time - Pert' }
    ];
    public fields: Object = { text: 'text', value: 'timezone' };
    public dropDownValue: string = 'UTC';
    public onTimezoneDropDownChange(args: any): void {
        this.scheduleObj.timezone = this.timezoneDropdownObj.value.toString();
    }
}