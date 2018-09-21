import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'print.html'
})
export class PrintComponent implements OnInit {
    public data: Object[] = [];
    public toolbar: string[];

    ngOnInit(): void {
        this.data = orderDetails;
        this.toolbar = ["Print"];
    }
}