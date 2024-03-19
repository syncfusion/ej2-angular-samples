/**
 * Rich Text Editor File Browser Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, QuickToolbarService, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, TableService} from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, FileManagerService, FileManagerSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'file-browser.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, FileManagerService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})

export class FileBrowserComponent {
  hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';

  toolbarSettings: ToolbarSettingsModel = {
    items: ['FileManager', 'Image']
  };

  fileManagerSettings: FileManagerSettingsModel = {
    enable: true,
    path: '/Pictures/Food',
    ajaxSettings: {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    }
  };
}