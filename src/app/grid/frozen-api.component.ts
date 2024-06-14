import { Component, OnInit, ViewChild } from '@angular/core';
import { orderDetails } from './data';
import { GridComponent, Column, freezeDirection, SortService, GridModule, FreezeService, FilterService, ToolbarService, EditService } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent, ButtonPropsModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-grid-col-frozen',
    templateUrl: 'frozen-api.html',
    providers: [SortService, FreezeService, FilterService, ToolbarService, EditService],
    standalone: true,
    imports: [
        DropDownListModule,
        GridModule,
        DialogModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
    ],
})
export class FrozenApiComponent implements OnInit {
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('columndropdown')
    public columnDropDown: DropDownListComponent;
    @ViewChild('directiondropdown')
    public directionDropDown: DropDownListComponent;
    @ViewChild('alertDialog')
    public alertDialog: DialogComponent;
    public visible: boolean = false;
    public fields: object = { text: 'name', value: 'id' };
    public animationSettings: object = { effect: 'None' };
    public content: string = 'Atleast one Column should be in movable';
    public header: string = 'Frozen';
    public showCloseIcon: boolean = false;
    public target: string = '.control-section';
    public width: string = '300px';
    public data: Object[] = [];
    public filterSettings: Object;
    public toolbar: string[];
    public editSettings: Object;
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public refresh: boolean = true;
    public columnData: Object[] = [
        { id: 'OrderID', name: 'Order ID' },
        { id: 'Freight', name: 'Freight' },
        { id: 'CustomerID', name: 'Customer ID' },
        { id: 'OrderDate', name: 'Order Date' },
        { id: 'ShipName', name: 'Ship Name' },
        { id: 'ShipAddress', name: 'Ship Address' },
        { id: 'ShipCity', name: 'Ship City' },
        { id: 'ShipCountry', name: 'Ship Country' }
    ];
    public directionData: Object[] = [
        { id: 'Left', name: 'Left' },
        { id: 'Right', name: 'Right' },
        { id: 'Center', name: 'Center' },
        { id: 'Fixed', name: 'Fixed' }
    ];


    ngOnInit(): void {
        this.data = orderDetails;
        this.filterSettings = { type: 'Excel' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        this.orderidrules = { required: true, number: true };
        this.customeridrules = { required: true, minLength: 5 };
        this.freightrules = { required: true, min: 0 };
    }

    public columnChange(e: ChangeEventArgs): void {
        let columnName: string = e.value as string;
        let column: Column = this.grid.getColumnByField(columnName);
        let value: string = column.freeze === undefined ? 'Center' : column.freeze;
        this.refresh = this.directionDropDown.value === value;
        this.directionDropDown.value = value;
    }

    public directionChange(e: ChangeEventArgs): void {
        if (this.refresh) {
            let columnName: string = this.columnDropDown.value as string;
            let mvblColumns: Column[] = this.grid.getMovableColumns();
            if (mvblColumns.length === 1 && columnName === mvblColumns[0].field && e.value !== mvblColumns[0].freeze) {
                this.alertDialog.show(); this.refresh = false; this.directionDropDown.value = "Center"; this.directionDropDown.refresh();
            } else {
                this.grid.getColumnByField(columnName).freeze = e.value === 'Center' ? undefined : e.value as freezeDirection;
                this.grid.refreshColumns();
            }
        }
        this.refresh = true;
    }

    public alertDialogBtnClick = (): void => {
        this.alertDialog.hide();
    }

    public dlgButtons: ButtonPropsModel[] = [{ click: this.alertDialogBtnClick.bind(this), buttonModel: { content: 'OK', isPrimary: true } }];
}