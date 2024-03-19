import { Component, OnInit, Inject } from '@angular/core';
import { orderDetails } from './data';
import { RowDDService, SelectionService, GridModule, SortService, PageService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-srcgrid',
    templateUrl: 'drag-and-drop.html',
    styleUrls: ['drag-and-drop.style.css'],
    providers: [RowDDService,
        SelectionService, SortService, PageService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class DragAndDropComponent implements OnInit {
    public srcData: Object[] = [];
    public destData: Object[] = [];
    public pageOptions: Object;
    public selectionOptions: Object;
    public srcDropOptions: Object;
    public destDropOptions: Object;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['drag-and-drop.style.css'];
    }

    ngOnInit(): void {
        this.srcData = orderDetails;
        this.pageOptions = { pageCount: 2 };
        this.selectionOptions = { type: 'Multiple' };
        this.srcDropOptions = { targetID: 'DestGrid' };
        this.destDropOptions = { targetID: 'Grid' };
    }
}