/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { AutoCompleteComponent } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-ng-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'databinding.html',
    styleUrls: ['databinding.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataBindingAutoCompleteComponent {
    @ViewChild('local')
    public localObj: AutoCompleteComponent;
    @ViewChild('remote')
    public remoteObj: AutoCompleteComponent;
    @ViewChild('checkbox')
    public checkboxObj: CheckBoxComponent;
    public countries: { [key: string]: Object; }[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Bermuda', code: 'BM' },
        { name: 'Canada', code: 'CA' },
        { name: 'Cameroon', code: 'CM' },
        { name: 'Denmark', code: 'DK' },
        { name: 'France', code: 'FR' },
        { name: 'Finland', code: 'FI' },
        { name: 'Germany', code: 'DE' },
        { name: 'Greenland', code: 'GL' },
        { name: 'Hong Kong', code: 'HK' },
        { name: 'India', code: 'IN' },
        { name: 'Italy', code: 'IT' },
        { name: 'Japan', code: 'JP' },
        { name: 'Mexico', code: 'MX' },
        { name: 'Norway', code: 'NO' },
        { name: 'Poland', code: 'PL' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'United States', code: 'US' }
    ];
    public localFields: Object = { value: 'name' };
    public localWaterMark: string = 'e.g. Australia';
    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    public suggestionCount: number = 5;
    public query: Query = new Query().select(['ProductID', 'ProductName']);
    public remoteFields: Object = { text: 'ProductName', value: 'ProductID' };
    public remoteWaterMark: string = 'e.g. Alice Mutton';
    public loader: HTMLElement;
    public onActionBegin(): void {
        let spinner: HTMLElement = <HTMLElement>document.querySelector('.e-spinner-icon');
        if (!spinner) {
            this.loader = <HTMLElement>document.querySelectorAll('.e-clear-icon')[1];
            this.loader.classList.remove('e-clear-icon');
            this.loader.classList.add('e-spinner-icon');
            this.loader.classList.add('e-input-group-icon');
        }
    }
    public onActionComplete(): void {
        this.loader.classList.remove('e-spinner-icon');
        this.loader.classList.remove('e-input-group-icon');
        this.loader.classList.add('e-clear-icon');
    }
    public onActionFailure(): void {
        this.onActionComplete();
    }
    public onChange(): void {
        this.localObj.autofill = this.checkboxObj.checked;
        this.remoteObj.autofill = this.checkboxObj.checked;
    }
}
