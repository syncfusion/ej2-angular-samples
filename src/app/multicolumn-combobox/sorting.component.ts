/**
 * MultiColumn Combobox Sorting Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { products } from './multicolumn-data-source';
@Component({
    selector: 'control-content',
    templateUrl: 'sorting.html',
    styleUrls: ['sorting.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class SortingMultiComboBoxComponent {
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Category' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'e.g. laptop';
    //set sort order to ascending
    public sortOrder: string = 'Ascending';
    //set sort type to multi column
    public sortType: string ='MultiColumn';
    // set the data source
    public datasource: object = products;
}
