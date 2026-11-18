import { Component, OnInit } from '@angular/core';
import { GridModule, ToolbarService, FindService, PageService } from '@syncfusion/ej2-angular-grids';
import { categoryData } from './data';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';

@Component({
    selector: 'ej-gridfindhighlight',
    templateUrl: 'findhighlight.html',
    providers: [ToolbarService, FindService, PageService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent],
})
export class FindHighlightComponent implements OnInit {
    public data: Object[];
    public toolbar: string[];
    public findSettings: Object;
    public pageSettings: Object;

    public ngOnInit(): void {
        this.data = categoryData;
        this.toolbar = ['Find'];
        this.pageSettings = { pageSize: 10, pageCount: 10 };
        this.findSettings = { key: 'Beverages' };
    }
}