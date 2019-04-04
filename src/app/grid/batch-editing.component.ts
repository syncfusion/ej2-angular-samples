import { Component, OnInit } from '@angular/core';
import { orderData } from './data';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'ej-gridbatchedit',
    templateUrl: 'batch-editing.html',
    providers: [ToolbarService, EditService, PageService]
})
export class BatchEditComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public editparams: Object;
    public pageSettings: Object;

    public ngOnInit(): void {
        this.data = orderData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Batch' };
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true };
        this.freightrules =  { required: true };
        this.editparams = { params: { popupHeight: '300px' }};
        this.pageSettings = {pageCount: 5};
    }
}
