import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Default Tab Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['tab.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, TabModule, SBDescriptionComponent]
})
export class DefaultTabComponent {

    // Mapping Tab items Header property
    public headerText: Object = [{ text: "Twitter", 'iconCss': 'e-twitter' },
        { text: "Facebook", 'iconCss': 'e-facebook' }, { text: "WhatsApp", 'iconCss': 'e-whatsapp' }];

}