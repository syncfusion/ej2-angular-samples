/**
 * Rich Text Editor Mention integration Functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { DialogType, ToolbarService, NodeSelection, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog, ButtonPropsModel } from '@syncfusion/ej2-popups';
import { Mention, SelectEventArgs } from '@syncfusion/ej2-dropdowns';

 @Component({
     selector: 'control-content',
     templateUrl: 'smart-suggestion.html',
     styleUrls: ['smart-suggestion.css'],
     encapsulation: ViewEncapsulation.None,
     providers: [ToolbarService, LinkService, ImageService, QuickToolbarService, HtmlEditorService]
 })
 export class MentionFormatIntegrationComponent {

    @ViewChild('MentionInlineFormat')
    private rteObj: RichTextEditorComponent;

    @ViewChild('Dialog')
    private dialogObj: Dialog;

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
          { formatName: "Emoji", command: "Emoji", formatType: "Inline", icon: "e-icons emoji",description: "Use emojis to express ideas and emoticons"},
          { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page"},
          { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page"},
          { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page"},
       ];
       public  fieldsData: { [key: string]: string } = { text: 'formatName', groupBy:'formatType' };

       public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
            'LowerCase', 'UpperCase','SuperScript', 'SubScript', '|',
            'Formats', 'Alignments', 'NumberFormatList', 'BulletFormatList',
            'Outdent', 'Indent', '|', 'CreateTable', 'CreateLink', 'Image', 
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
        };
 
       onActionBegin(args){
         if (args.requestType === 'EnterAction') {
            if(this.mentionObj.element.classList.contains('e-popup-open')){
              args.cancel = true;
            } 
         }
       }

      // begins the process of inserting emoticons.

       public smileys: { [key: string]: Object }[] = [
        { content: '&#128512;', title: 'Grinning face' },
        { content: '&#128513;', title: 'Grinning face with smiling eyes' },
        { content: '&#128514;', title: 'Face with tears of joy' },
        { content: '&#128515;', title: 'Smiling face with open mouth' },
        { content: '&#128516;', title: 'Smiling face with open mouth and smiling eyes' },
        { content: '&#128517;', title: 'Smiling face with open mouth and cold sweat' },
        { content: '&#128518;', title: 'Smiling face with open mouth and tightly-closed eyes' },
        { content: '&#128519;', title: 'Smiling face with halo' },
        { content: '&#128520;', title: 'Smiling face with horns' },
        { content: '&#128521;', title: 'Winking face' },
        { content: '&#128522;', title: 'Smiling face with smiling eyes' },
        { content: '&#128523;', title: 'Face savouring delicious food' },
        { content: '&#128524;', title: 'Relieved face' },
        { content: '&#128525;', title: 'Smiling face with heart-shaped eyes' },
        { content: '&#128526;', title: 'Smiling face with sunglasses' },
        { content: '&#128527;', title: 'Smirking face"' },
        { content: '&#128528;', title: 'Neutral face' },
        { content: '&#128529;', title: 'Expressionless face' },
        { content: '&#128530;', title: 'Unamused face' },
        { content: '&#128531;', title: 'Face with cold sweat' },
        { content: '&#128532;', title: 'Pensive face' },
        { content: '&#128533;', title: 'Confused face' },
        { content: '&#128534;', title: 'Confounded face' },
        { content: '&#128535;', title: 'Kissing face' },
        { content: '&#128536;', title: 'Face throwing a kiss' },
        { content: '&#128538;', title: 'Kissing face with smiling eyes' },
        { content: '&#128539;', title: 'Face with stuck-out tongue' },
        { content: '&#128540;', title: 'Face with stuck-out tongue and winking eye' },
        { content: '&#128541;', title: 'Face with stuck-out tongue and tightly-closed eyes' },
        { content: '&#128542;', title: 'Disappointed face' },
        { title: 'Monkey Face', content: '&#128053;' },
        { title: 'Monkey', content: '&#128018;' },
        { title: 'Gorilla', content: '&#129421;' },
        { title: 'Dog Face', content: '&#128054;' },
        { title: 'Dog', content: '&#128021;' },
        { title: 'Poodle', content: '&#128041;' },
        { title: 'Wolf Face', content: '&#128058;' },
        { title: 'Fox Face', content: '&#129418;' },
        { title: 'Cat Face', content: '&#128049;' },
        { title: 'Cat', content: '&#128008;' },
        { title: 'Lion Face', content: '&#129409;' },
        { title: 'Tiger Face', content: '&#128047;' },
        { title: 'Tiger', content: '&#128005;' },
        { title: 'Leopard', content: '&#128006;' },
        { title: 'Horse Face', content: '&#128052;' },
        { title: 'Horse', content: '&#128014;' },
        { title: 'Unicorn Face', content: '&#129412;' },
        { title: 'Deer', content: '&#129420;' },
        { title: 'Cow Face', content: '&#128046;' },
        { title: 'Ox', content: '&#128002;' },
        { title: 'Water Buffalo', content: '&#128003;' },
        { title: 'Cow', content: '&#128004;' },
        { title: 'Pig Face', content: '&#128055;' },
        { title: 'Pig', content: '&#128022;' },
        { title: 'Boar', content: '&#128023;' },
        { title: 'Pig Nose', content: '&#128061;' },
        { title: 'Ram', content: '&#128015;' },
        { title: 'Ewe', content: '&#128017;' },
        { title: 'Goat', content: '&#128016;' },
        { title: 'Camel', content: '&#128042;' }
    ];

    public dialogButtons: ButtonPropsModel[] = [{ buttonModel: { content: 'Insert', isPrimary: true }, click: this.onInsert.bind(this) },
    { buttonModel: { content: 'Cancel' }, click: this.dialogOverlay.bind(this) }];
    public header = 'Insert Emoticons';

    public onCreate(): void {
      this.dialogObj.target = document.getElementById('mentionFormatIntegration');
    }
    
    public dialogCreate(): void {
      let dialogContent: HTMLElement = document.getElementById('emojiDialog');
      dialogContent.onclick = (e: Event) => {
        const target: HTMLElement = e.target as HTMLElement;
        const activeElement: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (target.classList.contains('char_block')) {
          target.classList.add('e-active');
          if (activeElement) {
            activeElement.classList.remove('e-active');
          }
        }
      };
    }

    public onDialogOpen():void{
      let emojiElement: HTMLElement = document.getElementById('rteEmoticons-smiley');
      if (!emojiElement.children[0].classList.contains('e-active')) {
        emojiElement.children[0].classList.add('e-active');
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
        node2.parentNode.removeChild(node2);
        if(blockNewLine && isBlockFormat){
            let defaultTag: HTMLElement = document.createElement('p');
            defaultTag.innerHTML = '</br>';
            blockNode.parentNode.insertBefore(defaultTag, blockNode.nextSibling);
            this.selection.setCursorPoint(document, blockNode.nextSibling as Element, 0);
        } else if(previouNode) {
            this.selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
        }
    }

    public onInsert(): void {
        const activeElement: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeElement) {
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            this.beforeApplyFormat(false);
            let range: Range =this.rteObj.getRange();
            this.selection.setCursorPoint(document, range.startContainer as Element, range.startOffset);
            this.rteObj.executeCommand('insertText', activeElement.textContent);
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
        }
        this.dialogOverlay();
    }

    public dialogOverlay(): void {
        const activeElement: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeElement) {
            activeElement.classList.remove('e-active');
        }
        this.dialogObj.hide();
    }

    // End the process of inserting emoticons.

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
          this.rteObj.executeCommand('insertOrderedList');
      }
      else if ((args.itemData as  { [key: string]: Object }).command == 'UL') {
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
      else if ((args.itemData as  { [key: string]: Object }).command == 'Emoji') {
        this.dialogObj.element.style.display = 'block';
          this.mentionObj.hidePopup();
          this.dialogObj.show();
      }
      else {
          this.rteObj.executeCommand('formatBlock', (args.itemData as  { [key: string]: Object }).command);
      }
    }
 }
 
