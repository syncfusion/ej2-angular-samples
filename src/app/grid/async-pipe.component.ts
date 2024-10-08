import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersService } from './order.service';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-grids';
import { AsyncPipe } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { GridModule, SortService, GroupService, PageService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej2-gridasyncpipe',
    templateUrl: 'async-pipe.html',
    providers: [SortService, GroupService, PageService],
    standalone: true,
    imports: [
        GridModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
        AsyncPipe,
    ],
})
export class AsyncPipeComponent implements OnInit {
    public data: Observable<DataStateChangeEventArgs>;
    public pageOptions: Object;
    public state: DataStateChangeEventArgs;

    constructor(@Inject('sourceFiles') private sourceFiles: any, private service: OrdersService) {
        sourceFiles.files = ['order.service.ts'];
        this.data = service;
    }

    public dataStateChange(state: DataStateChangeEventArgs): void {
        this.service.execute(state);
    }

    public ngOnInit(): void {
        this.pageOptions = { pageSize: 10, pageCount: 4 };
        let state = { skip: 0, take: 10 };
        this.service.execute(state);
    }
}

