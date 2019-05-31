import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
/**
 * Default Menu Controller
 */
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None
})

export class DefaultMenuController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }

    // Menu items definition 
    public menuItems: MenuItemModel[] = [
        {
            text: 'File',
            iconCss: 'e-menu-icons e-file',
            items: [
                { text: 'Open', iconCss: 'e-menu-icons e-open' },
                { text: 'Save', iconCss: 'e-menu-icons e-save' },
                { separator: true },
                { text: 'Exit' }
            ]
        },
        {
            text: 'Edit',
            iconCss: 'e-menu-icons e-edit',
            items: [
                { text: 'Cut', iconCss: 'e-menu-icons e-cut' },
                { text: 'Copy', iconCss: 'e-menu-icons e-copy' },
                { text: 'Paste', iconCss: 'e-menu-icons e-paste' }
            ]
        },
        {
            text: 'View',
            items: [
                {
                    text: 'Toolbars',
                    items: [
                        { text: 'Menu Bar' },
                        { text: 'Bookmarks Toolbar' },
                        { text: 'Customize' },
                    ]
                },
                {
                    text: 'Zoom',
                    items: [
                        { text: 'Zoom In' },
                        { text: 'Zoom Out' },
                        { text: 'Reset' },
                    ]
                },
                { text: 'Full Screen' }
            ]
        },
        {
            text: 'Tools',
            items: [
                { text: 'Spelling & Grammar' },
                { text: 'Customize' },
                { separator: true },
                { text: 'Options' }
            ]
        },
        {
            text: 'Help'
        }
    ];
}