import { Component, ViewEncapsulation } from '@angular/core';
import { SelectionSettingsModel } from '@syncfusion/ej2-dropdowns';
/**
 * ListBox Checkbox Selection sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'checkbox.html',
    styleUrls: ['checkbox.css'],
    encapsulation: ViewEncapsulation.None
})

export class CheckboxListBoxComponent {
    // dataSource definition
    public data: { [key: string]: Object }[] = [
        { text: 'Hennessey Venom', id: 'list-01' },
        { text: 'Bugatti Chiron', id: 'list-02' },
        { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
        { text: 'SSC Ultimate Aero', id: 'list-04' },
        { text: 'Koenigsegg CCR', id: 'list-05' },
        { text: 'McLaren F1', id: 'list-06' },
        { text: 'Aston Martin One- 77', id: 'list-07' },
        { text: 'Jaguar XJ220', id: 'list-08' },
        { text: 'McLaren P1', id: 'list-09' },
        { text: 'Ferrari LaFerrari', id: 'list-10' }
    ];
    public selectionSettings: SelectionSettingsModel = { showCheckbox: true };
}
