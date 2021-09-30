/**
 * Rich Text Editor tribute Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarService, LinkService, ImageService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import Tribute  from 'tributejs';
@Component({
    selector: 'control-content',
    templateUrl: 'tribute.html',
    styleUrls: ['tribute.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})
export class TributeComponent {
    @ViewChild('tributeRTE') rteObj: RichTextEditorComponent;
    public onCreate(): void {
      let tribute : Tribute<{key: string; value: string;}> = new Tribute({
        values: [
          { key: 'Phil Heartman', value: 'pheartman' },
          { key: 'Gordon Ramsey', value: 'gramsey' },
          { key: 'Jordan Humphreys', value: 'jhumphreys' },
          { key: 'Howard Johnson', value: 'hjohnson' }
        ]
      })  
      tribute.attach(this.rteObj.inputElement);
    }
    public actionBeginEvent(args: any): void {
      if (args.requestType === 'EnterAction') {
        args.cancel = true;
      }
    }
}