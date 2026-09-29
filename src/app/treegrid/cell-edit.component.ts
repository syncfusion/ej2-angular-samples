import { Component, OnInit, ViewChild } from '@angular/core';
import { retailInventoryData} from './jsontreegriddata';
import { TreeGridComponent , EditService , ToolbarService, TreeGridAllModule, PageService} from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgClass } from '@angular/common';
@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'cell-edit.html',
    styleUrls: ['cell-edit.style.css'],
    providers: [EditService , ToolbarService, PageService ],
    standalone: true,
    imports: [SBActionDescriptionComponent, SBDescriptionComponent, TreeGridAllModule, NgClass]
})
export class CellEditComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public toolbar:string[];
    public requiredRules: Object;
    public numericRules: Object;
     @ViewChild('treegrid')
     public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = retailInventoryData
        this.editSettings ={ allowEditing: true, allowAdding: true, allowDeleting: true, mode:"Cell"}; 
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        this.requiredRules = { required: true };
        this.numericRules = { number: true };
       
    }
}
