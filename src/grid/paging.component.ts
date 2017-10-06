import { Component, OnInit } from '@angular/core';
import { data } from './data';

@Component({
    selector: 'ej2-gridpage',
    templateUrl: 'paging.html'
})
export class PageComponent implements OnInit {
    public data: Object[];
    public initialPage: Object;

    ngOnInit(): void {
        this.data = data;
        this.initialPage = { pageSizes: true, pageCount: 4 };
    }
}