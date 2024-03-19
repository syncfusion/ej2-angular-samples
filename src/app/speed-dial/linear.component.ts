import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SpeedDialItemModel, SpeedDialModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Linear View of Speed Dial component.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'linear.html',
    styleUrls: ['linear.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpeedDialModule]
})

export class LinearSpeedDialComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['linear.css'];
    }

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
