import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RatingModule } from '@syncfusion/ej2-angular-inputs';

/**
 * Navigation sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'keyboard-navigation.html',
    styleUrls: ['keyboard-navigation.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RatingModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class KeyboardNavigationRatingComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['keyboard-navigation.css'];
    }
}