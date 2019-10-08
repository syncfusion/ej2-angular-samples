import { Component, OnInit } from '@angular/core';
import { dragData } from './jsontreegriddata';
import { TreeGridComponent, RowDDService, SelectionService} from '@syncfusion/ej2-angular-treegrid';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'drag-drop.html',
    providers: [ RowDDService, SelectionService ]

})
export class DragDropComponent implements OnInit {
    public data: Object[] = [];
    public selectOptions: Object;

    ngOnInit(): void {
        this.data = dragData;
        this.selectOptions = { type: 'Multiple' };
    }
}
