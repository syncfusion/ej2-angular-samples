/**
 * Rich Text Editor Quick Format Toolabr Sample
 */
import { Component  } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, FormatPainterService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { QuickToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'quick-format-toolbar.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, FormatPainterService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, SBDescriptionComponent]
})
export class FormatQuicktoolbarComponent {
    
    public tools: ToolbarModule = {
        type: 'MultiRow',
        enableFloating: false
    };
    public quickToolbarSettings: QuickToolbarSettingsModel = {
        text: ['Bold', 'Italic', 'Underline', 'FontColor', 'BackgroundColor', 'Alignments', '-', 'FontSize', 'FontName', 'Formats', 'OrderedList', 'UnorderedList', 'FormatPainter']
    };
}
