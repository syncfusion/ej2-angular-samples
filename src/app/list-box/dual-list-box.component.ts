import { Component, ViewEncapsulation } from '@angular/core';
import { FieldSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-dropdowns';
/**
 * Dual ListBox Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'dual-list-box.html',
    styleUrls: ['dual-list-box.css'],
    encapsulation: ViewEncapsulation.None
})

export class DualListBoxComponent {
    public dataA: { [key: string]: Object }[] = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Hong Kong', Code: 'HK' }
    ];
    public dataB: { [key: string]: Object }[] = [
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
    public fields: FieldSettingsModel = { text: 'Name'};
    public toolbarSettings: ToolbarSettingsModel = { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom']}
}
