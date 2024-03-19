import { Component, OnInit } from '@angular/core';
import { dragData } from './jsontreegriddata';
import { TreeGridComponent, RowDDService, SelectionService, TreeGridModule} from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'drag-drop.html',
    providers: [ RowDDService, SelectionService ],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]

})
export class DragDropComponent implements OnInit {
    public data: Object[] = [];
    public selectOptions: Object;

    ngOnInit(): void {
        this.data = dragData;
        this.selectOptions = { type: 'Multiple' };
    }
}
