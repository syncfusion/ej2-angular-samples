import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { holidayData, birthdayData, companyData, personalData } from './data';
import { extend, Internationalization, isNullOrUndefined, createElement } from '@syncfusion/ej2-base';
import { ToolbarModule, SidebarModule, SidebarComponent, ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { CalendarModule, CalendarComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-calendars';
import { ListViewModule, ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-angular-lists';
import {
  ScheduleModule, DayService, WeekService, MonthService, AgendaService, TimelineMonthService,
  YearService, ResizeService, DragAndDropService, addDays, addMonths, addYears, resetTime, WEEK_LENGTH,
  ActionEventArgs, MS_PER_MINUTE, EventRenderedArgs, MS_PER_DAY, getWeekFirstDate, getWeekLastDate,
  EventSettingsModel, View, ScheduleComponent, GroupModel, PopupOpenEventArgs,
  EJ2Instance
} from '@syncfusion/ej2-angular-schedule';
import { GridModule, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DialogModule, DialogComponent, ButtonPropsModel, AnimationSettingsModel } from '@syncfusion/ej2-angular-popups';
import { TextBoxModule, TextBoxComponent, ColorPickerModule, ColorPickerComponent } from '@syncfusion/ej2-angular-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'event-calendar.html',
  styleUrls: ['event-calendar.style.css'],
  providers: [DayService, WeekService, MonthService, AgendaService, TimelineMonthService, YearService, DragAndDropService, ResizeService],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ToolbarModule, SidebarModule, CalendarModule, ListViewModule, ScheduleModule, GridModule, DialogModule, TextBoxModule, ColorPickerModule, SBActionDescriptionComponent, SBDescriptionComponent, NgIf]
})
export class EventCalendarComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent | undefined;
  @ViewChild('leftSidebar') public leftSidebar: SidebarComponent | undefined;
  @ViewChild('calendarObj') public calendarObj: CalendarComponent | undefined;
  @ViewChild('rightSidebar') public rightSidebar: SidebarComponent | undefined;
  @ViewChild('calendarsList') public calendarsList: ListViewComponent | undefined;
  @ViewChild('gridObj') public gridObj: GridComponent | undefined;
  @ViewChild('dialogObj') public dialogObj: DialogComponent | undefined;
  @ViewChild('calendarName') public calendarName: TextBoxComponent | undefined;
  @ViewChild('calendarColor') public calendarColor: ColorPickerComponent | undefined;
  public intl: Internationalization = new Internationalization();
  public dateRange: string = "";
  public calendars: Record<string, any>[] = [
    { name: "My Calendar", id: 1, color: "#c43081", isSelected: true },
    { name: "Company", id: 2, color: "#ff7f50", isSelected: true },
    { name: "Birthday", id: 3, color: "#AF27CD", isSelected: true },
    { name: "Holiday", id: 4, color: "#808000", isSelected: true }
  ];
  public calendarFields: Record<string, any> = { id: "id", text: "name", isChecked: "isSelected" };
  public activeCalendarData: Record<string, any> = { id: 0, name: "New Calendar", color: "#008000ff" };
  public selectedCalendars: Record<string, any> = this.getSelectedCalendars();
  public appointmentData: Record<string, any>[] = this.generateCalendarData();
  public filteredData: Record<string, any> = this.getFilteredData();
  public selectedDate: Date = new Date();
  public currentView: View = "Week";
  public eventSettings: EventSettingsModel = { dataSource: extend([], this.filteredData.planned, null, true) as Record<string, any>[] };
  public scheduleResources: Record<string, any>[] = [
    { name: "Nancy", id: 1, color: "#df5286" },
    { name: "Steven", id: 2, color: "#7fa900" },
    { name: "Robert", id: 3, color: "#ea7a57" },
    { name: "Smith", id: 4, color: "#5978ee" },
    { name: "Micheal", id: 5, color: "#df5286" },
    { name: "Root", id: 6, color: "#00bdae" }
  ];
  public timelineGroup: GroupModel = { resources: ["Resources"] };
  public unPlannedData: Record<string, any>[] = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
  public animationSettings: AnimationSettingsModel = { effect: "Zoom" };
  public dlgButtons: ButtonPropsModel[] = [{ click: this.addCalendar.bind(this), buttonModel: { content: "Add", isPrimary: true } }];

  public constructor() {
    this.updateDateRange();
  }

  public getSelectedCalendars(): Record<string, any> {
    const selectedIds: number[] = [];
    const selectedItems: Record<string, any>[] = [];
    for (let calendar of this.calendars) {
      if (calendar.isSelected) {
        selectedIds.push(calendar.id);
        selectedItems.push(calendar);
      }
    }
    return { ids: selectedIds, items: selectedItems };
  }

  public generateCalendarData(): Record<string, any>[] {
    let collections: Record<string, any>[] = extend([], [...personalData, ...companyData, ...birthdayData, ...holidayData], null, true) as Record<string, any>[];
    const oldTime: number = new Date(2021, 3, 1).getTime();
    const newTime: number = resetTime(new Date()).getTime();
    for (const data of collections) {
      data.IsPlanned = !(data.Id % 2);
      data.IsAllDay = [1, 2].indexOf(data.CalendarId) <= -1;
      const diff: number = oldTime - resetTime(new Date(data.StartTime)).getTime();
      const hour: number = Math.floor(Math.random() * (13 - 9) + 9);
      data.StartTime = new Date(newTime - diff + (data.IsAllDay ? 0 : (hour * 60 * MS_PER_MINUTE)));
      data.EndTime = new Date(data.StartTime.getTime() + (data.IsAllDay ? MS_PER_DAY : MS_PER_MINUTE * 60));
      data.ResourceId = Math.floor(Math.random() * 6) + 1;
    }
    return collections;
  }

  public getFilteredData(): Record<string, any> {
    const planned: Record<string, any>[] = [];
    const unPlanned: Record<string, any>[] = [];
    for (const data of this.appointmentData) {
      if (this.selectedCalendars.ids.indexOf(data.CalendarId) > -1) {
        if (data.IsPlanned) {
          planned.push(data);
        } else {
          unPlanned.push(data);
        }
      }
    }
    return { planned: planned, unPlanned: unPlanned };
  }

  public toolbarClick(args: ClickEventArgs): void {
    if (!args.item) {
      return;
    }
    switch (args.item.cssClass) {
      case "e-menu-btn":
        if (this.leftSidebar) {
          this.leftSidebar.toggle();
        }
        break;
      case "e-create":
        if (this.scheduleObj && this.calendars.length > 0) {
          const data: Record<string, any> = {
            StartTime: resetTime(new Date()),
            EndTime: resetTime(addDays(new Date(), 1)),
            ResourceId: this.selectedCalendars?.ids[0] || this.calendars[0]?.id,
          };
          this.scheduleObj.openEditor(data, "Add", true);
        }
        break;
      case "e-previous":
        this.scheduleObj.selectedDate = this.getPreviousNextDate(true);
        break;
      case "e-next":
        this.scheduleObj.selectedDate = this.getPreviousNextDate(false);
        break;
      case "e-today":
        this.scheduleObj.selectedDate = new Date();
        break;
      case "e-day":
        this.scheduleObj.currentView = "Day";
        break;
      case "e-week":
        this.scheduleObj.currentView = "Week";
        break;
      case "e-month":
        this.scheduleObj.currentView = "Month";
        break;
      case "e-agenda":
        this.scheduleObj.currentView = "Agenda";
        break;
      case "e-timeline":
        this.scheduleObj.currentView = "TimelineMonth";
        break;
      case "e-year":
        this.scheduleObj.currentView = "Year";
        break;
      default:
        break;
    }
  }

  public getPreviousNextDate(isPrevious: boolean): Date {
    let currentDate: Date = this.scheduleObj.selectedDate;
    if (this.scheduleObj) {
      const view: string = this.scheduleObj.currentView;
      switch (view) {
        case "Day":
        case "Agenda":
          currentDate = addDays(currentDate, isPrevious ? -1 : 1);
          break;
        case "Week":
          currentDate = addDays(currentDate, isPrevious ? -WEEK_LENGTH : WEEK_LENGTH);
          break;
        case "Month":
        case "TimelineMonth":
          currentDate = addMonths(currentDate, isPrevious ? -1 : 1);
          break;
        case "Year":
          currentDate = addYears(currentDate, isPrevious ? -1 : 1);
          break;
        default:
          break;
      }
    }
    return currentDate;
  }

  public updateDateRange(): void {
    const view: View = this.scheduleObj ? this.scheduleObj.currentView : this.currentView;
    switch (view) {
      case "Day":
        this.dateRange = this.intl.formatDate(this.scheduleObj.selectedDate, { format: "MMMM dd, yyyy" });
        break;
      case "Week":
      case "Agenda": {
        let currentViewDates: Date[] = this.scheduleObj ? this.scheduleObj.getCurrentViewDates() : [];
        if (isNullOrUndefined(this.scheduleObj) && view === "Week" && currentViewDates.length < 1) {
          currentViewDates = [getWeekFirstDate(this.selectedDate, 0), getWeekLastDate(this.selectedDate, 0)];
        }
        if (currentViewDates.length > 0) {
          const start: Date = currentViewDates[0];
          const end: Date = currentViewDates[currentViewDates.length - 1];
          if (start.getFullYear() !== end.getFullYear()) {
            this.dateRange = this.intl.formatDate(start, { format: "MMMM dd, yyyy" }) + " - " + this.intl.formatDate(end, { format: "MMMM dd, yyyy" });
          } else if (start.getMonth() !== end.getMonth()) {
            this.dateRange = this.intl.formatDate(start, { format: "MMMM dd" }) + " - " + this.intl.formatDate(end, { format: "MMMM dd, yyyy" });
          } else {
            this.dateRange = this.intl.formatDate(start, { format: "MMMM dd" }) + " - " + this.intl.formatDate(end, { format: "dd, yyyy" });
          }
        }
        break;
      }
      case "Month":
      case "TimelineMonth":
        this.dateRange = this.intl.formatDate(this.scheduleObj.selectedDate, { format: "MMMM yyyy" });
        break;
      case "Year":
        this.dateRange = this.intl.formatDate(this.scheduleObj.selectedDate, { format: "yyyy" });
        break;
      default:
        break;
    }
  }

  public onCalendarChange(args: ChangeEventArgs): void {
    if (args?.isInteracted && this.scheduleObj) {
      this.scheduleObj.selectedDate = args.value;
    }
  }

  public listViewActionComplete() {
    this.applyBackgroundColors();
  }

  public showAddCalendarDialog(): void {
    if (this.dialogObj) {
      this.dialogObj.header = "New Calendar";
      this.activeCalendarData = { id: 0, name: "", color: "#008000ff" };
      this.dialogObj.buttons = this.dlgButtons;
      this.dialogObj.show();
    }
  }

  public applyBackgroundColors(): void {
    this.calendars.forEach((calendar: Record<string, any>): void => {
      const listItem: Element = this.calendarsList.element.querySelector(`[data-uid="${calendar.id}"]`);
      if (listItem) {
        const checkboxFrame: Element = listItem.querySelector(`.e-checkbox-wrapper .e-frame.e-check,
          .e-css.e-checkbox-wrapper .e-frame.e-check,.e-checkbox-wrapper .e-frame,.e-css.e-checkbox-wrapper .e-frame`);
        if (checkboxFrame) {
          (checkboxFrame as HTMLElement).style.backgroundColor = calendar.color;
          (checkboxFrame as HTMLElement).style.borderColor = calendar.color;
        }
      }
    });
  }

  public listViewSelect(args: SelectEventArgs) {
    const idFromArgs: number = Number((args.data as { [key: string]: Object; }).id);
    this.calendars[args.index].isSelected = args.isChecked;
    this.selectedCalendars = this.getSelectedCalendars();
    if (args.isChecked) {
      this.changeCheckboxBackgroundColor(idFromArgs);
    }
    this.filteredData = this.getFilteredData();
    this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true) as Record<string, any>[];
    this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
  }

  public changeCheckboxBackgroundColor(idFromArgs: number): void {
    const listItem: Element = this.calendarsList.element.querySelector(`[data-uid="${idFromArgs}"]`);
    if (listItem) {
      const checkboxFrame: Element = listItem.querySelector(".e-checkbox-wrapper .e-frame.e-check, .e-css.e-checkbox-wrapper .e-frame.e-check");
      const selectedItem: Record<string, any> = this.calendars.find((item: Record<string, any>): boolean => item.id === idFromArgs);
      if (checkboxFrame && selectedItem?.color) {
        (checkboxFrame as HTMLElement).style.backgroundColor = selectedItem.color as string;
        (checkboxFrame as HTMLElement).style.borderColor = selectedItem.color as string;
      }
    }
  }

  public calendarEditClick(e: MouseEvent): void {
    e.stopImmediatePropagation();
    if (this.dialogObj && e?.target) {
      this.dialogObj.header = "Edit Calendar";
      const calendarID: number = +(e.target as HTMLElement).dataset.calendarId;
      this.activeCalendarData = this.calendars.find((item: Record<string, any>): boolean => item.id === calendarID);
      this.dialogObj.buttons = [{ click: this.editCalendar.bind(this), buttonModel: { content: "Save", isPrimary: true } }];
      this.dialogObj.show();
    }
  }

  public calendarDeleteClick(e: MouseEvent): void {
    e.stopImmediatePropagation();
    if (e?.target && this.calendars.length > 1) {
      const calendarID: number = +(e.target as HTMLElement).dataset.calendarId;
      this.activeCalendarData = this.calendars.find((item: Record<string, any>): boolean => item.id === calendarID);
      this.calendarsList.removeItem(this.activeCalendarData);
      this.calendars = this.calendars.filter((item: Record<string, any>): boolean => item.id !== calendarID);
      this.appointmentData = this.appointmentData.filter((item: Record<string, any>): boolean => item.CalendarId !== calendarID);
      this.selectedCalendars = this.getSelectedCalendars();
      this.filteredData = this.getFilteredData();
      this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true) as Record<string, any>[];
      this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
    }
  }

  public scheduleActionComplete(args: ActionEventArgs): void {
    if (args.requestType === "dateNavigate" || args.requestType === "viewNavigate") {
      this.updateDateRange();
      if (args.requestType === "dateNavigate" && resetTime(this.calendarObj?.value) !== resetTime(this.scheduleObj.selectedDate)) {
        this.calendarObj.value = this.scheduleObj.selectedDate;
      }
    } else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
      for (const event of args.addedRecords) {
        event.IsPlanned = true;
        this.appointmentData.push(event);
      }
      for (const event of args.changedRecords) {
        const index: number = this.appointmentData.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
        this.appointmentData[index] = event;
      }
      for (const event of args.deletedRecords) {
        const index: number = this.appointmentData.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
        this.appointmentData.splice(index, 1);
      }
      const events: Record<string, any>[] = args.addedRecords.concat(args.changedRecords);
      for (const event of events) {
        let calendar: Record<string, any> = this.selectedCalendars.items.find((item: Record<string, any>): boolean => item.id === event.CalendarId);
        if (isNullOrUndefined(calendar)) {
          calendar = this.calendars.find((item: Record<string, any>): boolean => item.id === event.CalendarId);
          calendar.isSelected = true;
          this.selectedCalendars = this.getSelectedCalendars();
          this.filteredData = this.getFilteredData();
          this.calendarsList.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
          this.scheduleObj.eventSettings.dataSource = extend([], this.filteredData.planned, null, true) as Record<string, any>[];
          this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
        }
      }
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = this.calendars.find((c: Record<string, any>): boolean => c.id === args.data.CalendarId)?.color;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === "Agenda") {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  public schedulePopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
        const row: HTMLElement = createElement("div", { className: "custom-field-row" });
        const formElement: HTMLElement = args.element.querySelector(".e-schedule-form");
        formElement.firstChild.insertBefore(row, args.element.querySelector(".e-resources-row"));
        const container: HTMLElement = createElement("div", { className: "custom-field-container" });
        const inputEle: HTMLElement = createElement("input", { className: "e-field", attrs: { name: "CalendarId" } });
        container.appendChild(inputEle);
        row.appendChild(container);
        const dropDownList: DropDownList = new DropDownList({
          dataSource: extend([], this.calendars, null, true) as Record<string, any>[],
          cssClass: "calendar-ddl",
          fields: { text: "name", value: "id" },
          value: args.data?.CalendarId || this.selectedCalendars?.ids[0] || this.calendars[0]?.id,
          floatLabelType: "Always", placeholder: "Calendar"
        });
        dropDownList.appendTo(inputEle);
        inputEle.setAttribute("name", "CalendarId");
      } else {
        const calendarDDL: DropDownList = (args.element.querySelector(".calendar-ddl input") as EJ2Instance).ej2_instances[0] as DropDownList;
        calendarDDL.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
        calendarDDL.value = args.data?.CalendarId || this.selectedCalendars?.ids[0] || this.calendars[0]?.id;
      }
    } else if (args.type === "QuickInfo" && isNullOrUndefined(args.data.Id)) {
      args.cancel = true;
    }
  }

  public showRightSidebar(e: MouseEvent): void {
    if (!this.rightSidebar.isOpen && e?.target) {
      this.filteredData = this.getFilteredData();
      this.gridObj.dataSource = extend([], this.filteredData.unPlanned, null, true) as Record<string, any>[];
      (e.target as HTMLElement).parentElement.style.display = "none";
      this.rightSidebar.toggle();
    }
  }

  public collapseRightSidebar(): void {
    if (this.rightSidebar.isOpen) {
      this.rightSidebar.toggle();
    }
  }

  public rightSidebarClose(): void {
    const unplannedElement: HTMLElement = this.rightSidebar.element.parentElement.querySelector(".unplanned-container");
    if (unplannedElement) {
      unplannedElement.style.display = "block";
    }
  }

  public addCalendar(): void {
    if (this.dialogObj) {
      const newId = (this.calendars.length + 1);
      let calendarNameValue: string = this.calendarName.value.trim();
      calendarNameValue = calendarNameValue === "" ? "New Calendar" : calendarNameValue;
      const newItem = { name: calendarNameValue, id: newId, color: this.calendarColor.value, isSelected: true };
      this.calendars.push(newItem);
      this.selectedCalendars = this.getSelectedCalendars();
      this.calendarsList.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
      this.dialogObj.hide();
    }
  }

  public editCalendar(): void {
    if (this.dialogObj) {
      const newValue: string = this.calendarName.value.trim();
      const newColor: string = this.calendarColor.value.trim();
      if (newValue.length > 0) {
        this.calendars = this.calendars.map((item: Record<string, any>): Record<string, any> => {
          if (item.id === this.activeCalendarData.id) {
            return { ...item, name: newValue, color: newColor };
          }
          return item;
        });
        this.selectedCalendars = this.getSelectedCalendars();
        this.calendarsList.dataSource = extend([], this.calendars, null, true) as Record<string, any>[];
        this.scheduleObj.refreshEvents();
      }
      this.dialogObj.hide();
    }
  }

  public beforeDialogOpen(): void {
    if (this.calendarName && this.calendarColor) {
      this.calendarName.value = this.activeCalendarData.name;
      this.calendarColor.value = this.activeCalendarData.color;
    }
  }
}