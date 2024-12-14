/**
 * MultiColumn Combobox KeyBoard Navigations Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { productDetails } from './multicolumn-data-source';
@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-navigation.html',
    styleUrls: ['keyboard-navigation.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class KeyboardMultiComboBoxComponent {
    // maps the appropriate column to fields property
    public fields: Object = { text: 'ProductName', value: 'ProductID' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select any product';
    // set the data source
    public datasource: object = productDetails;
}
