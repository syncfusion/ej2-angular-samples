import { Component, ViewEncapsulation } from '@angular/core';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'filtering.html',
    styleUrls: ['filtering.css'],
    encapsulation: ViewEncapsulation.None
})
export class FilteringDropDownListComponent {
    public data: DataManager = new DataManager({
        url: 'http://services.odata.org/V4/Northwind/Northwind.svc/Customers',
        adaptor: new ODataV4Adaptor,
        crossDomain: true
    });
    public query: Query = new Query().select(['ContactName', 'CustomerID']).take(25);
    public fields: Object = { text: 'ContactName', value: 'CustomerID' };
    public height: string = '220px';
    public watermark: string = 'Select a customer';
    public filterPlaceholder: string = 'Search';
    public targetElement: HTMLElement;
    public popupElement: HTMLElement;
    public spinnerElement: HTMLElement;
    public onFiltering: EmitType<FilteringEventArgs> = this.debounce(
        (e: FilteringEventArgs) => {
            let query: Query = new Query().select(['ContactName', 'CustomerID']);
            query = (e.text !== '') ? query.where('ContactName', 'startswith', e.text, true) : query;
            e.updateData(this.data, query);
        },
        200);

    public onActionBegin(): void {
        this.popupElement = <HTMLElement><HTMLElement>document.getElementById('dropdownlist-searching_popup');
        if (Browser.isDevice && this.popupElement) {
            if (!this.spinnerElement) {
                this.spinnerElement = <HTMLElement>document.createElement('span');
                this.spinnerElement.classList.add('e-spinner-icon');
                this.popupElement.appendChild(this.spinnerElement);
            }
        } else {
            let element: HTMLElement = <HTMLElement>document.querySelector('.control-section').querySelector('.e-input-group-icon');
            this.targetElement = this.popupElement ? <HTMLElement>this.popupElement.querySelector('.e-clear-icon') : element;
            if (this.targetElement) {
                this.targetElement.classList.add('e-spinner-icon');
                if (!this.popupElement) {
                    this.targetElement.classList.remove('e-ddl-icon', 'e-search-icon');
                }
            }
        }
    }
    public debounce(func: Function, wait?: number): EmitType<FilteringEventArgs> {
        let timeout: number;
        let isTypedFirst: boolean = false;
        /* tslint:disable */
        return function () {
            /* tslint:enable */
            let context: object = this, args: IArguments = arguments;
            let later: Function = () => {
                timeout = null;
                if (!isTypedFirst) { func.apply(context, args); }
            };
            let callNow: boolean = !isTypedFirst && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                isTypedFirst = true;
                func.apply(context, args);
            } else {
                isTypedFirst = false;
            }
        };
    };
    public onActionComplete(): void {
        if (Browser.isDevice && this.popupElement && this.spinnerElement) {
            this.spinnerElement.remove();
            this.spinnerElement = null;
        } else if (this.targetElement) {
            this.targetElement.classList.remove('e-spinner-icon');
            if (!this.popupElement) {
                this.targetElement.classList.add('e-ddl-icon', 'e-search-icon');
            }
        }
        if (!this.targetElement) {
            let element: Element = document.getElementsByClassName('e-spinner-icon')[0];
            if (element) {
                element.classList.remove('e-spinner-icon');
            }
        }
    }
    public onActionFailure(): void {
        this.onActionComplete();
    }
}