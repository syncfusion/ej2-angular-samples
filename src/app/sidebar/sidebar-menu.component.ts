import { Component, ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { SidebarComponent, ClickEventArgs, ToolbarModule, SidebarModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'control-content',
    styleUrls: ['sidebar-menu.css'],
    templateUrl: 'sidebar-menu.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ToolbarModule, SidebarModule, MenuModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SidebarMenuComponent {
    @ViewChild('sidebarMenuInstance')
    public sidebarMenuInstance: SidebarComponent;
    public menuItems: MenuItemModel[] = [
        {
            text: 'Overview',
            iconCss: 'icon-user icon',
            items: [
                { text: 'All Data' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Notification',
            iconCss: 'icon-bell-alt icon',
            items: [
                { text: 'Change Profile' },
                { text: 'Add Name' },
                { text: 'Add Details' }
            ]
        },
        {
            text: 'Info',
            iconCss: 'icon-tag icon',
            items: [
                { text: 'Message' },
                { text: 'Facebook' },
                { text: 'Twitter' }
            ]
        },
        {
            text: 'Comments',
            iconCss: 'icon-comment-inv-alt2 icon',
            items: [
                { text: 'Category1' },
                { text: 'Category2' },
                { text: 'Category3' }
            ]
        },
        {
            text: 'Bookmarks',
            iconCss: 'icon-bookmark icon',
            items: [
                { text: 'All Comments' },
                { text: 'Add Comments' },
                { text: 'Delete Comments' }
            ]
        },
        {
            text: 'Images',
            iconCss: 'icon-picture icon',
            items: [
                { text: 'Add Name' },
                { text: 'Add Mobile Number' }
            ]
        },
        {
            text: 'Users ',
            iconCss: 'icon-user icon',
            items: [
                { text: 'Mobile User' },
                { text: 'Laptop User' },
                { text: 'Desktop User' }
            ]
        }
    ];
    public enableDock: boolean = true;
    public dockSize: string = '50px';
    public width: string = '220px';
    public target: string = '.main-menu-content';
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['sidebar-menu.css'];
    }

    toolbarCliked(args:ClickEventArgs) {
        if(args.item.tooltipText == "Menu") {
            this.sidebarMenuInstance.toggle();
        }
    }
}
// open new tab
