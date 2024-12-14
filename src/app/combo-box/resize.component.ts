/**
 * ComboBox Resize Sample
 */
import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'resize.html',
    standalone: true,
    imports: [SBActionDescriptionComponent, ComboBoxModule, SBDescriptionComponent]
})
export class ResizeComboBoxComponent {
    //define the resize data
    public data: { [key: string]: Object; }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];
    // maps the appropriate column to fields property
    public fields: Object = { text: 'Name', value: 'Code' };
    // set true for enable the resize property to ComboBox 
    public allowResize: boolean = true;
    // set the height of the popup element
    public height: string = '220px';
    // set the placeholder to ComboBox input element
    public watermark: string = 'Select a country';
    
}