import { Component, OnInit, Inject } from '@angular/core';
import { categoryData } from './data';
import { ToolbarService, SortService, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridsearch',
    templateUrl: 'searching.html',
    providers: [SortService, PageService, ToolbarService],
    standalone: true,
    imports: [
        GridModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
    ],
})
export class SearchComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    public toolbar: string[];
    public ngOnInit(): void {
        this.data = categoryData;
        this.pageSettings = { pageCount: 5 };
        this.toolbar = ['Search'];
    }
}