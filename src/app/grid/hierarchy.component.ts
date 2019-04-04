import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { employeeData, orderDatas, customerData } from './data';
import { DetailRowService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridhierarchy',
    templateUrl: 'hierarchy.html',
    providers: [DetailRowService]
})
export class HierarchyComponent implements OnInit {
    public parentData: Object[];
    public childGrid: any;
    public secondChildGrid: any;


    ngOnInit(): void {
        this.parentData = employeeData;
        this.secondChildGrid = {
            dataSource: customerData,
            queryString: 'CustomerID',
            columns: [
                { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
                { field: 'Phone', headerText: 'Phone', width: 100 },
                { field: 'Address', headerText: 'Address', width: 120 },
                { field: 'Country', headerText: 'Country', width: 100 }
            ]
        };
        this.childGrid = {
            dataSource: orderDatas,
            queryString: 'EmployeeID',
            allowPaging: true,
            pageSettings: {pageSize: 6, pageCount: 5},
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: this.secondChildGrid
        };
    }
}