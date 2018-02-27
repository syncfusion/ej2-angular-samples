/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { ComboBoxComponent } from '@syncfusion/ej2-ng-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-ng-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'databinding.html',
    styleUrls: ['databinding.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataBindingComboBoxComponent {
    @ViewChild('local')
    public localObj: ComboBoxComponent;
    @ViewChild('remote')
    public remoteObj: ComboBoxComponent;
    @ViewChild('checkbox')
    public checkboxObj: CheckBoxComponent;
    public sportsData: Object[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' }
    ];
    // maps the local data column to fields property
    public localFields: Object = { text: 'Game', value: 'Id' };
    // set the placeholder to ComboBox input element
    public localWaterMark: string = 'Select a game';
    // bind the DataManager instance to dataSource property
    public data: DataManager = new DataManager({
        url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Customers',
        adaptor: new ODataAdaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    public query: Query = new Query().select(['ContactName', 'CustomerID']);
    // maps the remote data column to fields property
    public remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    // set the height of the popup element.
    public height: string = '250px';
    // set the placeholder to ComboBox input element    
    public remoteWaterMark: string = 'Select a customer';
    public onChange(): void {
        // enable or disable the autofill in local data ComboBox based on CheckBox checked state
        this.localObj.autofill = this.checkboxObj.checked;
        // enable or disable the autofill in remote data ComboBox based on CheckBox checked state
        this.remoteObj.autofill = this.checkboxObj.checked;
    }
}
