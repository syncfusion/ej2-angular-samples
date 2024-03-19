import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 *  Sample for Message
 */
@Component({
    selector: 'control-content',
    templateUrl: 'customization.html',
    styleUrls: ['customization.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, MessageModule, SBDescriptionComponent]
})

export class CustomizationController {
}
