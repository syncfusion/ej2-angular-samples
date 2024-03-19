import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

/**
 * Label sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'label.html',
    styleUrls: ['label.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RatingModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class LabelRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['label.css'];
    }
}