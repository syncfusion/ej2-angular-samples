import { Component, OnInit } from '@angular/core';
import { data } from './data';

@Component({
    selector: 'ej-gridlocal',
    templateUrl: 'local-data.html'
})
export class LocalDataComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    ngOnInit(): void {
        this.data = data;
        this.pageSettings = { pageCount: 5 };
    }
}