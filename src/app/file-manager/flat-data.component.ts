import { Component, ViewEncapsulation } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule, FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { ToolbarSettingsModel, Permission, FileData} from '@syncfusion/ej2-filemanager';
/**
 * File Manager sample with amazon s3 service
 */
@Component({
    selector: 'control-content',
    templateUrl: 'flat-data.html',
    styleUrls: ['flat-data.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService, FileManagerComponent],
    standalone: true,
    imports: [FileManagerModule, FileManagerAllModule]
})

export class FlatDataController {
    public contextMenuSettings: object;
    public toolbarSettings: ToolbarSettingsModel;
    public permission: Permission;
    public fileData: FileData[];
    public resultData: { [key: string]: Object }[];
    public ngOnInit(): void {
        this.permission = {
            "copy": false,
            "download": false,
            "write": false,
            "writeContents": false,
            "read": true,
            "upload": false,
            "message": ""
        };
        this.fileData = [
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
                filterPath: "",
                hasChild: true,
                id: '0',
                isFile: false,
                name: "Files",
                parentId: null,
                size: 1779448,
                type: "folder",
            }, {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: '1',
                isFile: false,
                name: "Documents",
                parentId: '0',
                size: 680786,
                type: "folder",
                permission: this.permission
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: "2",
                isFile: false,
                name: "Downloads",
                parentId: "0",
                size: 6172,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: "3",
                isFile: false,
                name: "Music",
                parentId: "0",
                size: 20,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: true,
                id: "4",
                isFile: false,
                name: "Pictures",
                parentId: "0",
                size: 228465,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: "5",
                isFile: false,
                name: "Videos",
                parentId: "0",
                size: 20,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "6",
                isFile: true,
                name: "EJ2_File_Manager",
                parentId: "1",
                size: 12403,
                type: ".docx"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "7",
                isFile: true,
                name: "EJ2_File_Manager",
                parentId: "1",
                size: 90099,
                type: ".pdf"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "8",
                isFile: true,
                name: "File_Manager_PPT",
                parentId: "1",
                size: 578010,
                type: ".pptx"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "9",
                isFile: true,
                name: "File_Manager",
                parentId: "1",
                size: 274,
                type: ".txt"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Downloads\\",
                hasChild: false,
                id: "10",
                isFile: true,
                name: "Sample_Work_Sheet",
                parentId: "2",
                size: 6172,
                type: ".xlsx"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Music\\",
                hasChild: false,
                id: "11",
                isFile: true,
                name: "Music",
                parentId: "3",
                size: 10,
                type: ".mp3"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Music\\",
                hasChild: false,
                id: "12",
                isFile: true,
                name: "Sample_Music",
                parentId: "3",
                size: 10,
                type: ".mp3"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Videos\\",
                hasChild: false,
                id: "13",
                isFile: true,
                name: "Demo_Video",
                parentId: "5",
                size: 10,
                type: ".mp4"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Videos\\",
                hasChild: false,
                id: "14",
                isFile: true,
                name: "Sample_Video",
                parentId: "5",
                size: 10,
                type: ".mp4"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\",
                hasChild: false,
                id: '15',
                isFile: false,
                name: "Employees",
                parentId: '4',
                size: 237568,
                type: "folder",
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '16',
                isFile: true,
                name: "Albert",
                parentId: '15',
                size: 53248,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic01.png"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '17',
                isFile: true,
                name: "Nancy",
                parentId: '15',
                size: 65536,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic02.png"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '18',
                isFile: true,
                name: "Michael",
                parentId: '15',
                size: 69632,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic03.png"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '19',
                isFile: true,
                name: "Robert",
                parentId: '15',
                size: 48951,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic04.png"
            }
        ];
        this.resultData = [].slice.call(this.fileData) as { [key: string]: Object }[];
        this.toolbarSettings = { items: ['NewFolder', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] };
        this.contextMenuSettings = { file: ["Cut", "Copy", "|", "Delete", "Rename", "|", "Details"], folder: ["Open", "|", "Cut", "Copy", "Paste", "|", "Delete", "Rename", "|", "Details"], layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"], visible: true };
    }
}
