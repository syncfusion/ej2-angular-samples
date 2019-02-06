import { Component, OnInit } from '@angular/core';
import { stackedData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'stackedheader.html'
})
export class StackedHeaderComponent implements OnInit {
    public data: Object[] = [];
    public orderColumns: Object[];
    public shipColumns: Object[];
    public priceColumns: Object[];

    ngOnInit(): void {
        this.data = stackedData;
        this.orderColumns = [
            { field: 'orderID', headerText: 'Order ID', textAlign: 'Right', width: 90 },
            { field: 'orderName', headerText: 'Order Name', textAlign: 'Left', width: 180 },
            { field: 'orderDate', headerText: 'Order Date', textAlign: 'Right', width: 120, format: 'yMd'}
        ];
        this.shipColumns = [
            { field: 'shipMentCategory', headerText: 'Shipment Category', textAlign: 'Left', width: 150 },
            { field: 'shippedDate', headerText: 'Shipped Date', textAlign: 'Right', width: 120, format: 'yMd' },
            { field: 'units', headerText: 'Units', textAlign: 'Right', width: 80 }
        ];
        this.priceColumns = [
            { field: 'unitPrice', headerText: 'Price per unit', format: 'C0', type: 'number', width: 120, textAlign: 'Right' },
            { field: 'price', headerText: 'Total Price', width: 110, format: 'C0', type: 'number', textAlign: 'Right' }
        ];
    }
}
