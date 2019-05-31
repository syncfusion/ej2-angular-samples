import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 *  Sample for CSS Horizontal Cards.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'horizontal.html',
    styleUrls: ['card.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HorizontalCardComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.component.css'];
    }
}