import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';

@Component({
    selector: 'ej-gridscroll',
    templateUrl: 'sticky-header.html'
})
export class StickyHeaderComponent implements OnInit {
    public data: Object[];

    public ngOnInit(): void {
        this.data = orderDetails.slice(0, 50);
     }
}
