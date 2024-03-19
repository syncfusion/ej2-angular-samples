import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Accordion Icon Sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'icon.html',
    styleUrls: ['accordion.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, AccordionModule, SBDescriptionComponent]
})
export class IconAccordionComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['accordion.component.css'];
    }
}