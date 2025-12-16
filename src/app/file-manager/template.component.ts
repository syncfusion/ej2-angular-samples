import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import {
    FileManagerComponent,
    NavigationPaneService,
    ToolbarService,
    DetailsViewService,
    FileManagerModule
} from '@syncfusion/ej2-angular-filemanager';
import { DropDownButton, ItemModel, DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    imports: [CommonModule, FileManagerModule, DropDownButtonModule],
})
export class TemplateController implements OnInit {
    @ViewChild('filemanager', { static: true }) public filemanager?: FileManagerComponent;
    public ajaxSettings: any;
    public toolbarSettings: object;
    public contextMenuSettings: object;
    public detailsViewSettings: any;
    private hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
    private baseActionItems: ItemModel[] = [
        { text: 'Open', iconCss: 'e-icons e-folder-open' },
        { text: 'Download', iconCss: 'e-icons e-download' },
        { text: 'Refresh', iconCss: 'e-icons e-refresh' },
        { text: 'Delete', iconCss: 'e-icons e-trash' }
    ];
    ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
        this.toolbarSettings = {
            items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']
        };
        this.contextMenuSettings = {
            file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
            visible: true
        };
        this.detailsViewSettings = {
            columns: [
                { field: 'name', headerText: 'Name', template: '${name}' },
                { field: 'size', headerText: 'Size', valueAccessor: this.sizeValueAccessor.bind(this) },
                { field: '_fm_modified', headerText: 'DateModified', format: 'MM/dd/yyyy hh:mm a' },
                { headerText: 'Actions', template: '<div class="action-ddb" data-name="${name}" data-isFile="${isFile}"></div>' }                       // HTML element ID
            ]
        };
    }
    sizeValueAccessor(data: any): string {
        return data?.isFile ? this.formatSize(data.size) : '-';
    }
    onFileLoad(args: any): void {
        const valid = ['DetailsView', 'LargeIconsView'];
        if (valid.indexOf(args.module) === -1) return;
        const name = (args.fileDetails as any)?.name;
        const isFile = (args.fileDetails as any)?.isFile;
        const hosts = (args.element as HTMLElement).querySelectorAll('.action-ddb');
        hosts.forEach((host: Element) => {
            const el = host as HTMLElement;
            if (el.hasAttribute('data-ddb-initialized')) return;

            el.setAttribute('data-name', name);
            el.setAttribute('data-isfile', String(isFile));
            const items: ItemModel[] = isFile
                ? this.baseActionItems.filter(i => i.text !== 'Open')
                : this.baseActionItems;

            const ddb = new DropDownButton({
                items,
                cssClass: 'e-caret-hide filemanager-dropdown-button',
                iconCss: 'e-icons e-more-vertical-1',
                select: (ev) => this.onActionSelect(ev.item.text || '', { name, isFile })
            });
            ddb.appendTo(el);
            el.setAttribute('data-ddb-initialized', 'true');
        });
    }

    onMenuOpen(args: any): void {
        args.cancel = true;
    }

    onDdbSelect(args: any, data: any): void {
        const name = data?.name || '';
        const isFile = !!data?.isFile;
        this.onActionSelect(args.item.text || '', { name, isFile });
    }

    getActionItems(data: any): ItemModel[] {
        const isFile = !!data?.isFile;
        return isFile
            ? this.baseActionItems.filter(i => i.text !== 'Open')
            : this.baseActionItems.slice();
    }

    private onActionSelect(action: string, item: { name: string; isFile: boolean }): void {
        const fm = this.filemanager as any;

        switch (action) {
            case 'Open':
                fm.openFile(item.name);
                break;
            case 'Download':
                fm.downloadFiles([item.name]);
                break;
            case 'Refresh':
                fm.refreshFiles();
                break;
            case 'Delete':
                fm.deleteFiles([item.name]);
                break;
            default:
                break;
        }
    }

    formatSize(bytes: number): string {
        if (!bytes) return '0 B';
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        let i = 0;
        let v = bytes;
        while (v >= 1024 && i < sizes.length - 1) {
            v /= 1024; i++;
        }
        return `${v.toFixed(1)} ${sizes[i]}`;
    }

    getFormattedDate(date: string | number | Date | undefined): string {
        if (!date) return '';
        try {
            return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        } catch { return ''; }
    }

    getBackgroundCss(item: any): string {
        const NamedFileBackgrounds: Record<string, string> = {
            'Adam.png': 'background-Adam',
            'Andrew.png': 'background-Andrew',
            'Ellie.png': 'background-Ellie',
            'Jameson.png': 'background-Jameson',
            'John.png': 'background-John',
            'Josie.png': 'background-Josie',
            'Apple pie.png': 'background-Applepie',
            'Bread.png': 'background-Bread',
            'Doughnut.png': 'background-Doughnut',
            'Nuggets.png': 'background-Nuggets',
            'Sugar cookie.png': 'background-Sugarcookie',
            'bird.jpg': 'background-bird',
            'sea.jpg': 'background-sea',
            'seaview.jpg': 'background-seaview',
            'snow.jpg': 'background-snow',
            'snowfall.jpg': 'background-snowfall'
        };
        const ExtensionBackgrounds: Record<string, string> = {
            jpg: 'background-jpg', jpeg: 'background-jpg', png: 'background-png',
            pptx: 'background-pptx', pdf: 'background-pdf', mp4: 'background-video',
            mp3: 'background-audio', docx: 'background-doc', txt: 'background-txt', xlsx: 'background-xlsx'
        };
        if (!item?.isFile) return 'file-icon background-folder';
        if (NamedFileBackgrounds[item.name]) return `file-icon ${NamedFileBackgrounds[item.name]}`;
        const ext = (item.name.split('.').pop() || '').toLowerCase();
        return `file-icon ${ExtensionBackgrounds[ext] || 'background-default'}`;
    }

    getIconsForFolders(item: any): string {
        const iconMap: Record<string, string> = {
            Files: 'e-folder',
            Documents: 'e-file-document',
            Downloads: 'e-download',
            Pictures: 'e-thumbnail',
            Music: 'e-file-format',
            Videos: 'e-video',
            Employees: 'e-export-png',
            Food: 'e-export-png',
            Nature: 'e-export-png'
        };
        return iconMap[item?.name] || 'e-folder';
    }

    getFileIconCssClass(item: any): string {
        if (!item?.isFile) return '';
        const extensionMap: Record<string, string> = {
            jpg: 'image', jpeg: 'image', png: 'image', gif: 'image',
            mp3: 'music', wav: 'music', mp4: 'video', avi: 'video',
            doc: 'doc', docx: 'docx', ppt: 'pptx', pptx: 'pptx',
            xls: 'xlsx', xlsx: 'xlsx', txt: 'txt', js: 'js', css: 'css',
            html: 'html', exe: 'exe', msi: 'msi', php: 'php', xml: 'xml',
            zip: 'zip', rar: 'rar', pdf: 'pdf'
        };
        const ext = (item.name.split('.').pop() || '').toLowerCase();
        const iconType = extensionMap[ext] || 'unknown';
        return `e-list-icon e-fe-${iconType}`;
    }
}
