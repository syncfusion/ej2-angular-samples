/**
 * Rich Text Editor Auto save Sample
 */
import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ToolbarService, RichTextEditorComponent, LinkService, ImageService, HtmlEditorService, RichTextEditorModule, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
@Component({
    selector: 'control-content',
    templateUrl: 'auto-save.html',
    styleUrls: ['auto-save.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [RichTextEditorModule, SwitchModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class AutoSaveComponent {

    @ViewChild('autosaveRTE')
    public rteObj: RichTextEditorComponent;

    public tools: ToolbarModule = {
      items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo']
    };
public updateStatus() {
    document.getElementById('saving').style.display = 'block';
    document.getElementById('saved').style.display = 'none';
    setTimeout(() => {
      if (!isNullOrUndefined(document.getElementById('saving')) && !isNullOrUndefined(document.getElementById('saved'))) {
        document.getElementById('saving').style.display = 'none';
        document.getElementById('saved').style.display = 'block';
      }
    }, 500);
  }

  public onChange(e: any) {
    var defaultRTE = this.rteObj;
    if (e.checked) {
      defaultRTE.saveInterval = 5000;
    } else {
      defaultRTE.saveInterval = 0;
      setTimeout(() => {
        document.getElementById('saving').style.display = 'none';
        document.getElementById('saved').style.display = 'none';
      }, 500);
    }
  }
  editorValue: string = `<h2>Welcome to the Rich Text Editor Demo!📝</h2><p style="text-align: start;">Experience the power of modern content editing with advanced formatting, media embedding, and many other features. You can explore this demo for yourself.</p><h5>Explore the Possibilities! 🚀</h5><ul><li><b>Highly customizable</b> -&nbsp;You can configure the toolbar, enable/disable features, and fine-tune the editing experience to match your needs.</li><li><b>Seamless content pasting</b> -&nbsp;Copy and paste from Microsoft Word, Outlook, or other editors or sources while preserving formatting, styles, and structure.</li><li><b>Import Word documents</b> -&nbsp;Convert <b>DOCX</b><b> files</b> into editable HTML content inside the editor using the Import from Word feature.</li><li><b>One-click Export</b> -&nbsp;Save your document as <b>PDF</b> 📄 or <b>Word (DOCX)</b> 📝 with just a single click.</li><li><b>@Mentions</b> -&nbsp;Type&nbsp;<span class="e-mention-chip"><a href="mailto:albert@gmail.com" title="albert@gmail.com">@Albert</a></span> to see available suggestions and tag users in your content.</li><li><b>Image Management</b> -&nbsp;Use the File Manager to browse, upload, and manage images within the editor.</li></ul><p><br/></p><h5>Powerful Features!</h5><p>A quick overview of the essential features of the Rich Text Editor.<br/></p><table class="e-rte-table" style="width: 61.0405%; min-width: 0px; height: 82px;"><thead style="height: 31.7073%;"><tr style="height: 31.7073%;"><th class="" style="width: 29.9807%;">Feature<br/></th><th class="" style="width: 70.0193%;">Description<br/></th></tr></thead><tbody><tr style="height: 34.1463%;"><td class="" style="width: 29.981%;">Text Formatting<br/></td><td style="width: 70.0193%;" class="">Bold, Italic, Underline, Strikethrough, and more.<br/></td></tr><tr style="height: 34.1463%;"><td style="width: 29.9807%;" class="">Lists &amp; Indentation<br/></td><td style="width: 70.019%;" class="">Ordered, unordered, nested lists.<br/></td></tr><tr><td style="width: 29.9807%;">Tables<br/></td><td style="width: 70.019%;" class="">Insert and edit tables with styling.<br/></td></tr><tr><td style="width: 29.9807%;">Media Embedding<br/></td><td style="width: 70.019%;" class="">Images, videos, and iframes.<br/></td></tr><tr><td style="width: 29.9807%;">Mentions<br/></td><td style="width: 70.019%;" class="">Tag users and add comments<br/></td></tr></tbody></table><p><br/></p><h5>Effortless Image Handling!</h5><p>Insert, resize, align, and manage images seamlessly within the editor.<br/></p><p style="text-align: center;"><img alt="Sky with sun" src="https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png" width="400" height="200" style="" class="e-rte-image e-imgcenter" /></p><p><br/></p><p style="text-align: center;"><b>"Great writing begins with a great editor."</b><b> ✍️</b> <br/></p>`;
}