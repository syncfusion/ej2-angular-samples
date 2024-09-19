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
        let names = ["John", "Alice", "Bob", "Mario Pontes", "Yang Wang", "Michael", "Nancy", "Robert King"];
        let hours = [8, 12, 16];
        let status = ["Pending", "Completed", "In Progress"];
        let designation = ["Engineer", "Manager", "Tester"];
        let result: { [key: string]: Object }[] = [];
        for (let i = 0; i < 150; i++) {
            result.push({
                TaskID: i + 1,
                Engineer: names[Math.floor(Math.random() * names.length)],
                Designation: designation[Math.floor(Math.random() * designation.length)],
                Estimation: hours[Math.floor(Math.random() * hours.length)],
                Status: status[Math.floor(Math.random() * status.length)]
            });
        }
        this.records = result;
    }
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Engineer', value: 'TaskID'};
    // set the placeholder to ComboBox input element
    public waterMark: string = 'Select an engineer';
    // set the gridSettings to MultiColumn ComboBox input element
    public gridSettings: Object = { rowHeight: 40 };
}
