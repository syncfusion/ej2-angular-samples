import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, EventSettingsModel, GroupModel, PopupOpenEventArgs, TimelineViewsService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CommonModule } from '@angular/common';
import { extend } from '@syncfusion/ej2-base';
import { taskData } from './data';
import { DropDownListModule, DropDownList } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'task-progress-tracker.html',
  styleUrls: ['task-progress-tracker.style.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineViewsService, ResizeService, DragAndDropService],
  standalone: true,
  imports: [ScheduleModule, CommonModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class TaskProgressTrackerComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2026, 3, 24);
  public currentView: string = 'TimelineWeek';
  public showWeekend: boolean = false;
  public overlap: boolean = false;
  public startHour: string = '09:00';
  public endHour: string = '18:00';

  public employeeData: Record<string, any>[] = [
    { Text: 'Sarah', Id: 1, Color: '#EF4444' },
    { Text: 'John', Id: 2, Color: '#10B981' },
    { Text: 'Emma', Id: 3, Color: '#3B82F6' },
    { Text: 'Michael', Id: 4, Color: '#F59E0B' },
    { Text: 'Lisa', Id: 5, Color: '#8B5CF6' },
    { Text: 'David', Id: 6, Color: '#EC4899' }
  ];

  public eventData: Record<string, any>[] = extend([], taskData, null, true) as Record<string, any>[];

  public group: GroupModel = {
    resources: ['Employees']
  };

  public eventSettings: EventSettingsModel = {
    dataSource: this.eventData,
    fields: {
      id: 'Id',
      subject: { name: 'Subject' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
      description: { name: 'Description' }
    }
  };

  private STATUS_MAP = {
    'pending': { icon: 'e-clock', color: '#DC2626' },
    'in-progress': { icon: 'e-play', color: '#3B82F6' },
    'review': { icon: 'e-eye', color: '#F59E0B' },
    'done': { icon: 'e-check', color: '#10B981' }
  };

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['task-progress-tracker.style.css'];
  }

  public getStatusConfig(status: string): Record<string, any> {
    return this.STATUS_MAP[status] || this.STATUS_MAP['pending'];
  }

  public getProgressText(progress: number): string {
    return (progress || 0) + '%';
  }

  public getStatusLabel(status: string): string {
    return status || 'pending';
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type !== 'Editor') {
      return;
    }

    const dialog = args.element.closest('.e-dialog') as HTMLElement;
    if (dialog) {
      const elementsToHide = dialog.querySelectorAll('.e-repeat-parent-row, .e-recurrenceeditor');
      elementsToHide.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    }

    const form = args.element.querySelector('.e-schedule-form') as HTMLElement;
    if (!form) {
      return;
    }

    const existingCustomFields = form.querySelector('.custom-fields');
    if (existingCustomFields) {
      existingCustomFields.remove();
    }

    const container = document.createElement('div');
    container.className = 'custom-fields';

    const progressValue = args.data.Progress !== undefined && args.data.Progress !== null ? args.data.Progress : '0';
    const statusValue = args.data.Status || 'pending';

    container.innerHTML = [
      '<div class="e-field-group e-custom-row">',
      '  <input id="statusDropdown" name="Status" type="text" class="e-field" value="' + statusValue + '" />',
      '</div>',
      '<div class="e-field-group e-custom-row">',
      '  <div class="e-float-input e-control-wrapper e-input-group">',
      '    <input id="progressInput"',
      '      name="Progress"',
      '      type="number"',
      '      class="e-field e-input"',
      '      min="0"',
      '      max="100"',
      '      step="1"',
      '      value="' + progressValue + '" />',
      '    <span class="e-float-line"></span>',
      '    <label class="e-float-text e-label-top">Progress (%)</label>',
      '  </div>',
      '</div>'
    ].join('');

    form.appendChild(container);

    const progressEl = container.querySelector('[name="Progress"]') as HTMLInputElement;

    const applyStatusRules = (status: string | number | boolean | object) => {
      const statusStr = String(status);
      if (statusStr === 'done') {
        progressEl.value = '100';
        progressEl.disabled = true;
      } else if (statusStr === 'review') {
        progressEl.value = '99';
        progressEl.disabled = true;
      } else if (statusStr === 'pending') {
        progressEl.value = '0';
        progressEl.disabled = true;
      } else if (statusStr === 'in-progress') {
        const currentValue = Number(progressEl.value) || 0;
        if (currentValue >= 99) {
          progressEl.value = '98';
        }
        progressEl.disabled = false;
      } else {
        progressEl.disabled = false;
      }
    };

    const statusDropdown = new DropDownList({
      dataSource: [
        { text: 'Pending', value: 'pending' },
        { text: 'In-Progress', value: 'in-progress' },
        { text: 'Review', value: 'review' },
        { text: 'Done', value: 'done' }
      ],
      fields: { text: 'text', value: 'value' },
      value: statusValue,
      change: (e) => {
        applyStatusRules(e.value);
      },
      placeholder: 'Status',
      floatLabelType: 'Always'
    });
    statusDropdown.appendTo('#statusDropdown');
    applyStatusRules(statusValue);

    progressEl.addEventListener('input', (e) => {
      let value = Number((e.target as HTMLInputElement).value) || 0;
      const currentStatus = statusDropdown.value;
      if (currentStatus === 'in-progress') {
        if (value >= 99) value = 98;
        if (value <= 0) value = 0;
      }

      (e.target as HTMLInputElement).value = value.toString();
    });
  }
}
