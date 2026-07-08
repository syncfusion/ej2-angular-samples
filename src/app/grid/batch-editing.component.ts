import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { inventoryStoreData } from './data';
import { GridComponent, EditService, ToolbarService, PageService, SortService, GridModule, FilterService, AggregateService, CellEditArgs } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'ej-gridbatchedit',
    templateUrl: 'batch-editing.html',
    styleUrls: ['batch-editing.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, EditService, PageService, SortService, FilterService, AggregateService],
    standalone: true,
    imports: [NgIf, GridModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
export class BatchEditComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public selectionSettings: Object;
    public toolbar: string[];
    public editparams: Object;
    public pageSettings: Object;
    public filterSettings: Object;
    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = inventoryStoreData;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, enableUndoRedo: true, mode: 'Batch' };
        this.toolbar = ['Add', 'Delete', 'Update', 'Cancel', 'Undo', 'Redo'];
        this.editparams = { params: { showSpinButton: false } };
        this.pageSettings = { pageCount: 5 };
        this.filterSettings = { type: 'CheckBox' };
        this.selectionSettings = { mode: 'Cell', type: 'Multiple' }
    }

    getCategoryClass(category: string): string {
        switch (category) {
            case 'IT Asset':
                return 'e-cat-it-asset';
            case 'IT Infrastructure':
                return 'e-cat-it-infrastructure';
            case 'Admin':
                return 'e-cat-admin';
            case 'Security':
                return 'e-cat-security';
            case 'Facilities':
                return 'e-cat-facilities';
            case 'Finance':
                return 'e-cat-finance';
            case 'Sales':
                return 'e-cat-sales';
            case 'Marketing':
                return 'e-cat-marketing';
            case 'Training':
                return 'e-cat-training';
            default:
                return 'e-cat-default';
        }
    }

    getCategoryFromProduct(productName: string) {
        const item = inventoryStoreData.find((data) => data.Product === productName);
        return item ? item.Category : '';
    };

    beforeBatchSave() {
        const changes: any = this.grid.getBatchChanges();
        changes.addedRecords.forEach((row: any) => {
            row.Category = this.getCategoryFromProduct(row.Product);
        });
    };

    cellEdit(args: CellEditArgs) {
        if (args.type === 'edit' && args.columnName === 'Product') {
            args.cancel = true;
        }
    };
}
