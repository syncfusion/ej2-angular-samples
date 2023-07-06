import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None

})
export class DefaultRatingComponent {
        constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
}