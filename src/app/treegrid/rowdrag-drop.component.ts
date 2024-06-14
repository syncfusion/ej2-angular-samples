import { Component, OnInit, Inject } from '@angular/core';
import { dragData } from './jsontreegriddata';
import { TreeGridAllModule,RowDDService, SelectionService, ReorderService,PageService } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'rowdrag-drop.html',
    providers: [RowDDService,
        SelectionService, PageService],
    standalone: true,
    imports: [SBActionDescriptionComponent, TreeGridAllModule, SBDescriptionComponent]
})
export class DragAndDropBetweenComponent implements OnInit {
    public srcData: Object[] = [];
    public destData: Object[] = [];
    public pageOptions: Object;
    public selectionOptions: Object;
    public srcDropOptions: Object;
    public destDropOptions: Object;

    ngOnInit(): void {
        this.srcData = dragData;
        this.pageOptions = { pageCount: 2 };
        this.selectionOptions = { type: 'Multiple' };
        this.srcDropOptions = { targetID: 'DestGrid' };
        this.destDropOptions = { targetID: 'TreeGrid' };
    }
}