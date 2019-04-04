/**
 * Avatar Default Sample
 */

import { Component, Inject } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'badge.html',
    styleUrls: ['badge.css']
})

export class BadgeAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['badge.css'];
    }

}