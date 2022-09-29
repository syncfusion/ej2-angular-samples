import { Component, ViewEncapsulation } from '@angular/core';
import { SpeedDialItemModel,RadialSettingsModel } from '@syncfusion/ej2-angular-buttons';

/**
 * Radial View of Speed Dial component.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'radial.html',
    styleUrls: ['radial.css'],
    encapsulation: ViewEncapsulation.None
})

export class RadialSpeedDialComponent {
    public items: SpeedDialItemModel[] = [
        {
            title: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            title: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            title: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            title: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        },
        {
            title: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ];

    public radialSetting:RadialSettingsModel = { offset: '70px' };

}
