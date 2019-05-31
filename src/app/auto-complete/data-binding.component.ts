/**
 * AutoComplete Remote-Data & Local-Data Samples
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { AutoCompleteComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'data-binding.html',
    styleUrls: ['data-binding.css'],
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
    // maps the local data column to fields property
    public localFields: Object = { value: 'Name' };
    //set the placeholder to AutoComplete input
    public localWaterMark: string = 'e.g. Australia';
    //bind the DataManager instance to dataSource property
    public data: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    // set the count for displays the suggestion items.
    public suggestionCount: number = 5;
    public query: Query = new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
    // maps the remote data column to fields property
    public remoteFields: Object = { value:'FirstName' };
    //set the placeholder to AutoComplete input
    public remoteWaterMark: string = 'e.g. Andrew Fuller';
    // bind change event
    public onChange(): void {
        // enable or disable the autofill in remote data AutoComplete based on CheckBox checked state
        this.localObj.autofill = this.checkboxObj.checked;
        // enable or disable the autofill in local data AutoComplete based on CheckBox checked state
        this.remoteObj.autofill = this.checkboxObj.checked;
    }
}
