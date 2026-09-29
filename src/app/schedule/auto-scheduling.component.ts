import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent, EventSettingsModel, GroupModel, ResizeEventArgs, DragEventArgs, ActionEventArgs, CellClickEventArgs, PopupOpenEventArgs, TimelineViews, DragAndDrop, ScheduleModule, TimelineViewsService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { GridComponent, ColumnsDirective, ColumnDirective, RowDD, Edit, RowDropEventArgs, RowDragEventArgs, GridModule, RowDDService, EditService } from '@syncfusion/ej2-angular-grids';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ViewEncapsulation } from '@angular/core';

interface Resource {
    text: string;
    id: number;
    color: string;
    group: string;
    skills: string[];
}

interface UnplannedAppointment {
    Task: string;
    Duration: string;
    RequiredSkill: string;
}

@Component({
    selector: 'control-content',
    templateUrl: './auto-scheduling.html',
    styleUrls: ['./auto-scheduling.css'],
    standalone: true,
    imports: [CommonModule, ScheduleModule, GridModule, ButtonModule, SBDescriptionComponent, SBActionDescriptionComponent],
    providers: [TimelineViewsService, DragAndDropService, RowDDService, EditService],
    encapsulation: ViewEncapsulation.None,
})
export class AutoSchedulingComponent implements OnInit, AfterViewInit {
    @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
    @ViewChild('gridObj') gridObj: GridComponent;

    resourceData: Resource[] = [
        { text: 'Smith', id: 1, color: '#df5286', group: 'Doctor', skills: ['Cardiology', 'General'] },
        { text: 'Lee', id: 2, color: '#7fa900', group: 'Doctor', skills: ['Pediatrics', 'General'] },
        { text: 'Patel', id: 3, color: '#ea7a57', group: 'Doctor', skills: ['Surgery', 'General'] },
        { text: 'Amy', id: 4, color: '#5978ee', group: 'Nurse', skills: ['ICU', 'Ward'] },
        { text: 'John', id: 5, color: '#00bdae', group: 'Nurse', skills: ['ER', 'Ward'] },
        { text: 'Sara', id: 6, color: '#f57b42', group: 'Nurse', skills: ['ICU', 'ER'] },
    ];

    initialGridData: UnplannedAppointment[] = [
        { Task: 'Cardiology Consultation', Duration: '2 Hours', RequiredSkill: 'Cardiology' },
        { Task: 'Pediatric Health Assessment', Duration: '1 Hour', RequiredSkill: 'Pediatrics' },
        { Task: 'Pre-Surgical Evaluation', Duration: '3 Hours', RequiredSkill: 'Surgery' },
        { Task: 'Critical Care Monitoring', Duration: '2 Hours', RequiredSkill: 'ICU' },
        { Task: 'Emergency Patient Intake', Duration: '1 Hour', RequiredSkill: 'ER' },
        { Task: 'Inpatient Care Management', Duration: '2 Hours', RequiredSkill: 'Ward' },
        { Task: 'General Medical Examination', Duration: '1 Hour', RequiredSkill: 'General' },
        { Task: 'Emergency Case Assessment', Duration: '1 Hour', RequiredSkill: 'ER' }
    ];

