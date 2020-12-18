import { Component, OnInit } from '@angular/core';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { data } from './data';

setCulture('en-US');

L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});

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