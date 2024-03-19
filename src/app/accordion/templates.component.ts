import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';


/**
 * Accordion Template Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'templates.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, AccordionModule, SBDescriptionComponent]
})
export class TemplatesAccordionComponent {

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}