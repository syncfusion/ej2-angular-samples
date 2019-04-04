import { Component, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
/**
 * TreeView Remote data sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['remote-data.css'],
    encapsulation: ViewEncapsulation.None
})
export class RemoteTreeViewComponent {
    // Use data manager to get tree data from remote source
    public data: Object = new DataManager({
            url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
            adaptor: new ODataV4Adaptor,
            crossDomain: true,
    });
    // Set queries to filter and fetch remote data
    public query:Object = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    public query1:Object = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
    public field:Object ={ dataSource: this.data, query: this.query, id: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
        child: { dataSource: this.data, query: this.query1, id: 'OrderID', parentID: 'EmployeeID', text: 'ShipName' }
    };
    // Show loading message, while loading tree data
    public show(): void {
        let popup: HTMLElement = document.getElementById('loading');
        popup.style.display = '';
    }
    // Hide loading message, after tree data has been loaded
    public hide(): void {
        let popup: HTMLElement = document.getElementById('loading') as HTMLElement;
        popup.style.display = 'none';
    }
}