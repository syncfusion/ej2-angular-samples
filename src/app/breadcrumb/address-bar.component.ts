import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, BreadcrumbItemModel, MenuEventArgs, BreadcrumbBeforeItemRenderEventArgs, Menu, Breadcrumb } from '@syncfusion/ej2-navigations';
import { getComponent } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'address-bar.html',
    styleUrls: ['address-bar.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonModule, BreadcrumbModule, NgIf, MenuModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class AddressBarController {

    @ViewChild("breadcrumb") public breadcrumbObj: BreadcrumbComponent;
    public breadcrumbItems: BreadcrumbItemModel[] = [
        {
            iconCss: 'e-bicons e-picture'
        },
        {
            text: 'This PC'
        },
        {
            text: 'Local Disk (C:)'
        },
        {
            text: 'Users'
        },
        {
            text: 'Admin'
        },
        {
            text: 'Pictures'
        }
    ];

    public initialBreadcrumbItems: BreadcrumbItemModel[] = [].slice.call(this.breadcrumbItems);

    public items: any = [
        {
            text: 'OneDrive', type: 'onedrive',
            items: [
                { text: 'Documents', type: 'folder' },
                { text: 'Email attachments', type: 'folder' },
                { text: 'Music', type: 'folder' },
                { text: 'Pictures', type: 'folder' }
            ]
        },
        {
            text: 'This PC', type: 'desktop',
            items: [
                { text: 'Desktop', type: 'desktop' },
                { text: 'Documents', type: 'documents', items: [
                    { text: 'IISExpress', type: 'folder', items: [
                        { text: 'config', type: 'folder' }
                    ] },
                    { text: 'Visual Studio 2019', type: 'folder', items: [
                        { text: 'Code Snippets', type: 'folder' },
                        { text: 'Templates', type: 'folder' },
                        { text: 'Visualizers', type: 'folder' }
                    ] }
                ] },
                { text: 'Downloads', type: 'downloads' },
                {
                    text: 'Local Disk (C:)', type: 'folder', items: [
                        {
                            text: 'Microsoft', type: 'folder'
                        },
                        { text: 'Program Files', type: 'folder', items: [ 
                            { text: 'Git', type: 'folder', items: [
                                { text: 'bin', type: 'folder' },
                                { text: 'cmd', type: 'folder' },
                                { text: 'dev', type: 'folder' }
                            ] },
                            { text: 'Google', type: 'folder', items:[
                                { text: 'Chrome', type: 'folder' }
                            ] },
                            { text: 'Internet Explorer', type: 'folder', items:[
                                { text: 'en-US', type: 'folder' }
                            ] }
                        ] },
                        { text: 'Program Files (x86)', type: 'folder', items:[
                            { text: 'Microsoft', type: 'folder', items: [
                                { text: 'Edge', type: 'folder' }
                            ] },
                            { text: 'MSBuild', type: 'folder' },
                            { text: 'Windows Defender', type: 'folder' }
                        ] },
                        {
                            text: 'Users', type: 'folder', items: [
                                {
                                    text: 'Admin', type: 'folder', items: [
                                        { text: 'Desktop', type: 'desktop' },
                                        { text: 'Documents', type: 'documents' },
                                        { text: 'Downloads', type: 'downloads' },
                                        { text: 'Pictures', type: 'picture' }
                                    ]
                                },
                                { text: 'Public', type: 'folder' }
                            ]
                        },
                        { text: 'Windows', type: 'folder', items: [
                            { text: 'Boot', type: 'folder' },
                            { text: 'System32', type: 'folder', items: [
                                { text: 'Configuration', type: 'folder' },
                                { text: 'LogFiles', type: 'folder' }
                            ] }
                        ] }
                    ]
                },
                { text: 'Local Disk (D:)', type: 'folder' }
            ]
        },
        { text: 'Libraries', type: 'folder' },
        { text: 'Network', type: 'network' },
        { text: 'Recycle Bin', type: 'recyclebin' }
    ];

    public menuSelect(args: MenuEventArgs) {
        for (let i: number = 0; i < this.breadcrumbItems.length; i++) {
            if (this.breadcrumbItems[i].text === args.item.text) {
                this.breadcrumbItems = this.breadcrumbItems.slice(0, i + 1);
                this.breadcrumbItems[0].iconCss = 'e-bicons e-' + this.getItems(args.item.text, true)[0].items.type;
                this.breadcrumbObj.items = this.breadcrumbItems;
                break;
            }
        }
        this.breadcrumbObj.items.push({ text: 'LastItem' });
        this.breadcrumbObj.activeItem = 'LastItem';
    }

    public beforeItemRenderHanlder(args: BreadcrumbBeforeItemRenderEventArgs) {
        if (args.element.classList.contains('e-breadcrumb-separator')) {
            const previousItemText: string = (args.item as { previousItem: BreadcrumbItemModel }).previousItem.text;
                if (previousItemText !== 'LastItem' && this.getItems(previousItemText)[0].items) {
                    new Menu({
                        items: this.getItems(previousItemText),
                        showItemOnClick: true,
                        select: this.subMenuSelect.bind(this),
                        beforeOpen: function () {
                            this.element.classList.add('e-open');
                        },
                        onClose: function () {
                            this.element.classList.remove('e-open');
                        }
                    }, args.element.querySelector('ul'));
            }
        }
    }

    public subMenuSelect(args: MenuEventArgs) {
        if (!args.element.parentElement.classList.contains('e-menu') && (args.item  as any).parentObj.items[0] && (args.item  as any).parentObj.items[0].items) {
            let subItems = (args.item  as any).parentObj.items;
            let idx: number;
            for (let i: number = 0; i < subItems.length; i++) {
                for (let j: number = 0; j < this.breadcrumbItems.length; j++) {
                    if (subItems[i].text === this.breadcrumbItems[j].text) {
                        idx = j;
                        break;
                    }
                }
            }
            if (idx) {
                this.breadcrumbItems = this.breadcrumbItems.slice(0, idx);
            }
            this.breadcrumbItems[0].iconCss = 'e-bicons e-' + (args.item as { type: string }).type;
            if (this.breadcrumbItems[this.breadcrumbItems.length - 1].text === 'LastItem') {
                this.breadcrumbItems.pop();
            }
            this.breadcrumbItems.push({ text: args.item.text });
            this.breadcrumbItems.push({ text: 'LastItem' });
            this.breadcrumbObj.items = this.breadcrumbItems;
        }
    }

    public beforeOpenHandler(args) {
        args.parentItem.parentObj.element.classList.add('e-open');
    }

    public onCloseHandler(args) {
        args.parentItem.parentObj.element.classList.remove('e-open');
    }

    public getItems(text: string, needParent?: boolean) {
        let mItems: any = [].slice.call(this.items);
        let isBreaked: boolean;
        if (!text) {
            mItems = this.getSubMenuItems(mItems);
        }
        else {
            for (let i: number = 1; i < this.breadcrumbItems.length; i++) {
                for (let j: number = 0; j < mItems.length; j++) {
                    if (mItems[j].text === this.breadcrumbItems[i].text) {
                        if (mItems[j].text === text) {
                            if (needParent) {
                                mItems = mItems[j];
                            } else {
                                mItems = this.getSubMenuItems(mItems[j].items);
                            }
                            isBreaked = true;
                        } else {
                            mItems = mItems[j].items;
                            j = 0;
                        }
                        break;
                    }
                }
                if (isBreaked) {
                    break;
                }
            }
        }
        return [{ items: mItems }];
    }

    public getSubMenuItems(mItems: MenuItemModel[]) {
        let subItems: any;
        if (mItems) {
            subItems = [];
            for (let i: number = 0; i < mItems.length; i++) {
                subItems.push({ text: mItems[i].text, type: (mItems[i] as { type: string }).type });
            }
        }
        return subItems;
    }

    // To refresh Breadcrumb control state when reset button clicked
    public btnClick() {
        this.breadcrumbObj.items = this.initialBreadcrumbItems;
        this.breadcrumbItems = this.initialBreadcrumbItems;
    }
}