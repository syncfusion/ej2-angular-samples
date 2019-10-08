/**
 * RTE Auto save Sample
 */
import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ToolbarService, RichTextEditorComponent, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
@Component({
    selector: 'control-content',
    templateUrl: 'auto-save.html',
    styleUrls: ['auto-save.css'],
	encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})

export class AutoSaveComponent {

    @ViewChild('autosaveRTE')
    public rteObj: RichTextEditorComponent;

    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
            'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo']
    };
public updateStatus() {
    document.getElementById('saving').style.display = 'block';
    document.getElementById('saved').style.display = 'none';
    setTimeout(() => {
      document.getElementById('saving').style.display = 'none';
      document.getElementById('saved').style.display = 'block';
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
}