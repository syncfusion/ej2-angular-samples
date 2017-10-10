import { Component, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { MultiSelectComponent, DropDownListComponent } from '@syncfusion/ej2-ng-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'databinding.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataBindingMultiSelectComponent {
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

    public typeData: string[] = [ 'box', 'default', 'delimiter' ];
    public localFields: Object = { text: 'Name', value: 'Code' };
    public localWaterMark: string = 'Select countries';
    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    public query: Query = new Query().select(['ContactName', 'CustomerID']);
    public remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    public remoteWaterMark: string = 'Select customers';
    public onActionBegin(): void {
         let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
                document.querySelector('.control-section').querySelectorAll('.e-chips-close.e-icon');
            element[1].classList.remove('e-close-hooker');
            element[1].classList.add('e-spinner-icon');
            element[1].style.display = 'block';
    }
    public onActionComplete(): void {
        let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
            document.querySelector('.control-section').querySelectorAll('.e-chips-close.e-icon');
        element[1].classList.add('e-close-hooker');
        element[1].classList.remove('e-spinner-icon');
        element[1].style.display = 'none';
    }
    public onActionFailure(): void {
        this.onActionComplete();
    }
}
