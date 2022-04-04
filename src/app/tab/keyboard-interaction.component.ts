import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Keyboard Interactions In Tab Component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-interaction.html',
    styleUrls: ['tab.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class KeyboardTabComponent {
    // Mapping Tab items Header property   
    public headerText: Object = [{ text: 'HTML' }, { text: 'C-Sharp(C#)' }, { text: 'Java' }, { text: 'VB.NET' },
    { text: 'Xamarin' }, { text: 'ASP.NET' }, { text: 'ASP.NET MVC' }, { text: 'JavaScript' }];
}