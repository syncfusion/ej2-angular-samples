import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, TimePickerService, DateRangePickerService, RenderMode } from '@syncfusion/ej2-angular-inplace-editor';

/**
 * In-place Editor pickers sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pickers.html',
    encapsulation: ViewEncapsulation.None,
    providers: [TimePickerService,DateRangePickerService]
})
export class PickersInplaceEditorComponent implements OnInit {
    public date: Object = new Date();
    @ViewChild('datePickerEle')
    public datePickerObj: InPlaceEditorComponent;
    @ViewChild('timePickerEle')
    public timePickerObj: InPlaceEditorComponent;
    @ViewChild('dateTimePickerEle')
    public dateTimePickerObj: InPlaceEditorComponent;
    @ViewChild('dateRangePickerEle')
    public dateRangePickeObj: InPlaceEditorComponent;
    @ViewChild('editorMode')
    public editorModeObj: DropDownListComponent;

    public datePickerModel: object;
    public timePickerModel: object;
    public dateTimePickerModel: object;
    public dateRangePickerModel: object;

    public dateValue: Date = new Date();
    public timeValue: Date = new Date();
    public dateTimeValue: Date = new Date();
    public rangeValue: Date[] = [new Date('11/20/2018'), new Date('11/21/2018')];
    public editorModeData: string[] = ['Inline', 'Popup'];
    public scrollParent: HTMLElement = <HTMLElement>document.querySelector('.sb-right-pane');

    ngOnInit(): void {
        this.datePickerModel = {
            placeholder: 'Select a date'
        };
        this.timePickerModel = {
            placeholder: 'Select a time'
        };
        this.dateTimePickerModel = {
            placeholder: 'Select a date and time'
        };
        this.dateRangePickerModel = {
            placeholder: 'Select a date range'
        };
        this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
    }

    changeMode(e: ChangeEventArgs) {
        /*Apply selected mode to the component*/
        this.datePickerObj.mode = e.value as RenderMode;
        this.dateRangePickeObj.mode = e.value as RenderMode;
        this.timePickerObj.mode = e.value as RenderMode;
        this.dateTimePickerObj.mode = e.value as RenderMode;
    }

    hidePopup(): void {
        if (this.editorModeObj.value === 'Inline') { return; }
        if (this.datePickerObj && this.datePickerObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.datePickerObj.enableEditMode = false;
        }
        if (this.dateRangePickeObj && this.dateRangePickeObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.dateRangePickeObj.enableEditMode = false;
        }
        if (this.timePickerObj && this.timePickerObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.timePickerObj.enableEditMode = false;
        }
        if (this.dateTimePickerObj && this.dateTimePickerObj.element.querySelectorAll('.e-editable-open').length > 0) {
            this.dateTimePickerObj.enableEditMode = false;
        }
    }
}
