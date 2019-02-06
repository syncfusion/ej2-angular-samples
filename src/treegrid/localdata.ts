import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'localdata.html'
})
export class LocalDataComponent implements OnInit {
    public data: Object[] = [];
    public pageSettings: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.pageSettings = { pageSize: 10 };
    }
}
