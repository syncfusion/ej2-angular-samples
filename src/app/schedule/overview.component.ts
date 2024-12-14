import { Component, ViewEncapsulation, Inject, ViewChild, AfterViewChecked } from '@angular/core';
import { ItemModel, DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SelectedEventArgs, TextBoxComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { ScheduleComponent, GroupModel, DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService, TimelineViewsService, TimelineMonthService, TimelineYearService, ResizeService, DragAndDropService, View, EventSettingsModel, Timezone, CurrentAction, CellClickEventArgs, ResourcesModel, EJ2Instance, PrintService, ExcelExportService, ICalendarExportService, ICalendarImportService, CallbackFunction, PopupOpenEventArgs, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { addClass, extend, removeClass, closest, remove, isNullOrUndefined, Internationalization, compile } from '@syncfusion/ej2-base';
import { ChangeEventArgs as SwitchEventArgs, SwitchComponent, ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { MultiSelectComponent, ChangeEventArgs, MultiSelectChangeEventArgs, DropDownListComponent, MultiSelectModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Predicate, Query } from '@syncfusion/ej2-data';
import { ClickEventArgs, ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs, AppBarModule, ToolbarModule, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs as TimeEventArgs } from '@syncfusion/ej2-calendars';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
declare var moment: any;

/**
 * Sample for overview
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, YearService, AgendaService,
        TimelineViewsService, TimelineMonthService, TimelineYearService, ResizeService, DragAndDropService, PrintService, ExcelExportService, ICalendarExportService, ICalendarImportService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AppBarModule, ButtonModule, UploaderModule, DropDownButtonModule, ToolbarModule, CheckBoxModule, ScheduleModule, ContextMenuModule, MultiSelectModule, DropDownListModule, TimePickerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class OverviewComponent implements AfterViewChecked {
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  @ViewChild('workWeekDaysObj') workWeek: MultiSelectComponent;
  @ViewChild('resouresObj') resources: MultiSelectComponent;
  @ViewChild('eventTypeObj') eventTypeObj: DropDownListComponent;
  @ViewChild('titleObj') titleObj: TextBoxComponent;
  @ViewChild('notesObj') notesObj: TextBoxComponent;
  @ViewChild('viewSwitch') viewSwitch: SwitchComponent;
  @ViewChild('groupSwitch') groupSwitch: SwitchComponent;
  @ViewChild('gridlinesSwitch') gridlinesSwitch: SwitchComponent;
  @ViewChild('rowHeightSwitch') rowHeightSwitch: SwitchComponent;
  @ViewChild('tooltipSwitch') tooltipSwitch: SwitchComponent;
  @ViewChild('dragSwitch') dragSwitch: SwitchComponent;
  public showFileList = false;
  public multiple = false;
  public buttons: Record<string, any> = { browse: this.importTemplateFn({ text: 'Import' })[0] as HTMLElement };
  public intl: Internationalization = new Internationalization();
  public currentView: View = 'Week';
  public liveTimeUpdate: string = new Date().toLocaleTimeString('en-US', { timeZone: 'UTC' });
  public timezone: string = 'UTC';
  public group: GroupModel = { resources: ['Calendars'] };
  public resourceDataSource: Record<string, any>[] = [
    { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
    { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
    { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
    { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
  ];
  public resourceQuery: Query = new Query().where('CalendarId', 'equal', 1);
  public allowMultiple = true;
  public isTimelineView = false;
  public exportItems: ItemModel[] = [
    { text: 'iCalendar', iconCss: 'e-icons e-export' },
    { text: 'Excel', iconCss: 'e-icons e-export-excel' }
  ];
  public checkboxMode = 'CheckBox';
  public firstDayOfWeek = 0;
  public workDays: number[] = [1, 2, 3, 4, 5];
  public calendarsValue: number[] = [1];
  public fields: Record<string, any> = { text: 'text', value: 'value' };
  public calendarFields: Record<string, any> = { text: 'CalendarText', value: 'CalendarId' };
  public dayStartHourValue: Date = new Date(new Date().setHours(0, 0, 0));
  public dayEndHourValue: Date = new Date(new Date().setHours(23, 59, 59));
  public workStartHourValue: Date = new Date(new Date().setHours(9, 0, 0));
  public workEndHourValue: Date = new Date(new Date().setHours(18, 0, 0));
  public liveTimeInterval: any;
  public weekDays: Record<string, any>[] = [
    { text: 'Sunday', value: 0 },
    { text: 'Monday', value: 1 },
    { text: 'Tuesday', value: 2 },
    { text: 'Wednesday', value: 3 },
    { text: 'Thursday', value: 4 },
    { text: 'Friday', value: 5 },
    { text: 'Saturday', value: 6 }
  ];
  public timezoneData: Record<string, any>[] = [
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
  public timeSlotDuration: Record<string, any>[] = [
    { Name: '1 hour', Value: 60 },
    { Name: '1.5 hours', Value: 90 },
    { Name: '2 hours', Value: 120 },
    { Name: '2.5 hours', Value: 150 },
    { Name: '3 hours', Value: 180 },
    { Name: '3.5 hours', Value: 210 },
    { Name: '4 hours', Value: 240 },
    { Name: '4.5 hours', Value: 270 },
    { Name: '5 hours', Value: 300 },
    { Name: '5.5 hours', Value: 330 },
    { Name: '6 hours', Value: 360 },
    { Name: '6.5 hours', Value: 390 },
    { Name: '7 hours', Value: 420 },
    { Name: '7.5 hours', Value: 450 },
    { Name: '8 hours', Value: 480 },
    { Name: '8.5 hours', Value: 510 },
    { Name: '9 hours', Value: 540 },
    { Name: '9.5 hours', Value: 570 },
    { Name: '10 hours', Value: 600 },
    { Name: '10.5 hours', Value: 630 },
    { Name: '11 hours', Value: 660 },
    { Name: '11.5 hours', Value: 690 },
    { Name: '12 hours', Value: 720 }
  ];
  public timeSlotFields = { text: 'Name', value: 'Value' };
  public timeSlotCount: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public timeSlotDurationValue = 60;
  public timeSlotCountValue = 2;
  public timeFormatData: Record<string, any>[] = [
    { Name: '12 hours', Value: 'hh:mm a' },
    { Name: '24 hours', Value: 'HH:mm' }
  ];
  public timeFormatValue = 'hh:mm a';
  public weekNumberData: Record<string, any>[] = [
    { Name: 'Off', Value: 'Off' },
    { Name: 'First Day of Year', Value: 'FirstDay' },
    { Name: 'First Full Week', Value: 'FirstFullWeek' },
    { Name: 'First Four-Day Week', Value: 'FirstFourDayWeek' }
  ];
  public tooltipData: Record<string, any>[] = [
    { Name: 'Off', Value: 'Off' },
    { Name: 'On', Value: 'On' },
  ];
  public weekNumberValue = 'Off';
  public tooltipValue = 'Off';
  public eventSettings: EventSettingsModel = { dataSource: this.generateEvents() };
  @ViewChild('menuObj') public menuObj: ContextMenuComponent;
  public selectedTarget: Element;
  public menuItems: MenuItemModel[] = [
    { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
    { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
    { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
    { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
    {
      text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit',
      items: [
        { text: 'Edit Occurrence', id: 'EditOccurrence' },
        { text: 'Edit Series', id: 'EditSeries' }
      ]
    },
    { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
    {
      text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash',
      items: [
        { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
        { text: 'Delete Series', id: 'DeleteSeries' }
      ]
    }
  ];

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['overview.style.css'];
  }

  public ngAfterViewChecked(): void {
    this.viewSwitch?.element?.setAttribute('tabindex', '0');
    this.groupSwitch?.element?.setAttribute('tabindex', '0');
    this.gridlinesSwitch?.element?.setAttribute('tabindex', '0');
    this.rowHeightSwitch?.element?.setAttribute('tabindex', '0');
  }

  public importTemplateFn(data: Record<string, any>): NodeList {
    const template: string = '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
    return compile(template.trim())(data) as NodeList;
  }

  public generateEvents(): Record<string, any>[] {
    const eventData: Record<string, any>[] = [];
    const eventSubjects: string[] = [
      'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Traveling', 'Annual Conference', 'Birthday Celebration',
      'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day', 'MoonShiners',
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
    this.liveTimeInterval = setInterval(() => { this.updateLiveTime(this.scheduleObj ? this.scheduleObj.timezone : 'UTC'); }, 1000);
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
        const eventData: Record<string, any> = this.getEventData();
        this.scheduleObj.openEditor(eventData, 'Add', true);
        break;
      case 'New Recurring Event':
        const recEventData: Record<string, any> = this.getEventData();
        this.scheduleObj.openEditor(recEventData, 'Add', true, 1);
        break;
    }
  }

  private getEventData(): Record<string, any> {
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
    if(this.scheduleObj.isAdaptive) {
      this.liveTimeUpdate = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: timezone });
    }
    else {
      this.liveTimeUpdate = new Date().toLocaleTimeString('en-US', { timeZone: timezone });
    }
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

  public onGroupingChange(args: SwitchEventArgs): void {
    this.scheduleObj.group.resources = args.checked ? ['Calendars'] : [];
  }

  public onGridlinesChange(args: SwitchEventArgs): void {
    this.scheduleObj.timeScale.enable = args.checked;
  }

  public onRowAutoHeightChange(args: SwitchEventArgs): void {
    this.scheduleObj.rowAutoHeight = args.checked;
  }

  public onSelected(args: SelectedEventArgs): void {
    this.scheduleObj.importICalendar((args.event.target as HTMLInputElement).files[0]);
  }

  public OnUploaderCreated(): void {
    const element = document.querySelector('.calendar-import .e-css.e-btn');
    element.classList.add('e-inherit');
  }

  public onSettingsClick(args): void {
    const settingsPanel: Element = document.querySelector('.overview-content .right-panel');
    if (settingsPanel.classList.contains('hide')) {
      removeClass([settingsPanel], 'hide');
      this.workWeek.refresh();
      this.resources.refresh();
    } else {
      addClass([settingsPanel], 'hide');
    }
    this.scheduleObj.refreshEvents();
  }

  public getWeatherImage(value: Date): string {
    switch (value.getDay()) {
      case 0:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg" alt="Clear Weather"/>';
      case 1:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
      case 2:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg" alt="Rain Weather"/>';
      case 3:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
      case 4:
        return '<img class="weather-image" src="./assets/schedule/images/weather-rain.svg" alt="Rain Weather"/>';
      case 5:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clear.svg" alt="Clear Weather"/>';
      case 6:
        return '<img class="weather-image" src="./assets/schedule/images/weather-clouds.svg" alt="Clouds Weather"/>';
      default:
        return null;
    }
  }

  public getDateHeaderDay(value: Date): string {
    return this.intl.formatDate(value, { skeleton: 'E' });
  }
  public getDateHeaderDate(value: Date): string {
    return this.intl.formatDate(value, { skeleton: 'd' });
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
        resourcePredicate = resourcePredicate.or(new Predicate('CalendarId', 'equal', value as number));
      } else {
        resourcePredicate = new Predicate('CalendarId', 'equal', value as number);
      }
    }
    this.scheduleObj.resources[0].query = resourcePredicate ? new Query().where(resourcePredicate) :
      new Query().where('CalendarId', 'equal', 1);
  }

  public onTimezoneChange(args: ChangeEventArgs): void {
    this.scheduleObj.timezone = args.value as string;
    this.updateLiveTime(this.scheduleObj.timezone);
    this.timezone = args.itemData.text;
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

  public onTimeFormatChange(args: ChangeEventArgs): void {
    this.scheduleObj.timeFormat = args.value as string;
  }

  public onWeekNumberChange(args: ChangeEventArgs): void {
    if (args.value === 'Off') {
      this.scheduleObj.showWeekNumber = false;
    } else {
      this.scheduleObj.showWeekNumber = true;
      this.scheduleObj.weekRule = args.value as any;
    }
  }
  public onTooltipChange(args: ChangeEventArgs): void {
    if (args.value === 'Off') {
      this.scheduleObj.eventSettings.enableTooltip = false;
    } else {
      this.scheduleObj.eventSettings.enableTooltip = true;
    }
  }

  public onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass([document.querySelector('.e-selected-cell')], 'e-selected-cell');
    }
    this.scheduleObj.closeQuickInfoPopup();
    const targetElement: HTMLElement = args.event.target as HTMLElement;
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
      const eventObj: Record<string, any> = this.scheduleObj.getEventDetails(this.selectedTarget) as Record<string, any>;
      if (eventObj.RecurrenceRule) {
        this.menuObj.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'Save', 'Delete'], true);
      } else {
        this.menuObj.showItems(['Save', 'Delete'], true);
        this.menuObj.hideItems(['Add', 'AddRecurrence', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
      }
      return;
    } else if ((this.selectedTarget.classList.contains('e-work-cells') || this.selectedTarget.classList.contains('e-all-day-cells')) &&
      !this.selectedTarget.classList.contains('e-selected-cell')) {
      removeClass([].slice.call(this.scheduleObj.element.querySelectorAll('.e-selected-cell')), 'e-selected-cell');
      this.selectedTarget.classList.add('e-selected-cell');
      this.selectedTarget.setAttribute('aria-selected', 'true');
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
        const isRightClickInSelectedCells: boolean = selectedCells.some((cell: Element) => cell === this.selectedTarget);
        const activeCellsData: CellClickEventArgs = this.scheduleObj.getCellDetails(isRightClickInSelectedCells ? selectedCells : [this.selectedTarget]);
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

  public onPrintClick(): void {
    this.scheduleObj.print();
  }

  public onExportClick(args): void {
    if (args.item.text === 'Excel') {
      let exportDatas: Record<string, any>[] = [];
      const eventCollection: Record<string, any>[] = this.scheduleObj.getEvents();
      const resourceCollection: ResourcesModel[] = this.scheduleObj.getResourceCollections();
      const resourceData: Record<string, any>[] = resourceCollection[0].dataSource as Record<string, any>[];
      for (const resource of resourceData) {
        const data: Record<string, any>[] = eventCollection.filter((e: Record<string, any>) => e.CalendarId === resource.CalendarId);
        exportDatas = exportDatas.concat(data as Record<string, any>[]);
      }
      this.scheduleObj.exportToExcel({
        exportType: 'xlsx', customData: exportDatas, fields: ['Id', 'Subject', 'StartTime', 'EndTime', 'CalendarId']
      });
    } else {
      this.scheduleObj.exportToICalendar();
    }
  }

  public ngOnDestroy(): void {
    if (this.liveTimeInterval) {
      clearInterval(this.liveTimeInterval);
    }
  }

}
