/**
 * ListView Remote Sample
 */

import { Component, Inject } from '@angular/core';

//Import DataManager related classes
import { DataManager, Query } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'remote-list.html',
    styleUrls: ['listview.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, ListViewAllModule, SBDescriptionComponent]
})

export class RemoteListViewComponent {

    //Initialize dataSource with the DataManager instance.
    public data: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/angular/production/api/',
        crossDomain: true
    });

    //Initialize query with the Query instance to get specified set of data
    public query: Query = new Query().from('ListView').select('EmployeeID,FirstName').take(10);

    //Map the appropriate columns to fields property
    public fields: Object = { id: 'EmployeeID', text: 'FirstName' };

    //Set header title
    public headerTitle: string = 'Employees';

     constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['listview.css'];
    }

}
