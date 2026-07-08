import { Component, ViewEncapsulation, ViewChild  } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
/**
 * File Manager directory upload feature sample
 */

@Component({
    selector: 'control-content',
    templateUrl: 'directory-upload.html',
    styleUrls: ['directory-upload.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [NavigationPaneService, ToolbarService, DetailsViewService],
    standalone: true,
    imports: [FileManagerModule, DropDownButtonModule]
})

export class DirectoryUploadController {
  @ViewChild('fileObj')
  public fileObj: FileManagerComponent;
  @ViewChild('dropButtonObj')
  public dropButtonObj: DropDownButton;
  public ajaxSettings: object;
  public contextMenuSettings: object;
  public uploadLabel: string = 'Upload';
  public hostUrl: string = 'https://physical-service.syncfusion.com/';
  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };
    this.contextMenuSettings = {
      file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
      visible: true
  };
  }
  //DropDownButton items definition
  public items: ItemModel[] = [];
  public onSuccess(args: any) {
    this.uploadLabel = this.fileObj.localeObj.getConstant('Upload');
    this.items = [
      { text: this.fileObj.localeObj.getConstant('Folder') },
      { text: this.fileObj.localeObj.getConstant('File') },
    ];
    if (document.getElementById("dropButton").classList.contains("e-dropdown-btn")) {
      let customBtn: HTMLElement = document.getElementById('dropButton');
      customBtn.onclick = (e) => {
        e.stopPropagation();
      };
    }
  }

  public onSelect(args: any): void {
    if (args.item.text === this.fileObj.localeObj.getConstant('Folder')) {
      this.fileObj.uploadSettings.directoryUpload = true;
    } else {
      this.fileObj.uploadSettings.directoryUpload = false;
    }
    setTimeout(function () {
      let uploadBtn: HTMLElement = document.querySelector('.e-file-select-wrap button');
      uploadBtn.click();
    }, 100);
  }
}
