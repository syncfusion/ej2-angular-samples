import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { extend, Internationalization } from '@syncfusion/ej2-base';
import { WeekService, EventSettingsModel, ResizeService, WorkHoursModel, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { webinarData } from './data';


@Component({
    selector: 'control-content',
    templateUrl: 'events-template.html',
    styleUrls: ['event-template.style.css'],
    providers: [WeekService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class EventsTemplateComponent {
    public data: Object[] = <Object[]>extend([], webinarData, null, true);
    public eventSettings: EventSettingsModel = { dataSource: this.data };
    public readonly: boolean = true;
    public selectedDate: Date = new Date(2018, 1, 15);
    public workHours: WorkHoursModel = { start: '08:00' };
    public startHour: string = '08:00';
    public endHour: string = '18:00';
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['event-template.style.css'];
    }
    private instance: Internationalization = new Internationalization();
    getTimeString(value: Date): string {
        return this.instance.formatDate(value, { skeleton: 'hm' });
    }
}