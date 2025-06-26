import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ToolbarModule, KeyDownEventArgs } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['toolbar.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, NumericTextBoxModule, ComboBoxModule, SBDescriptionComponent]
})
export class TemplateToolbarComponent {
    public data: string[] = ['25%', '50%', '75%', '100%'];

    public onKeyDown(args: KeyDownEventArgs): void {
        if (args.originalEvent.action === 'moveRight' || args.originalEvent.action === 'moveLeft') {
            this.focusInputElement(args.nextItem, args);
        }
    }

    public focusInputElement(item: HTMLElement | null, args: KeyDownEventArgs): void {
        if (item && item.classList.contains('e-template')) {
            const inputElement = item.querySelector('input');
            if (inputElement) {
                inputElement.focus();
                args.cancel = true;
            }
        }
    }
}