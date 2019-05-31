/**
 * DropDownList Remote-Data & Local-Data Samples
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
@Component({
    selector: 'control-content',
    templateUrl: 'data-binding.html',
    styleUrls: ['data-binding.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataBindingDropDownListComponent {
    // define the JSON of data
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
    // set the placeholder to DropDownList input element
    public localWaterMark: string = 'Select a game';
    // bind the DataManager instance to dataSource property
    public data: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    // bind the Query instance to query property
    public query: Query = new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
    // maps the remote data column to fields property
    public remoteFields: Object = { text:'FirstName',value: 'EmployeeID' };
    // set the height of the popup element
    public height: string = '200px';
    // set the placeholder to DropDownList input element
    public remoteWaterMark: string = 'Select a name';
}
