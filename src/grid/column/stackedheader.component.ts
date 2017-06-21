import { Component, OnInit } from '@angular/core';
import { data } from '../data';
import { ColumnModel } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'stackedheader.html'
})
export class StackedHeaderComponent implements OnInit {
    public data: Object[] = [];
    public orderColumns: ColumnModel[];
    public shipColumns: ColumnModel[];

    public ngOnInit(): void {
        this.data = data;

        this.orderColumns = [
            {
                field: 'OrderDate',
                headerText: 'Order Date',
                format: 'yMd',
                width: 130,
                textAlign: 'right'
            },
            {
                field: 'Freight',
                headerText: 'Freight ($)',
                width: 120,
                format: 'C1',
                textAlign: 'right'
            }
        ];

        this.shipColumns = [
            {
                field: 'ShippedDate',
                headerText: 'Shipped Date',
                format: 'yMd',
                textAlign: 'right',
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