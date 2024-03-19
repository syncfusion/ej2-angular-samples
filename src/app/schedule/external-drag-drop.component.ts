import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { hospitalData, waitingList } from './data';
import { extend, closest, remove, addClass } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, GroupModel, TimelineViewsService, TimelineMonthService, ResizeService, WorkHoursModel, DragAndDropService, ResourceDetails, ScheduleComponent, ActionEventArgs, CellClickEventArgs, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { TreeViewComponent, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'external-drag-drop.html',
    styleUrls: ['external-drag-drop.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, NgIf, TreeViewModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ExternalDragDropComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('treeObj') public treeObj: TreeViewComponent;

  public isTreeItemDropped = false;
  public draggedItemId = '';
  public data: Record<string, any>[] = extend([], hospitalData, null, true) as Record<string, any>[];
  public selectedDate: Date = new Date(2021, 7, 2);
  public currentView: View = 'TimelineDay';
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
  public departmentDataSource: Record<string, any>[] = [
    { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
    { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
  ];
  public consultantDataSource: Record<string, any>[] = [
    { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
    { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
    { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
    { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
    { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
    { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
  ];
  public group: GroupModel = { enableCompactView: false, resources: ['Departments', 'Consultants'] };
  public allowMultiple = false;
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      subject: { title: 'Patient Name', name: 'Name' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' },
      description: { title: 'Reason', name: 'Description' }
    }
  };

  public field: Record<string, any> = { dataSource: waitingList, id: 'Id', text: 'Name' };
  public allowDragAndDrop = true;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['external-drag-drop.style.css'];
  }

  public getConsultantName(value: ResourceDetails): string {
    return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
  }

  public getConsultantStatus(value: ResourceDetails): boolean {
    const resourceName: string = this.getConsultantName(value);
    return !(resourceName === 'GENERAL' || resourceName === 'DENTAL');
  }

  public getConsultantDesignation(value: ResourceDetails): string {
    const resourceName: string = this.getConsultantName(value);
    if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
      return '';
    } else {
      return (value as ResourceDetails).resourceData.Designation as string;
    }
  }

  public getConsultantImageName(value: ResourceDetails): string {
    return this.getConsultantName(value).toLowerCase();
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

  public onActionBegin(event: ActionEventArgs): void {
    if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
      const treeViewData: Record<string, any>[] = this.treeObj.fields.dataSource as Record<string, any>[];
      const filteredPeople: Record<string, any>[] = treeViewData.filter((item: any) => item.Id !== parseInt(this.draggedItemId, 10));
      this.treeObj.fields.dataSource = filteredPeople;
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.treeview-external-drag');
      for (const element of [].slice.call(elements)) {
        remove(element);
      }
    }
  }

  public onItemSelecting(args: any): void {
    args.cancel = true;
  }

  public onTreeDragStop(event: DragAndDropEventArgs): void {
    const treeElement: Element = closest(event.target, '.e-treeview') as Element;
    const classElement: HTMLElement = this.scheduleObj.element.querySelector('.e-device-hover');
    if (classElement) {
      classElement.classList.remove('e-device-hover');
    }
    if (!treeElement) {
      event.cancel = true;
      const scheduleElement: Element = closest(event.target, '.e-content-wrap') as Element;
      if (scheduleElement) {
        const treeviewData: Record<string, any>[] = this.treeObj.fields.dataSource as Record<string, any>[];
        if (event.target.classList.contains('e-work-cells')) {
          const filteredData: Record<string, any>[] = treeviewData.filter((item: any) =>
            item.Id === parseInt(event.draggedNodeData.id as string, 10));
          const cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
          const resourceDetails: ResourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
          const eventData: Record<string, any> = {
            Name: filteredData[0].Name,
            StartTime: cellData.startTime,
            EndTime: cellData.endTime,
            IsAllDay: cellData.isAllDay,
            Description: filteredData[0].Description,
            DepartmentID: resourceDetails.resourceData.GroupId,
            ConsultantID: resourceDetails.resourceData.Id
          };
          this.scheduleObj.openEditor(eventData, 'Add', true);
          this.isTreeItemDropped = true;
          this.draggedItemId = event.draggedNodeData.id as string;
        }
      }
    }
    document.body.classList.remove('e-disble-not-allowed');
  }
  public onTreeDragStart() {
    document.body.classList.add('e-disble-not-allowed');
  }

}
