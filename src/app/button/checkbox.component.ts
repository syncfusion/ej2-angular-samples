import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

/**
 * CheckBox Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'checkbox.html',
    styleUrls: ['checkbox.css'],
    encapsulation: ViewEncapsulation.None
})

export class CheckBoxController {
    @ViewChild('checkbox')
    public checkbox: CheckBoxComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
         sourceFiles.files = ['checkbox.css'];
    }

    // function to handle the CheckBox change event
    public changeHandler() : void {
        this.checkbox.label = 'CheckBox: ' + this.checkbox.checked;
    }
 }