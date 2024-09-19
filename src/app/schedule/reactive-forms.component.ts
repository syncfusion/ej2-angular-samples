import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, WorkWeekService, EventSettingsModel, ResizeService, DragAndDropService, ActionEventArgs, ScheduleModule, PopupOpenEventArgs, PopupCloseEventArgs } from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs } from '@syncfusion/ej2-calendars';
import { ReactiveFormsEventData } from './data';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

/**
 * Schedule Reactive forms sample
 */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'reactive-forms.html',
  styleUrls: ['reactive-forms.style.css'],
  providers: [MonthService, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [ScheduleModule, NgIf, TextBoxModule, DateTimePickerModule, ReactiveFormsModule, SBDescriptionComponent, SBActionDescriptionComponent]
})
export class ReactiveFormsComponent {
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], ReactiveFormsEventData, null, true) as Record<string, any>[],
  };
  public selectedDate: Date = new Date(2024, 1, 15);
  appointmentForm: FormGroup = this.createFormGroup({});

  createFormGroup(data: IEventModel): FormGroup {
    return new FormGroup({
      Subject: new FormControl(data.Subject, [Validators.required, Validators.minLength(8)]),
      StartTime: new FormControl(data.StartTime, Validators.required),
      EndTime: new FormControl(data.EndTime, Validators.required),
      Description: new FormControl(data.Description, [Validators.required, Validators.minLength(20)]),
      Type: new FormControl((data.Type))
    }, { validators: this.timeValidator });
  }

  timeValidator(form: FormGroup) {
    const startTime = form.get('StartTime').value;
    const endTime = form.get('EndTime').value;
  
    if (startTime > endTime) {
      return { timeInvalid: true };
    }
  
    return null;
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type.includes('Editor')) {
      this.appointmentForm = this.createFormGroup(
        args.data as Record<string, any>
      );
    }
  }

  onPopupClose(args: PopupCloseEventArgs): void {
    if (args.type.includes('Editor')) {
      if (args.data) {
        if (this.appointmentForm.invalid) {
          Object.keys(this.appointmentForm.controls).forEach((key: string) => {
            this.appointmentForm.get(key)?.markAsTouched();
          });
        } else if (this.appointmentForm.valid) {
          args.data = this.appointmentForm.value;
        }
        if ((args.event.currentTarget as any).classList.contains('e-event-save')) {
          args.cancel = this.appointmentForm.invalid;
        }
      } else {
        this.appointmentForm?.reset();
      }
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    switch (args.data.Type) {
      case 'meeting':
        (args.element as HTMLElement).style.backgroundColor = '#FF3333';
        break;
      case 'task':
        (args.element as HTMLElement).style.backgroundColor = '#07A426';
        break;
      case 'timeoff':
        (args.element as HTMLElement).style.backgroundColor = '#999B99';
        break;
    }
  }

  get Subject() {
    return this.appointmentForm?.get('Subject');
  }
  get StartTime() {
    return this.appointmentForm?.get('StartTime');
  }
  get EndTime() {
    return this.appointmentForm?.get('EndTime');
  }
  get Description() {
    return this.appointmentForm?.get('Description');
  }
  get Type() {
    return this.appointmentForm?.get('Type');
  }
}

export interface IEventModel {
  Subject?: string;
  StartTime?: Date;
  EndTime?: Date;
  Description?: string;
  Type?: string;
}
