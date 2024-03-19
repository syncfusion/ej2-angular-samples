import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * CheckBox Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'checkbox.html',
    styleUrls: ['checkbox.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
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