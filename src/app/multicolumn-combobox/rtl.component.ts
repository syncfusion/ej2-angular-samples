/**
 * MultiColumn Combobox RTL Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { bookDetails } from './multicolumn-data-source';
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls: ['rtl.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class RTLMultiComboBoxComponent {
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Title', value: 'Author' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'e.g. The Hobbit';
    // set the data source
    public datasource: object = bookDetails;
}
