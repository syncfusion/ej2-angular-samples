import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { extend, closest, isNullOrUndefined, remove, removeClass } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ScheduleComponent, CellClickEventArgs, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { scheduleData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'context-menu.html',
    styleUrls: ['context-menu.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    standalone: true,
    imports: [ScheduleModule, ContextMenuModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ScheduleContextMenuComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('menuObj') public menuObj: ContextMenuComponent;
  public allowResizing = false;
  public allowDragDrop = false;
  public selectedDate: Date = new Date(2021, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };
  public selectedTarget: Element;
  public menuItems: MenuItemModel[] = [
    { text: 'New Event', iconCss: 'e-icons e-plus', id: 'Add' },
    { text: 'New Recurring Event', iconCss: 'e-icons e-repeat', id: 'AddRecurrence' },
    { text: 'Today', iconCss: 'e-icons e-timeline-today', id: 'Today' },
    { text: 'Edit Event', iconCss: 'e-icons e-edit', id: 'Save' },
    {
      text: 'Edit Event', id: 'EditRecurrenceEvent', iconCss: 'e-icons e-edit', items: [
        { text: 'Edit Occurrence', id: 'EditOccurrence' },
        { text: 'Edit Series', id: 'EditSeries' }
      ]
    },
    { text: 'Delete Event', iconCss: 'e-icons e-trash', id: 'Delete' },
    {
      text: 'Delete Event', id: 'DeleteRecurrenceEvent', iconCss: 'e-icons e-trash', items: [
        { text: 'Delete Occurrence', id: 'DeleteOccurrence' },
        { text: 'Delete Series', id: 'DeleteSeries' }
      ]
    }
  ];

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['context-menu.style.css'];
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
    let eventObj: Record<string, any>;
    if (this.selectedTarget.classList.contains('e-appointment')) {
      eventObj = this.scheduleObj.getEventDetails(this.selectedTarget) as Record<string, any>;
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
          // tslint:disable-next-line:max-line-length
          const query = new Query().where(this.scheduleObj.eventFields.id, 'equal', eventObj[this.scheduleObj.eventFields.recurrenceID] as string | number);
          eventObj = (new DataManager(this.scheduleObj.eventsData).executeLocal(query)[0] as Record<string, any>);
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
