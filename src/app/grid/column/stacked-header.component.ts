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
                field: 'CustomerID',
                headerText: 'Customer Name',
                width: 160,
                minWidth:30
            },
            {
                field: 'OrderDate',
                headerText: 'Order Date',
                textAlign: 'Right',
                width: 140,
                format: 'yMd',
                minWidth: 50,
                editType: 'datepickeredit'
            },
        ];

        this.shipColumns = [
            {
                field: 'ShippedDate',
                headerText: 'Shipped Date',
                textAlign: 'Right',
                format: 'yMd',
                width: 160,
                minWidth: 40,
                editType: 'datepickeredit'
            },
            {
                field: 'ShipCountry',
                headerText: 'Ship Country',
                width: 140,
                minWidth: 60,
                editType: 'dropdownedit'
            },
            {
                field: 'Freight',
                headerText: 'Freight Charges($)',
                textAlign: 'Right', 
                width: 200,
                format: 'C2',
                minWidth: 40,
                editType: 'numericedit',
                validationRules: { required: true, min: 0 }
            }
        ];
    }
}