import { Component, OnInit } from '@angular/core';
import { data } from './data';
import { PageService, SortService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej-gridlocal',
    templateUrl: 'local-data.html',
    providers: [PageService, SortService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class LocalDataComponent implements OnInit {
    public data: Object[];
    public pageSettings: Object;
    ngOnInit(): void {
        this.data = data;
        this.pageSettings = { pageCount: 5 };
    }
}