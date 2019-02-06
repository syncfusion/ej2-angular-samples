import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { TimePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-calendars';
import { ChangeEventArgs as checkboxChange } from '@syncfusion/ej2-angular-buttons';

/**

 * TimePicker component range sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['range-style.css'],
    templateUrl: 'time-range.html',
    encapsulation: ViewEncapsulation.None
})
export class RangeTimePickerComponent {
    @ViewChild('startTime')
    public startObject: TimePickerComponent;
    @ViewChild('endTime')
    public endObject: TimePickerComponent;
    public isStartTimeChange: Boolean = true;
    public endInput: HTMLInputElement;
    ngAfterViewInit(): void {
        this.endInput = <HTMLInputElement>document.getElementById('endPicker');
    }

    public onEnableEndTime(args: ChangeEventArgs): void {
	/*Enables end time if start time is selected*/
        let value: Date;
        if (this.isStartTimeChange) {
            this.endObject.enabled = true;
            this.endObject.value = null;
            this.endInput.value = '';
            value = new Date(args.value);
            value.setMinutes(value.getMinutes() + this.endObject.step);
            this.endObject.min = value;
        } else {
            this.isStartTimeChange = true;
        }
    }

    public changeTime(args: checkboxChange): void {
	/*To determine whether we have selected business hours or not*/
        this.isStartTimeChange = false;
        if (args.checked) {
            /*Business hours*/
            this.startObject.value = new Date('9/6/2017 9:00');
            this.endObject.enabled = true;
            this.endObject.value = new Date('9/6/2017 18:00');
            this.startObject.readonly = true;
            this.endObject.readonly = true;
        } else {
            this.endObject.value = null;
            this.startObject.value = null;
            this.endInput.value = '';
            this.startObject.readonly = false;
            this.endObject.readonly = false;
            this.endObject.enabled = false;
        }
    }

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['range-style.css'];
    }
}