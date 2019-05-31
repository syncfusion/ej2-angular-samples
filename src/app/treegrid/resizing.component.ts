import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'resizing.html'
})
export class ResizingComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
    }
}
