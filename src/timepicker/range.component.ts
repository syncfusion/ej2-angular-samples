import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { TimePickerComponent, ChangeEventArgs } from '@syncfusion/ej2-ng-calendars/src';

/**

 * TimePicker Component
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
        let element: HTMLInputElement = <HTMLInputElement>document.getElementById('dayRange');
        if (element.checked) {
            this.startObject.value = new Date('9/6/2017 9:00');
            this.endObject.enabled = true;
            this.endObject.value = new Date('9/6/2017 18:00');
            this.startObject.readonly = true;
            this.endObject.readonly = true;
            this.isStartTimeChange = false;
        } else {
            this.endObject.value = null;
            this.startObject.value = null;
            this.endInput.value = '';
            this.startObject.readonly = false;
            this.endObject.readonly = false;
            this.endObject.enabled = false;
            this.isStartTimeChange = true;
        }
    }

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['timepicker-style.css'];
    }
}