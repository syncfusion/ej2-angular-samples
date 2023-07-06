import { Component, Inject, ViewEncapsulation } from '@angular/core';

/**
 * Default Fav component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'position.html',
    styleUrls: ['position.css'],
    encapsulation: ViewEncapsulation.None
})

export class PositionFABComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['position.css'];
    }
} 