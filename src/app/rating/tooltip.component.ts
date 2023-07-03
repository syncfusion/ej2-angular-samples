import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Tooltip sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.css'],
    encapsulation: ViewEncapsulation.None

})
export class TooltipRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tooltip.css'];
    }
}