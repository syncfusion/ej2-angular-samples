import { Component, OnInit } from '@angular/core';
import { orderDatas } from './data';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-ng-grids';

@Component({
    selector: 'ej-griddialogedit',
    templateUrl: 'normal-edit.html',
    providers: [ ToolbarService, EditService, PageService]
})
export class NormalEditComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public editparams: Object;
    public pageSettings: Object;

    public ngOnInit(): void {
        this.data = orderDatas;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'normal' };
        this.toolbar = ['add', 'edit', 'delete', 'update', 'cancel'];
        this.orderidrules = { required: true };
        this.customeridrules = { required: true };
        this.freightrules =  { range: [0, 1000] };
        this.editparams = { params: { popupHeight: '300px' }};
        this.pageSettings = {pageCount: 5};
    }
}
