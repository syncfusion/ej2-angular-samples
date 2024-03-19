import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';;

/**
 * RadioButton Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'radio-button.html',
    styleUrls: ['radio-button.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RadioButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class RadioButtonController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
         sourceFiles.files = ['radio-button.css'];
    }
 }