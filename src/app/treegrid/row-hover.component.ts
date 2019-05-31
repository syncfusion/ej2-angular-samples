import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'row-hover.html'
})
export class RowHover implements OnInit {
    public data: Object[] = [];
    ngOnInit(): void {
        this.data = sampleData;
        
    }
}