    group: GroupModel = { resources: ['Staff'] };
    eventSettings: EventSettingsModel;
    editOptions: any = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
    };
    selectedDate: Date = new Date();
    eventDataSource: any[] = [];
    gridData: UnplannedAppointment[] = [];
    maxDailyWorkload: number = 8;
    resourceWorkload: Map<number, number> = new Map();
    draggedEventData: any = null;
    scheduledAppointments: Set<string> = new Set();

    constructor() { }

    ngOnInit(): void {
        this.eventDataSource = this.getInitialEvents();
        this.gridData = [...this.initialGridData];
        this.eventSettings = {
            dataSource: this.eventDataSource,
            fields: {
                subject: { name: 'Subject' },
                startTime: { name: 'StartTime' },
                endTime: { name: 'EndTime' },
            }
        };
    }

    ngAfterViewInit(): void {
    }

    getInitialEvents(): any[] {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return [
            {
                Id: 1,
                Subject: 'Cardiac Checkup - Mr. Johnson',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
                IsAllDay: false,
                StaffId: 1,
                RequiredSkill: 'Cardiology',
            },
            {
                Id: 2,
                Subject: 'Consultation - ECG Review',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
                IsAllDay: false,
                StaffId: 1,
                RequiredSkill: 'Cardiology',
            },
            {
                Id: 3,
                Subject: 'Child Wellness Exam - Emma',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
                IsAllDay: false,
                StaffId: 2,
                RequiredSkill: 'Pediatrics',
            },
            {
                Id: 4,
                Subject: 'Vaccination Clinic',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 30),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
                IsAllDay: false,
                StaffId: 2,
                RequiredSkill: 'General',
            },
            {
                Id: 5,
                Subject: 'Pre-Op Assessment',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30),
                IsAllDay: false,
                StaffId: 3,
                RequiredSkill: 'Surgery',
            },
            {
                Id: 6,
                Subject: 'Surgical Consultation - Mrs. Smith',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30),
                IsAllDay: false,
                StaffId: 3,
                RequiredSkill: 'Surgery',
            },
            {
                Id: 7,
                Subject: 'ICU Patient Monitoring',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
                IsAllDay: false,
                StaffId: 4,
                RequiredSkill: 'ICU',
            },
            {
                Id: 8,
                Subject: 'Vitals Check - ICU Ward',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
                IsAllDay: false,
                StaffId: 4,
                RequiredSkill: 'Ward',
            },
            {
                Id: 9,
                Subject: 'ER Triage - Patient Intake',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
                IsAllDay: false,
                StaffId: 5,
                RequiredSkill: 'ER',
            },
            {
                Id: 10,
                Subject: 'Emergency Response Team',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0),
                IsAllDay: false,
                StaffId: 5,
                RequiredSkill: 'ER',
            },
            {
                Id: 11,
                Subject: 'ICU Support & Monitoring',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
                IsAllDay: false,
                StaffId: 6,
                RequiredSkill: 'ICU',
            },
            {
                Id: 12,
                Subject: 'ER Support - Critical Care',
                StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0),
                EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 30),
                IsAllDay: false,
                StaffId: 6,
                RequiredSkill: 'ER',
            },
        ];
    }

    rowDrag(args: RowDragEventArgs): void {
        args.cancel = true;
    }

    isTimeSlotAvailableForResource(resourceId: number, startTime: Date, endTime: Date): boolean {
        if (!this.scheduleObj) {
            return false;
        }

        const allEvents = this.scheduleObj.getEvents() || [];
        const proposedDay = new Date(startTime);
        proposedDay.setHours(0, 0, 0, 0);

        return !allEvents.some((event: any) => {
            if (event.StaffId !== resourceId) {
                return false;
            }

            const eventDay = new Date(event.StartTime);
            eventDay.setHours(0, 0, 0, 0);
            if (eventDay.getTime() !== proposedDay.getTime()) {
                return false;
            }

            const eventStart = new Date(event.StartTime).getTime();
            const eventEnd = new Date(event.EndTime).getTime();
            return startTime.getTime() < eventEnd && endTime.getTime() > eventStart;
        });
    }

    rowDrop(args: RowDropEventArgs): void {
        const scheduleObj = this.scheduleObj;
        if (scheduleObj && this.gridObj) {
            const cellData = scheduleObj.getCellDetails(args.target as any);
            if (typeof cellData.groupIndex === 'number') {
                const resourceDetails = scheduleObj.getResourcesByIndex(cellData.groupIndex);
                const appointment = args.data[0] as UnplannedAppointment;
                const durationStr = appointment.Duration;
                const durationHours = parseInt(durationStr.split(' ')[0], 10);

                const resource = this.resourceData.find((r) => r.id === resourceDetails.resourceData.id);
                if (!resource || !resource.skills.includes(appointment.RequiredSkill)) {
                    return;
                }

                const workload = this.getResourceWorkloadForDate(resource.id, cellData.startTime);
                if (workload + durationHours > this.maxDailyWorkload) {
                    return;
                }

                const startTime = new Date(cellData.startTime);
                const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

                if (!this.isTimeSlotAvailableForResource(resourceDetails.resourceData.id, startTime, endTime)) {
                    return;
                }

                const allEvents = scheduleObj.getEvents();
                let maxId = 0;
                if (allEvents && allEvents.length > 0) {
                    maxId = Math.max(...allEvents.map((e: any) => typeof e.Id === 'number' ? e.Id : 0));
                }

                const eventData = {
                    Id: maxId + 1,
                    Subject: appointment.Task,
                    StartTime: startTime,
                    EndTime: endTime,
                    IsAllDay: cellData.isAllDay,
                    StaffId: resourceDetails.resourceData.id,
                    RequiredSkill: appointment.RequiredSkill,
                };
                scheduleObj.addEvent(eventData);

                const appointmentKey = `${appointment.Task}|${appointment.RequiredSkill}`;
                this.scheduledAppointments.add(appointmentKey);

                this.gridData = this.gridData.filter((item) => !(
                    item.Task === appointment.Task &&
                    item.RequiredSkill === appointment.RequiredSkill
                ));
                if (this.gridObj) {
                    this.gridObj.dataSource = this.gridData;
                    this.gridObj.dataBind();
                }
            }
        }
    }

    handleEventDragStart(args: DragEventArgs): void {
        this.draggedEventData = args.data;
    }

    handleEventDragStop(args: DragEventArgs): void {
        if (this.draggedEventData && args.data) {
            const hasResourceChanged = this.draggedEventData.StaffId !== args.data.StaffId;
            const hasTimeChanged =
                new Date(this.draggedEventData.StartTime).getTime() !== new Date(args.data.StartTime).getTime();

            if (hasResourceChanged || hasTimeChanged) {
                const targetResource = this.resourceData.find((r) => r.id === args.data.StaffId);
                const eventSkill = this.draggedEventData.RequiredSkill || this.getEventSkill(this.draggedEventData);

                const startTime = new Date(args.data.StartTime);
                const endTime = new Date(args.data.EndTime);
                const durationMs = endTime.getTime() - startTime.getTime();
                const durationHours = durationMs / (1000 * 60 * 60);

                if (targetResource && !targetResource.skills.includes(eventSkill)) {
                    args.data.StaffId = this.draggedEventData.StaffId;
                    args.data.StartTime = new Date(this.draggedEventData.StartTime);
                    args.data.EndTime = new Date(this.draggedEventData.EndTime);

                    if (this.scheduleObj) {
                        this.scheduleObj.saveEvent(args.data);
                    }
                } else {
                    const currentWorkload = this.getResourceWorkloadForDate(
                        args.data.StaffId,
                        startTime,
                        args.data.Id
                    );

                    if (currentWorkload + durationHours > this.maxDailyWorkload) {
                        args.data.StaffId = this.draggedEventData.StaffId;
                        args.data.StartTime = new Date(this.draggedEventData.StartTime);
                        args.data.EndTime = new Date(this.draggedEventData.EndTime);

                        if (this.scheduleObj) {
                            this.scheduleObj.saveEvent(args.data);
                        }
                    } else {
                        if (eventSkill) {
                            args.data.RequiredSkill = eventSkill;
                        }
                    }
                }
            }
        }
        this.draggedEventData = null;
    }

    getEventSkill(eventData: any): string {
        if (eventData.RequiredSkill) return eventData.RequiredSkill;

        const subject = eventData.Subject || '';
        for (const resource of this.resourceData) {
            for (const skill of resource.skills) {
                if (subject.includes(skill)) {
                    return skill;
                }
            }
        }
        return 'General';
    }

    getResourceWorkloadForDate(resourceId: number, date: Date, excludeEventId?: number | string): number {
        if (!this.scheduleObj) return 0;

        const scheduleObj = this.scheduleObj;
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        const allEvents = scheduleObj.getEvents() || [];
        let totalHours = 0;

        for (const event of allEvents) {
            const eventDate = new Date(event.StartTime);
            eventDate.setHours(0, 0, 0, 0);

            const isOnSameDay = eventDate.getTime() === dayStart.getTime();
            const isForResource = event.StaffId === resourceId;
            const isNotExcluded = !excludeEventId || event.Id !== excludeEventId;

            if (isOnSameDay && isForResource && isNotExcluded) {
                const startTime = new Date(event.StartTime);
                const endTime = new Date(event.EndTime);
                const durationMs = endTime.getTime() - startTime.getTime();
                const hours = durationMs / (1000 * 60 * 60);
                totalHours += hours;
            }
        }

        return totalHours;
    }

    findAvailableTimeSlotForResource(
        resourceId: number,
        durationHours: number,
        date: Date,
        tempScheduledEvents?: any[]
    ): { startTime: Date; endTime: Date } | null {
        if (!this.scheduleObj) {
            return null;
        }

        const scheduleObj = this.scheduleObj;
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        const workingStart = new Date(dayStart);
        workingStart.setHours(9, 0, 0, 0);

        const workingEnd = new Date(dayStart);
        workingEnd.setHours(17, 0, 0, 0);

        const allEvents = scheduleObj.getEvents(dayStart, dayEnd) || [];
        let resourceEvents = allEvents
            .filter((event: any) => event.StaffId === resourceId)
            .sort((a: any, b: any) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime());

        if (tempScheduledEvents && tempScheduledEvents.length > 0) {
            const tempResourceEvents = tempScheduledEvents
                .filter((event: any) => event.StaffId === resourceId)
                .sort((a: any, b: any) => new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime());
            resourceEvents = [...resourceEvents, ...tempResourceEvents].sort((a: any, b: any) =>
                new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
            );
        }

        const durationMs = durationHours * 60 * 60 * 1000;

        if (resourceEvents.length === 0) {
            if (workingStart.getTime() + durationMs <= workingEnd.getTime()) {
                return {
                    startTime: new Date(workingStart),
                    endTime: new Date(workingStart.getTime() + durationMs),
                };
            }
        } else {
            const firstEventStart = new Date(resourceEvents[0].StartTime).getTime();
            if (workingStart.getTime() + durationMs <= firstEventStart) {
                return {
                    startTime: new Date(workingStart),
                    endTime: new Date(workingStart.getTime() + durationMs),
                };
            }

            for (let i = 0; i < resourceEvents.length - 1; i++) {
                const currentEventEnd = new Date(resourceEvents[i].EndTime).getTime();
                const nextEventStart = new Date(resourceEvents[i + 1].StartTime).getTime();

                if (nextEventStart - currentEventEnd >= durationMs) {
                    return {
                        startTime: new Date(currentEventEnd),
                        endTime: new Date(currentEventEnd + durationMs),
                    };
                }
            }

            const lastEventEnd = new Date(resourceEvents[resourceEvents.length - 1].EndTime).getTime();
            if (lastEventEnd + durationMs <= workingEnd.getTime()) {
                return {
                    startTime: new Date(lastEventEnd),
                    endTime: new Date(lastEventEnd + durationMs),
                };
            }
        }

        return null;
    }

    handleAutoScheduling(): void {
        if (!this.scheduleObj || !this.gridObj) return;
        const scheduleObj = this.scheduleObj;
        const appointmentsToSchedule: UnplannedAppointment[] = this.gridData.filter((appt) => {
            const appointmentKey = `${appt.Task}|${appt.RequiredSkill}`;
            return !this.scheduledAppointments.has(appointmentKey);
        });
        const successfullyScheduled: string[] = [];
        const tempScheduledEvents: any[] = [];

        this.resourceWorkload.clear();
        const scheduleDate = this.scheduleObj.selectedDate || new Date();
        const dayStart = new Date(scheduleDate);
        dayStart.setHours(0, 0, 0, 0);

        for (const resource of this.resourceData) {
            this.resourceWorkload.set(resource.id, this.getResourceWorkloadForDate(resource.id, dayStart));
        }

        const allExistingEvents = scheduleObj.getEvents() || [];
        let maxEventId = 0;
        if (allExistingEvents.length > 0) {
            maxEventId = Math.max(...allExistingEvents.map((e: any) => typeof e.Id === 'number' ? e.Id : 0));
        }
        let nextEventId = maxEventId + 1;
        for (const appt of appointmentsToSchedule) {
            const matchingResources = this.resourceData.filter((r) => r.skills.includes(appt.RequiredSkill));

            if (matchingResources.length === 0) continue;

            const durationHours = parseInt(appt.Duration.split(' ')[0], 10);
            let bestResource: Resource | null = null;
            let bestSlot: { startTime: Date; endTime: Date } | null = null;
            let bestWorkload = Infinity;

            for (const resource of matchingResources) {
                const currentWorkload = this.resourceWorkload.get(resource.id) || 0;

                if (currentWorkload + durationHours > this.maxDailyWorkload) {
                    continue;
                }

                const slot = this.findAvailableTimeSlotForResource(resource.id, durationHours, dayStart, tempScheduledEvents);
                if (!slot) {
                    continue;
                }

                if (currentWorkload < bestWorkload) {
                    bestResource = resource;
                    bestSlot = slot;
                    bestWorkload = currentWorkload;
                }
            }

            if (!bestResource || !bestSlot) {
                continue;
            }

            const eventData = {
                Id: nextEventId,
                Subject: appt.Task,
                StartTime: bestSlot.startTime,
                EndTime: bestSlot.endTime,
                IsAllDay: false,
                StaffId: bestResource.id,
                RequiredSkill: appt.RequiredSkill,
            };

            scheduleObj.addEvent(eventData);
            tempScheduledEvents.push(eventData);

            const appointmentKey = `${appt.Task}|${appt.RequiredSkill}`;
            this.scheduledAppointments.add(appointmentKey);

            this.resourceWorkload.set(bestResource.id, bestWorkload + durationHours);
            successfullyScheduled.push(appt.Task);
            nextEventId++;
        }

        this.gridData = this.gridData.filter((item) => {
            const appointmentKey = `${item.Task}|${item.RequiredSkill}`;
            return !this.scheduledAppointments.has(appointmentKey);
        });

        if (this.gridObj) {
            this.gridObj.dataSource = this.gridData;
            this.gridObj.dataBind();
        }
    }

    onActionBegin(args: ActionEventArgs): void {

        if (args.requestType !== 'eventChange') {
            return;
        }

        const eventData = Array.isArray(args.data) ? args.data[0] : args.data;

        const startTime = new Date(eventData.StartTime);
        const endTime = new Date(eventData.EndTime);

        const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

        const workload = this.getResourceWorkloadForDate(
            eventData.StaffId,
            startTime,
            eventData.Id
        );

        if (workload + durationHours > this.maxDailyWorkload) {
            args.cancel = true;
        }
    }

    onCellClick(args: CellClickEventArgs): void {
        args.cancel = true;
    }

    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            args.cancel = true;
        }
    }
}
