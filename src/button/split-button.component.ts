import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

/**
 * DropDownButton Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'split-button.html',
    styleUrls: ['split-button.css'],
    encapsulation: ViewEncapsulation.None
})

export class SplitButtonController {
    constructor(@Inject('sourceFiles') private sourceFiles:any) {
         sourceFiles.files = ['split-button.css'];
    }

    public addDisabled(args: MenuEventArgs) {
        if (args.item.text !== 'Paste') {
            args.element.classList.add('e-disabled');
        }
    }

    //SplitButton items definition
    public items: ItemModel[] = [
        {
            text: 'Paste',
            iconCss: 'e-btn-icons e-paste'
        },
        {
            text: 'Paste Special',
            iconCss: 'e-btn-icons e-paste-special'
        },
        {
            text: 'Paste as Formula',
            iconCss: 'e-btn-icons e-paste-formula'
        },
        {
            text: 'Paste as Hyperlink',
            iconCss: 'e-btn-icons e-paste-hyperlink'
        }
    ];
 }