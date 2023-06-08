import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { AccordionComponent } from '@syncfusion/ej2-angular-navigations';
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
    @ViewChild('accordionObj')
    public accordionObj: AccordionComponent;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
        document.body.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.altKey && e.keyCode === 74 && this.accordionObj) {
                this.accordionObj.select(0);
            }
        });
    }
}