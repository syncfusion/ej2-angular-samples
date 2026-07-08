import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { InfiniteScrollService, VirtualScrollService, GridComponent, LoadEventArgs, GridModule, AggregateService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';
import { createSalesDataSource, salesDataSource } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ej2-gridinfinite-scroll',
    templateUrl: 'infinite-scrolling.html',
    styleUrls: ['infinite-scrolling.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [InfiniteScrollService, VirtualScrollService, AggregateService, SortService, FilterService],
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, GridModule, SBDescriptionComponent, NgIf]
})
export class InfiniteScrollingComponent implements OnInit {
    public vData: Object[] = [];
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('load')
    public loadButton: ButtonComponent;
    public pageSettings: object = { pageSize: 50 };
    public filterSettings: Object = { type: 'CheckBox', enableInfiniteScrolling: true };
    public ngOnInit(): void { }

    onClick = () => {
        this.loadButton.disabled = true;
        if (!this.vData.length) {
            createSalesDataSource();
            this.grid.dataSource = this.vData = salesDataSource;
        }
        this.grid.refresh();
    }
    onLoad(args: LoadEventArgs): void {
        if (args) {
            args.enableSeamlessScrolling = true;
        }
    }
}