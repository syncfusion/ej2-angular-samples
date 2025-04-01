import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';

/**
 * Drag and drop chips component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'draganddrop.html',
    styleUrls: ['draganddrop.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ChipListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DragAndDropChipsComponent {}