import { Component, OnInit } from '@angular/core';
import { orderDetails } from '../data';
import { ColumnModel } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'stackedheader.html'
})
export class StackedHeaderComponent implements OnInit {
    public data: Object[] = [];
    public orderColumns: ColumnModel[];
    public shipColumns: ColumnModel[];

    public ngOnInit(): void {
        this.data = orderDetails;

        this.orderColumns = [
            {
                field: 'OrderDate',
                headerText: 'Order Date',
                format: 'yMd',
                width: 130,
                textAlign: 'Right'
            },
            {
                field: 'Freight',
                headerText: 'Freight ($)',
                width: 120,
                format: 'C1',
                textAlign: 'Right'
            }
        ];

        this.shipColumns = [
            {
                field: 'ShippedDate',
                headerText: 'Shipped Date',
                format: 'yMd',
                textAlign: 'Right',
                width: 150
            },
            {
                field: 'ShipCountry',
                headerText: 'Ship Country',
                width: 150
            }
        ];
    }
}