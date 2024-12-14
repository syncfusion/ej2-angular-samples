/**
 * MultiColumn Combobox Defaut functionality Sample
 */
import { Component, ViewChild, NgModule } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { FormsModule } from '@angular/forms';
import { products } from './multicolumn-data-source';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, FormsModule, SBDescriptionComponent]
})
export class DefaultMultiComboBoxComponent {
    @ViewChild('default')
    public multicomboBoxObj: MultiColumnComboBoxComponent;
    // maps the appropriate column to fields property
    public fields: Object =  { text: 'Name', value: 'Category' };
    // set the value to select an item based on mapped value at initial rendering
    public value: string = 'Electronics';
    // set the value to select an item based on mapped value at initial rendering
    public text: string = 'Laptop';
    // set the data source
    public datasource: object = products;
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select any product';
    public onChange(args: any): void {
        let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
        let text: Element = document.getElementById('text');
        // make empty the input value when typed characters is 'null' in input element
        if (this.multicomboBoxObj.value === "null" || this.multicomboBoxObj.value === null || this.multicomboBoxObj.value === "") {
            valueEle.value = '';
        }
        // set null text to the input value when clear the text in ComboBox element
        if (this.multicomboBoxObj.text === "null" || this.multicomboBoxObj.text === null || this.multicomboBoxObj.text === "") {
            text.innerHTML =  '';
        } else {
            text.innerHTML = this.multicomboBoxObj.text.toString();
        }
    }
    ngAfterViewInit(e: any): void {
        this.onChange(e);
    }
}
