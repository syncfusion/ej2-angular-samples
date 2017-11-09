import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { TimePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-ng-calendars/src';

/**

 * TimePicker component
 */
@Component({
    selector: 'control-content',
    styleUrls: ['timepicker-style.css'],
    templateUrl: 'range.html',
    encapsulation: ViewEncapsulation.None
})
export class RangeTimePickerComponent {
    @ViewChild('startTime')
    public startObject: TimePickerComponent;
    @ViewChild('endTime')
    public endObject: TimePickerComponent;
    public startText: string = 'Start Time';
    public endText: string = 'End Time';
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

    public changeTime(): void {
	/*To determine whether we have selected business hours or not*/
        let element: HTMLInputElement = <HTMLInputElement>document.getElementById('dayRange');
        this.isStartTimeChange = false;
        if (element.checked) {
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
        sourceFiles.files = ['timepicker-style.css'];
    }
}