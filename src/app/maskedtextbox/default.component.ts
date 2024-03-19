import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    standalone: true,
    imports: [
        MaskedTextBoxModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
    ],
})
export class DefaultMaskedTextboxController {
    constructor() { }
}