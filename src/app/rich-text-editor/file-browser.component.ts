/**
 * Rich Text Editor File Browser Sample
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, QuickToolbarService, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, TableService, ClipBoardCleanupService, AutoFormatService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, FileManagerService, FileManagerSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'file-browser.html',
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, FileManagerService, PasteCleanupService, VideoService, AudioService, TableService, ClipBoardCleanupService, AutoFormatService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})

export class FileBrowserComponent {
  hostUrl: string = 'https://services.syncfusion.com/angular/production/';

  toolbarSettings: ToolbarSettingsModel = {
    items: ['FileManager', 'Image']
  };

  fileManagerSettings: FileManagerSettingsModel = {
    enable: true,
    ajaxSettings: {
      url: this.hostUrl + 'api/RichTextEditor/FileOperations',
      getImageUrl: this.hostUrl + 'api/RichTextEditor/GetImage',
      uploadUrl: this.hostUrl + 'api/RichTextEditor/Upload',
      downloadUrl: this.hostUrl + 'api/RichTextEditor/Download'
    }
  };
}