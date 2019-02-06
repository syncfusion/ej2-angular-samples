import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, RenderMode, TimePickerService, DateRangePickerService } from '@syncfusion/ej2-angular-inplace-editor';

/**
 * Pickers component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pickers.html',
    encapsulation: ViewEncapsulation.None,
    providers: [TimePickerService, DateRangePickerService]
})
export class PickersComponent {
    @ViewChild('date') dateObj: InPlaceEditorComponent;
    @ViewChild('time') timeObj: InPlaceEditorComponent;
    @ViewChild('dateTime') dateTimeObj: InPlaceEditorComponent;
    @ViewChild('dateRange') dateRangeObj: InPlaceEditorComponent;
    @ViewChild('editorMode') modeObj: DropDownListComponent;

    public dateModel: object;
    public timeModel: object;
    public dateTimeModel: object;
    public dateRangeModel: object;

    public dateValue: Date = new Date('5/23/2017');
    public timeValue: Date = new Date('5/23/2017 12:00 PM');
    public dateTimeValue: Date = new Date('5/23/2017 12:00 PM');
    public rangeValue: Date[] = [new Date('5/23/2017'), new Date('7/5/2017')];

    public editorModeData: string[] = ['Inline', 'Popup'];
    public scrollParent: HTMLElement = <HTMLElement>document.querySelector('.sb-right-pane');

    ngOnInit(): void {
        this.dateModel = { placeholder: 'Select a date' };
        this.timeModel = { placeholder: 'Select a time' };
        this.dateRangeModel = { placeholder: 'Select a date range' };
        this.dateTimeModel = { placeholder: 'Select a date and time' };
        this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
    }

    changeMode(args: ChangeEventArgs): void {
        /*Apply selected mode to the component*/
        let mode: RenderMode = args.value as RenderMode;
        this.dateObj.mode = mode;
        this.dateRangeObj.mode = mode;
        this.timeObj.mode = mode;
        this.dateTimeObj.mode = mode;
    }

    hidePopup(): void {
        if (this.modeObj.value === 'Inline') { return; }
        if (this.dateObj && this.dateObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.dateObj.enableEditMode = false;
        }
        if (this.dateRangeObj && this.dateRangeObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.dateRangeObj.enableEditMode = false;
        }
        if (this.timeObj && this.timeObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.timeObj.enableEditMode = false;
        }
        if (this.dateTimeObj && this.dateTimeObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.dateTimeObj.enableEditMode = false;
        }
    }
}