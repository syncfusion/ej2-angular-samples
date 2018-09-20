/**
 * Avatar Default Sample
 */

import { Component, Inject } from '@angular/core';

@Component({
    selector: 'control-content',
    templateUrl: 'types.html',
    styleUrls: ['types.css']
})

export class TypesAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['types.css'];
    }

}