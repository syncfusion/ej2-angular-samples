import { Component, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
@Component({
    selector: 'control-content',
    templateUrl: 'databinding.html',
    styleUrls: ['databinding.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataBindingDropDownListComponent {
    public sportsData: Object[] = [
        { id: 'Game1', game: 'American Football' },
        { id: 'Game2', game: 'Badminton' },
        { id: 'Game3', game: 'Basketball' },
        { id: 'Game4', game: 'Cricket' },
        { id: 'Game5', game: 'Football' },
        { id: 'Game6', game: 'Golf' },
        { id: 'Game7', game: 'Hockey' },
        { id: 'Game8', game: 'Rugby' },
        { id: 'Game9', game: 'Snooker' },
        { id: 'Game10', game: 'Tennis' }
    ];
    public localFields: Object = { text: 'game', value: 'id' };
    public localWaterMark: string = 'Select a game';
    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    public query: Query = new Query().select(['ContactName', 'CustomerID']);
    public remoteFields: Object = { text: 'ContactName', value: 'CustomerID' };
    public height: string = '200px';
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
}
