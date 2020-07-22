import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { InfiniteScrollService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { getDatasource, infiniteData } from './data';

@Component({
    selector: 'ej2-gridinfinite-scroll',
    templateUrl: 'infinite-scrolling.html',
    styleUrls: ['virtualization.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [InfiniteScrollService]
})
export class InfiniteScrollingComponent implements OnInit {
    public vData: Object[] = [];
    @ViewChild('grid')
    public grid: GridComponent;
    public pageSettings: object = { pageSize: 50 };
    public ngOnInit(): void { }

    onClick = (args: any) => {
        if (!this.vData.length) {
             getDatasource();
            this.grid.dataSource = this.vData = infiniteData;
        }
        this.grid.refresh();
    }
}