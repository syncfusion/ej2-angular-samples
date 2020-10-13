import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { SelectedEventArgs, TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import {
    ScheduleComponent, GroupModel, DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
    TimelineViewsService, TimelineMonthService, TimelineYearService, View, EventSettingsModel, Timezone, CurrentAction,
    CellClickEventArgs, ResourcesModel, EJ2Instance
} from '@syncfusion/ej2-angular-schedule';
import { addClass, extend, removeClass, closest, remove, isNullOrUndefined, Internationalization } from '@syncfusion/ej2-base';
import { ChangeEventArgs as SwitchEventArgs } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs, MultiSelectChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import {
    ClickEventArgs, ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs
} from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-calendars';
declare var moment: any;

/**
 * Sample for overview
 */
@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
        TimelineViewsService, TimelineMonthService, TimelineYearService],
    encapsulation: ViewEncapsulation.None
})
export class OverviewComponent {
    @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
    @ViewChild('eventTypeObj') eventTypeObj: DropDownListComponent;
    @ViewChild('titleObj') titleObj: TextBoxComponent;
    @ViewChild('notesObj') notesObj: TextBoxComponent;
    public showFileList: Boolean = false;
    public multiple: Boolean = false;
    public buttons: Object = { browse: 'Import' };
    public intl: Internationalization = new Internationalization();
    public currentView: View = 'Week';
    public liveTimeUpdate: String = new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' });
    public group: GroupModel = { resources: ['Calendars'] };
    public resourceDataSource: Object[] = [
        { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
        { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
        { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
        { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
    ];
    public resourceQuery: Query = new Query().where('CalendarId', 'equal', 1);
    public allowMultiple: Boolean = true;
    public isTimelineView: Boolean = false;
    public exportItems: ItemModel[] = [
        { text: 'iCalendar', iconCss: 'e-icons e-schedule-ical-export' },
        { text: 'Excel', iconCss: 'e-icons e-schedule-excel-export' }
    ];
    public checkboxMode: String = 'CheckBox';
    public firstDayOfWeek: Number = 0;
    public workDays: Number[] = [1, 2, 3, 4, 5];
    public calendarsValue: Number[] = [1];
    public fields: Object = { text: 'text', value: 'value' };
    public calendarFields: Object = { text: 'CalendarText', value: 'CalendarId' };
    public dayStartHourValue: Date = new Date(new Date().setHours(0, 0, 0));
    public dayEndHourValue: Date = new Date(new Date().setHours(23, 59, 59));
    public workStartHourValue: Date = new Date(new Date().setHours(9, 0, 0));
    public workEndHourValue: Date = new Date(new Date().setHours(18, 0, 0));
    public weekDays: Object[] = [
        { text: 'Sunday', value: 0 },
        { text: 'Monday', value: 1 },
        { text: 'Tuesday', value: 2 },
        { text: 'Wednesday', value: 3 },
        { text: 'Thursday', value: 4 },
        { text: 'Friday', value: 5 },
        { text: 'Saturday', value: 6 }
    ];
    public timezoneData: Object[] = [
        { text: 'UTC -12:00', value: 'Etc/GMT+12' },
        { text: 'UTC -11:00', value: 'Etc/GMT+11' },
        { text: 'UTC -10:00', value: 'Etc/GMT+10' },
        { text: 'UTC -09:00', value: 'Etc/GMT+9' },
        { text: 'UTC -08:00', value: 'Etc/GMT+8' },
        { text: 'UTC -07:00', value: 'Etc/GMT+7' },
        { text: 'UTC -06:00', value: 'Etc/GMT+6' },
        { text: 'UTC -05:00', value: 'Etc/GMT+5' },
        { text: 'UTC -04:00', value: 'Etc/GMT+4' },
        { text: 'UTC -03:00', value: 'Etc/GMT+3' },
        { text: 'UTC -02:00', value: 'Etc/GMT+2' },
        { text: 'UTC -01:00', value: 'Etc/GMT+1' },
        { text: 'UTC +00:00', value: 'Etc/GMT' },
        { text: 'UTC +01:00', value: 'Etc/GMT-1' },
        { text: 'UTC +02:00', value: 'Etc/GMT-2' },
        { text: 'UTC +03:00', value: 'Etc/GMT-3' },
        { text: 'UTC +04:00', value: 'Etc/GMT-4' },
        { text: 'UTC +05:00', value: 'Etc/GMT-5' },
        { text: 'UTC +05:30', value: 'Asia/Calcutta' },
        { text: 'UTC +06:00', value: 'Etc/GMT-6' },
        { text: 'UTC +07:00', value: 'Etc/GMT-7' },
        { text: 'UTC +08:00', value: 'Etc/GMT-8' },
        { text: 'UTC +09:00', value: 'Etc/GMT-9' },
        { text: 'UTC +10:00', value: 'Etc/GMT-10' },
        { text: 'UTC +11:00', value: 'Etc/GMT-11' },
        { text: 'UTC +12:00', value: 'Etc/GMT-12' },
        { text: 'UTC +13:00', value: 'Etc/GMT-13' },
        { text: 'UTC +14:00', value: 'Etc/GMT-14' }
    ];
    public timeSlotDuration: Number[] = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360];
    public timeSlotCount: Number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    public timeSlotDurationValue: Number = 60;
    public timeSlotCountValue: Number = 2;
    public eventSettings: EventSettingsModel = { dataSource: this.generateEvents() };
    @ViewChild('menuObj')
    public menuObj: ContextMenuComponent;
    public selectedTarget: Element;
    public menuItems: MenuItemModel[] = [
        { text: 'New Event', iconCss: 'e-icons new', id: 'Add' },
        { text: 'New Recurring Event', iconCss: 'e-icons recurrence', id: 'AddRecurrence' },
        { text: 'Today', iconCss: 'e-icons today', id: 'Today' },
        { text: 'Edit Event', iconCss: 'e-icons edit', id: 'Save' },
        {
            text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons edit',
            items: [
                { text: 'Edit Occurrence', id: 'EditOccurrence' },
                { text: 'Edit Series', id: 'EditSeries' }
            ]
        },
        { text: 'Delete Event', iconCss: 'e-icons delete', id: 'Delete' },
        {
            text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons delete',
            items: [
                { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
                { text: 'Delete Series', id: 'DeleteSeries' }
            ]
        }
    ];

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['overview.style.css'];
    }

    public generateEvents(): Object[] {
        const eventData: Object[] = [];
        const eventSubjects: string[] = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Aniversary', 'Alaska: The Last Frontier', 'Deadest Catch', 'Sports Day', 'MoonShiners',
            'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice', 'Rugby Match', 'Guitar Class',
            'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        const weekDate: Date = new Date(new Date().setDate(new Date().getDate() - new Date().getDay()));
        let startDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 10, 0);
        let endDate: Date = new Date(weekDate.getFullYear(), weekDate.getMonth(), weekDate.getDate(), 11, 30);
        eventData.push({
            Id: 1,
            Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
            StartTime: startDate,
            EndTime: endDate,
            Location: '',
            Description: 'Event Scheduled',
            RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;',
            IsAllDay: false,
            IsReadonly: false,
            CalendarId: 1
        });
        for (let a = 0, id = 2; a < 500; a++) {
            const month: number = Math.floor(Math.random() * (11 - 0 + 1) + 0);
            const date: number = Math.floor(Math.random() * (28 - 1 + 1) + 1);
            const hour: number = Math.floor(Math.random() * (23 - 0 + 1) + 0);
            const minutes: number = Math.floor(Math.random() * (59 - 0 + 1) + 0);
            const start: Date = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
            const end: Date = new Date(start.getTime());
            end.setHours(end.getHours() + 2);
            startDate = new Date(start.getTime());
            endDate = new Date(end.getTime());
            eventData.push({
                Id: id,
                Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
                StartTime: startDate,
                EndTime: endDate,
                Location: '',
                Description: 'Event Scheduled',
                IsAllDay: id % 10 === 0,
                IsReadonly: endDate < new Date(),
                CalendarId: (a % 4) + 1
            });
            id++;
        }
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            Timezone.prototype.offset = (date: Date, zone: string): number => moment.tz.zone(zone).utcOffset(date.getTime());
        }
        const overviewEvents: { [key: string]: Date }[] = extend([], eventData, null, true) as { [key: string]: Date }[];
        const timezone: Timezone = new Timezone();
        const utcTimezone: never = 'UTC' as never;
        const currentTimezone: never = timezone.getLocalTimezoneName() as never;
        for (const event of overviewEvents) {
            event.StartTime = timezone.convert(event.StartTime, utcTimezone, currentTimezone);
            event.EndTime = timezone.convert(event.EndTime, utcTimezone, currentTimezone);
        }
        return overviewEvents;
    }

    public onToolbarCreated(): void {
        setInterval(() => { this.updateLiveTime(this.scheduleObj ? this.scheduleObj.timezone : 'UTC'); }, 1000);
    }

    public onToolbarItemClicked(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'Day':
                this.currentView = this.isTimelineView ? 'TimelineDay' : 'Day';
                break;
            case 'Week':
                this.currentView = this.isTimelineView ? 'TimelineWeek' : 'Week';
                break;
            case 'WorkWeek':
                this.currentView = this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
                break;
            case 'Month':
                this.currentView = this.isTimelineView ? 'TimelineMonth' : 'Month';
                break;
            case 'Year':
                this.currentView = this.isTimelineView ? 'TimelineYear' : 'Year';
                break;
            case 'Agenda':
                this.currentView = 'Agenda';
                break;
            case 'New Event':
                const eventData: Object = this.getEventData();
                this.scheduleObj.openEditor(eventData, 'Add', true);
                break;
            case 'New Recurring Event':
                const recEventData: Object = this.getEventData();
                this.scheduleObj.openEditor(recEventData, 'Add', true, 1);
                break;
        }
    }

