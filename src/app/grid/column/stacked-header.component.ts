import { Component, OnInit } from '@angular/core';
import { orderDetails } from './data';
import { ColumnModel, ResizeService, SortService, GridModule, PageService, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'stacked-header.html',
    providers: [ResizeService, SortService, PageService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class StackedHeaderComponent implements OnInit {
    public data: Object[] = [];
    public orderColumns: ColumnModel[];
    public shipColumns: ColumnModel[];
    public filterSettings: Object;
    public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public ngOnInit(): void {
        this.data = orderDetails;
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.orderColumns = [
            {
                field: 'OrderDate',
                headerText: 'Order Date',
                format: 'yMd',
                width: 130,
                textAlign: 'Right',
                minWidth: 10,
                editType: 'datepickeredit'
            },
            {
                field: 'Freight',
                headerText: 'Freight ($)',
                width: 120,
                format: 'C1',
                textAlign: 'Right',
                minWidth: 10,
                editType: 'numericedit', 
                validationRules: { required: true, min: 0 }
            }
        ];

        this.shipColumns = [
            {
                field: 'ShippedDate',
                headerText: 'Shipped Date',
                format: 'yMd',
                textAlign: 'Right',
                width: 150,
                minWidth: 10,
                editType: 'datepickeredit'
            },
            {
                field: 'ShipCountry',
                headerText: 'Ship Country',
                width: 150,
                minWidth: 10,
                editType: 'dropdownedit'
            }
        ];
    }
}