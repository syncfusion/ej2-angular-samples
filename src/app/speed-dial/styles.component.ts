import { Component, ViewEncapsulation } from '@angular/core';
import { SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';
/**
 * Default Speed Dial component
 */
@Component({
    selector: 'control-content',
    templateUrl: 'styles.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None
})

export class StylesComponent {
    public items: SpeedDialItemModel[] = [
        {
            text:'Cut',
            iconCss:'speeddial-icons speeddial-icon-cut'
        },
        {
            text:'Copy',
            iconCss:'speeddial-icons speeddial-icon-copy'
        },
        {
            text:'Paste',
            iconCss:'speeddial-icons speeddial-icon-paste'
        },
        {
            text:'Delete',
            iconCss:'speeddial-icons speeddial-icon-delete'
        },
        {
            text:'Save',
            iconCss:'speeddial-icons speeddial-icon-save'
        }
    ];
    public itemLabel: SpeedDialItemModel[] = [
        {
            text: 'Cut'
        },
        {
            text: 'Copy'
        },
        {
            text: 'Paste'
        },
        {
            text: 'Delete'
        },
        {
            text: 'Save'
        }
    ];
    public tooltItem: SpeedDialItemModel[] = [
        {
            title: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            title: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            title: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            title: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        },
        {
            title: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ];
}
