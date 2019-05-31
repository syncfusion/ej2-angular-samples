import { Component, ViewEncapsulation } from '@angular/core';

/**
 * Default Chips component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultChipsComponent {
    choiceSelected = [1];
    filterSelected = [1, 3];
}
