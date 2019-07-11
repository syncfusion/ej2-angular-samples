import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { createElement } from '@syncfusion/ej2-base';
/**
 *  Sample for CSS Basic Layout Badge
 */
@Component({
    selector: 'control-content',
    templateUrl: 'accordion.html',
    styleUrls: ['accordion.css'],
    encapsulation: ViewEncapsulation.None
})

export class accordionController {
    // Assigning badge data
    public badgeContent: string[] = ['7 New', '27 New', '2 New', '14 New'];

    public onCreated() {
        // Appending Badge component after the accordion rendered in created event
        let element: HTMLElement = document.getElementById('accordion');
        let iconElement: HTMLElement[] = Array.prototype.slice.call((element as HTMLElement).querySelectorAll('.e-toggle-icon'));
        for (let i: number = 0; i < iconElement.length; i++) {
            // Success Badge Element
            let badge: HTMLSpanElement = createElement('span', { className: 'e-badge e-badge-success' });
            badge.textContent = this.badgeContent[i];
            iconElement[i].appendChild(badge);
        }
    }
}