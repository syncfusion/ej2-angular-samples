import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Label sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'label.html',
    styleUrls: ['label.css'],
    encapsulation: ViewEncapsulation.None

})
export class LabelRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['label.css'];
    }
}