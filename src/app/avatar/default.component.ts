/**
 * Avatar Default Sample
 */

import { Component, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    standalone: true,
    imports: [SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DefaultAvatarComponent {

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }

}