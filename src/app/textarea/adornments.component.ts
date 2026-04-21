import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { AdornmentsDirection, TextAreaComponent, TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

/**
 * Adornments TextArea sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['adornments.css'],
    templateUrl: 'adornments.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [TextAreaModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AdornmentTextArea {
    @ViewChild('iconTextarea')
    public textareaObj: TextAreaComponent;
    public flowOrientationData: string[] = [ 'Horizontal', 'Vertical' ];
    public orientOrientationData: string[] = [ 'Horizontal', 'Vertical' ];

    handleflowOrientation = (args: any) => {
        this.textareaObj.adornmentFlow = args.value as AdornmentsDirection;
        this.textareaObj.appendTemplate = (args.value === 'Horizontal')
            ? '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>'
            : '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>';
        this.textareaObj.dataBind();
    };

    handleOrientOrientation = (args: any) => {
        this.textareaObj.adornmentOrientation = args.value as AdornmentsDirection
        this.textareaObj.appendTemplate = (args.value === 'Horizontal')
            ? '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>'
            : '<span class="e-input-separator"></span><span class="e-icons e-save"></span><span class="e-input-separator"></span><span class="e-icons e-trash"></span>';
        this.textareaObj.dataBind();
    };
}