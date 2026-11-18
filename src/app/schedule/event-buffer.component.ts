import {
    Component,
    ViewChild,
    Inject,
    ViewEncapsulation,
    AfterViewInit
} from '@angular/core';

import {
    ScheduleComponent,
    EventSettingsModel,
    GroupModel,
    DragEventArgs,
    ActionEventArgs,
    DayService,
    TimelineViewsService,
    ResizeService,
    DragAndDropService,
    ScheduleModule,
    View
} from '@syncfusion/ej2-angular-schedule';

import {
    DialogComponent,
    DialogModule
} from '@syncfusion/ej2-angular-popups';

import { CommonModule } from '@angular/common';

import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

interface RoomData {
    RoomId: number;
    RoomText: string;
    Specialty: string;
    RoomColor: string;
    Icon: string;
}

@Component({
    selector: 'control-content',
    templateUrl: 'event-buffer.html',
    styleUrls: ['event-buffer.style.css'],
    providers: [
        DayService,
        TimelineViewsService,
        ResizeService,
        DragAndDropService
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        ScheduleModule,
        DialogModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent
    ]
})
export class EventBufferComponent implements AfterViewInit {

    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    @ViewChild('dialogObj')
    public dialogObj: DialogComponent;
    @ViewChild('bufferTemplate', { static: true })
    public bufferTemplateRef: any;

    public selectedDate: Date = new Date();

    public currentView: View = 'TimelineDay';


    public workHours: Record<string, string> = {
        start: '08:00',
        end: '18:00'
    };

    public timeScale: Record<string, any> = {
        enable: true,
        interval: 60,
        slotCount: 4
    };

    public group: GroupModel = {
        resources: ['Rooms']
    };
    public showHeaderIndent(): boolean {
        return this.scheduleObj?.currentView !== 'Day';
    }

    public dialogButtons: Object[] = [
        {
            click: () => {
                this.dialogObj.hide();
            },
            buttonModel: {
                content: 'Ok',
                isPrimary: true
            }
        }
    ];

    public roomData: RoomData[] = [
        { RoomId: 1, RoomText: 'Cardiac Surgery Suite', Specialty: 'Cardiology', RoomColor: '#ef4444', Icon: '\u2764' },
        { RoomId: 2, RoomText: 'Orthopedic Center', Specialty: 'Orthopedics', RoomColor: '#2563eb', Icon: '🦴' },
        { RoomId: 3, RoomText: 'Neuroscience Unit', Specialty: 'Neurology', RoomColor: '#8b5cf6', Icon: '🧠' },
        { RoomId: 4, RoomText: 'Pediatric Care Suite', Specialty: 'Pediatrics', RoomColor: '#10b981', Icon: '👶' },
        { RoomId: 5, RoomText: 'Emergency Trauma Bay', Specialty: 'Emergency', RoomColor: '#f97316', Icon: '🚑' },
        { RoomId: 6, RoomText: 'Diagnostic Imaging Center', Specialty: 'Radiology', RoomColor: '#0ea5e9', Icon: '🔬' }
    ];

    private subjects: Record<string, string[]> = {
        Cardiology: ['Cardiac Workup', 'Heart Valve Assessment', 'Stress Test', 'ECG Review',],
        Orthopedics: ['Knee Replacement', 'Bone Fracture Assessment', 'Spinal Workup',],
        Neurology: ['Neurology Workup', 'Brain MRI Review'],
        Pediatrics: ['Child Wellness Review', 'Immunization Follow-up'],
        Emergency: ['Emergency Care', 'Acute Care', 'Trauma Care', 'Critical Care'],
        Radiology: ['CT Scan Analysis', 'MRI Scan Review'],
    };

    public surgeryData: Record<string, any>[] =
        this.generateAllEvents(new Date());


    public eventSettings: EventSettingsModel = {
        dataSource: this.surgeryData,
        enableBuffer: true,


        fields: {
            bufferBefore: {
                name: 'bufferBefore'
            },
            bufferAfter: {
                name: 'bufferAfter'
            }
        },

    };

    constructor(
        @Inject('sourceFiles')
        private sourceFiles: any
    ) {
        sourceFiles.files = ['event-buffer.style.css'];
    }
    public ngAfterViewInit(): void {

        this.eventSettings = {
            ...this.eventSettings,
            bufferTemplate: this.bufferTemplateRef
        };
    }



