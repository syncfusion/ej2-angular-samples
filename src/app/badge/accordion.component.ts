import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { createElement } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'accordion.html',
    styleUrls: ['accordion.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AccordionModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class accordionController {

}
