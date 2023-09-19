import { Component, ViewEncapsulation, Inject } from '@angular/core';


/**
 * Accordion Template Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'templates.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesAccordionComponent {

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}