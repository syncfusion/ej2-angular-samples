import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

/**
 * Tooltip sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'tooltip.html',
    styleUrls: ['tooltip.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RatingModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class TooltipRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['tooltip.css'];
    }
}