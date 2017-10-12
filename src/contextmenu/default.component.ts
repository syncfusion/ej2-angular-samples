import { Component, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { MenuAnimationSettings } from '@syncfusion/ej2-navigations';
/**
 * Default ContextMenu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['contextmenu.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultContextMenuController {
    public content: string = '';
    public animationSettings: MenuAnimationSettings = {};
    public addDisabled  (args: any) {
        if (args.data.text === 'Link') {
            args.item.classList.add('e-disabled');
        }
    }
    public menuItems: { [key: string]: Object }[] = [
        {
            text: 'Cut',
            iconCss: 'e-cm-icons e-cut'
        },
        {
            text: 'Copy',
            iconCss: 'e-cm-icons e-copy'
        },
        {
            text: 'Paste',
            iconCss: 'e-cm-icons e-paste',
            items: [
                {
                    text: 'Paste Text',
                    iconCss: 'e-cm-icons e-pastetext'
                },
                {
                    text: 'Paste Special',
                    iconCss: 'e-cm-icons e-pastespecial'
                }
            ]
        },
        {
            separator: true
        },
        {
            text: 'Link',
            iconCss: 'e-cm-icons e-link'
        },
        {
            text: 'New Comment',
            iconCss: 'e-cm-icons e-comment'
        }];

    ngOnInit(): void {
        if (Browser.isDevice) {
            this.content = 'Touch hold to open the ContextMenu';
            this.animationSettings.effect = 'ZoomIn';
        } else {
            this.content = 'Right click / Touch hold to open the ContextMenu';
            this.animationSettings.effect = 'SlideDown';
        }
    }
}