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
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];
    public localFields: Object = { value: 'Name' };
    public localWaterMark: string = 'e.g. Australia';
    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Products',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    public suggestionCount: number = 5;
    public query: Query = new Query().select(['ProductID', 'ProductName']);
    public remoteFields: Object = { value: 'ProductName' };
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
