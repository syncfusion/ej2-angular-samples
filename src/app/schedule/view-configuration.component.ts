import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { fifaEventsData } from './data';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, TimeScaleModel, GroupModel, View,
    ScheduleComponent, DayService, WeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getTimeString = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'Hm' });
};
interface TemplateFunction extends Window {
    getTimeString?: Function;
}

@Component({
    selector: 'control-content',
    templateUrl: 'view-configuration.html',
    providers: [DayService, WeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    styleUrls: ['view-configuration.style.css'],
    encapsulation: ViewEncapsulation.None
})
export class ViewConfigComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 5, 20);
    public currentView: View = 'Month';
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], fifaEventsData, null, true) };
    public agendaTemplate: string = '<div class="subject">${Subject}</div>' +
        '${if(Description !== null && Description !== undefined)}<div class="group">${Description}</div>${/if}' +
        '<div class="location">${getTimeString(data.StartTime)}${if(City !== null && City !== undefined)}, ${City}${/if}</div>';
    public showWeekend: boolean = false;
    public timeScale: TimeScaleModel = { interval: 60, slotCount: 4 };
    public group: GroupModel = { resources: ['Owners'] };
    public monthEventTemplate: string = '<div class="subject">${Subject}</div>';
    public resourceDataSource: Object[] = [
        { GroupText: 'Group A', GroupId: 1, GroupColor: '#1aaa55' },
        { GroupText: 'Group B', GroupId: 2, GroupColor: '#357cd2' }
    ];
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['view-config.style.css'];
    }

    onEventRendered(args: EventRenderedArgs): void {
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
}