import { Component, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'control-content',
    templateUrl: 'range-validation.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NumericTextBoxModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
    ],
})
export class RangeTextboxController {
    public minValue = 10;
    public maxValue = 100;
    public step = 1;
    // After clicking apply button- 'min', 'max' and 'increment step' details will be received from properties panel
    // and set it to Numeric Textbox
    clickMe() {
        this.minValue = parseFloat((document.getElementById('min') as HTMLInputElement).value);
        this.maxValue = parseFloat((document.getElementById('max') as HTMLInputElement).value);
        this.step = parseFloat((document.getElementById('step') as HTMLInputElement).value);
        this.step= isNaN(this.step) ? 1 :this.step;
    }
    constructor() { }
}