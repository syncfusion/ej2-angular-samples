import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Navigation sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-navigation.html',
    styleUrls: ['keyboard-navigation.css'],
    encapsulation: ViewEncapsulation.None

})
export class KeyboardNavigationRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['keyboard-navigation.css'];
    }
}