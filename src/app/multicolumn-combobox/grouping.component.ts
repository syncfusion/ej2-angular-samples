/**
 * MultiColumn Combobox Grouping Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { products } from './multicolumn-data-source';
@Component({
    selector: 'control-content',
    templateUrl: 'grouping.html',
    styleUrls: ['grouping.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class GroupingMultiComboBoxComponent {
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Name', groupBy: 'Category' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select a device';
    // set the data source
    public datasource: object = products;
}
