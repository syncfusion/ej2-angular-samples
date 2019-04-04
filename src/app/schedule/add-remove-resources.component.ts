import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { holidayData, birthdayData, companyData, personalData } from './data';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import {
    ScheduleComponent, EventSettingsModel,
    GroupModel, MonthService, TimelineViewsService,
    TimelineMonthService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'add-remove-resources.html',
    styleUrls: ['add-remove-resources.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MonthService, TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class AddRemoveResourcesComponent {
    public calendarCollections: Object[] = [
        { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
        { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
        { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
        { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
    ];
    public group: GroupModel = { resources: ['Calendars'] };
    public resourceDataSource: Object[] = [this.calendarCollections[0]];
    public allowMultiple: Boolean = true;
    public selectedDate: Date = new Date(2018, 3, 1);
    public eventSettings: EventSettingsModel = { dataSource: this.generateCalendarData() };
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    //custom code start
    generateCalendarData(): Object[] {
        return [...personalData, ...companyData, ...birthdayData, ...holidayData];
    }
    //custom code end

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['add-remove-resources.style.css'];
    }

    onChange(args: ChangeEventArgs): void {
        let value: number = parseInt((<Element>args.event.target).getAttribute('value'), 10);
        let resourceData: Object[] =
            this.calendarCollections.filter((calendar: { [key: string]: Object }) => calendar.CalendarId === value);
        if (args.checked) {
            this.scheduleObj.addResource(resourceData[0], 'Calendars', value - 1);
        } else {
            this.scheduleObj.removeResource(value, 'Calendars');
        }
    }
}