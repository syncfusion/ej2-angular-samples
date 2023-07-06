import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';

/**
 * Default Fav component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'styles.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None
})

export class StylesFABComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['styles.css'];
    }
 }