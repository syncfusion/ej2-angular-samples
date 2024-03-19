import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Default Chips component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChipListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DefaultChipsComponent {
    choiceSelected = [1];
    filterSelected = [1, 3];
}
