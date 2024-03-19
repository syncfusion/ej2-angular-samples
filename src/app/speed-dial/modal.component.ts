import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SpeedDialItemModel, SpeedDialModule } from '@syncfusion/ej2-angular-buttons';
/**
 * Default Speed Dial component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'modal.html',
    styleUrls: ['modal.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpeedDialModule]
})

export class ModalComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['modal.css'];
    }

    public items: SpeedDialItemModel[] = [
        {
            title:'Home',
            iconCss:'speeddial-icons speeddial-icon-house'
        },
        {
            title:'People',
            iconCss:'speeddial-icons speeddial-icon-people'
        },
        {
            title:'Search',
            iconCss:'speeddial-icons speeddial-icon-search'
        },
        {
            title:'Message',
            iconCss:'speeddial-icons speeddial-icon-message'
        }
    ];
}
