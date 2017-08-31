import { Component, Inject } from '@angular/core';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
/**
 * 
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-list.html',
    styleUrls:['listview.css']
})
export class RemoteListViewComponent {

    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ODataV4Adaptor
    });
    public query: Query = new Query().from('Products').select('ProductID,ProductName').take(10);
    public fields: Object = { id: 'ProductID', text: 'ProductName' };
    public headerTitle: string = 'Products';

     constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['listview.css'];
    }

}