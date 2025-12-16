/**
 * Rich Text Editor Insert Media Sample
 */
import { ToolbarSettingsModel, RichTextEditorModule, VideoSettingsModel, AudioSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { Component } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService ,AudioService ,VideoService, QuickToolbarService, PasteCleanupService, TableService, ClipBoardCleanupService, AutoFormatService} from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, IFrameSettingsModel, FileManagerService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'insert-media.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, AudioService, VideoService, QuickToolbarService, PasteCleanupService, TableService, ClipBoardCleanupService, AutoFormatService],
    standalone: true,
    imports: [RichTextEditorModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class InsertMediaComponent{
    private hostUrl: string = 'https://services.syncfusion.com/angular/production/';
    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'Audio', 'Video', '|', 'SourceCode', 'Undo', 'Redo']
    };
    public insertVideoSettings: VideoSettingsModel = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
        path: this.hostUrl + 'RichTextEditor/'
    };
    public insertAudioSettings: AudioSettingsModel = {
        saveUrl: this.hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: this.hostUrl + 'api/RichTextEditor/DeleteFile',
        path: this.hostUrl + 'RichTextEditor/'
    };
}
