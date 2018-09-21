import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

/**
 * Rtl Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'right-to-left.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RtlToolbarComponent {
    @ViewChild('modes')
    public dropDownObj: DropDownListComponent;

    @ViewChild('toolbar')
    public toolbarObj: ToolbarComponent;

    // Mapping DropDownList dataSource property
    public data: Object[] = [
        { id: 'scrollable', mode: 'Scrollable' },
        { id: 'popup', mode: 'Popup' }
    ];
    // Mapping DropDownList fields property
    public fields: Object = { text: 'mode', value: 'id' };

    // Mapping DropDownList value property
    public value: string = 'scrollable';

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }

    // Change event funtion for DropDownList component
    public onChange(e: Object): void {
        this.value = this.dropDownObj.value.toString();
        //set overflowMode property to Tab Component
        if (this.dropDownObj.value === 'scrollable') {
            this.toolbarObj.overflowMode = 'Scrollable';
        } else {
            this.toolbarObj.overflowMode = 'Popup';
        }
        this.toolbarObj.dataBind();
    }
}