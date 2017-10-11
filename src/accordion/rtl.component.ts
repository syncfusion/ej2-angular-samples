import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Accordion RTL Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RtlAccordionComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}