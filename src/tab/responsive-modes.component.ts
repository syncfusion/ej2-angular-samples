import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';

/**
 * Adaptive Tab Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'responsive-modes.html',
    styleUrls: ['tab.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ResponsiveTabComponent {
    @ViewChild('modes')
    public dropDownObj: DropDownListComponent;
    @ViewChild('adaptiveTab')
    public tabObj: TabComponent;

    // Mapping DropDownList dataSource property
    public data: Object[] = [
        { id: 'scrollable', mode: 'Scrollable' },
        { id: 'popup', mode: 'Popup' }
    ];
    // Mapping DropDownList fields property
    public fields: Object = { text: 'mode', value: 'id' };

    // Mapping DropDownList value property
    public value: string = 'scrollable';

    // Mapping Tab items Header property   
    public headerText: Object = [{ text: 'HTML' }, { text: 'C Sharp(C#)' }, { text: 'Java' }, { text: 'VB.Net' },
        { text: 'Xamarin' }, { text: 'ASP.NET' }, { text: 'ASP.NET MVC' }, { text: 'JavaScript' }];

    // Change event funtion for DropDownList component    
    public onChange(e: Object): void {
        this.value = this.dropDownObj.value.toString();
        //set overflowMode property to Tab Component
        if (this.dropDownObj.value === 'scrollable') {
            this.tabObj.overflowMode = 'Scrollable';
        } else {
            this.tabObj.overflowMode = 'Popup';
        }
        this.tabObj.dataBind();
    }
}