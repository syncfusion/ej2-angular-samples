import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FileManagerComponent, FileOpenEventArgs, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { EmitType } from '@syncfusion/ej2-base';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

/**
 * File Manager real time use case sample
 */
@Component({
    selector: 'control-content',
    templateUrl: 'file-upload.html',
    styleUrls: ['file-upload.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [UploaderModule, ButtonModule, DialogModule, FileManagerModule]
})

export class FileUploadController {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['file-upload.css'];
    }
    @ViewChild('uploadObj')
    public uploadObj: UploaderComponent;
    @ViewChild('dialogObj')
    public dialogObj: DialogComponent;
    @ViewChild('filemanagerObj')
    public filemanagerObj: FileManagerComponent;
    public dialogHeader = 'Select a file';
    public animationSettings: Object = { effect: 'None' };
    public showCloseIcon = true;
    public target = '#target';
    public visible = false;
    public dialogWidth = '850px';
    public ajaxSettings: object;
    public contextMenuSettings: object;
    public toolbarSettings: object;
    public hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';

    public btnClick: EmitType<object> = () => {
        this.dialogObj.show();
        this.dialogOpen();
        this.filemanagerObj.path = '/';
        this.filemanagerObj.selectedItems = [];
        this.filemanagerObj.refresh();
    }

    // Uploader will be hidden, if Dialog is opened
    public dialogOpen: EmitType<object> = () => {
        document.getElementById('uploadFileManager').style.display = 'none';
    }
    // Uploader will be shown, if Dialog is closed
    public dialogClose: EmitType<object> = () => {
        document.getElementById('uploadFileManager').style.display = 'block';
    }

    // File Manager's fileOpen event function
    public onFileOpen(args: FileOpenEventArgs): void {
        let file = (args as any).fileDetails;
        if (file.isFile) {
            args.cancel = true;
            if (file.size <= 0 ) { file.size = 10000; }
            this.uploadObj.files = [{name: file.name, size: file.size, type: file.type }];
            this.dialogObj.hide();
        }
    }

    public ngOnInit(): void {
        document.querySelector('.sb-demo-section').classList.add('upload-dialog');
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
        this.toolbarSettings = {
            items: ['NewFolder', 'Upload', 'Delete', 'Cut', 'Copy', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details']
        };
        this.contextMenuSettings = {
            file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
            visible: true
        };
    }

    public ngOnDestroy(): void {
        if (document.querySelector('.sb-demo-section').classList.contains('upload-dialog')) {
            document.querySelector('.sb-demo-section').classList.remove('upload-dialog');
        }
    }

}
