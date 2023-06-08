import { Component, ViewEncapsulation, ViewChild  } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
/**
 * File Manager directory upload feature sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'directory-upload.html',
    styleUrls: ['directory-upload.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ NavigationPaneService, ToolbarService, DetailsViewService]
})

export class DirectoryUploadController {
    @ViewChild('fileObj')
    public fileObj: FileManagerComponent;
    public ajaxSettings: object;
    public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
    public ngOnInit(): void {
        this.ajaxSettings = {
            url: this.hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
            uploadUrl: this.hostUrl + 'api/FileManager/Upload',
            downloadUrl: this.hostUrl + 'api/FileManager/Download'
        };
    }
    //DropDownButton items definition
    public items: ItemModel[] = [{ text: 'Folder' }, { text: 'Files' }];

  onSuccess(args: any) {
    if (!document.getElementById("file_tb_upload").classList.contains("e-dropdown-btn")) {
    let customBtn: HTMLElement = document.getElementById('file_tb_upload');
    customBtn.onclick = (e) => {
      e.stopPropagation();
    };
    let drpDownBtn: DropDownButton = new DropDownButton(
      {
        items: this.items,
        select: (args) => {
          if (args.item.text === 'Folder') {
            this.fileObj.uploadSettings.directoryUpload = true;
          } else {
            this.fileObj.uploadSettings.directoryUpload = false;
          }
          setTimeout(function () {
            let uploadBtn: HTMLElement = document.querySelector(
              '.e-file-select-wrap button'
            );
            uploadBtn.click();
          }, 100);
        },
      },
      '#file_tb_upload'
    );
  }
  }
}
