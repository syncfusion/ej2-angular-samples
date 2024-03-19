/**
 * Avatar Default Sample
 */

import { Component, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'types.html',
    styleUrls: ['types.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, SBDescriptionComponent]
})

export class TypesAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['types.css'];
    }

}