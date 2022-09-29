import { Component, ViewEncapsulation } from '@angular/core';
import { SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

/**
 * Linear View of Speed Dial component.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'linear.html',
    styleUrls: ['linear.css'],
    encapsulation: ViewEncapsulation.None
})

export class LinearSpeedDialComponent {
    public items: SpeedDialItemModel[] = [
        {
            title:'Image',
            iconCss: 'speeddial-icons speeddial-icon-image'
        },
        {
            title:'Audio',
            iconCss: 'speeddial-icons speeddial-icon-audio'
        },
        {
            title:'Video',
            iconCss: 'speeddial-icons speeddial-icon-video'
        }
    ]
}
