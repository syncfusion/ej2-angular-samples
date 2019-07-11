import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default-scrolling.html'
})
export class DefaultScrollingComponent implements OnInit {
    public data: Object[] = [];
    public dateformat: Object;
    
    ngOnInit(): void {
        this.data = sampleData;
        this.dateformat = { type: 'dateTime', format: 'dd/MM/yyyy' };
    }
}