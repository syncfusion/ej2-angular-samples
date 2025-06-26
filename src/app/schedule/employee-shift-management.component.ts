import { Component, ViewEncapsulation, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { employeeShiftData, waitingList } from './data';
import { extend, closest, addClass, Internationalization } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, GroupModel, TimelineViewsService, EventRenderedArgs, TimelineMonthService, AgendaService, ResizeService, WorkHoursModel, DragAndDropService, ScheduleComponent, ActionEventArgs, ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, NavigatingEventArgs, CellClickEventArgs, PopupCloseEventArgs, EventClickArgs } from '@syncfusion/ej2-angular-schedule';
import { DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { TreeViewComponent, TreeViewModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CommonModule, NgIf } from '@angular/common';
import { AnimationSettingsModel, Tooltip, ButtonPropsModel } from '@syncfusion/ej2-popups';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ChipListModule, ChipListComponent, ClickEventArgs } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs, DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
interface StaffItem {
  Id: number;
  Name: string;
  Description: string;
  role: string;
}
@Component({
  selector: 'control-content',
  templateUrl: 'employee-shift-management.html',
  styleUrls: ['employee-shift-management.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService, AgendaService, DayService, WeekService, WorkWeekService, MonthService,],
  standalone: true,
  imports: [ScheduleModule, NgIf, CommonModule, DialogModule, TreeViewModule, SBActionDescriptionComponent, SBDescriptionComponent, ChipListModule, DropDownListModule, ToolbarModule]
})
export class EmployeeShiftManagement {
  private intl = new Internationalization();
  public requestedShift: { id: string; name: string } | null = null;
  public shiftsData: {
    id: number;
    name: string;
    designationId: string;
    employeeId: string;
    eventId: string;
    role?: string;
  }[] = [];
  @ViewChild('editorHeaderTemplate', { static: true }) public editorHeaderTemplate!: TemplateRef<any>;
  @ViewChild('shiftDropdown', { static: false }) public shiftDropdown!: DropDownListComponent;
  @ViewChild('toolbarChips', { static: false }) public toolbarChips!: ChipListComponent;
  @ViewChild('dropdown') dropdown: DropDownListComponent;
  @ViewChild('externalChips') externalChips: ChipListComponent;
  @ViewChild('allTree', { static: true }) public allTree: TreeViewComponent;
  @ViewChild('doctorsTree', { static: true }) public doctorsTree: TreeViewComponent;
  @ViewChild('nursesTree', { static: true }) public nursesTree: TreeViewComponent;
  @ViewChild('staffsTree', { static: true }) public staffsTree: TreeViewComponent;
  @ViewChild('agendaToolbarTmpl', { read: TemplateRef }) agendaToolbarTmpl: TemplateRef<any>;
  @ViewChild('chipList') chipList: ChipListComponent;
  @ViewChild('agendaTemplateRef', { static: true }) public agendaTemplateRef!: TemplateRef<any>;
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('treeObj') public treeObj: TreeViewComponent;
  @ViewChild('majorSlotTemplate', { static: true }) public majorSlotTemplate: any;
  public field: Record<string, any> = { dataSource: waitingList, id: 'Id', text: 'Name' };
  public allowDragAndDrop = true;
  public selectedEmployeeName: string | number = '';
  public employeeNamesList: { id: string; name: string; employeeId: string }[] = [];
  public selectedEmployee!: { id: string; name: string; employeeId: string };
  public selectedShift!: { id: number; name: string; designationId: string; employeeId: string; eventId: string };
  public dialogVisible: boolean = false;
  private tooltipInstances: Tooltip[] = [];
  public treeInstances: TreeViewComponent[] = [];
  public chipIndex = 0;
  private prevChipIndex = 0;
  public dropdownData: string[] = [];
  public imageMap: { [key: string]: string };
  public timeScale: any;
  public isTreeItemDropped = false;
  public draggedItemId = '';
  public eventsdata: Record<string, any>[] = extend([], employeeShiftData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2025, 2, 5);
  public currentView: View = 'TimelineWeek';
  public showAgendaToolbar = false;
  public allowMultiple = false;
  public workHours: WorkHoursModel = { start: '00:00', end: '23:59' };
  public buttons: ButtonPropsModel[];
  public agendaDropdownItems: { value: string; text: string }[] = [];
  public agendaDropdownValue: string | null = null;
  public agendachipIndex: number = 0;
  private pendingRemovalData: any = null;
  private pendingRemovalId: number | null = null;
  public employeeRole: Record<string, any>[] = [
    { Text: 'Doctors', Id: 1 },
    { Text: 'Nurses', Id: 2 },
    { Text: 'Supporting Staffs', Id: 3 },
  ];
  public designationsData: Record<string, any>[] = [
    { Text: 'Attending Physician', Id: 1, GroupId: 1 },
    { Text: 'Hospitalist', Id: 2, GroupId: 1 },
    { Text: 'General Pediatrician', Id: 3, GroupId: 1 },
    { Text: 'Resident Doctor', Id: 4, GroupId: 1 },
    { Text: 'Senior Nurse', Id: 5, GroupId: 2 },
    { Text: 'Nurse Practitioner', Id: 6, GroupId: 2 },
    { Text: 'Medical Assistant', Id: 7, GroupId: 3 },
    { Text: 'Receptionist', Id: 8, GroupId: 3 },
  ];
  private readonly imagePath: string = './assets/schedule/images/';
  private salmanImage = `${this.imagePath}salman@3x.png`;
  private brianImage = `${this.imagePath}brian@3x.png`;
  private jakeImage = `${this.imagePath}jake@3x.png`;
  private jenniferImage = `${this.imagePath}Jennifer.png`;
  private davidImage = `${this.imagePath}David.png`;
  private williamImage = `${this.imagePath}William.png`;
  private emmaImage = `${this.imagePath}Emma.png`;
  private lilyImage = `${this.imagePath}Lily.png`;
  private avaImage = `${this.imagePath}Ava.png`;
  private graceImage = `${this.imagePath}Grace.png`;
  private michaelImage = `${this.imagePath}Michael.png`;
  private thomasImage = `${this.imagePath}Thomas.png`;
  private rickyImage = `${this.imagePath}Ricky.png`;
  private jamesImage = `${this.imagePath}James.png`;
  private benjaminImage = `${this.imagePath}Benjamin.png`;
  private oliviaImage = `${this.imagePath}Olivia.png`;
  private chloeImage = `${this.imagePath}Chloe.png`;
  private john = `${this.imagePath}robert.png`;
  private nashil = `${this.imagePath}nancy.png`;
  private daniel = `${this.imagePath}robson.png`;
  private mark = `${this.imagePath}will-smith.png`;
  private olivia = `${this.imagePath}margaret.png`;
  private zoe = `${this.imagePath}laura.png`;
  private kevin = `${this.imagePath}alice.png`;
  public employeeImages: { name: string, image: string }[] = [
    { name: 'Jennifer', image: this.jenniferImage },
    { name: 'William', image: this.williamImage },
    { name: 'David', image: this.davidImage },
    { name: 'Michael', image: this.michaelImage },
    { name: 'Thomas', image: this.thomasImage },
    { name: 'Salman', image: this.salmanImage },
    { name: 'Brian', image: this.brianImage },
    { name: 'Emma', image: this.emmaImage },
    { name: 'Lily', image: this.lilyImage },
    { name: 'Ava', image: this.avaImage },
    { name: 'Grace', image: this.graceImage },
    { name: 'Olivia', image: this.oliviaImage },
    { name: 'Chloe', image: this.chloeImage },
    { name: 'Ricky', image: this.rickyImage },
    { name: 'James', image: this.jamesImage },
    { name: 'Benjamin', image: this.benjaminImage },
    { name: 'Jake', image: this.jakeImage },
    { name: 'John', image: this.john },
    { name: 'Nashil', image: this.nashil },
    { name: 'Daniel', image: this.daniel },
    { name: 'Mark', image: this.mark },
    { name: 'Olivia', image: this.olivia },
    { name: 'Zoe', image: this.zoe },
    { name: 'Kevin', image: this.kevin },
  ];
  private doctorsData: StaffItem[] = [
    { Id: 1, Name: 'Mark', Description: 'Attending Physician', role: 'Doctors' },
    { Id: 2, Name: 'Brian', Description: 'Hospitalist', role: 'Doctors' },
    { Id: 3, Name: 'Kevin', Description: 'General Pediatrician', role: 'Doctors' },
    { Id: 4, Name: 'Salman', Description: 'Resident Doctor', role: 'Doctors' }
  ];
  private nursesData: StaffItem[] = [
    { Id: 5, Name: 'Olivia', Description: 'Senior Nurse', role: 'Nurses' },
    { Id: 6, Name: 'Zoe', Description: 'Nurse Practitioner', role: 'Nurses' }
  ];
  private staffsData: StaffItem[] = [
    { Id: 7, Name: 'Ricky', Description: 'Medical Assistant', role: 'Support Staffs' },
    { Id: 8, Name: 'Jake', Description: 'Receptionist', role: 'Support Staffs' }
  ];
  private allData: StaffItem[] = [...this.doctorsData, ...this.nursesData, ...this.staffsData];
  public allTreeFields = { dataSource: this.allData as any[], id: 'Id', text: 'Name' };
  public doctorsTreeFields = { dataSource: this.doctorsData as any[], id: 'Id', text: 'Name' };
  public nursesTreeFields = { dataSource: this.nursesData as any[], id: 'Id', text: 'Name' };
  public staffsTreeFields = { dataSource: this.staffsData as any[], id: 'Id', text: 'Name' };
  public roles = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Doctors' },
    { id: 2, name: 'Nurses' },
    { id: 3, name: 'Support Staffs' }
  ];
  public group: GroupModel = { enableCompactView: false, resources: ['Role', 'Designation'] };
  public eventSettings: EventSettingsModel = {
    dataSource: [...this.eventsdata],
    fields: {
      subject: { title: 'Name', name: 'Subject' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' },
      description: { title: 'Reason', name: 'Description' }
    },
    query: new Query()
  };
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.timeScale = {
        interval: 480,
        slotCount: 3,
        majorSlotTemplate: this.majorSlotTemplate
      };
      this.treeInstances = [this.allTree, this.doctorsTree, this.nursesTree, this.staffsTree];
      this.allData = [...this.doctorsData, ...this.nursesData, ...this.staffsData];
      this.allTreeFields.dataSource = this.allData;

      this.scheduleObj.refresh();
      this.chngDetRef.detectChanges();

      if (this.doctorsTree?.element) {
        this.doctorsTree.element.style.display = 'none';
      }
      if (this.nursesTree?.element) {
        this.nursesTree.element.style.display = 'none';
      }
      if (this.staffsTree?.element) {
        this.staffsTree.element.style.display = 'none';
      }
    });
  }
  constructor(private chngDetRef: ChangeDetectorRef, private vc: ViewContainerRef) {
    this.buttons = this.getButtons();
    this.imageMap = this.employeeImages.reduce((acc, cur) => {
      acc[cur.name.toLowerCase()] = cur.image;
      return acc;
    }, {} as any);
  }


  //to prevent the cell click
  onCellClick(args: CellClickEventArgs): void {
    args.cancel = true;
  }

  private getEventElement(data: any): HTMLElement {
    const { Subject = '', StartTime, EndTime } = data;
    let employeeName: string;
    if (Subject.includes('covers for')) {
      employeeName = Subject.split(' covers for ')[0].trim();
    } else if (Subject.includes('swapped')) {
      const matchedData = Subject.match(/^(.+?) swapped/);
      employeeName = matchedData ? matchedData[1].trim() : Subject;
    } else {
      employeeName = Subject;
    }
    const match = this.employeeImages.find(e => e.name === employeeName);
    const imageUrl = match ? match.image : '';
    const wrap = document.createElement('div');
    wrap.className = 'template-wrap';
    const staff = document.createElement('div');
    staff.className = 'e-staff';
    const img = document.createElement('img');
    img.className = 'staff-image';
    img.src = imageUrl;
    const info = document.createElement('div');
    info.className = 'staff-info';
    const empName = document.createElement('div');
    empName.className = 'e-name';
    empName.innerText = employeeName;
    const des = document.createElement('div');
    des.className = 'e-designation';
    des.innerText = `${this.getShortTimeString(StartTime)} - ${this.getShortTimeString(EndTime)}`;
    info.appendChild(empName);
    info.appendChild(des);
    staff.appendChild(img);
    staff.appendChild(info);
    wrap.appendChild(staff);
    return wrap;
  }

  //To Render the Events on Schedule
  public onEventRendered(args: EventRenderedArgs): void {
    const element: HTMLElement = args.element as HTMLElement;
    const data = args.data as any;
    const hour = (data.StartTime as Date).getHours();
    element.classList.add(hour === 7 ? 'morning-shift' : 'evening-shift');
    const inner = element.querySelector('.e-inner-wrap');
    if (inner) {
      inner.innerHTML = '';
      const customElement = this.getEventElement(data);
      const w = parseInt(element.style.width || '0', 10);
      element.style.width = (w - 5) + 'px';
      inner.appendChild(customElement);
      if (!element.classList.contains('e-read-only')) {
        const groupIndex = parseInt(element.getAttribute('data-group-index') || '0', 10);
        const classToAdd =
          groupIndex === 0 ? 'doctors-event' :
            groupIndex === 1 ? 'nurses-event' :
              'staffs-event';
        element.classList.add(classToAdd);
      }
    }

    //To add the tooltip for the icons in schedule
    const appendTooltipIcon = (
      iconClass: string,
      tooltipText: string,
      onClick?: (e: Event) => void
    ): void => {
      element.querySelectorAll('.e-icon-element').forEach(el => el.remove());
      let iconContainer = element.querySelector('.e-icon-element');
      if (!iconContainer) {
        iconContainer = document.createElement('span');
        iconContainer.className = 'e-icon-element';
        element.appendChild(iconContainer);
      }
      const icon = document.createElement('span');
      icon.className = `e-icons ${iconClass}`;
      icon.style.cursor = 'pointer';
      iconContainer.appendChild(icon);
      if (onClick) {
        icon.addEventListener('click', (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          onClick(e);
        });
      }
      icon.removeAttribute('title');
      const tooltip = new Tooltip(
        {
          cssClass: 'shift-management-tooltip',
          content: tooltipText,
          position: 'RightCenter',
          opensOn: 'Hover'
        },
        icon
      );
      this.tooltipInstances.push(tooltip);
    };
    const view = this.scheduleObj.currentView;
    if (data.Description?.toLowerCase().includes('leave')) {
      element.classList.add('event-leave');
      if (view !== 'Agenda') {
        appendTooltipIcon('e-leave', `${data.Subject} is on leave. To cover this shift, drag a staff member with the same designation from the available list and drop them here.`);
      }
    }
    if (data.Subject?.includes('covers for')) {
      element.classList.add('e-covers');
      element.classList.remove('event-leave');
      if (view !== 'Agenda') {
        appendTooltipIcon('e-swap sf-icon-user-replace', 'Leave covered by replacement');
      }
    }
    if (data.Description?.toLowerCase().includes('swap-request') &&
      !data.Subject?.toLowerCase().includes('swapped') &&
      view !== 'Agenda') {
      element.classList.add('event-swap');
      appendTooltipIcon('e-swap sf-icon-replace-request', 'Click here to swap shift', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('sf-icon-replace-request') ||
          target.classList.contains('e-swap') ||
          target.closest('.e-icons')) {
          this.requestShiftSwap(args);
        }
      });
    }
    if (data.Subject?.toLowerCase().includes('swapped')) {
      element.classList.remove('event-swap');
      element.classList.add('event-swapped');
      if (view !== 'Agenda') {
        appendTooltipIcon('e-swapped sf-icon-replace-accepted', 'This shift has been swapped');
      }
    }
  }

  //to format the shift name 
  public formatShiftName(StartTime: Date | string, EndTime: Date | string): string {
    const start = new Date(StartTime);
    const weekday = start.toLocaleDateString('en-US', { weekday: 'short' });
    return `${this.formatDate(StartTime)} ${weekday} ${this.getTimeString(StartTime)} - ${this.getTimeString(EndTime)}`;
  }
  //to format the Date
  public formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(date));
  }
  //to get the full-time 
  public getTimeString(value: Date | string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    const intl = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });
    return intl.format(date);
  }
  //to get the time as short time
  public getShortTimeString(value: Date | string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return this.intl.formatDate(date, { skeleton: 'h' });
  }
  //to get the Day as string
  public getDayString(value: Date | string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return this.intl.formatDate(date, { skeleton: 'E' });
  }
  //to filter the data
  public filterData(dataSource: any[], value: string): any[] {
    return dataSource.filter((data: any) => data.role === value);
  }

  //method called when Click the swap icon
  public requestShiftSwap(args: { element: HTMLElement }): void {
    const eventsData = this.scheduleObj.eventSettings.dataSource as Record<string, any>[];
    const appointment = args.element?.classList.contains('e-appointment')
      ? args.element
      : closest(args.element, '.e-appointment') as HTMLElement;
    if (!eventsData || !appointment) {
      return;
    }
    const tooltipElement = appointment.querySelector('.e-icon-element');
    if (tooltipElement) {
      this.tooltipInstances.forEach(t => t.destroy());
      this.tooltipInstances = [];
      tooltipElement.remove();
      this.scheduleObj.refreshEvents();
    }
    const eventDetails = this.scheduleObj.getEventDetails(appointment);
    if (!eventDetails) {
      return;
    }
    const roleId = eventDetails.RoleId;
    const designationId = eventDetails.DesignationId;
    const employeeName = eventDetails.Subject;
    let employeesData: { id: string; name: string; employeeId: string }[] = [];
    let shiftsData: { id: number; name: string; designationId: string; employeeId: string; eventId: string }[] = [];
    const filteredData = eventsData.filter(item =>
      item.Description?.toLowerCase().includes('swap-request') &&
      item.RoleId === roleId &&
      item.DesignationId === designationId &&
      item.Subject !== employeeName
    );
    filteredData.forEach((item) => {
      if (!employeesData.some(emp => emp.name === item.Subject)) {
        employeesData.push({
          id: item.DesignationId,
          name: item.Subject,
          employeeId: item.EmployeeId
        });
      }
      shiftsData.push({
        id: shiftsData.length + 1,
        name: `${this.formatShiftName(item.StartTime, item.EndTime)}`,
        designationId: item.DesignationId,
        employeeId: item.EmployeeId,
        eventId: item.Id
      });
    });
    this.requestedShift = {
      id: eventDetails.Id,
      name: employeeName
    };
    this.shiftsData = [];
    this.employeeNamesList = employeesData;
    this.dialogVisible = true;
    this.chngDetRef.detectChanges();
    this.updateButtons();
  }

  //method called when Click the cancel button
  public cancelSwap(): void {
    this.employeeNamesList = [];
    this.shiftsData = [];
    this.selectedEmployee = null;
    this.selectedShift = null;
    this.dialogVisible = false;
    this.updateButtons();
  }

  //method called when Swap Shift button is clicked
  public swapShift(): void {
    const dataSource = this.scheduleObj.eventSettings.dataSource as any[];
    this.scheduleObj.refreshEvents();
    const appIndex = dataSource.findIndex(evt => evt.Id === this.selectedShift.eventId);
    const reqIndex = dataSource.findIndex(evt => evt.Id === this.requestedShift.id);
    const requestingEvent = { ...dataSource[reqIndex] };
    const approvedEvent = { ...dataSource[appIndex] };
    requestingEvent.Description = requestingEvent.Description.replace(' - Swap-Request', '');
    requestingEvent.Subject =
      `${this.requestedShift.name} swapped the shift with ${this.selectedEmployee.name}'s shift scheduled from ` +
      `${this.formatDate(approvedEvent.StartTime)}, ${this.getShortTimeString(approvedEvent.StartTime)} to ` +
      `${this.getShortTimeString(approvedEvent.EndTime)}`;
    dataSource[reqIndex] = requestingEvent;
    approvedEvent.Description = approvedEvent.Description.replace(' - Swap-Request', '');
    approvedEvent.Subject =
      `${this.selectedEmployee.name} swapped the shift with ${this.requestedShift.name}'s shift scheduled from `
      + `${this.formatDate(requestingEvent.StartTime)}, ${this.getShortTimeString(requestingEvent.StartTime)} to `
      + `${this.getShortTimeString(requestingEvent.EndTime)}`;
    dataSource[appIndex] = approvedEvent;
    this.scheduleObj.eventSettings.dataSource = dataSource;
    this.scheduleObj.refreshEvents();
    this.employeeNamesList = [];
    this.shiftsData = [];
    this.dialogVisible = false;
    this.updateButtons();
  }

  //method to update and changes in the button 
  private updateButtons(): void {
    this.buttons = this.getButtons();
    this.chngDetRef.detectChanges();
  }

  //method to handle the buttons
  public getButtons(): ButtonPropsModel[] {
    return [
      {
        click: () => this.cancelSwap(),
        buttonModel: { content: 'Cancel' }
      },
      {
        click: () => this.swapShift(),
        buttonModel: {
          content: 'Swap Shift',
          disabled: !this.shiftDropdown?.value
        }
      }
    ];
  }

  //method to display the name in the dialog box of shift swap
  public employeeNameChange(evt: ChangeEventArgs): void {
    const raw = (evt.itemData as any);
    if (!raw) {
      this.selectedEmployee = null!;
      this.shiftsData = [];
      this.updateButtons();
      return;
    }
    this.selectedEmployee = raw;
    this.shiftsData = (this.scheduleObj.eventSettings.dataSource as any[])
      .filter(item =>
        item.EmployeeId === raw.employeeId &&
        item.Description?.toLowerCase().includes('swap-request')
      )
      .map((item, idx) => ({
        id: idx + 1,
        name: this.formatShiftName(item.StartTime, item.EndTime),
        designationId: item.DesignationId,
        employeeId: item.EmployeeId,
        eventId: item.Id
      }));
    this.updateButtons();
  }

  //method to display the shift of the selected employee 
  public shiftChange(evt: ChangeEventArgs): void {
    this.selectedShift = this.shiftsData.find(s => s.id === evt.value || s.id === +evt.value);
    this.updateButtons();
  }
  public animationSettings: AnimationSettingsModel = {
    effect: 'Zoom',
    duration: 400
  };
  dialogOpen() {
    this.dialogVisible = true;
  }
  dialogClose() {
    this.cancelSwap();
  }

  //method to handle the chip before the click
  public handleChipBeforeClick(
    args: ClickEventArgs,
    isExternalChipClick: boolean = false
  ): void {
    const currentChipIndex = args.index;
    const selectedChips = isExternalChipClick
      ? this.externalChips?.selectedChips
      : this.chipList?.selectedChips;

    const previousChipIndex = Array.isArray(selectedChips)
      ? selectedChips[0]
      : selectedChips;

    if (currentChipIndex === previousChipIndex) {
      args.cancel = true;
    }
  }

  //method to handle the chip when click the chip 
  public onChipClick(args: ClickEventArgs): void {
    if (!args.text || typeof args.text !== 'string') {
      return;
    }
    const selectedText = args.text;
    const roleIndex = this.roles.findIndex(role => role.name.includes(selectedText));
    this.chipIndex = roleIndex;
    const selectedRole = this.roles[this.chipIndex].name;
    const treeRefs = [
      this.allTree,
      this.doctorsTree,
      this.nursesTree,
      this.staffsTree
    ];
    const previousTree = treeRefs[this.prevChipIndex];
    const activeTree = treeRefs[this.chipIndex];

    if (previousTree?.element) {
      previousTree.element.style.display = 'none';
    }

    if (activeTree?.element) {
      activeTree.element.style.display = '';
      const filteredData = this.chipIndex === 0
        ? this.allData
        : this.filterData(this.allData, selectedRole);

      activeTree.fields = {
        ...activeTree.fields,
        dataSource: filteredData
      };
    }
    this.prevChipIndex = this.chipIndex;
  }

  //method is called when the tree element is start dragging
  public onTreeDragStart(): void {
    document.body.classList.add('e-disble-not-allowed');
  }

  //method is called when the tree element is dragged into the schedule element
  public onTreeDragStop(args: DragAndDropEventArgs): void {
    const hoverElement = this.scheduleObj.element.querySelector('.e-device-hover');
    if (hoverElement) { hoverElement.classList.remove('e-device-hover'); }
    args.cancel = true;
    const targetAppt = closest(args.target as Element, '.e-appointment.event-leave');
    if (!targetAppt) {
      document.body.classList.remove('e-disble-not-allowed');
      return;
    }
    const draggedId = parseInt(args.draggedNodeData.id as string, 10);
    const draggedData = this.allData.find(i => i.Id === draggedId);
    const eventDetails = this.scheduleObj.getEventDetails(targetAppt) as any;
    const roleName = this.roles.find(r => r.id === eventDetails.RoleId)?.name;
    const designation = this.designationsData.find(d => d.Id === eventDetails.DesignationId)?.Text;

    if (draggedData && roleName === draggedData.role && designation === draggedData.Description) {
      const copiedEventDetails = { ...eventDetails };
      copiedEventDetails.Subject = `${draggedData.Name} covers for ${eventDetails.Subject}`;
      copiedEventDetails.Designation = draggedData.Description;
      this.isTreeItemDropped = true;
      this.pendingRemovalData = draggedData;
      this.pendingRemovalId = draggedId;
      setTimeout(() => {
        this.scheduleObj.openEditor(copiedEventDetails, 'EditOccurrence');
      }, 0);
    }

    document.body.classList.remove('e-disble-not-allowed');
  }
  public onTreeDrag(event: any): void {
    if (this.scheduleObj.isAdaptive) {
      const classElement: HTMLElement = this.scheduleObj.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (event.target.classList.contains('e-work-cells')) {
        addClass([event.target], 'e-device-hover');
      }
    }
  }
  public onItemSelecting(args: any): void { args.cancel = true; }

  //method to prevent click of Readonly data
  public onEventClick(args: EventClickArgs): void {
    if ((args.event as Record<string, any>).IsReadonly) {
      args.cancel = true;
    }
  }

  //method to set the height of schedule in the Agenda view
  setAgendaContentHeight(): void {
    const element: HTMLElement | null = this.scheduleObj.element
      .querySelector('.e-table-wrap.e-agenda-view .e-schedule-table .e-content-wrap');
    if (element) {
      const toolbarHeight = 72;
      const current = parseFloat(element.style.height) || element.getBoundingClientRect().height;
      element.style.height = (current - toolbarHeight) + 'px';
    }
  }

  public onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
      this.setAgendaContentHeight();
    }
    if (args.requestType === 'toolBarItemRendered' && this.scheduleObj.currentView === 'Agenda') {
      const toolbarElement = this.scheduleObj.element.querySelector('.e-schedule-toolbar-container') as HTMLElement;
      if (toolbarElement && !toolbarElement.querySelector('#agenda-toolbar-container')) {
        this.injectAgendaToolbar(toolbarElement);
        setTimeout(() => {
          this.setAgendaContentHeight();
        });
      }
      this.scheduleObj.eventSettings.query = new Query();
      this.scheduleObj.refreshEvents();
    }
  }
  //For Leave replacement popupOpens
  public onPopupOpen(args: any): void {
    const isEditorPopup = args.type === 'Editor';
    if (isEditorPopup) {
      if (!this.isTreeItemDropped) {
        args.cancel = true;
        return;
      }
      if (args.element) {
        args.element.classList.add('shift-management-editor-popup');
      }
    }
  }

  //For Leave replacement PopupClose
