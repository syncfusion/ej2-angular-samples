import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TreeGridComponent , TreeGridAllModule} from '@syncfusion/ej2-angular-treegrid';
import { sampleData } from './jsontreegriddata';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Row height sample
 */

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'rowheight.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RowHeightComponent implements OnInit {
    public data: Object[];

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    public toolbar: Object[];

    ngOnInit(): void {
        this.data = sampleData;
        this.toolbar = [
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Left', tooltipText: 'Small' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Left', tooltipText: 'Medium' },
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Left', tooltipText: 'Large' }
            ];
    }

    clickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'small') {
        this.treegrid.rowHeight = 20;
        }
    if (args.item.id === 'medium') {
        this.treegrid.rowHeight = 40;
    }
    if (args.item.id === 'big') {
        this.treegrid.rowHeight = 60;
    }
}
}