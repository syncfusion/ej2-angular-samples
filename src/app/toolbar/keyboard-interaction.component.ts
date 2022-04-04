import { Component, ViewEncapsulation, Inject } from '@angular/core';
/**
 * Keyboard Interactions in Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-interaction.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class KeyboardToolbarComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }
}