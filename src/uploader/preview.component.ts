import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { UploaderComponent, SelectedEventArgs, FileInfo } from '@syncfusion/ej2-ng-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { EmitType, detach, Browser, createElement, isNullOrUndefined, EventHandler } from '@syncfusion/ej2-base';

/**
 * Default Uploader Image Preview Component
 */
@Component({
    selector: 'control_wrapper',
    templateUrl: 'preview.html',
    styleUrls: ['preview.css'],
    encapsulation: ViewEncapsulation.None
})
export class PreviewUploaderComponent implements OnInit {
    @ViewChild('previewupload')
    public uploadObj: UploaderComponent;

    public path: Object = {
        saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
        removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
    };

    public allowExtensions: string = '.png, .jpg';

    public dropElement: HTMLElement;

    public filesDetails : FileInfo[] = [];
    public filesList: HTMLElement[] = [];
    public uploadWrapper: HTMLElement;
    public parentElement: HTMLElement;

    ngOnInit(): void {
        this.dropElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;
        if (Browser.isDevice) { document.getElementById('dropimage').style.padding = '0px 10%'; }
        document.getElementById('browse').onclick = () => {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        document.getElementById('clearbtn').onclick = () => {
            detach(this.dropElement.querySelector('ul'));
            this.filesList = [];
            this.filesDetails = [];
            if (this.dropElement.querySelector('#dropArea').classList.contains('e-spinner-pane')) {
                hideSpinner(this.dropElement.querySelector('#dropArea'));
                detach(this.dropElement.querySelector('.e-spinner-pane'));
            }
        };
        document.getElementById('uploadbtn').onclick = () => {
            if (this.dropElement.querySelector('ul') && this.filesDetails.length > 0) {
                this.uploadObj.upload(this.filesDetails, true);
            }
        };
    }
    public onSelect(args: SelectedEventArgs): void {
        if (!this.dropElement.querySelector('li')) { this.filesDetails = []; }
        if (isNullOrUndefined(document.getElementById('dropArea').querySelector('.e-upload-files'))) {
            this.parentElement = createElement('ul', { className: 'e-upload-files' });
            document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
        }
        for (let i : number = 0; i < args.filesData.length; i++) {
            this.formSelectedData(args.filesData[i], this);
        }
        this.filesDetails = this.filesDetails.concat(args.filesData);
        args.cancel = true;
    }

    public formSelectedData (file : FileInfo, proxy: any): void {
        let liEle : HTMLElement = createElement('li',  {className: 'e-upload-file-list', attrs: {'data-file-name': file.name}});
        let imageTag: HTMLImageElement = <HTMLImageElement>createElement('IMG',  {className: 'upload-image', attrs: {'alt': 'Image'}});
        let wrapper: HTMLElement = createElement('span', {className: 'wrapper'});
        wrapper.appendChild(imageTag); liEle.appendChild(wrapper);
        liEle.appendChild(createElement('div', {className: 'name file-name', innerHTML: file.name, attrs: {'title': file.name}}));
        liEle.appendChild(createElement('div', {className: 'file-size', innerHTML: proxy.uploadObj.bytesToSize(file.size) }));
        let clearbtn: HTMLElement;
        let uploadbtn: HTMLElement;
        clearbtn = createElement('span', {id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: {'title': 'Remove'}});
        EventHandler.add(clearbtn, 'click', this.removeFiles, proxy);
        liEle.setAttribute('title', 'Ready to Upload');
        uploadbtn = createElement('span', {className: 'e-upload-icon e-icons e-file-remove-btn', attrs: {'title': 'Upload'}});
        uploadbtn.setAttribute('id', 'iconUpload'); EventHandler.add(uploadbtn, 'click', this.uploadFile, proxy);
        let progressbarContainer: HTMLElement;
        progressbarContainer = createElement('progress', {className: 'progressbar', id: 'progressBar', attrs: {value: '0', max: '100'}});
        liEle.appendChild(clearbtn); liEle.appendChild(uploadbtn);
        liEle.appendChild(progressbarContainer);
        this.readURL(liEle, file); document.querySelector('.e-upload-files').appendChild(liEle);
        proxy.filesList.push(liEle);
    }
    public uploadFile(args: any): void {
        this.uploadObj.upload([this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]], true);
    }
    public removeFiles(args: any): void {
        let statusCode: string = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)].statusCode;
        if (statusCode === '2' || statusCode === '1') {
            this.uploadObj.remove(this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)], true);
            this.uploadObj.element.value = '';
        }
        let index: number = this.filesList.indexOf(args.currentTarget.parentElement);
        this.filesList.splice(index, 1);
        this.filesDetails.splice(index, 1);
        if (statusCode !== '2') { detach(args.currentTarget.parentElement); }
    }
    public onFileUpload(args : any) : void {
        let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        let iconEle: HTMLElement = li.querySelector('#iconUpload') as HTMLElement;
        iconEle.style.cursor = 'not-allowed';
        iconEle.classList.add('e-uploaded');
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        let progressValue : number = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
            li.getElementsByTagName('progress')[0].value = progressValue;
        }
    }
    public onUploadSuccess(args : any) : void {
        let spinnerElement: HTMLElement = document.getElementById('dropArea');
        let li : HTMLElement = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !isNullOrUndefined(li.querySelector('.progressbar'))) {
            (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
        }
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            (li.querySelector('.file-name') as HTMLElement).style.color = 'green';
            (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
                this.generateSpinner(this.dropElement.querySelector('#dropArea'));
            };
        } else {
            detach(li);
            hideSpinner(spinnerElement);
            detach(spinnerElement.querySelector('.e-spinner-pane'));
        }
        li.setAttribute('title', args.e.currentTarget.statusText);
    }
    public generateSpinner(targetElement: HTMLElement): void {
        createSpinner({ target: targetElement, width: '25px' });
        showSpinner(targetElement);
    }
    public onUploadFailed(args : any) : void {
        let li : Element = document.getElementById('dropArea').querySelector('[data-file-name="' + args.file.name + '"]');
        (li.querySelector('.file-name') as HTMLElement).style.color = 'red';
        li.setAttribute('title', args.e.currentTarget.statusText)
        if (args.operation === 'upload') {
            EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
            (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
        }
    }
    public readURL(li: HTMLElement, args: any): void {
        let preview: HTMLImageElement = li.querySelector('.upload-image');
        let file: File = args.rawFile; let reader: FileReader = new FileReader();
        reader.addEventListener('load', () => { preview.src = reader.result; }, false);
        if (file) { reader.readAsDataURL(file); }
    }
}