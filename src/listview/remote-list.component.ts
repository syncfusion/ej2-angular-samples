/**
 * ListView Remote Sample
 */

import { Component, Inject } from '@angular/core';

//Import DataManager related classes
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
    selector: 'control-content',
    templateUrl: 'remote-list.html',
    styleUrls:['listview.css']
})

export class RemoteListViewComponent {

    //Initialize dataSource with the DataManager instance.
    public data: DataManager = new DataManager({
        url: '//js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/',
        crossDomain: true
    });

    //Initialize query with the Query instance to get specified set of data
    public query: Query = new Query().from('Products').select('ProductID,ProductName').take(10);

    //Map the appropriate columns to fields property
    public fields: Object = { id: 'ProductID', text: 'ProductName' };

    //Set header title
    public headerTitle: string = 'Products';

     constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['listview.css'];
    }

}
