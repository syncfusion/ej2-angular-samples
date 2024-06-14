import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { OtpInputModule } from '@syncfusion/ej2-angular-inputs';

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [OtpInputModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DefaultOtpInputComponent  {
        constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }
}