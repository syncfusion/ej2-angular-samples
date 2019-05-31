import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { hospitalData, waitingList } from './data';
import { extend, closest, remove, addClass } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, View, GroupModel, TimelineViewsService, TimelineMonthService,
    ResizeService, WorkHoursModel, DragAndDropService, ResourceDetails, ScheduleComponent, ActionEventArgs, CellClickEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
@Component({
    selector: 'control-content',
    templateUrl: 'external-drag-drop.html',
    styleUrls: ['external-drag-drop.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineViewsService, TimelineMonthService, ResizeService, DragAndDropService]
})
export class ExternalDragDropComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    @ViewChild('treeObj')
    public treeObj: TreeViewComponent;

    public isTreeItemDropped: boolean = false;
    public draggedItemId: string = '';

    public data: Object[] = <Object[]>extend([], hospitalData, null, true);
    public selectedDate: Date = new Date(2018, 7, 1);
    public currentView: View = 'TimelineDay';
    public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
    public departmentDataSource: Object[] = [
        { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
    ];
    public consultantDataSource: Object[] = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
    ];
    public group: GroupModel = { enableCompactView: false, resources: ['Departments', 'Consultants'] };
    public allowMultiple: Boolean = false;
    public eventSettings: EventSettingsModel = {
        dataSource: this.data,
        fields: {
            subject: { title: 'Patient Name', name: 'Name' },
            startTime: { title: 'From', name: 'StartTime' },
            endTime: { title: 'To', name: 'EndTime' },
            description: { title: 'Reason', name: 'Description' }
        }
    };

    public field: Object = { dataSource: waitingList, id: 'Id', text: 'Name' };
    public allowDragAndDrop: boolean = true;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['external-drag-drop.style.css'];
    }

    getConsultantName(value: ResourceDetails): string {
        return (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
    }

    getConsultantStatus(value: ResourceDetails): boolean {
        let resourceName: string =
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
        if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
            return false;
        } else {
            return true;
        }
    }

    getConsultantDesignation(value: ResourceDetails): string {
        let resourceName: string =
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string;
        if (resourceName === 'GENERAL' || resourceName === 'DENTAL') {
            return '';
        } else {
            return (value as ResourceDetails).resourceData.Designation as string;
        }
    }

    getConsultantImageName(value: ResourceDetails): string {
        return this.getConsultantName(value).toLowerCase();
    }

    onItemDrag(event: any): void {
        if (this.scheduleObj.isAdaptive) {
            let classElement: HTMLElement = this.scheduleObj.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                addClass([event.target], 'e-device-hover');
            }
        }
        if (document.body.style.cursor === 'not-allowed') {
            document.body.style.cursor = '';
        }
        if (event.name === 'nodeDragging') {
            let dragElementIcon: NodeListOf<HTMLElement> =
                document.querySelectorAll('.e-drag-item.treeview-external-drag .e-icon-expandable');
            for (let i: number = 0; i < dragElementIcon.length; i++) {
                dragElementIcon[i].style.display = 'none';
            }
        }
    }

    onActionBegin(event: ActionEventArgs): void {
        if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
            let treeViewdata: { [key: string]: Object }[] = this.treeObj.fields.dataSource as { [key: string]: Object }[];
            const filteredPeople: { [key: string]: Object }[] =
                treeViewdata.filter((item: any) => item.Id !== parseInt(this.draggedItemId, 10));
            this.treeObj.fields.dataSource = filteredPeople;
            let elements: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let i: number = 0; i < elements.length; i++) {
                remove(elements[i]);
            }
        }
    }

    onTreeDragStop(event: DragAndDropEventArgs): void {
        let treeElement: Element = <Element>closest(event.target, '.e-treeview');
        let classElement: HTMLElement = this.scheduleObj.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement: Element = <Element>closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                let treeviewData: { [key: string]: Object }[] =
                    this.treeObj.fields.dataSource as { [key: string]: Object }[];
                if (event.target.classList.contains('e-work-cells')) {
                    const filteredData: { [key: string]: Object }[] =
                        treeviewData.filter((item: any) => item.Id === parseInt(event.draggedNodeData.id as string, 10));
                    let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
                    let resourceDetails: ResourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
                    let eventData: { [key: string]: Object } = {
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
    }
}
