import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  PdfViewerComponent,
  LinkAnnotationService,
  BookmarkViewService,
  MagnificationService,
  ThumbnailViewService,
  ToolbarService,
  NavigationService,
  AnnotationService,
  TextSearchService,
  TextSelectionService,
  PrintService,
  FormFieldsService,
  FormDesignerService,
  PdfViewerModule,
  PageOrganizerService
} from '@syncfusion/ej2-angular-pdfviewer';
import { UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { SwitchComponent, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { AnimationModel, ProgressTheme, ILoadedEventArgs, ProgressBar } from '@syncfusion/ej2-progressbar';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'control-content',
  templateUrl: 'multi-format-viewer.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    LinkAnnotationService,
    BookmarkViewService,
    MagnificationService,
    ThumbnailViewService,
    ToolbarService,
    NavigationService,
    AnnotationService,
    TextSearchService,
    TextSelectionService,
    PrintService,
    FormFieldsService,
    FormDesignerService,
    PageOrganizerService
  ],
  styleUrls: ['pdfviewer.component.css'],
  standalone: true,
    imports: [
        SBActionDescriptionComponent,
        SwitchModule,
        PdfViewerModule,
        SBDescriptionComponent,
        UploaderModule,
        ProgressBarModule
    ],
})

export class MultiFormatViewerComponent implements OnInit {
  @ViewChild('pdfviewer') public pdfviewerControl: PdfViewerComponent;
  @ViewChild('templateupload') public uploadObj: UploaderComponent;
  @ViewChild('switch') public switch: SwitchComponent;
  @ViewChild('linear')
  public linear: ProgressBar;
  public resource: string = 'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib';
  public dropElement: any;
  public extensions: any = ['doc','docx','rtf','docm','dotm','dotx','dot','xls','xlsx','pptx','pptm','potx','potm','jpeg','png','bmp','pdf','jpg'];
  public allowedExtensions: string = '.doc, .docx, .rtf, .docm, .dotm, .dotx, .dot, .xls, .xlsx, .pptx, .pptm, .potx, .potm .jpeg, .png, .bmp, .pdf, .jpg';
  public zoomMode = "FitToPage";
  public toolbarSettings = {
    showTooltip: true,
    toolbarItems: [
      'DownloadOption',
      'UndoRedoTool',
      'PageNavigationTool',
      'MagnificationTool',
      'PanTool',
      'SelectionTool',
      'CommentTool',
      'SubmitForm',
      'SearchOption',
      'AnnotationEditTool',
      'FormDesignerEditTool',
      'PrintOption'
    ]
  };
  fileList: any[] = [];
  uploadProgressValue: number = 0;
  pdfViewerProgressValue: number = 0;
  public width: string = '250';
  public height: string = '60';
  public progressValue: any = 0;
  public min: number = 0;
  public max: number = 100;
  public multipleFiles: boolean = false;
  public animation: any = {enable: false, duration: 0, delay: 0};

  ngOnInit(): void {
    this.dropElement = document.getElementById('dropArea') as HTMLElement;
    let browseButton = document.getElementById('browse');
    if (browseButton) {
      browseButton.onclick = () => {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
      };
    }
  }

  public change(e: any): void {
    if (e.checked) {
        this.pdfviewerControl.serviceUrl = '';
    }
    else {
        this.pdfviewerControl.serviceUrl = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
    }
    this.pdfviewerControl.dataBind();
    this.pdfviewerControl.load(this.pdfviewerControl.documentPath, null);
  }

  documentLoaded(): void {
    let progressValue: any = document.getElementById("progress-status")as HTMLElement;
    this.pdfViewerProgressValue = 100;
    const totalProgress = this.calculateTotalProgress();
    this.updateProgressBar(totalProgress);
    progressValue.innerHTML = totalProgress.toString()+"%";
    setTimeout(()=>{
      document.getElementById("linearProgressBar").style.display = "none";
      document.getElementById("uploadedMessage").style.display = "block"
      this.uploadProgressValue = 0;
      this.pdfViewerProgressValue = 0;
      progressValue.innerHTML = "0%";
      this.progressValue = 0;
      this.linear.value = 0;
      this.linear.refresh();
    },1000);
  }

  onSelect(args) {
    let progressBarContainer: any = document.getElementById("progressBar") as HTMLElement;
    let progressBar: any = document.getElementById("linearProgressBar") as HTMLElement;
    let progressMessage: any = document.getElementById("uploadedMessage") as HTMLElement;
    let fileSupportMessage = document.getElementById("fileSupportMessage")as HTMLElement;
    let fileDetails = document.getElementById("file-details")as HTMLElement;
    let fileSizeValidation = document.getElementById("fileSizeValidation")as HTMLElement;
    progressBarContainer.style.display = "block";
    progressBar.style.display = "flex";
    progressMessage.style.display = "none"
    fileSupportMessage.style.display = "none";
    fileSizeValidation.style.display = "none";
    let dropElement = document.getElementById('dropArea');
    if (!dropElement.querySelector('li')) {
      this.fileList = [];
    }
    if (!dropElement.querySelector('.e-upload-files')) {
      let parentElement = document.createElement('ul');
      parentElement.className = 'e-upload-files';
      document.querySelector('.e-upload').appendChild(parentElement);
    }
    let validFiles = args.filesData;
    if (validFiles.length === 0) {
      progressBarContainer.style.display = "block";
      progressBar.style.display = "none";
      if(document.getElementById('pdfviewer-container').style.display === "block"){
        progressMessage.style.display = "block";
        fileDetails.style.display = "block";
      }
      args.cancel = true;
      return;
    }
    if(!this.extensions.includes(validFiles[0].type)){
      fileSupportMessage.style.display = "block";
      progressBar.style.display = "none";
      fileDetails.style.display = "none";
      args.cancel = true;
      return;
    }
    if(validFiles[0].type != "pdf" && validFiles[0].size>4000000){
      fileSizeValidation.style.display = "block";
      progressBar.style.display = "none";
      fileDetails.style.display = "none";
      args.cancel = true;
      return;
    }
    fileDetails.style.display = "block";
    document.getElementById("fileName").innerHTML = args.filesData[0].name;
    let size = document.getElementById("fileSize") as HTMLElement;
    if((args.filesData[0].size.toString()).length <= 6){
      size.innerHTML = ((args.filesData[0].size/1024).toFixed(1)).toString()+" KB";
    } else {
      let kbsize = args.filesData[0].size/1024;
      size.innerHTML = ((kbsize/1024).toFixed(1)).toString()+" MB";
    }
    this.formSelectedData(validFiles[0], this);
    this.fileList = this.fileList.concat(validFiles);
    const totalProgress = this.calculateTotalProgress();
    this.updateProgressBar(totalProgress);
    args.cancel = true;
  }

