import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 *  Sample for CSS Vertical Layout Cards.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'vertical.html',
    styleUrls: ['card.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class VerticalCardComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.component.css'];
    }
}