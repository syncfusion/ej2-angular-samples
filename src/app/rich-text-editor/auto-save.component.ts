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
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments',
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
}