import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { ColumnModel, ResizeService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'stacked-header.html',
    providers: [ResizeService]
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
                textAlign: 'Right',
                minWidth: 10
            },
            {
                field: 'Freight',
                headerText: 'Freight ($)',
                width: 120,
                format: 'C1',
                textAlign: 'Right',
                minWidth: 10
            }
        ];

        this.shipColumns = [
            {
                field: 'ShippedDate',
                headerText: 'Shipped Date',
                format: 'yMd',
                textAlign: 'Right',
                width: 150,
                minWidth: 10
            },
            {
                field: 'ShipCountry',
                headerText: 'Ship Country',
                width: 150,
                minWidth: 10
            }
        ];
    }
}