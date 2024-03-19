import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { VirtualScrollService, TreeGridComponent, EditService, ToolbarService } from '@syncfusion/ej2-angular-treegrid';
import {dataSource, virtualData} from './jsontreegriddata';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'virtual-scrolling.html',
    encapsulation: ViewEncapsulation.None,
    providers: [VirtualScrollService, ToolbarService, EditService],
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class VirtualScrollingComponent implements OnInit {
    public vData: Object[] = [];
    public editSettings: Object;
    public toolbar:string[];

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    public tasknamerules: Object;
    public taskidrules: Object;

    public ngOnInit(): void {
        if (virtualData.length === 0) {
            dataSource();
        }
        this.vData = virtualData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Row", newRowPosition: "Child"}; 
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel','Indent', 'Outdent'];
        this.tasknamerules = { required: true};
        this.taskidrules = { required: true ,number: true};
    }
}