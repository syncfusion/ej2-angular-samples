import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SpeedDialItemModel, RadialSettingsModel, SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Radial View of Speed Dial component.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'radial.html',
    styleUrls: ['radial.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpeedDialModule]
})

export class RadialSpeedDialComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['radial.css'];
    }

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
        }
    ];

    public radialSetting:RadialSettingsModel = { offset: '70px' };
    public radialSetting1:RadialSettingsModel = { offset: '110px' };

}
