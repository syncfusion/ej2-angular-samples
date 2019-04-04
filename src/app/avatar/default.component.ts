/**
 * Avatar Default Sample
 */

import { Component, Inject } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css']
})

export class DefaultAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }

}