    private getEventData(): Object {
        const date: Date = this.scheduleObj.selectedDate;
        return {
            Id: this.scheduleObj.getEventMaxID(),
            Subject: '',
            StartTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours(), 0, 0),
            EndTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), new Date().getHours() + 1, 0, 0),
            Location: '',
            Description: '',
            IsAllDay: false,
            CalendarId: 1
        };
    }

    public updateLiveTime(timezone: string = 'UTC'): void {
        this.liveTimeUpdate = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
    }

    public onTimelineViewChange(args: SwitchEventArgs): void {
        this.isTimelineView = args.checked;
        switch (this.scheduleObj.currentView) {
            case 'Day':
            case 'TimelineDay':
                this.currentView = this.isTimelineView ? 'TimelineDay' : 'Day';
                break;
            case 'Week':
            case 'TimelineWeek':
                this.currentView = this.isTimelineView ? 'TimelineWeek' : 'Week';
                break;
            case 'WorkWeek':
            case 'TimelineWorkWeek':
                this.currentView = this.isTimelineView ? 'TimelineWorkWeek' : 'WorkWeek';
                break;
            case 'Month':
            case 'TimelineMonth':
                this.currentView = this.isTimelineView ? 'TimelineMonth' : 'Month';
                break;
            case 'Year':
            case 'TimelineYear':
                this.currentView = this.isTimelineView ? 'TimelineYear' : 'Year';
                break;
            case 'Agenda':
                this.currentView = 'Agenda';
                break;
        }
    }

    public onWeekNumberChange(args: SwitchEventArgs): void {
        this.scheduleObj.showWeekNumber = args.checked;
    }

    public onGroupingChange(args: SwitchEventArgs): void {
        this.scheduleObj.group.resources = args.checked ? ['Calendars'] : [];
    }

    public onGridlinesChange(args: SwitchEventArgs): void {
        this.scheduleObj.timeScale.enable = args.checked;
    }

    public onRowAutoHeightChange(args: SwitchEventArgs): void {
        this.scheduleObj.rowAutoHeight = args.checked;
    }

    public onTooltipChange(args: SwitchEventArgs): void {
        this.scheduleObj.eventSettings.enableTooltip = args.checked;
    }

    public onSelected(args: SelectedEventArgs): void {
        this.scheduleObj.importICalendar((<HTMLInputElement>args.event.target).files[0]);
    }

    public onSettingsClick(args): void {
        const settingsPanel: Element = document.querySelector('.overview-content .right-panel');
        if (settingsPanel.classList.contains('hide')) {
            removeClass([settingsPanel], 'hide');
        } else {
            addClass([settingsPanel], 'hide');
        }
        this.scheduleObj.refreshEvents();
    }

    public getWeatherImage(value: Date): string {
        switch (value.getDay()) {
            case 0:
                return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg"/><div class="weather-text">25°C</div>';
            case 1:
                return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
            case 2:
                return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
            case 3:
                return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
            case 4:
                return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
            case 5:
                return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
            case 6:
                return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
            default:
                return null;
        }
    }

    public getDateHeaderText(value: Date): string {
        return this.intl.formatDate(value, { skeleton: 'Ed' });
    }

    public onWeekDayChange(args: ChangeEventArgs): void {
        this.scheduleObj.firstDayOfWeek = args.value as number;
    }

    public onWorkWeekDayChange(args: MultiSelectChangeEventArgs): void {
        this.scheduleObj.workDays = args.value as number[];
    }

    public onResourceChange(args: MultiSelectChangeEventArgs): void {
        let resourcePredicate: Predicate;
        for (const value of args.value) {
            if (resourcePredicate) {
                resourcePredicate = resourcePredicate.or(new Predicate('CalendarId', 'equal', value));
            } else {
                resourcePredicate = new Predicate('CalendarId', 'equal', value);
            }
        }
        this.scheduleObj.resources[0].query = resourcePredicate ? new Query().where(resourcePredicate) :
            new Query().where('CalendarId', 'equal', 1);
    }

    public onTimezoneChange(args: ChangeEventArgs): void {
        this.scheduleObj.timezone = args.value as string;
        this.updateLiveTime(this.scheduleObj.timezone);
        document.querySelector('.schedule-overview #timezoneBtn').innerHTML =
            '<span class="e-btn-icon e-icons e-schedule-timezone e-icon-left"></span>' + args.itemData.text;
    }

    public onDayStartHourChange(args: TimeEventArgs): void {
        this.scheduleObj.startHour = this.intl.formatDate(args.value, { skeleton: 'Hm' });
    }

    public onDayEndHourChange(args: TimeEventArgs): void {
        this.scheduleObj.endHour = this.intl.formatDate(args.value, { skeleton: 'Hm' });
    }

    public onWorkStartHourChange(args: TimeEventArgs): void {
        this.scheduleObj.workHours.start = this.intl.formatDate(args.value, { skeleton: 'Hm' });
    }

    public onWorkEndHourChange(args: TimeEventArgs): void {
        this.scheduleObj.workHours.end = this.intl.formatDate(args.value, { skeleton: 'Hm' });
    }

    public onTimescaleDurationChange(args: ChangeEventArgs): void {
        this.scheduleObj.timeScale.interval = args.value as number;
    }

    public onTimescaleIntervalChange(args: ChangeEventArgs): void {
        this.scheduleObj.timeScale.slotCount = args.value as number;
    }

    public getResourceData(data: { [key: string]: Object }): { [key: string]: Object } {
        // tslint:disable-next-line: deprecation
        const resources: ResourcesModel = this.scheduleObj.getResourceCollections()[0];
        const resourceData: { [key: string]: Object } = (resources.dataSource as Object[]).filter((resource: { [key: string]: Object }) =>
            resource.CalendarId === data.CalendarId)[0] as { [key: string]: Object };
        return resourceData;
    }


    public getHeaderStyles(data: { [key: string]: Object }): Object {
        if (data.elementType === 'cell') {
            return { 'align-items': 'center', 'color': '#919191' };
        } else {
            const resourceData: { [key: string]: Object } = this.getResourceData(data);
            return { 'background': resourceData.CalendarColor, 'color': '#FFFFFF' };
        }
    }

    public getHeaderTitle(data: { [key: string]: Object }): string {
        return (data.elementType === 'cell') ? 'Add Appointment' : 'Appointment Details';
    }

    public getHeaderDetails(data: { [key: string]: Date }): string {
        return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';

    }

    public getEventType(data: { [key: string]: string }): string {
        const resourceData: { [key: string]: Object } = this.getResourceData(data);
        return resourceData.CalendarText as string;
    }

    public buttonClickActions(e: Event) {
        const quickPopup: HTMLElement = this.scheduleObj.element.querySelector('.e-quick-popup-wrapper') as HTMLElement;
        const getSlotData: Function = (): { [key: string]: Object } => {
            const cellDetails: CellClickEventArgs = this.scheduleObj.getCellDetails(this.scheduleObj.getSelectedElements());
            const addObj: { [key: string]: Object } = {};
            addObj.Id = this.scheduleObj.getEventMaxID();
            addObj.Subject = ((quickPopup.querySelector('#title') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
            addObj.StartTime = new Date(+cellDetails.startTime);
            addObj.EndTime = new Date(+cellDetails.endTime);
            addObj.Description = ((quickPopup.querySelector('#notes') as EJ2Instance).ej2_instances[0] as TextBoxComponent).value;
            addObj.CalendarId = ((quickPopup.querySelector('#eventType') as EJ2Instance).ej2_instances[0] as DropDownListComponent).value;
            return addObj;
        };
        if ((e.target as HTMLElement).id === 'add') {
            const addObj: { [key: string]: Object } = getSlotData();
            this.scheduleObj.addEvent(addObj);
        } else if ((e.target as HTMLElement).id === 'delete') {
            const eventDetails: { [key: string]: Object } = this.scheduleObj.activeEventData.event as { [key: string]: Object };
            let currentAction: CurrentAction;
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            this.scheduleObj.deleteEvent(eventDetails, currentAction);
        } else {
            const isCellPopup: boolean = quickPopup.firstElementChild.classList.contains('e-cell-popup');
            const eventDetails: { [key: string]: Object } = isCellPopup ? getSlotData() :
                this.scheduleObj.activeEventData.event as { [key: string]: Object };
            let currentAction: CurrentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            this.scheduleObj.openEditor(eventDetails, currentAction, true);
        }
        this.scheduleObj.closeQuickInfoPopup();
    }

    public onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
        if (newEventElement) {
            remove(newEventElement);
            removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
        }
        const targetElement: HTMLElement = <HTMLElement>args.event.target;
        if (closest(targetElement, '.e-contextmenu')) {
            return;
        }
        this.selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells,' +
            '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
        if (isNullOrUndefined(this.selectedTarget)) {
            args.cancel = true;
            return;
        }
        if (this.selectedTarget.classList.contains('e-appointment')) {
            const eventObj: { [key: string]: Object } = this.scheduleObj.getEventDetails(this.selectedTarget) as { [key: string]: Object };
            if (eventObj.RecurrenceRule) {
                this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
                this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
            } else {
                this.menuObj.showItems(['Save', 'Delete'], true);
                this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
            }
            return;
        }
        this.menuObj.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj.showItems(['Add', 'AddRecurrence', 'Today'], true);
    }

    public onMenuItemSelect(args: MenuEventArgs): void {
        const selectedMenuItem: string = args.item.id;
        let eventObj: { [key: string]: number };
        if (this.selectedTarget.classList.contains('e-appointment')) {
            eventObj = this.scheduleObj.getEventDetails(this.selectedTarget) as { [key: string]: number };
        }
        switch (selectedMenuItem) {
            case 'Today':
                this.scheduleObj.selectedDate = new Date();
                break;
            case 'Add':
            case 'AddRecurrence':
                const selectedCells: Element[] = this.scheduleObj.getSelectedElements();
                const activeCellsData: CellClickEventArgs =
                    this.scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : this.selectedTarget);
                if (selectedMenuItem === 'Add') {
                    this.scheduleObj.openEditor(activeCellsData, 'Add');
                } else {
                    this.scheduleObj.openEditor(activeCellsData, 'Add', null, 1);
                }
                break;
            case 'Save':
            case 'EditOccurrence':
            case 'EditSeries':
                if (selectedMenuItem === 'EditSeries') {
                    const query: Query = new Query().where(this.scheduleObj.eventFields.id, 'equal', eventObj.RecurrenceID);
                    eventObj = new DataManager(this.scheduleObj.eventsData).executeLocal(query)[0] as { [key: string]: number };
                }
                this.scheduleObj.openEditor(eventObj, selectedMenuItem);
                break;
            case 'Delete':
                this.scheduleObj.deleteEvent(eventObj);
                break;
            case 'DeleteOccurrence':
            case 'DeleteSeries':
                this.scheduleObj.deleteEvent(eventObj, selectedMenuItem);
                break;
        }
    }

}
