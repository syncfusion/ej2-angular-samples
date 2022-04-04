import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Keyboard Interactions In Accordion Component.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-interaction.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class KeyboardAccordionComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}