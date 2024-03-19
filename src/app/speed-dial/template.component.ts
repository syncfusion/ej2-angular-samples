import { Component, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { SpeedDialComponent, SpeedDialItemModel, SpeedDialModule } from '@syncfusion/ej2-angular-buttons';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
/**
 * Default Speed Dial component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SpeedDialModule, TextBoxModule]
})

export class TemplateComponent {
    @ViewChild('popupTempSpeeddial')
    public speeddialObj:SpeedDialComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }

    public items: SpeedDialItemModel[] = [
        {
            text: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            text: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            text: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            text: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        },
        {
            text: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ];

    public closeClick() {
        this.speeddialObj.hide();
    }

    public submitClick() {
        this.speeddialObj.hide();
    }
}