    private generateEvents(date: Date): Record<string, any>[] {

        const events: Record<string, any>[] = [];

        let id: number = date.getDate() * 100;

        this.roomData.forEach((room: RoomData) => {

            const roomSubjects =
                this.subjects[room.Specialty] || ['Procedure'];

            const startPatterns = [
                { hour: 9, minute: 0 },
                { hour: 9, minute: 15 },
                { hour: 9, minute: 30 },
                { hour: 9, minute: 45 }
            ];

            const secondPatterns = [
                { hour: 11, minute: 0 },
                { hour: 11, minute: 15 },
                { hour: 11, minute: 30 },
                { hour: 11, minute: 45 }
            ];

            const pattern1 =
                startPatterns[Math.floor(Math.random() * startPatterns.length)];

            const pattern2 =
                secondPatterns[Math.floor(Math.random() * secondPatterns.length)];

            const createEvent = (
                startHour: number,
                startMinute: number
            ): Record<string, any> => {

                const duration =
                    [75, 90][Math.floor(Math.random() * 2)];

                const bufferBefore =
                    [30, 45, 60][Math.floor(Math.random() * 3)];

                const bufferAfter =
                    [30, 45, 60][Math.floor(Math.random() * 3)];

                const subject =
                    roomSubjects[Math.floor(Math.random() * roomSubjects.length)];

                const startTime = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    startHour,
                    startMinute
                );

                const endTime = new Date(
                    startTime.getTime() + duration * 60000
                );

                return {
                    Id: id++,
                    Subject: subject,
                    StartTime: startTime,
                    EndTime: endTime,
                    IsAllDay: false,
                    RoomId: room.RoomId,
                    RequiredSkill: room.Specialty,
                    bufferBefore: bufferBefore,
                    bufferAfter: bufferAfter
                };
            };

            events.push(
                createEvent(pattern1.hour, pattern1.minute)
            );

            events.push(
                createEvent(pattern2.hour, pattern2.minute)
            );
        });

        return events;
    }

    private generateAllEvents(
        selectedDate: Date
    ): Record<string, any>[] {

        const previousDate = new Date(selectedDate);

        previousDate.setDate(
            previousDate.getDate() - 1
        );

        const nextDate = new Date(selectedDate);

        nextDate.setDate(
            nextDate.getDate() + 1
        );

        return [
            ...this.generateEvents(previousDate),
            ...this.generateEvents(selectedDate),
            ...this.generateEvents(nextDate)
        ];
    }

    public onDragStop(args: DragEventArgs): void {

        const data: any =
            Array.isArray(args.data)
                ? args.data[0]
                : args.data;

        const room = this.roomData.find(
            (r) => r.RoomId === data.RoomId
        );

        if (!room) {
            return;
        }

        if (room.Specialty !== data.RequiredSkill) {

            args.cancel = true;

            this.dialogObj.setProperties({
                enableRtl: this.scheduleObj.element.classList.contains('e-rtl')
            });

            this.dialogObj.show();
        }
    }

    public onActionBegin(args: ActionEventArgs): void {

        if (args.requestType === 'eventCreate') {

            const records =
                args.data as Record<string, any>[];

            records.forEach((event) => {

                const room = this.roomData.find(
                    (r) => r.RoomId === event.RoomId
                );

                if (room) {
                    event.RequiredSkill = room.Specialty;
                }
            });
        }
    }

    public getBufferDuration(args: any): number {

        return args.bufferType === 'before'
            ? args.data.bufferBefore
            : args.data.bufferAfter;
    }
    public showBuffer(args: any): boolean {

        return this.getBufferDuration(args) >= 10;
    }
    public showBufferIcon(args: any): boolean {

        const duration = this.getBufferDuration(args);

        if (this.scheduleObj.currentView === 'Day') {
            return duration > 15;
        }

        return duration >= 10;
    }

    public showBufferText(args: any): boolean {

        const duration = this.getBufferDuration(args);

        if (this.scheduleObj.currentView === 'Day') {
            return duration >= 10;
        }

        return duration > 20;
    }
}