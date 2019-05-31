import { Component, ViewChild } from '@angular/core';
import { Internationalization, extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-angular-dropdowns';
import {
    ScheduleComponent, View, TimeScaleModel, EventSettingsModel, DayService, WeekService, TimelineViewsService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).majorSlotTemplate = (date: Date) => {
    return instance.formatDate(date, { skeleton: 'hm' });
};
(window as TemplateFunction).minorSlotTemplate = (date: Date) => {
    return instance.formatDate(date, { skeleton: 'ms' }).replace(':00', '');
};
interface TemplateFunction extends Window {
    majorSlotTemplate?: Function;
    minorSlotTemplate?: Function;
}

@Component({
    selector: 'control-content',
    templateUrl: 'time-scale.html',
    providers: [DayService, WeekService, TimelineViewsService, ResizeService, DragAndDropService]
})

export class TimescaleComponent {
    public selectedDate: Date = new Date(2019, 0, 10);
    public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 6 };
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
    public currentView: View = 'Week';
    public data: string[] = ['Day', 'Week', 'WorkWeek'];
    public intervalValue: string = '60';
    public intervalData: string[] = ['30', '60', '90', '120', '150', '180', '240', '300', '720'];
    public slotCountValue: string = '6';
    public slotCountData: string[] = ['1', '2', '3', '4', '5', '6'];
    public timescaleValue: string = 'Show';
    public timescaleData: string[] = ['Show', 'Hide'];
    public templateValue: string = 'No';
    public templateData: string[] = ['No', 'Yes'];
    @ViewChild('schedule')
    public scheduleObj: ScheduleComponent;

    changeInterval(e: DropDownChangeArgs): void {
        this.scheduleObj.timeScale.interval = parseInt(e.value as string, 10);
        this.scheduleObj.dataBind();
    }

    changeSlotCount(e: DropDownChangeArgs): void {
        this.scheduleObj.timeScale.slotCount = parseInt(e.value as string, 10);
        this.scheduleObj.dataBind();
    }

    changeTimescale(e: DropDownChangeArgs): void {
        this.scheduleObj.timeScale.enable = (e.value === 'Show') ? true : false;
        this.scheduleObj.dataBind();
    }

    changeTemplate(e: DropDownChangeArgs): void {
        let majorSlotTemplate: string = '<div>${majorSlotTemplate(data.date)}</div>';
        let minorSlotTemplate: string = '<div style="text-align: right; margin-right: 15px">${minorSlotTemplate(data.date)}</div>';
        this.scheduleObj.timeScale.majorSlotTemplate = (e.value === 'Yes') ? majorSlotTemplate : null;
        this.scheduleObj.timeScale.minorSlotTemplate = (e.value === 'Yes') ? minorSlotTemplate : null;
        this.scheduleObj.dataBind();
    }
}