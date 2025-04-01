/**
 * MultiColumn Combobox Filtering Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { employee } from './multicolumn-data-source';
@Component({
    selector: 'control-content',
    templateUrl: 'filtering.html',
    styleUrls: ['filtering.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent,DropDownListModule]
})
export class FilteringMultiComboBoxComponent {
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Experience' };
    // set the placeholder to ComboBox input element
    public waterMark: string = 'e.g. Alice Johnson';
    // set the data source
    public datasource: object = employee;

    public mccbDropdownListData: string[] = ['StartsWith','EndsWith','Contains'];

    public change(args: any): void {
        this.filtering.filterType = args.value;
    }
    public filterType: string = 'StartsWith';
    
    @ViewChild('filtering')
    public filtering: MultiColumnComboBoxComponent;
    
}
