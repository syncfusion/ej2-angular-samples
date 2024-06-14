import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { employeeData, orderDatas, customerData } from './data';
import { DetailRowService, SortService, GridModule, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridhierarchy',
    templateUrl: 'hierarchy.html',
    providers: [DetailRowService, SortService, PageService, FilterService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class HierarchyComponent implements OnInit {
    public parentData: Object[];
    public childGrid: any;
    public secondChildGrid: any;
    public filterSettings: Object;

    ngOnInit(): void {
        this.parentData = employeeData;
        this.filterSettings = { type: 'Excel'};
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