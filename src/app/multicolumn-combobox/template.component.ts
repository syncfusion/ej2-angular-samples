/**
 * MultiColumn Combobox Template Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { empData } from './multicolumn-data-source';
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class TemplateMultiComboBoxComponent {
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Eimg' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'e.g. Andrew Fuller';
    // set the gridSettings to MultiColumn ComboBox input element
    public gridSettings: Object = { rowHeight: 40 };
    // set the data source
    public datasource: object = empData;
}
