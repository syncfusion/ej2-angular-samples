import { Component, ViewChild } from '@angular/core';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import {
    ScheduleComponent, EventSettingsModel, View, EventRenderedArgs, TimelineYearService, Orientation
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'year.html',
    providers: [TimelineYearService]
})
export class YearComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public currentView: View = 'TimelineYear';
    public eventSettings: EventSettingsModel = { dataSource: this.generateEvents() };
    public orientationData: Object[] = [
        { text: 'Horizontal', value: 'Horizontal' },
        { text: 'Vertical', value: 'Vertical' }
    ];
    public orientationValues = 'Horizontal';
    public orientationFields: Object = { text: 'text', value: 'value' };

    orientationChange(args: ChangeEventArgs): void {
        this.scheduleObj.views = [{ option: 'TimelineYear', orientation: args.value as Orientation }];
        this.scheduleObj.dataBind();
    }

    oneventRendered(args: EventRenderedArgs): void {
        const eventColor: string = args.data.EventColor as string;
        if (!args.element || !eventColor) {
            return;
        } else {
            args.element.style.backgroundColor = eventColor;
        }
    }
    generateEvents(count: number = 250, date: Date = new Date()): Object[] {
        const names: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        const colors: string[] = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        const startDate: Date = new Date(date.getFullYear() - 2, 0, 1);
        const endDate: Date = new Date(date.getFullYear() + 2, 11, 31);
        const dateCollections: Object[] = [];
        for (let a = 0, id = 1; a < count; a++) {
            const start: Date = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
            const end: Date = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
            const nCount: number = Math.floor(Math.random() * names.length);
            const n: number = Math.floor(Math.random() * colors.length);
            dateCollections.push({
                Id: id,
                Subject: names[nCount],
                StartTime: new Date(start.getTime()),
                EndTime: new Date(end.getTime()),
                IsAllDay: (id % 10) ? true : false,
                EventColor: colors[n]
            });
            id++;
        }
        return dateCollections;
    }
}
