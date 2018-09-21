import { Component, OnInit, Inject } from '@angular/core';
import { categoryData } from './data';
import { ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridsearch',
    templateUrl: 'searching.html',
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