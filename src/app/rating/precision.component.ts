import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Precision sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'precision.html',
    styleUrls: ['precision.css'],
    encapsulation: ViewEncapsulation.None

})
export class PrecisionRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['precision.css'];
    }
}