import { Component } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-mask.html',
    standalone: true,
    imports: [
        MaskedTextBoxModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
    ],
})
export class CustomMaskedTextboxController {
    // Custom characters to specify time value
    public customMaskChar: Object = { P: 'P,A,p,a', M: 'M,m'};
    constructor() { }
}