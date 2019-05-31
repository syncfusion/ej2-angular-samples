import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Accordion Icon Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'icon.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class IconAccordionComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}