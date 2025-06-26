import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { DropDownListComponent, ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextAreaComponent, TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * TextArea floating label sample
 */
@Component({
    selector: 'control-content',
    styleUrls: ['resize.css'],
    templateUrl: 'resize.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [TextAreaModule, DropDownListModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ResizeTextAreaController {
    @ViewChild('default')
    public textareaObj: TextAreaComponent;
    @ViewChild('select')
    public resizeMode: DropDownListComponent;
    // define the JSON of data
    public resizeData: Object[] = [
        { Id: 'Vertical', Label: 'Vertical' },
        { Id: 'Horizontal', Label: 'Horizontal' },
        { Id: 'Both', Label: 'Both' },
        { Id: 'None', Label: 'None' },
    ];
    public fields: Object = { text: 'Label',value: 'Id' };
    // set the value to select an item based on mapped value at initial rendering
    public value: string ='Vertical';

    public resizeHandler(args: ChangeEventArgs): void {
        switch (args.value) {
            case 'Vertical':
                this.textareaObj.resizeMode = 'Vertical';
                break;
            case 'Horizontal':
                this.textareaObj.resizeMode = 'Horizontal';
                break;
            case 'Both':
                this.textareaObj.resizeMode = 'Both';
                break;
            case 'None':
                this.textareaObj.resizeMode = 'None';
                break;
        }
    }
}