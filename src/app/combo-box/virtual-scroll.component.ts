/**
 * ComboBox Defaut functionality Sample
 */
import { Component, ViewChild, NgModule } from '@angular/core';
import { ComboBoxComponent, VirtualScroll } from '@syncfusion/ej2-angular-dropdowns';

ComboBoxComponent.Inject(VirtualScroll);

@Component({
    selector: 'control-content',
    templateUrl: 'virtual-scroll.html'
})
export class VirtualScrollComboBoxComponent {
    @ViewChild('sample')
    public comboBoxObj: ComboBoxComponent;
    // defined the array of data
    public records: { [key: string]: Object }[] = [];
    constructor() {
        for (let i: number = 1; i <= 150; i++) {
            const item: { [key: string]: Object } = {
                id: 'id' + i,
                text: `Item ${i}`,
            };
            this.records.push(item);
        }
    }
    // maps the appropriate column to fields property
    public fields: object = { text: 'text', value: 'id' };
    // set the placeholder to AutoComplete input
    public waterMark: string = 'e.g. Item 1';
}