import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'default.html'
})
export class DefaultComponent implements OnInit {
    public data: Object[] = [];

    ngOnInit(): void {
        this.data = orderDetails;
    }
}