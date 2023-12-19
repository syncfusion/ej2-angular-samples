/**
 * Rich Text Editor Quick Format Toolabr Sample
 */
import { Component  } from '@angular/core';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, FormatPainterService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { QuickToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    selector: 'control-content',
    templateUrl: 'quick-format-toolbar.html',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, FormatPainterService]
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
