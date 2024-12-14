import { Component, OnInit, Inject,ViewChild } from '@angular/core';
import { orderDetails } from './data';
import { RowDDService, SelectionService, GridModule, SortService, PageService, FilterService, ToolbarService, EditService, GridComponent } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-srcgrid',
    templateUrl: 'drag-and-drop.html',
    styleUrls: ['drag-and-drop.style.css'],
    providers: [RowDDService,
        SelectionService, SortService, PageService, FilterService, ToolbarService, EditService],
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
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    @ViewChild('DestGrid') public destGrid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['drag-and-drop.style.css'];
    }

    ngOnInit(): void {
        this.srcData = orderDetails;
        this.pageOptions = { pageCount: 2 };
        this.selectionOptions = { type: 'Multiple' };
        this.srcDropOptions = { targetID: 'DestGrid' };
        this.destDropOptions = { targetID: 'Grid' };
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
    }
    rowDragStart(args: any) {
        if (this.destGrid.isEdit) {
            if (this.destGrid.editModule.formObj.validate()) {
                this.destGrid.endEdit();
            } else {
                this.destGrid.closeEdit();
            }
        }
    }
}
