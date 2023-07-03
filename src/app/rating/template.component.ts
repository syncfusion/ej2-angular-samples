import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Template sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None

})
export class TemplateRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }
}