import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Default Tab Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['tab.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DefaultTabComponent {

    // Mapping Tab items Header property
    public headerText: Object = [{ text: "Twitter", 'iconCss': 'e-twitter' },
        { text: "Facebook", 'iconCss': 'e-facebook' }, { text: "WhatsApp", 'iconCss': 'e-whatsapp' }];

}