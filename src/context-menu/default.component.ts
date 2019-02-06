import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { ContextMenuComponent, MenuEventArgs, MenuItemModel } from '@syncfusion/ej2-angular-navigations';
/**
 * Default ContextMenu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['context-menu.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultContextMenuController {
    public content: string = '';

    @ViewChild('contextmenu')
    public contextmenu: ContextMenuComponent;

    // Event triggers while rendering each menu item where “Link” menu item is disabled
    public addDisabled  (args: MenuEventArgs) {
        if (args.item.text === 'Link') {
            args.element.classList.add('e-disabled');
        }
    }

    // ContextMenu items definition 
    public menuItems: MenuItemModel[] = [
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

    // Event triggers once the context menu rendering is completed.
    onCreated(): void {
        if (Browser.isDevice) {
            this.content = 'Touch hold to open the ContextMenu';
            this.contextmenu.animationSettings.effect = 'ZoomIn';
        } else {
            this.content = 'Right click / Touch hold to open the ContextMenu';
            this.contextmenu.animationSettings.effect = 'SlideDown';
        }
    }
}