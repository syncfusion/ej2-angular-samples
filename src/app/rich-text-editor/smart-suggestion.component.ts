/**
 * Rich Text Editor Mention integration Functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogType, ToolbarService, NodeSelection, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService, EmojiPickerService } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog, ButtonPropsModel } from '@syncfusion/ej2-popups';
import { Mention, SelectEventArgs } from '@syncfusion/ej2-dropdowns';

 @Component({
     selector: 'control-content',
     templateUrl: 'smart-suggestion.html',
     styleUrls: ['smart-suggestion.css'],
     encapsulation: ViewEncapsulation.None,
     providers: [ToolbarService, LinkService, ImageService, QuickToolbarService, HtmlEditorService, EmojiPickerService]
 })
 export class MentionFormatIntegrationComponent {

    @ViewChild('MentionInlineFormat')
    private rteObj: RichTextEditorComponent;

    @ViewChild('Mention')
    private mentionObj: Mention;
    
    public selection: NodeSelection = new NodeSelection();
    public saveSelection: NodeSelection;

     public data: { [key: string]: Object }[] = [
          { formatName: "Text", command: "P", formatType: "Basic blocks", icon: "e-btn-icon e-text e-icons", description: "Writing with paragraphs"},
          { formatName: "Quotation", command: "BlockQuote", formatType: "Basic blocks", icon: "e-icons block-view", description: "Insert a quote or citation" },
          { formatName: "Heading 1", command: "H1", formatType: "Basic blocks", icon: "e-icons h1-view", description: "Use this for a top level heading"},
          { formatName: "Heading 2", command: "H2", formatType: "Basic blocks", icon: "e-icons h2-view", description: "Use this for key sections"},
          { formatName: "Heading 3", command: "H3", formatType: "Basic blocks", icon: "e-icons h3-view",description: "Use this for sub sections and group headings" },
          { formatName: "Heading 4", command: "H4", formatType: "Basic blocks", icon: "e-icons h4-view", description: "Use this for deep headings"},
          { formatName: "Numbered list", command: "OL", formatType: "Basic blocks", icon: "e-icons e-list-ordered icon", description: "Create an ordered list"},
          { formatName: "Bulleted list", command: "UL", formatType: "Basic blocks", icon: "e-icons e-list-unordered icon", description: "Create an unordered list"},
          { formatName: "Table", command: "CreateTable", formatType: "Basic blocks",icon: "e-icons e-table icon", description: "Insert a table"},
          { formatName: "Emoji picker", command: "EmojiPicker", formatType: "Inline", icon: "e-icons e-emoji icon",description: "Use emojis to express ideas and emoticons"},
          { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page"},
          { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page"},
          { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page"},
       ];
       public  fieldsData: { [key: string]: string } = { text: 'formatName', groupBy:'formatType' };

       public tools: ToolbarModule = {
           items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
               'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
               'LowerCase', 'UpperCase', '|',
               'Formats', 'Alignments', '|', 'NumberFormatList', 'BulletFormatList', '|',
               'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
               '|', 'EmojiPicker', '|',
               'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
        };
 
       onActionBegin(args){
         if (args.requestType === 'EnterAction') {
            if(this.mentionObj.element.classList.contains('e-popup-open')){
              args.cancel = true;
            } 
         }
       }

    public beforeApplyFormat(isBlockFormat: Boolean):void{
      let range1: Range = this.rteObj.getRange();
        let node: Node = this.rteObj.formatter.editorManager.nodeSelection.getNodeCollection(range1)[0];
        let blockNewLine = !(node.parentElement.innerHTML.replace(/&nbsp;|<br>/g, '').trim() == '/' || node.textContent.trim().indexOf('/')==0);
        let blockNode: Node;
        let startNode:Node = node;
        if (blockNewLine && isBlockFormat) {
            while (startNode != this.rteObj.inputElement) {
                blockNode = startNode;
                startNode = startNode.parentElement;
            }           
        }          
        let startPoint = range1.startOffset;
        while(this.rteObj.formatter.editorManager.nodeSelection.getRange(document).toString().indexOf("/") ==-1 ){
            this.rteObj.formatter.editorManager.nodeSelection.setSelectionText(document, node, node, startPoint, range1.endOffset);
            startPoint--;
        }
        let range2: Range = this.rteObj.getRange();
        let node2: Node = this.rteObj.formatter.editorManager.nodeCutter.GetSpliceNode(range2, node as HTMLElement);
        let previouNode: Node = node2.previousSibling;
        const brTag: HTMLElement = document.createElement('br');
        if (node2.parentElement && node2.parentElement.innerHTML.length === 1) {
            node2.parentElement.appendChild(brTag);
        }
        node2.parentNode.removeChild(node2);
        if(previouNode) {
            this.selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
        }
    }
    public beforeOpen() {
        this.saveSelection = this.selection.save(this.selection.getRange(document), document);
    }

    public filtering():void{
      this.saveSelection = this.selection.save(this.selection.getRange(document), document);
    }

    public applyCommand(args: SelectEventArgs): void {
      args.cancel = true;
      this.rteObj.focusIn();
      this.saveSelection.restore();
      if (!((args.itemData as  { [key: string]: Object }).formatType == 'Inline')) {
          this.beforeApplyFormat(true);
      }
      if ((args.itemData as  { [key: string]: Object }).command == 'OL') {
          this.mentionObj.hidePopup();
          this.rteObj.executeCommand('insertOrderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'UL') {
          this.mentionObj.hidePopup();
          this.rteObj.executeCommand('insertUnorderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'CreateTable') {
          this.mentionObj.hidePopup();
          this.rteObj.showDialog(DialogType.InsertTable);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Image') {
          this.mentionObj.hidePopup();
          this.rteObj.showDialog(DialogType.InsertImage);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Audio') {
          this.mentionObj.hidePopup();
          this.rteObj.showDialog(DialogType.InsertAudio);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'Video') {
          this.mentionObj.hidePopup();
          this.rteObj.showDialog(DialogType.InsertVideo);
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'EmojiPicker') {
          this.beforeApplyFormat(false);
          this.mentionObj.hidePopup();
          this.rteObj.showEmojiPicker();
      }
      else {
          this.mentionObj.hidePopup();
          this.rteObj.executeCommand('formatBlock', (args.itemData as  { [key: string]: Object }).command);
      }
    }
 }
 
