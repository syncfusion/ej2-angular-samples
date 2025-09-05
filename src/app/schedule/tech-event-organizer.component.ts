import { Component, Inject, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { addClass, extend, Internationalization, removeClass } from '@syncfusion/ej2-base';
import { View, EventSettingsModel, EventRenderedArgs, ScheduleComponent, DayService, WeekService, ResizeService, DragAndDropService, ScheduleModule, AgendaService, CellClickEventArgs, EventClickArgs, PopupOpenEventArgs, PopupCloseEventArgs, ResourcesModel, Print, ExcelExport } from '@syncfusion/ej2-angular-schedule';
import { aiAutomationEventData, cloudSecurityEventData, TechnicalEventData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DateTimePicker } from '@syncfusion/ej2-angular-calendars';
import { AnimationSettingsModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { FieldsSettingsModel } from '@syncfusion/ej2-navigations';
import { DragAndDropEventArgs, TreeViewComponent, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { closest } from '@syncfusion/ej2-base';
import { ResourceDetails } from '@syncfusion/ej2-schedule';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { CommonModule } from '@angular/common';
ScheduleComponent.Inject(Print, ExcelExport);
@Component({
  selector: 'control-content',
  templateUrl: 'tech-event-organizer.html',
  styleUrls: ['tech-event-organizer.style.css'],
  providers: [DayService, WeekService, ResizeService, DragAndDropService, AgendaService],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, DropDownButtonModule, TreeViewModule, DialogModule,]
})
export class TechEventOrganizerComponent implements OnInit {
  @ViewChild('scheduleRef', { static: false }) public scheduleRef: ScheduleComponent;
  @ViewChild('scheduleRef', { read: ElementRef }) scheduleElement!: ElementRef;
  @ViewChild('alertDialog', { static: false })public alertDialogRef!: DialogComponent;
  @ViewChild('allUnplannedEventsTreeView') allUnplannedEventsTreeView: TreeViewComponent;
  @ViewChild('cloudSecurityEventTreeView', { static: false }) cloudSecurityEventTreeView: TreeViewComponent;
  @ViewChild('aiAutomationEventTreeView', { static: false }) aiAutomationEventTreeView: TreeViewComponent;
  public intl: Internationalization = new Internationalization();
  public treeFields: FieldsSettingsModel;
  public selectedRoom: number = 0; 
  public alertDialogButtons: any[] = [];
  public eventsData: Record<string, any>[] = extend([], TechnicalEventData, null, true) as Record<string, any>[];
  public currentView: View = 'Day';
  public selectedDate: Date = new Date(2025, 1, 24);
  public selectedUnplannedEventItem: number = 0;
  public unplannedEvents: string[] = ['All', 'Cloud Security Essentials', 'AI for Automation'];
  public animationSettings: AnimationSettingsModel = { effect: 'None' };
  public unplannedEvent1Data: Record<string, any>[] = [];
  public unplannedEvent2Data: Record<string, any>[] = [];
  public allUnplannedEventsData: Record<string, any>[] = [];
  public unplannedEvent1TreeFields: FieldsSettingsModel;
  public unplannedEvent2TreeFields: FieldsSettingsModel;
  public unPlannedEventsList: { id: string; name: string }[] = [];
  public allUnplannedEventsTreeFields: Record<string, any> = {};
  public isDraggedItemDropped: boolean = false;
  public draggedItemId: number;
  public draggedItemSpeakers: string;
  public draggedItemDescription: string;
  public unplannedEventsTreeViewRefs: any[] = []; 
  public showTimeIndicator = false;
  public eventAdded: boolean = false;
  public lockedScrollTop: number = 0;

  public eventSettings: EventSettingsModel = {
    dataSource: this.eventsData,
    fields: {
      subject: { name: 'Subject' },
      location: { name: 'Title', title: 'Event' },
      startTime: { name: 'StartTime', validation: { required: true } },
      endTime: { name: 'EndTime', validation: { required: true } },
      description: {
        name: 'Capacity',
        title: 'Participants Count',
        validation: { required: true }
      }
    }
  };
  public timeScale: Object = {
    enable: true,
    interval: 60,
    slotCount: 3
  };
  public group: Object = {
    resources: ['Rooms']
  };
  public rooms: Record<string, any>[] = [
    { RoomId: 1, RoomName: 'Room A', RoomCapacity: 100, RoomColor: '#0F6CBD' },
    { RoomId: 2, RoomName: 'Room B', RoomCapacity: 200, RoomColor: '#B71C1C' },
    { RoomId: 3, RoomName: 'Room C', RoomCapacity: 300, RoomColor: '#E65100' },
    { RoomId: 4, RoomName: 'Room D', RoomCapacity: 400, RoomColor: '#558B2F' },
  ];

  roomsData: { RoomId: number; RoomName: string }[] = [
    { RoomId: 0, RoomName: 'All' },
    { RoomId: 1, RoomName: 'Room A' },
    { RoomId: 2, RoomName: 'Room B' },
    { RoomId: 3, RoomName: 'Room C' },
    { RoomId: 4, RoomName: 'Room D' },
  ];
  public printExportItems: object[] = [
    { text: "Print", id: "print" },
    { text: "Export", id: "export" },
  ];

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['tech-event-organizer.html'];
  }
   ngAfterViewInit(): void {
    setTimeout(() => {
      this.scheduleRef.refresh();
    });
  }
    ngOnInit(): void {
    this.unplannedEvent1TreeFields = {
      dataSource: this.unplannedEvent1Data,
      id: 'Id',
      text: 'Subject'
    };
    this.unplannedEvent2TreeFields = {
      dataSource: this.unplannedEvent2Data,
      id: 'Id',
      text: 'Subject'
    };
    this.unplannedEvent1Data = extend([], cloudSecurityEventData, null, true) as Record<string, any>[];
    this.unplannedEvent2Data = extend([], aiAutomationEventData, null, true) as Record<string, any>[];
    this.allUnplannedEventsData = this.unplannedEvent1Data.concat(this.unplannedEvent2Data);
    this.treeFields = {
      dataSource: this.allUnplannedEventsData,
      id: 'Id',
      text: 'Subject',
    };
    this.unPlannedEventsList = this.unplannedEvents.map((name, index) => ({
      id: index.toString(),
      name: name === '' ? 'All' : name
    }));
    this.allUnplannedEventsTreeFields = {
      dataSource: this.allUnplannedEventsData,
      id: 'Id',
      text: 'Subject'
    };
    this.alertDialogButtons = [
      {
        click: () => {
          this.alertDialogRef.hide();
        },
        buttonModel: {
          isPrimary: true,
          content: 'OK',
        },
      }
    ];
  }
  public isBreakOrLunch(subject: string): boolean {
    if (!subject) return false;
    const lower = subject.toLowerCase();
    return lower.includes('break') || lower.includes('lunch');
  }

  public getTimeString(value: Date): string {
    return this.intl.formatDate(value, { type: 'time', skeleton: 'short' });
  }

  public onUnplannedEventSelect(args: ChangeEventArgs): void {
    const treeViewRefs = [
      this.allUnplannedEventsTreeView,
      this.cloudSecurityEventTreeView,
      this.aiAutomationEventTreeView
    ];

    const previouslySelectedItem = parseInt((args.previousItemData as any)?.id, 10);
    this.selectedUnplannedEventItem = parseInt(args.value as any, 10);
    treeViewRefs[previouslySelectedItem].element.style.display = 'none';
    treeViewRefs[this.selectedUnplannedEventItem].element.style.display = '';

    const updatedData =
      this.selectedUnplannedEventItem === 0
        ? [
          ...(treeViewRefs[1].fields.dataSource as any),
          ...(treeViewRefs[2].fields.dataSource as any)
        ]
        : this.unplannedEventsUpdatedData(
          this.allUnplannedEventsData,
          this.unplannedEvents[this.selectedUnplannedEventItem]
        );
    treeViewRefs[this.selectedUnplannedEventItem].fields.dataSource = updatedData;
    this.handleEmptyDataSourceDisplay(treeViewRefs[this.selectedUnplannedEventItem], updatedData);
  }

  public unplannedEventsUpdatedData(dataSource: Record<string, any>[], value: string): Record<string, any>[] {
    return dataSource.filter((data) => data.Title === value);
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const data = args.data as any;
    const isBreakEvent = data.Subject.toLowerCase().includes('break') || data.Subject.toLowerCase().includes('lunch');
    if (isBreakEvent) {
      if (args.element.classList.contains('e-agenda-item')) {
        const appointment = args.element.querySelector('.e-appointment');
        if (appointment) {
          appointment.classList.add('e-break-event');
        }
      } else {
        args.element.classList.add('e-break-event');
      }
    }
  }

  onCellClick(args: CellClickEventArgs): void {
    args.cancel = true; 
  }

  onEventClick(args: EventClickArgs): void {
    if (!this.eventAdded) {
      let popupInstance = (document.querySelector(".e-quick-popup-wrapper") as any).ej2_instances[0];
      popupInstance.open = () => {
        popupInstance.refreshPosition();
      };
      this.eventAdded = true;
    }
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    const isQuickInfoPopup: boolean = args.type === 'QuickInfo' || args.type === 'ViewEventInfo';
    const isEditorPopup: boolean = args.type === 'Editor';
    const isBreakEvent: boolean = args.target?.classList.contains('e-break-event');

    if ((isQuickInfoPopup && isBreakEvent) || (isEditorPopup && !this.isDraggedItemDropped)) {
      args.cancel = true;
      return;
    }

    if (isQuickInfoPopup && args.element) {
      args.element.classList.add('event-management-quick-popup');
    } else if (isEditorPopup && args.element) {
      args.element.classList.add('event-management-editor-popup');
      args.element.querySelector('.capacity-alert')?.remove();
      args.element.querySelector('.time-alert')?.remove();

      const startTimeElement: HTMLElement = args.element.querySelector('.e-start-end-row .e-start.e-control.e-datetimepicker');
      const endTimeElement: HTMLElement = args.element.querySelector('.e-start-end-row .e-end.e-control.e-datetimepicker');

      if (startTimeElement && endTimeElement) {
        const startDateTimePickerRef: DateTimePicker = (startTimeElement as any).ej2_instances?.[0];
        const endDateTimePickerRef: DateTimePicker = (endTimeElement as any).ej2_instances?.[0];

        if (startDateTimePickerRef && endDateTimePickerRef) {
          startDateTimePickerRef.change = () => {
            const startTime: Date = new Date(startDateTimePickerRef.value as Date);
            if (args.data && args.data['Duration']) {
              const durationMatch = args.data['Duration'].match(/(\d+)\s+(hour|hours|minute|minutes)/i);
              if (durationMatch) {
                const durationValue: number = parseInt(durationMatch[1]);
                const durationUnit: string = durationMatch[2].toLowerCase();
                const newEndTime: Date = new Date(startTime);

                if (durationUnit === 'hour' || durationUnit === 'hours') {
                  newEndTime.setHours(newEndTime.getHours() + durationValue);
                } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
                  newEndTime.setMinutes(newEndTime.getMinutes() + durationValue);
                }
                endDateTimePickerRef.value = newEndTime;
              }
            }
          };
        }
      }
    }
  }

public onPopupClose(args: PopupCloseEventArgs): void {
  if (args.type === 'Editor') {
    const targetElement = args.event?.target as HTMLElement
    const isSaveAction =
      targetElement &&
      (
        targetElement.textContent?.trim().toLowerCase() === 'save' ||
        targetElement.classList.contains('e-save-icon') ||
        targetElement.classList.contains('e-event-save')
      );
    if (isSaveAction) {
      const roomId: number = args.data.RoomId;
      const startTime: Date = args.data.StartTime;
      const endTime: Date = args.data.EndTime;
      const capacity: number = args.data.Capacity;
      const isRoomFiltered = (this.scheduleRef.resourceCollection[0].dataSource as any[]).length === 1;
      const isRoomAvailable =
        this.scheduleRef.isSlotAvailable(startTime, endTime, !isRoomFiltered ? roomId - 1 : 0) &&
        startTime.getHours() >= 8 &&
        (endTime.getHours() < 18 || (endTime.getHours() === 18 && endTime.getMinutes() === 0));
      const isCapacityAvailable = this.checkRoomCapacity(capacity, roomId);

      if (!isRoomAvailable) {
        const timeElement = args.element.querySelector('.e-start-end-row');
        if (!args.element.querySelector('.time-alert')) {
          const newDiv = document.createElement('div');
          newDiv.classList.add('time-alert');
          newDiv.textContent = 'Select an open time between 8 a.m. and 6 p.m.';
          timeElement?.insertAdjacentElement('afterend', newDiv);
        }
      } else {
        const timeAlert = args.element.querySelector('.time-alert');
        if (timeAlert) timeAlert.remove();
      }

      if (!isCapacityAvailable) {
        const descElement = args.element.querySelector('.e-description-row');
        if (!args.element.querySelector('.capacity-alert')) {
          const newDiv = document.createElement('div');
          newDiv.classList.add('capacity-alert');
          newDiv.textContent = "Number of participants exceeds the room's limit.";
          descElement?.insertAdjacentElement('afterend', newDiv);
        }
      } else {
        const capAlert = args.element.querySelector('.capacity-alert');
        if (capAlert) capAlert.remove();
      }

      if (!isRoomAvailable || !isCapacityAvailable) {
        args.cancel = true;
        return;
      }

      const unplannedTreeViews = [
        this.allUnplannedEventsTreeView,
        this.cloudSecurityEventTreeView,
        this.aiAutomationEventTreeView
      ];
      const activeTreeView = unplannedTreeViews[this.selectedUnplannedEventItem];
      const treeData = activeTreeView.fields.dataSource as any[];
      const updatedData = treeData.filter(item => item.Id !== this.draggedItemId);
      activeTreeView.fields.dataSource = updatedData;
      this.allUnplannedEventsData = this.allUnplannedEventsData.filter(item => item.Id !== this.draggedItemId);
      this.handleEmptyDataSourceDisplay(activeTreeView, updatedData);

      args.data.Speakers = this.draggedItemSpeakers;
      args.data.Description = this.draggedItemDescription;
    }

    this.isDraggedItemDropped = false;
  }
}

  public onRoomChange(args: ChangeEventArgs): void {
    const schedule = this.scheduleRef;
    const value = Number(args.value);
    const previous: any = args.previousItemData;

    if (!previous) return;

    if (value === 0) {
      schedule.removeResource(previous.RoomId, 'Rooms');
      schedule.addResource(this.rooms, 'Rooms', value);
    } else {
      if (previous.RoomId === 0) {
        this.rooms.filter(r => r.RoomId !== value).forEach(r => {
          schedule.removeResource(r.RoomId, 'Rooms');
        });
      } else {
        schedule.removeResource(previous.RoomId, 'Rooms');
        const newRoom = this.rooms.find(r => r.RoomId === value);
        schedule.addResource(newRoom, 'Rooms', value);
      }
    }
    schedule.dataBind();
  }

  public handlePrintExportSelect(args: MenuEventArgs): void {
    switch (args.item.id) {
      case 'print':
        document.querySelectorAll('.toolbar-post-agenda').forEach(item => {
          (item as HTMLElement).style.display = 'none';
        });
        this.scheduleRef.print();

        setTimeout(() => {
          document.querySelectorAll('.toolbar-post-agenda').forEach(item => {
            (item as HTMLElement).style.display = 'inline-block';
          });
        }, 1000);
        break;

      case 'export':
        const exportValues = {
          fields: ['Id', 'Subject', 'Title', 'StartTime', 'EndTime', 'RoomId', 'Capacity']
        };
        this.scheduleRef.exportToExcel(exportValues);
        break;
    }
  }

  isDataSourceEmpty(dataSource: Record<string, any>[]): boolean {
    return !dataSource || dataSource.length === 0;
  }

  handleEmptyDataSourceDisplay(treeViewRef: any, dataSource: Record<string, any>[]): void {
    const noEventsElement = document.querySelector('.no-events-message') as HTMLElement;

    if (noEventsElement) {
      if (this.isDataSourceEmpty(dataSource)) {
        treeViewRef.element.style.display = 'none';
        noEventsElement.classList.remove('hidden');
      } else {
        treeViewRef.element.style.display = 'block';
        noEventsElement.classList.add('hidden');
      }
    }
  }
  checkRoomCapacity(capacity: number, roomId: number): boolean {
    const room: Record<string, any> | undefined = this.rooms.find(room => room.RoomId === roomId);
    return !!room && room.RoomCapacity >= capacity;
  }

  toggleUnplannedEventsElement(): void {
    const settingsPanel = document.querySelector('.unplanned-events-container') as HTMLElement;
    if (!settingsPanel) {
      return;
    }
    const scheduleElement = this.scheduleElement.nativeElement as HTMLElement;
    const toggleButton = scheduleElement.querySelector('.e-show-unplanned-events') || scheduleElement.querySelector('.e-hide-unplanned-events');

    if (!toggleButton) {
      return;
    }
    if (settingsPanel.classList.contains('hide')) {
      removeClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-hide-unplanned-events', 'e-show-unplanned-events');
    } else {
      addClass([settingsPanel], 'hide');
      toggleButton.classList.replace('e-show-unplanned-events', 'e-hide-unplanned-events');
    }
  }

  public getRoomName(value: any): string {
    return value.resourceData ? value.resourceData[value.resource.textField] : value.resourceName;
  }

  getRoomNameById(roomId: number): string {
    const room = this.rooms.find(r => r.RoomId === roomId);
    return room ? room.RoomName : 'N/A';
  }

  getRoomCapacity(capacity: string): string {
    return 'Capacity - ' + capacity;
  }

  getResourceData(roomId: number): { [key: string]: Object } {
    const resources: ResourcesModel[] = this.scheduleRef.getResourceCollections();
    const lastResourceLevel = resources[resources.length - 1];
    const resourceData = (lastResourceLevel.dataSource as any[]).find(resource => resource.RoomId === roomId);
    return resourceData;
  }

  getQuickInfoHeaderStyle(data: any): { [key: string]: Object } {
    const resourceData = this.getResourceData(data.RoomId);
    const styleObj = {
      background: resourceData?.RoomColor || '#000',
      color: '#FFFFFF'
    };
    return styleObj;
  }

  getQuickInfoDurationText(data: Record<string, any>): string {
    return this.intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
      this.intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
      this.intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
  }

  formatSpeakers(speakers: any[]): string {
    return speakers.map((s, i) => {
      const nameWithTitle = `${s.Name} (${s.Title})`;
      if (i === speakers.length - 1) return nameWithTitle;
      if (i === speakers.length - 2) return nameWithTitle + ' and ';
      return nameWithTitle + ', ';
    }).join('');
  }

  public closeQuickInfoPopup(): void {
    this.scheduleRef.closeQuickInfoPopup();
  }

  public onTreeDragStart(): void {
      const scheduleContent = this.scheduleRef.element.querySelector('.e-content-wrap') as HTMLElement;
    if (scheduleContent) {
      this.lockedScrollTop = scheduleContent.scrollTop;
      scheduleContent.addEventListener('scroll', this.freezeScroll);
    }
    document.body.classList.add('e-disble-not-allowed');
  }

  public onTreeDragging(event: DragAndDropEventArgs): void {
    document.body.classList.add('tree-item-dragging');

    // Handle adaptive mode
    if (this.scheduleRef.isAdaptive) {
      const classElement = this.scheduleRef.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }

      if ((event.target as HTMLElement).classList.contains('e-work-cells')) {
        addClass([event.target as HTMLElement], 'e-device-hover');
      }
    }

    // Conditional cursor styling
    if ((event.target as HTMLElement).classList.contains('e-work-cells')) {
      (event.target as HTMLElement).classList.remove('not-allowed-cursor');
    } else {
      (event.target as HTMLElement).classList.add('not-allowed-cursor');
    }
  }
 private freezeScroll = (e: Event): void => {
    (e.target as HTMLElement).scrollTop = this.lockedScrollTop;
  }

  public onTreeDragStop(event: DragAndDropEventArgs): void {
      const scheduleContent = this.scheduleRef.element.querySelector('.e-content-wrap') as HTMLElement;
    if (scheduleContent) {
      scheduleContent.removeEventListener('scroll', this.freezeScroll);
    }
    document.body.classList.remove('tree-item-dragging');
    document.querySelectorAll('.not-allowed-cursor').forEach(el =>
      el.classList.remove('not-allowed-cursor')
    );
    const treeviewElement = closest(event.target as Element, '.e-treeview');
    const classElement = this.scheduleRef.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }

    if (!treeviewElement) {
      event.cancel = true;
      const scheduleElement = closest(event.target as Element, '.e-content-wrap');

      if (scheduleElement && (event.target as HTMLElement).classList.contains('e-work-cells')) {
        const treeviewData = this.allUnplannedEventsTreeView.fields.dataSource as Record<string, any>[];
        const draggedId = parseInt(event.draggedNodeData.id as string, 10);
        const filteredData = treeviewData.filter((item: any) => item.Id === draggedId);

        if (filteredData.length === 0) return;

        const {
          Subject, Capacity, Speakers, Description, Duration,
          EventType, TargetAudience, EventLevel, EventTags, Title
        } = filteredData[0];

        const cellData: CellClickEventArgs = this.scheduleRef.getCellDetails(event.target as Element);
        const StartTime = cellData.startTime;
        let EndTime: Date;
        const [durationValue, durationUnit] = Duration.split(' ');
        const copyStartTime = new Date(StartTime);

        if (durationUnit === 'hour' || durationUnit === 'hours') {
          copyStartTime.setHours(copyStartTime.getHours() + parseInt(durationValue));
        } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
          copyStartTime.setMinutes(copyStartTime.getMinutes() + parseInt(durationValue));
        }
        EndTime = copyStartTime;
        const resourceDetails = this.scheduleRef.getResourcesByIndex(cellData.groupIndex) as ResourceDetails;
        const roomId = resourceDetails.resourceData.RoomId;
        const isRoomFiltered = (this.scheduleRef.resourceCollection[0].dataSource as any[]).length === 1;
        const isRoomAvailable = this.scheduleRef.isSlotAvailable(StartTime, EndTime, !isRoomFiltered ? roomId - 1 : 0);
        const isCapacityAvailable = this.checkRoomCapacity(Capacity, roomId);

        if (!isRoomAvailable || !isCapacityAvailable) {
          this.alertDialogRef.content = !isRoomAvailable
            ? 'This room is already booked for this time slot. Please select a different room or time.'
            : 'This room cannot accommodate the stated number of attendees. Please select a room with a suitable capacity.';
          this.alertDialogRef.show();
          return;
        }

        const eventData = {
          Subject,
          Title,
          StartTime,
          EndTime,
          RoomId: roomId,
          Capacity,
          Duration,
          EventType,
          TargetAudience,
          EventLevel,
          EventTags
        };
        this.isDraggedItemDropped = true;
        this.draggedItemId = draggedId;
        this.draggedItemSpeakers = Speakers;
        this.draggedItemDescription = Description;

        this.scheduleRef.openEditor(eventData, 'Add', true);
      }
    }
    document.body.classList.remove('e-disble-not-allowed');
  }
}
