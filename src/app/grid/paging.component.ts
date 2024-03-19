import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { PageService, SortService } from '@syncfusion/ej2-angular-grids';
import { data } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';

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
    styleUrls: ['paging.style.css'],
    templateUrl: 'paging.html',
    providers: [PageService, SortService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class PageComponent implements OnInit {
    public data: Object[];
    public initialPage: Object;
    ngOnInit(): void {
        this.data = data;
        this.initialPage = { pageSizes: true, pageCount: 4 };
    }
}