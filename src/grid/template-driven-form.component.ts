import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { orderDetails } from './data';
import { EditService, ToolbarService, PageService, DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';

/**
 * Template driven Forms sample
 */
@Component({
    selector: 'ej-gridedittemplate',
    templateUrl: 'template-driven-form.html',
    providers: [ToolbarService, EditService, PageService]
})
export class TemplateDrivenFormComponent implements OnInit {
    public data: Object[];
    public editSettings: Object;
    public toolbar: string[];
    public pageSettings: Object;
    public shipCityDistinctData: Object[];
    public shipCountryDistinctData: Object[];
    public orderData: IOrderModel;
    @ViewChild('orderForm')
    public orderForm: FormGroup;
    @ViewChild('OrderID')
    public orderID: ElementRef;
    @ViewChild('CustomerName')
    public customerName: ElementRef;

    public ngOnInit(): void {
        this.data = orderDetails;
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
        this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
        this.pageSettings = { pageCount: 5};
        this.shipCityDistinctData = DataUtil.distinct(orderDetails, 'ShipCity', true);
        this.shipCountryDistinctData = DataUtil.distinct(orderDetails, 'ShipCountry', true );
    }

    actionBegin(args: SaveEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            this.orderData = Object.assign({}, args.rowData);
        }
        if (args.requestType === 'save') {
            if (this.orderForm.valid) {
                args.data = this.orderData;
            } else {
                args.cancel = true;
            }
        }
    } 

    actionComplete(args: DialogEditEventArgs): void {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            // Set initail Focus
            if (args.requestType === 'beginEdit') {
                (args.form.elements.namedItem('CustomerName') as HTMLInputElement).focus();
            } else if (args.requestType === 'add') {
                (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
            }

        }
    }

    public focusIn(target: HTMLElement): void {
        target.parentElement.classList.add('e-input-focus');
    }

    public focusOut(target: HTMLElement): void {
        target.parentElement.classList.remove('e-input-focus');
    }

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