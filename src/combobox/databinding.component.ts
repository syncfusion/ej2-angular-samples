/**
 * ComboBox Remote-Data & Local-Data Samples
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
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
    public localFields: Object = { text: 'Game', value: 'Id' };
    public localWaterMark: string = 'Select a game';
    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    public query: Query = new Query().select(['ContactName', 'CustomerID']);
    public remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    public height: string = '250px';
    public remoteWaterMark: string = 'Select a customer';
    public onActionBegin(): void {
        let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
            document.querySelector('.control-section').querySelectorAll('.e-input-group-icon');
        element[1].classList.add('e-spinner-icon');
        element[1].classList.remove('e-ddl-icon', 'e-search-icon');
    }
    public onActionComplete(): void {
        let element: HTMLElement[] = <HTMLElement[] & NodeListOf<Element>>
            document.querySelector('.control-section').querySelectorAll('.e-input-group-icon');
        element[1].classList.add('e-ddl-icon', 'e-search-icon');
        element[1].classList.remove('e-spinner-icon');
    }
    public onActionFailure(): void {
        this.onActionComplete();
    }
    public onChange(): void {
        this.localObj.autofill = this.checkboxObj.checked;
        this.remoteObj.autofill = this.checkboxObj.checked;
    }
}
