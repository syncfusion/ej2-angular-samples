import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';

@Component({
    selector: 'ej-gridscroll',
    templateUrl: 'scrolling.html'
})
export class ScrollComponent implements OnInit {
    public data: Object[];

    public ngOnInit(): void {
        this.data = orderDetails;
     }
}