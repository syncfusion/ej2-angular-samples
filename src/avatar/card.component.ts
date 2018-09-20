/**
 * Avatar Default Sample
 */

import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'card.html',
    styleUrls: ['card.css'],
    encapsulation: ViewEncapsulation.None
})

export class CardAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['card.css'];
    }

}