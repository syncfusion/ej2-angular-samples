import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Rtl Toolbar Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'right-to-left.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RtlToolbarComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['toolbar.component.css'];
    }
}