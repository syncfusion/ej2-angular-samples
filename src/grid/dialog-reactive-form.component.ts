import { Component, OnInit } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { orderDetails } from './data';
import { EditService, ToolbarService, PageService, DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { Dialog } from '@syncfusion/ej2-angular-popups';

/**
 * Reactive Forms Dialog template sample
 */
@Component({
    selector: 'ej-griddialogtemplate',
    templateUrl: 'dialog-reactive-form.html',
    styleUrls: ['dialog-reactive-form.style.css'],
    providers: [ToolbarService, EditService, PageService]
})
export class DialogReactiveFormComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public orderForm: FormGroup;
    public pageSettings: Object;
    public shipCityDistinctData: Object[];
    public shipCountryDistinctData: Object[];
    public submitClicked: boolean = false;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
        this.toolbar = ['Add', 'Edit', 'Delete'];
        this.pageSettings = { pageCount: 5};
        this.shipCityDistinctData = DataUtil.distinct(orderDetails, 'ShipCity', true);
        this.shipCountryDistinctData = DataUtil.distinct(orderDetails, 'ShipCountry', true );
    }

    createFormGroup(data: IOrderModel): FormGroup {
        return new FormGroup({
            OrderID: new FormControl(data.OrderID, Validators.required),
            OrderDate: new FormControl(data.OrderDate, this.dateValidator()),
            CustomerName: new FormControl(data.CustomerName, Validators.required),
            Freight: new FormControl(data.Freight),
            ShipAddress: new FormControl(data.ShipAddress),
            ShipCity: new FormControl(data.ShipCity),
            ShipCountry: new FormControl(data.ShipCountry)
        });
    }

    dateValidator() {
        return (control: FormControl): null | Object  => {
            return control.value && control.value.getFullYear &&
            (1900 <= control.value.getFullYear() && control.value.getFullYear() <=  2099) ? null : { OrderDate: { value : control.value}};
        }
    }

    actionBegin(args: SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            this.submitClicked = false;
            this.orderForm = this.createFormGroup(args.rowData);
        }
        if (args.requestType === 'save') {
            this.submitClicked = true;
            if (this.orderForm.valid) {
                args.data = this.orderForm.value;
            } else {
                args.cancel = true;
            }
        }
    }

    actionComplete(args: DialogEditEventArgs): void {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                (<Dialog>args.dialog).dataBind();
            }
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('CustomerName') as HTMLInputElement).focus();
            } else if (args.requestType === 'add') {
                (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
            }
        }
    }

    get OrderID(): AbstractControl  { return this.orderForm.get('OrderID'); }

    get CustomerName(): AbstractControl { return this.orderForm.get('CustomerName'); }

    get OrderDate(): AbstractControl { return this.orderForm.get('OrderDate'); }

}

export interface IOrderModel {
    OrderID?: number;
    CustomerName?: string;
    ShipCity?: string;
    OrderDate?: Date;
    Freight?: number;
    ShipCountry?: string;
    ShipAddress?: string;
}