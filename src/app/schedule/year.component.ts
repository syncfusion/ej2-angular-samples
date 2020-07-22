import { Component, ViewChild } from '@angular/core';
import {
    ScheduleComponent, EventSettingsModel, EventRenderedArgs, YearService, TimelineYearService, GroupModel
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'year.html',
    providers: [YearService, TimelineYearService]
})
export class YearComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public eventSettings: EventSettingsModel = { dataSource: this.generateEvents() };
    public isSelected: Boolean = true;
    public allowMultiple: Boolean = true;
    public groupSettings: GroupModel = { resources: ['Categories'] };
    public resourceDataSource: Object[] = [
        { text: 'Nancy', id: 1, color: '#df5286' },
        { text: 'Steven', id: 2, color: '#7fa900' },
        { text: 'Robert', id: 3, color: '#ea7a57' },
        { text: 'Smith', id: 4, color: '#5978ee' },
        { text: 'Micheal', id: 5, color: '#df5286' }
    ];

    public onEventRendered(args: EventRenderedArgs): void {
        const eventColor: string = args.data.EventColor as string;
        if (!args.element || !eventColor) {
            return;
        } else {
            args.element.style.backgroundColor = eventColor;
        }
    }

    public generateEvents(count: number = 250, date: Date = new Date()): Object[] {
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
                EventColor: colors[n],
                TaskId: (id % 5) + 1
            });
            id++;
        }
        return dateCollections;
    }
}
