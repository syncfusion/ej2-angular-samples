import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { InPlaceEditorComponent, TimePickerService, DateRangePickerService, RenderMode, InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { DatePickerModel, TimePickerModel, DateTimePickerModel, DateRangePickerModel } from '@syncfusion/ej2-calendars';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * In-place Editor pickers sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'pickers.html',
    styleUrls: ['pickers.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [TimePickerService, DateRangePickerService],
    standalone: true,
    imports: [InPlaceEditorModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PickersInplaceEditorComponent implements OnInit {

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

    public date: Date = new Date();
    public datePickerModel: DatePickerModel = {
        placeholder: 'Select a date'
    };
    public timePickerModel: TimePickerModel = {
        placeholder: 'Select a time'
    };
    public dateTimePickerModel: DateTimePickerModel = {
        placeholder: 'Select a date and time'
    };
    public dateRangePickerModel: DateRangePickerModel = {
        placeholder: 'Select a date range'
    };
    public dateValue: Date = new Date();
    public timeValue: Date = new Date();
    public dateTimeValue: Date = new Date();
    public rangeValue: Date[] = [new Date('11/20/2018'), new Date('11/21/2018')];
    public editorModeData: string[] = ['Inline', 'Popup'];
    public scrollParent: HTMLElement = document.querySelector('.sb-right-pane') as HTMLElement;

    ngOnInit(): void {
        if(this.scrollParent){
            this.scrollParent.addEventListener('scroll', this.hidePopup.bind(this));
        }
    }

    changeMode(e: ChangeEventArgs): void {
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
