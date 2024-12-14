/**
 * MultiColumn Combobox Virtualization Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MultiColumnComboBoxComponent, MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
@Component({
    selector: 'control-content',
    templateUrl: 'virtualization.html',
    styleUrls: ['virtualization.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MultiColumnComboBoxModule, SBDescriptionComponent]
})
export class VirtualMultiComboBoxComponent {
    //Generate large datas
    public records: { [key: string]: Object }[] = [];
    constructor() {
        let names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Emily Davis"];
        let departments = ["HR", "IT", "Finance", "Marketing", "Sales"];
        let roles = ["Manager", "Developer", "Analyst", "Consultant", "Executive"];
        let locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo"];
        let result: { [key: string]: Object }[] = [];
        for (let i = 0; i < 150; i++) {
            result.push({
                Name: names[Math.floor(Math.random() * names.length)],
                Department: departments[Math.floor(Math.random() * departments.length)],
                Role: roles[Math.floor(Math.random() * roles.length)],
                Location: locations[Math.floor(Math.random() * locations.length)]
            });
        }
        this.records = result;
    }
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Name'};
    // set the placeholder to ComboBox input element
    public waterMark: string = 'e.g. Alice Johnson';
    // set the gridSettings to MultiColumn ComboBox input element
    public gridSettings: Object = { rowHeight: 40 };
}
