import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Signature} from '@syncfusion/ej2-inputs';
import { getComponent} from '@syncfusion/ej2-base';
import { SignatureComponent, SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Default sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ButtonModule, SignatureModule, SBDescriptionComponent]
})
export class DefaultSignatureComponent {
    @ViewChild('signature') signature: SignatureComponent;
    @ViewChild('signsave') saveBtn: ButtonComponent;
    @ViewChild('signclear') clearBtn: ButtonComponent;

    public saveBtnClick(): void {
        this.signature.save();
    }
    public clearBtnClick(): void {
        this.signature.clear();
        if (this.signature.isEmpty()) {
            this.saveBtn.disabled = true;
            this.clearBtn.disabled = true;
        }
    }
    public change(): void {
        if (!this.signature.isEmpty()) {
            this.saveBtn.disabled = false;
            this.clearBtn.disabled = false;
        }
    }
}