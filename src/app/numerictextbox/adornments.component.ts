import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Adornments Numeric TextBox sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['adornments.css'],
    templateUrl: 'adornments.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [NumericTextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AdornmentNumericTextbox {
    @ViewChild('prependNumeric')
    public prependNumericObj: NumericTextBoxComponent;
    @ViewChild('appendNumeric')
    public appendNumericObj: NumericTextBoxComponent;
    @ViewChild('iconNumeric')
    public iconNumericObj: NumericTextBoxComponent;
    public showSpinButtons: boolean = false;

    onPriceChange() {
        this.appendNumericObj.value = this.prependNumericObj.value * 5;
    }
    onKgChange() {
        this.prependNumericObj.value = this.appendNumericObj.value / 5;
    }
    onResetClick() {
        this.iconNumericObj.value = null;
    }
    onSubClick() {
        this.iconNumericObj.value = this.iconNumericObj.value - 1;
    }
    onPlusClick() {
        this.iconNumericObj.value = this.iconNumericObj.value + 1;
    }
}