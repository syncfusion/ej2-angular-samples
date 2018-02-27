import { Component, ViewEncapsulation, Inject } from '@angular/core';

/**
 * Sample for CSS Basic Layout Cards.
 */
@Component({
    selector: 'control-content',
    templateUrl: 'basic.html',
    styleUrls: ['card.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class BasicCardComponent {
    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.component.css'];
    }
}