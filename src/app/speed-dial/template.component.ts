import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SpeedDialComponent, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';
/**
 * Default Speed Dial component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None
})

export class TemplateComponent {
    @ViewChild('popupTempSpeeddial')
    public speeddialObj:SpeedDialComponent;

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
