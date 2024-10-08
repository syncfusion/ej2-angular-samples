import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 *  Sample for Message with variants.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'variants.html',
    styleUrls: ['variants.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MessageModule, SBDescriptionComponent]
})

export class VariantsController {
}
