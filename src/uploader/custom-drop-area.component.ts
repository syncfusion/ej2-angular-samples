import { Component, ViewChild, AfterViewInit, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { EmitType, detach } from '@syncfusion/ej2-base';
import { UploaderComponent, RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';

/**
 * Default Uploader Default Component
 */
@Component({
    selector: 'control_wrapper',
    templateUrl: 'custom-drop-area.html',
    styleUrls: ['custom-drop-area.css'],
    encapsulation: ViewEncapsulation.None
})
export class CustomDropAreaComponent implements OnInit {
    @ViewChild('defaultupload')
    public uploadObj: UploaderComponent;
    public path: Object = {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    };
    public allowExtensions: string = '.pdf, .png, .txt';

    ngOnInit() {
        this.uploadObj.dropArea = document.getElementById('dropTarget');
    }
    ngAfterViewInit() {        
        document.getElementById('dropArea').onclick = (e: any) => {
            let target: HTMLElement = <HTMLElement>e.target;
            if (target.classList.contains('e-file-delete-btn')) {
                for (let i: number = 0; i < this.uploadObj.getFilesData().length; i++) {
                    if (target.parentElement.getAttribute('data-file-name') === this.uploadObj.getFilesData()[i].name) {
                        this.uploadObj.remove(this.uploadObj.getFilesData()[i]);
                    }
                }
            }
            else if (target.classList.contains('e-file-remove-btn')) {
                detach(target.parentElement);
            }
        }
    }
    browseClick() {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click(); return false;
    }

    public onSelect:  EmitType<Object> = (args: any) => {
        let allowedTypes: string[] = ['pdf', 'png', 'txt'];
        let modifiedFiles: object[] = [];
        for (let file of args.filesData) {
            if (allowedTypes.indexOf(file.type.toLowerCase()) > -1) {
                modifiedFiles.push(file);
            }
        }
        if (modifiedFiles.length > 0) {
            args.isModified = true;
            args.modifiedFilesData = modifiedFiles;
        } else { args.cancel = true; }
    }

    public onUploadSuccess:  EmitType<Object> = (args: any) => {

        let li: HTMLElement = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-success');
    }

    public onUploadFailed:  EmitType<Object> = (args: any) => {
        let li: HTMLElement = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-failed');
    }
    public onUploadInProgress:  EmitType<Object> = (args: any) => {
        let progressValue : string = Math.round((args.e.loaded / args.e.total) * 100) + '%';
        let li: HTMLElement = this.getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status + '(' + progressValue + ' )';
    }
    public getLiElement(args: any) {
        let liElements : NodeListOf<HTMLElement> = document.getElementsByClassName('e-upload')[0].querySelectorAll('.e-upload-files > li');
        let li : HTMLElement;
        for (let i: number = 0; i < liElements.length; i++) {
            if ( liElements[i].getAttribute('data-file-name') === args.file.name ) {
              li = liElements[i];
            }
        }
        return li;
    }

    public onFileRemove(args: RemovingEventArgs): void {
        args.postRawFile = false;
    }

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['upload-save-action.cs', 'upload-remove-action.cs'];
    }
};