  formSelectedData(file, proxy) {
    let liEle = document.createElement('li');
    liEle.className = 'e-upload-file-list';
    liEle.setAttribute('data-file-name', file.name);
    this.readURL(liEle, file);
    proxy.fileList.push(liEle);
  }

  readURL(li, args) {
    let file = args.rawFile;
    let reader = new FileReader();
    let type = args.type;
    reader.addEventListener('load', () => {
      let post = JSON.stringify({
        'data': reader.result,
        'type': type
      });
      let url = 'https://services.syncfusion.com/angular/production/api/pdfviewer/LoadFile';
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progressValue = Math.round((event.loaded / event.total) * 100);
          this.uploadProgressValue = progressValue;
          const totalProgress = this.calculateTotalProgress();
          (document.getElementById("progress-status")as HTMLElement).innerHTML = totalProgress.toString()+"%";;
          this.updateProgressBar(totalProgress);
        }
      });
      xhr.onreadystatechange = function (event) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            this.pdfviewerControl.documentPath = xhr.responseText;
            this.pdfViewerProgressValue = 60;
            const totalProgress = this.calculateTotalProgress();
            this.updateProgressBar(totalProgress);
            (document.getElementById("progress-status")as HTMLElement).innerHTML = totalProgress.toString()+"%";;
            document.getElementById('pdfviewer-container').style.display = 'block';
          } else {
            console.error('Error:', xhr.statusText);
          }
        }
      }.bind(this);
      xhr.send(post);
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  calculateTotalProgress(): number {
    const totalProgress = (this.uploadProgressValue + this.pdfViewerProgressValue)/2;
    return totalProgress;
  }

  updateProgressBar(progress: number): void {
    if (this.linear) {
      this.linear.value = progress;
      this.linear.dataBind();
    }
  }

  ajaxRequestSuccess(args: any): any{
    let progressValue: any = document.getElementById("progress-status")as HTMLElement;
    if (args.action === "Load") {
      this.pdfViewerProgressValue = 70;
      const totalProgress = this.calculateTotalProgress();
      this.updateProgressBar(totalProgress);
      progressValue.innerHTML = totalProgress.toString()+"%";
    }
    if (args.action === "RenderPdfPages") {
      if(this.pdfViewerProgressValue < 90){
        this.pdfViewerProgressValue = this.pdfViewerProgressValue + 10;
        const totalProgress = this.calculateTotalProgress();
        this.updateProgressBar(totalProgress);
        progressValue.innerHTML = totalProgress.toString()+"%";
      }
    }
  }

  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.progressBar.theme = <ProgressTheme>(selectedTheme.charAt(0).toUpperCase() +
        selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
    if (selectedTheme === 'fabric') {
        args.progressBar.secondaryProgressColor = '#b0d0e9'
    } else if (selectedTheme === 'material-dark') {
        args.progressBar.secondaryProgressColor = '#b8b8b8'
    } else if (selectedTheme === 'material') {
        args.progressBar.secondaryProgressColor = '#f087ab'
    } else if (selectedTheme === 'bootstrap5-dark') {
        args.progressBar.secondaryProgressColor = '#2b5288'
    } else if (selectedTheme === 'bootstrap5') {
        args.progressBar.secondaryProgressColor = '#98c5f5'
    } else if (selectedTheme === 'bootstrap') {
        args.progressBar.secondaryProgressColor = '#acc6dc'
    } else if (selectedTheme === 'bootstrap4') {
        args.progressBar.secondaryProgressColor = '#98c5f5'
    } else if (selectedTheme === 'bootstrap-dark') {
        args.progressBar.secondaryProgressColor = '#b8b8b8'
    } else if (selectedTheme === 'highcontrast') {
        args.progressBar.secondaryProgressColor = '#aca379'
    } else if (selectedTheme === 'fluent-dark') {
        args.progressBar.secondaryProgressColor = '#2b5288'
    } else if (selectedTheme === 'fluent') {
        args.progressBar.secondaryProgressColor = '#98c5f5'
    } else if (selectedTheme === 'tailwind-dark') {
        args.progressBar.secondaryProgressColor = '#386e7f'
    } else if (selectedTheme === 'tailwind') {
        args.progressBar.secondaryProgressColor = '#b1afe9'
    }
  }
}
