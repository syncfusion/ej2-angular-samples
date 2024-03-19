import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

/**
 * Template sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RatingModule, NgSwitch, NgSwitchCase, NgSwitchDefault, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class TemplateRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }
}