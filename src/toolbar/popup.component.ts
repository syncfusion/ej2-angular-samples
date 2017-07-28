import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Popup Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'popup.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PopupToolbarComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }
}