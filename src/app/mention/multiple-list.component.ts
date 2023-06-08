/**
 * Mention multiple-list Sample
 */
import { Component } from '@angular/core';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
    selector: 'control-content',
    templateUrl: 'multiple-list.html',
    styleUrls: ['mention.css']
})
export class MultipleListMentionComponent {
    // define the JSON of data
    public projects: Object[] = [
        { Id: 'Project1', Value: 'ERP' }, 
        { Id: 'Project2', Value: 'Help desk' },
        { Id: 'Project3', Value: 'Banking' }, 
        { Id: 'Project4', Value: 'Chat Box' },
        { Id: 'Project5', Value: 'Accounts' }
    ];

    public useCosts: Object[] = [
        { Id: 'Cost1', Value: '$1000' }, 
        { Id: 'Cost2', Value: '$1500' },
        { Id: 'Cost3', Value: '$3000' }, 
        { Id: 'Cost4', Value: '$3250' },
        { Id: 'Cost5', Value: '$5000' }
    ];

    public status: Object[] = [
        { Id: 'status1', Value: 'Open' }, 
        { Id: 'status2', Value: 'In-progress' },
        { Id: 'status3', Value: 'Hold' }, 
        { Id: 'status4', Value: 'Closed' }
    ];

    public commonTarget: string = '#multipleList';
    public localFields: Object = { text: 'Value' };
    public dataFields: Object = { text: 'FirstName', value: 'EmployeeID' };
    public count: number = 15;
    public popupWidth: string = "250px";
    public popupHeight: string = "250px";

    public data: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    public query: Query = new Query().select(['FirstName', 'EmployeeID']).requiresCount();
}
