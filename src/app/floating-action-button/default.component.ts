import { Component, Inject, ViewEncapsulation } from '@angular/core';

/**
 * Default Fav component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultFABComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
} 