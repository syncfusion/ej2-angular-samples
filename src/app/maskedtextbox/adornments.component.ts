import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Adornments Masked TextBox sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['adornments.css'],
    templateUrl: 'adornments.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [MaskedTextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AdornmentMaskedTextbox {
    constructor() { }
}