import { Component, ViewEncapsulation, Inject } from '@angular/core';
let today: Date = new Date();
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
    ele: string = '<div class = "e-tool-name">' + today.toLocaleString('en-us', { month: 'long' }) + ' ' + today.getFullYear() + '</div>';
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }
}