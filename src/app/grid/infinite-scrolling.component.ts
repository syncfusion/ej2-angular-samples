import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { InfiniteScrollService, VirtualScrollService, GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { datasource, virtualData } from './data';
import { getDatasource, infiniteData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridinfinite-scroll',
    templateUrl: 'infinite-scrolling.html',
    styleUrls: ['virtualization.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [InfiniteScrollService, VirtualScrollService],
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, GridModule, SBDescriptionComponent]
})
export class InfiniteScrollingComponent implements OnInit {
    public vData: Object[] = [];
    @ViewChild('grid')
    public grid: GridComponent;
    public pageSettings: object = { pageSize: 50 };
    public ngOnInit(): void { }

    onClick = (args: any) => {
        if (!this.vData.length) {
             datasource();
            this.grid.dataSource = this.vData = virtualData;
        }
        this.grid.refresh();
    }
}