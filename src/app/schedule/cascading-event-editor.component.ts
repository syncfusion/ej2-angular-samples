import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    ScheduleComponent,
    TimelineViewsService,
    ResizeService,
    DragAndDropService,
    PopupOpenEventArgs,
    PopupCloseEventArgs,
    EventRenderedArgs,
    ScheduleModule
} from '@syncfusion/ej2-angular-schedule';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';

@Component({
    selector: 'control-content',
    templateUrl: 'cascading-event-editor.html',
    styleUrls: ['cascading-event-editor.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineViewsService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule]
})
export class CascadingEventEditorComponent {

    public selectedDate: Date = new Date(2026, 4, 11);
    public currentView: string = 'TimelineDay';

    @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

    public floors = [
        { id: 1, name: 'Floor 1' },
        { id: 2, name: 'Floor 2' }
    ];
    public group = {
        resources: ['Staff']
    };

    public rooms = [
        { id: 101, name: 'Room 101', floorId: 1 },
        { id: 102, name: 'Room 102', floorId: 1 },
        { id: 201, name: 'Room 201', floorId: 2 },
        { id: 202, name: 'Room 202', floorId: 2 }
    ];

    public resourcesData = [
        { id: 1, name: 'Projector', roomId: 101 },
        { id: 2, name: 'Whiteboard', roomId: 102 },
        { id: 3, name: 'Conference Kit', roomId: 201 }
    ];

    public typeOptions: string[] = ['Meeting', 'Appointment', 'Internal'];

    public staffData = [
        { id: 1, text: 'Mike Anderson', color: '#1aaa55', type: 'Consultants' },
        { id: 2, text: 'Kevin Larson', color: '#357cd2', type: 'Sales' },
        { id: 3, text: 'Sarah Johnson', color: '#f57f17', type: 'Sales' },
        { id: 4, text: 'David Miller', color: '#7fa900', type: 'Testers' },
        { id: 5, text: 'Emma Wilson', color: '#df5286', type: 'Testers' }
    ];

    public eventSettings = {
        dataSource: [
            {
                Id: 1,
                Subject: 'Meeting',
                Type: 'Meeting',
                StartTime: new Date(2026, 4, 11, 9),
                EndTime: new Date(2026, 4, 11, 12),
                StaffId: 1,
                FloorId: 1,
                RoomId: 101
            },
            {
                Id: 2,
                Subject: 'Appointment',
                Type: 'Appointment',
                StartTime: new Date(2026, 4, 11, 13),
                EndTime: new Date(2026, 4, 11, 14),
                StaffId: 2
            },
            {
                Id: 3,
                Subject: 'Internal Review',
                Type: 'Internal',
                StartTime: new Date(2026, 4, 11, 10),
                EndTime: new Date(2026, 4, 11, 11),
                StaffId: 3
            },
            {
                Id: 4,
                Subject: 'Planning',
                Type: 'Meeting',
                StartTime: new Date(2026, 4, 11, 15),
                EndTime: new Date(2026, 4, 11, 17),
                StaffId: 4,
                FloorId: 1,
                RoomId: 101
            },
            {
                Id: 5,
                Subject: 'Discussion',
                Type: 'Meeting',
                StartTime: new Date(2026, 4, 11, 11),
                EndTime: new Date(2026, 4, 11, 12, 30),
                StaffId: 5,
                FloorId: 2,
                RoomId: 201
            },
            {
                Id: 6,
                Subject: 'Morning Sync',
                Type: 'Meeting',
                StartTime: new Date(2026, 4, 11, 8),
                EndTime: new Date(2026, 4, 11, 9),
                StaffId: 1,
                FloorId: 1,
                RoomId: 101
            },
            {
                Id: 7,
                Subject: 'Follow-up Call',
                Type: 'Appointment',
                StartTime: new Date(2026, 4, 11, 12),
                EndTime: new Date(2026, 4, 11, 13),
                StaffId: 1
            },
            {
                Id: 8,
                Subject: 'Client Discussion',
                Type: 'Appointment',
                StartTime: new Date(2026, 4, 11, 10),
                EndTime: new Date(2026, 4, 11, 11),
                StaffId: 2
            },
            {
                Id: 9,
                Subject: 'Demo Presentation',
                Type: 'Meeting',
                StartTime: new Date(2026, 4, 11, 14),
                EndTime: new Date(2026, 4, 11, 15),
                StaffId: 2,
                FloorId: 1,
                RoomId: 102
            },
            {
                Id: 10,
                Subject: 'Code Refactoring',
                Type: 'Internal',
                StartTime: new Date(2026, 4, 11, 8, 30),
                EndTime: new Date(2026, 4, 11, 9, 30),
                StaffId: 3
            },
            {
                Id: 11,
                Subject: 'System Testing',
                Type: 'Internal',
                StartTime: new Date(2026, 4, 11, 11),
                EndTime: new Date(2026, 4, 11, 12),
                StaffId: 3
            },
            {
                Id: 12,
                Subject: 'Project Review',
                Type: 'Meeting',
                StartTime: new Date(2026, 4, 11, 13),
                EndTime: new Date(2026, 4, 11, 14),
                StaffId: 4,
                FloorId: 1,
                RoomId: 101
            },
            {
                Id: 13,
                Subject: 'Wrap-up Meeting',
                Type: 'Meeting',
                StartTime: new Date(2026, 4, 11, 17),
                EndTime: new Date(2026, 4, 11, 18),
                StaffId: 4,
                FloorId: 1,
                RoomId: 101
            },
            {
                Id: 14,
                Subject: 'Bug Fixing',
                Type: 'Internal',
                StartTime: new Date(2026, 4, 11, 9),
                EndTime: new Date(2026, 4, 11, 10, 30),
                StaffId: 5
            },
            {
                Id: 15,
                Subject: 'QA Review',
                Type: 'Internal',
                StartTime: new Date(2026, 4, 11, 13),
                EndTime: new Date(2026, 4, 11, 14),
                StaffId: 5
            }
        ]
    };

    public getTypeColor(type: string): string {
        switch (type) {
            case 'Meeting': return '#22c55e';
            case 'Appointment': return '#3b82f6';
            case 'Internal': return '#f59e0b';
            default: return '#6b7280';
        }
    }

    public onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type !== 'Editor') return;

        args.element.classList.add('cascading-editor-dialog');

        const data: any = args.data;

        let typeValue = data.Type || 'Meeting';
        let floorValue = data.FloorId || null;
        let roomValue = data.RoomId || null;

        const getField = (name: string): HTMLInputElement | null => {
            const fields = args.element.querySelectorAll('.e-field') as NodeListOf<HTMLInputElement>;
            for (let i = 0; i < fields.length; i++) {
                if (fields[i].name === name) return fields[i];
            }
            return null;
        };

        const typeEl = getField('Type');
        const floorEl = getField('FloorId');
        const roomEl = getField('RoomId');
        const staffEl = getField('StaffId');
        const startEl = getField('StartTime');
        const endEl = getField('EndTime');

        if (!typeEl) return;


        const onTypeChange = (e: ChangeEventArgs): void => {
            floorObj.value = null;
            roomObj.value = null;
            roomObj.dataSource = [];
            roomObj.dataBind();
            toggleMeeting(e.value === 'Meeting');
        };

        const onFloorChange = (e: ChangeEventArgs): void => {
            const filtered = this.rooms.filter((r: any) => r.floorId === e.value);
            roomObj.dataSource = filtered;
            roomObj.dataBind();
            roomObj.value = null;
        };

        const onRoomChange = (e: ChangeEventArgs): void => { };

        const toggleMeeting = (show: boolean): void => {
            const rows = args.element.querySelectorAll('.meeting-field') as NodeListOf<HTMLElement>;
            rows.forEach(row => {
                row.style.display = show ? '' : 'none';
            });
        };


        const typeObj = new DropDownList({
            dataSource: this.typeOptions,
            value: typeValue,
            change: onTypeChange
        });
        typeObj.appendTo(typeEl);

        const floorObj = new DropDownList({
            dataSource: this.floors,
            fields: { text: 'name', value: 'id' },
            value: floorValue,
            change: onFloorChange
        });
        floorObj.appendTo(floorEl as HTMLElement);

        const roomObj = new DropDownList({
            dataSource: [],
            fields: { text: 'name', value: 'id' },
            value: roomValue,
            change: onRoomChange
        });
        roomObj.appendTo(roomEl as HTMLElement);

        new DropDownList({
            dataSource: this.staffData,
            fields: { text: 'text', value: 'id' },
            value: data.StaffId || null
        }).appendTo(staffEl as HTMLElement);

        new DateTimePicker({ value: data.StartTime }).appendTo(startEl as HTMLElement);
        new DateTimePicker({ value: data.EndTime }).appendTo(endEl as HTMLElement);

        toggleMeeting(typeValue === 'Meeting');

        if (typeValue === 'Meeting') {
            let filteredRooms: any;
            if (floorValue) {
                filteredRooms = this.rooms.filter(r => r.floorId === floorValue);
            } else {
                filteredRooms = [];
            }
            roomObj.dataSource = filteredRooms;
            roomObj.dataBind();
        } else {
            toggleMeeting(false);
        }
    }

    public onPopupClose(args: PopupCloseEventArgs): void {
        if (args.type === 'Editor') {
            args.element.classList.remove('cascading-editor-dialog');
        }
    }

    public onEventRendered(args: EventRenderedArgs): void {
        (args.element as HTMLElement).style.backgroundColor =
            this.getTypeColor((args.data as any).Type || 'Meeting');
    }
}