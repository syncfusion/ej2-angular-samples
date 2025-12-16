import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Adornments TextBox sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['adornments.css'],
    templateUrl: 'adornments.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [TextBoxModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AdornmentTextbox {
    @ViewChild('appendTextbox')
    public appendTextboxObj: TextBoxComponent;
    @ViewChild('iconTextbox')
    public iconTextboxObj: TextBoxComponent;
    
    onEyeIconClick(e: MouseEvent) {
        let textIcon: Element = e.target as HTMLElement;
        if (this.appendTextboxObj.type === 'text') {
            this.appendTextboxObj.type = 'Password';
            textIcon.className = 'e-icons e-eye-slash';
        } else {
            this.appendTextboxObj.type = 'text';
            textIcon.className = 'e-icons e-eye';
        }
    }

    ondeleteClick() {
        this.iconTextboxObj.value = '';
    }
}