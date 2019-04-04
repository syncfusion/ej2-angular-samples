import { Component, ViewChild } from '@angular/core';
import { scheduleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import {
    ScheduleComponent, EventSettingsModel, EventRenderedArgs, DayService, WeekService,
    WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-interaction.html',
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class KeyboardComponent {
    public data: object[] = <Object[]>extend([], scheduleData, null, true);
    public selectedDate: Date = new Date(2019, 0, 15);
    public eventSettings: EventSettingsModel = { dataSource: this.data };

    constructor() {
        document.body.addEventListener('keydown', (e: KeyboardEvent) => {
            let scheduleElement: HTMLElement = document.getElementById('Schedule');
            if (e.altKey && e.keyCode === 74 && scheduleElement) {
                scheduleElement.focus();
            }
        });
    }

    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

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