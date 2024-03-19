import { Component, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
/**
 *Dropdown Tree Remote data sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'remote-data.html',
    styleUrls: ['remote-data.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DropDownTreeModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RemoteDropDownTreeComponent {
    // Use data manager to get dropdown tree data from remote source
    public data: Object = new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
        adaptor: new ODataV4Adaptor,
        crossDomain: true,
    });
    // Set queries to filter and fetch remote data
    public query: Object = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
    public query1: Object = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);
    public field: Object = {
        dataSource: this.data, query: this.query, value: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID',
        child: { dataSource: this.data, query: this.query1, value: 'OrderID', parentValue: 'EmployeeID', text: 'ShipName' }
    };
}