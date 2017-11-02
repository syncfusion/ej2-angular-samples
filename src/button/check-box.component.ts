import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { CheckBoxComponent } from '@syncfusion/ej2-ng-buttons';

/**
 * CheckBox Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'check-box.html',
    styleUrls: ['check-box.css'],
    encapsulation: ViewEncapsulation.None
})

export class CheckBoxController {
    @ViewChild('checkbox')
    public checkbox: CheckBoxComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
         sourceFiles.files = ['check-box.css'];
    }

    // function to handle the CheckBox change event
    public changeHandler() : void {
        this.checkbox.label = 'CheckBox: ' + this.checkbox.checked;
    }
 }