public onPopupClose(args: PopupCloseEventArgs): void {
  if (args.type === 'Editor' && this.isTreeItemDropped) {
    const targetElement = args.event?.target as HTMLElement;

    // ✅ Check if the clicked element is the Save button by class
    if (targetElement?.classList.contains('e-event-save')) {
      const editedContent = args.data as any;

      if (editedContent.Subject?.toLowerCase().includes('covers for')) {
        this.allData = this.allData.filter(i => i.Id !== this.pendingRemovalId);
      } else if (this.pendingRemovalData) {
        this.allData.push(this.pendingRemovalData);
      }

      // ✅ Update all tree data sources
      this.allTreeFields = { ...this.allTreeFields, dataSource: this.allData };
      this.doctorsTreeFields = { ...this.doctorsTreeFields, dataSource: this.allData.filter(i => i.role === 'Doctors') };
      this.nursesTreeFields = { ...this.nursesTreeFields, dataSource: this.allData.filter(i => i.role === 'Nurses') };
      this.staffsTreeFields = { ...this.staffsTreeFields, dataSource: this.allData.filter(i => i.role === 'Support Staffs') };

      // ✅ Reset state
      this.isTreeItemDropped = false;
      this.pendingRemovalData = null;
      this.pendingRemovalId = null;
    }
  }
}


  //to get the header Label
  public getShiftTextSafe(date: any): string {
    if (!date || !(date instanceof Date)) return '';
    const hour = new Date(date).getHours();
    return hour === 7 ? 'Morning Shift' : 'Evening Shift';
  }

  //to get the Role of employee
  public getRole(id: number): string {
    const found = this.employeeRole.find(r => r.Id === id);
    return found ? found.Text : '';
  }

  //to get the designation of employee
  public getDesignation(id: number): string {
    const found = this.designationsData.find(d => d.Id === id);
    return found ? found.Text : '';
  }

  //to find the data has leave
  public isLeave(desc: string): boolean {
    return desc?.toLowerCase().includes('leave');
  }

  public onNavigating(args: NavigatingEventArgs): void {
    if (args.action === 'view') {
      this.currentView = args.currentView as any;
      const toolbarElement = this.scheduleObj.element.querySelector('.e-schedule-toolbar-container') as HTMLElement;
      if (this.currentView === 'Agenda') {
        this.injectAgendaToolbar(toolbarElement);
        setTimeout(() => this.chipList?.select(0), 10);
        this.agendachipIndex = 0;
        this.agendaDropdownItems = [];
        this.agendaDropdownValue = null;
        const allData = this.scheduleObj.eventSettings.dataSource as any[];
        const filtered = allData; // chipIndex === 0 => all
        const subjects: string[] = Array.from(
          new Set(
            filtered
              .map((evt: any) => evt.Subject as string)
              .filter((subject: string) =>
                subject &&
                !subject.toLowerCase().includes('covers') &&
                !subject.toLowerCase().includes('swapped')
              )
          )
        ); this.agendaDropdownItems = subjects.map(s => ({ value: s, text: s }));
        this.agendaDropdownValue = subjects.length ? subjects[0] : null;
        this.scheduleObj.eventSettings.query = new Query();
        this.scheduleObj.refreshEvents();

      }
      else if (this.currentView === 'TimelineWeek') {
        toolbarElement.querySelector('#agenda-toolbar-container')?.remove();
        this.scheduleObj.eventSettings.query = new Query();
        this.scheduleObj.refreshEvents();
      }
    }
    if (args.action === 'dateNavigate' && this.currentView === 'Agenda') {
      let q = this.agendachipIndex === 0
        ? new Query()
        : new Query().where('RoleId', 'equal', this.agendachipIndex);
      if (this.agendaDropdownValue) {
        q = q.where('Subject', 'contains', this.agendaDropdownValue as string, true);
      }
      this.scheduleObj.eventSettings.query = q;
      this.scheduleObj.refreshEvents();
    }
  }

  //method to inject the agenda toolbar
  private injectAgendaToolbar(toolbarElement: HTMLElement): void {
    if (!toolbarElement.querySelector('#agenda-toolbar-container')) {
      const container = document.createElement('div');
      container.id = 'agenda-toolbar-container';
      toolbarElement.appendChild(container);
      const view = this.vc.createEmbeddedView(this.agendaToolbarTmpl);
      view.rootNodes.forEach(node => container.appendChild(node));
    }
  }

  //method called when Agendachip is clicked
  public agendaChipsClick(args: any): void {
    if (args?.index === undefined || args.index === null || isNaN(args.index)) {
      return;
    }
    this.agendachipIndex = args.index;
    const allData = this.scheduleObj.eventSettings.dataSource as any[];
    const filtered = this.agendachipIndex === 0 ? allData : allData.filter(e => e.RoleId === this.agendachipIndex);
    const subjects = [...new Set(filtered.map((e: any) => e.Subject).filter((s: string) => s && !s.toLowerCase().includes('covers') && !s.toLowerCase().includes('swapped')))];
    this.agendaDropdownItems = subjects.map(s => ({ value: s, text: s }));
    this.dropdown.dataSource = this.agendaDropdownItems;
    this.dropdown.value = null;
    this.dropdown.dataBind();
    this.scheduleObj.eventSettings.query =
      this.agendachipIndex === 0 ? new Query() : new Query().where('RoleId', 'equal', this.agendachipIndex);
    this.scheduleObj.refreshEvents();
    setTimeout(() => {
      if (this.chipList) {
        this.chipList.selectedChips = [this.agendachipIndex];
      }
    }, 0);
  }

  //method called when dropdown opened before
  public onDropDownListBeforeOpen(): void {
    const prev = JSON.stringify(this.agendaDropdownItems);
    {
      const allData = this.scheduleObj.eventSettings.dataSource as any[];
      const filtered = this.agendachipIndex === 0
        ? allData
        : allData.filter(e => e.RoleId === this.agendachipIndex);
      const subjects: string[] = Array.from(
        new Set(
          filtered
            .map((evt: any) => evt.Subject as string)
            .filter((subject: string) =>
              subject &&
              !subject.toLowerCase().includes('covers') &&
              !subject.toLowerCase().includes('swapped')
            )
        )
      ); this.agendaDropdownItems = subjects.map(s => ({ value: s, text: s }));
      this.agendaDropdownValue = this.agendachipIndex === 0 || !subjects.length
        ? null
        : subjects[0];
    }
    if (JSON.stringify(this.agendaDropdownItems) !== prev) {
      this.dropdown.dataBind();
    }
  }

  //method called when dropdown value changed
  public onDropDownListChange(args: ChangeEventArgs): void {
    const selectedName = args.itemData?.value as string | undefined;
    let q: Query;
    if (selectedName) {
      q = new Query().where('Subject', 'contains', selectedName, true);
    } else if (this.agendachipIndex === 0) {
      q = new Query();
    } else {
      q = new Query().where('RoleId', 'equal', this.agendachipIndex);
    }
    this.scheduleObj.eventSettings.query = q;
    this.scheduleObj.refreshEvents();
  }
}