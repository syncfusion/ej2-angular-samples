import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * RTL Tab Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'rtl.html',
    styleUrls: ['tab.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class RTLTabComponent {
    // Mapping Tab items Header property    
    public headerText: Object = [{ text: "Twitter" }, { text: "Facebook" }, { text: "WhatsApp" }];
    
}