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
        { formatName: "Text", command: "P", formatType: "Basic blocks", icon: "e-btn-icon e-text e-icons", description: "Writing with paragraphs" },
        { formatName: "Quotation", command: "BlockQuote", formatType: "Basic blocks", icon: "e-icons block-view", description: "Insert a quote or citation" },
        { formatName: "Heading 1", command: "H1", formatType: "Basic blocks", icon: "e-icons h1-view", description: "Use this for a top level heading" },
        { formatName: "Heading 2", command: "H2", formatType: "Basic blocks", icon: "e-icons h2-view", description: "Use this for key sections" },
        { formatName: "Heading 3", command: "H3", formatType: "Basic blocks", icon: "e-icons h3-view", description: "Use this for sub sections and group headings" },
        { formatName: "Heading 4", command: "H4", formatType: "Basic blocks", icon: "e-icons h4-view", description: "Use this for deep headings" },
        { formatName: "Numbered list", command: "OL", formatType: "Basic blocks", icon: "e-icons e-list-ordered icon", description: "Create an ordered list" },
        { formatName: "Bulleted list", command: "UL", formatType: "Basic blocks", icon: "e-icons e-list-unordered icon", description: "Create an unordered list" },
        { formatName: "Table", command: "CreateTable", formatType: "Basic blocks", icon: "e-icons e-table icon", description: "Insert a table" },
        { formatName: "Emoji picker", command: "EmojiPicker", formatType: "Inline", icon: "e-icons e-emoji icon", description: "Use emojis to express ideas and emoticons" },
        { formatName: "Image", command: "Image", formatType: "Media", icon: "e-icons e-image icon", description: "Add image to your page" },
        { formatName: "Audio", command: "Audio", formatType: "Media", icon: "e-icons e-audio icon", description: "Add audio to your page" },
        { formatName: "Video", command: "Video", formatType: "Media", icon: "e-icons e-video icon", description: "Add video to your page" },
    ];
    public fieldsData: { [key: string]: string } = { text: 'formatName', groupBy: 'formatType' };

    public tools: ToolbarModule = {
        items: ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'LowerCase', 'UpperCase', '|',
            'Formats', 'Alignments', '|', 'NumberFormatList', 'BulletFormatList', '|',
            'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
            '|', 'EmojiPicker', '|',
            'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
    };

    onActionBegin(args) {
        if (args.requestType === 'EnterAction') {
            if (this.mentionObj.element.classList.contains('e-popup-open')) {
                args.cancel = true;
            }
        }
    }

    public beforeApplyFormat(isBlockFormat: Boolean): void {
        let currentRange: Range = this.rteObj.getRange();
        let node: Node = this.rteObj.formatter.editorManager.nodeSelection.getNodeCollection(currentRange)[0];         
        let startPoint = currentRange.startOffset;
        while(this.rteObj.formatter.editorManager.nodeSelection.getRange(document).toString().indexOf("/") ==-1 ){
            this.rteObj.formatter.editorManager.nodeSelection.setSelectionText(document, node, node, startPoint, currentRange.endOffset);
            startPoint--;
        }
        let slashRange: Range = this.rteObj.getRange();
        let slashNode: Node = this.rteObj.formatter.editorManager.nodeCutter.GetSpliceNode(slashRange, node as HTMLElement);
        let previouNode: Node = slashNode.previousSibling;
        const brTag: HTMLElement = document.createElement('br');
        if (slashNode.parentElement && slashNode.parentElement.innerHTML.length === 1) {
            slashNode.parentElement.appendChild(brTag);
        }
        slashNode.parentNode.removeChild(slashNode);
        if(previouNode) {
            this.selection.setCursorPoint(document, previouNode as Element, previouNode.textContent.length);
        }
    }
    public beforeOpen() {
        this.saveSelection = this.selection.save(this.selection.getRange(document), document);
    }

    public filtering(): void {
        this.saveSelection = this.selection.save(this.selection.getRange(document), document);
    }

    public applyCommand(args: SelectEventArgs): void {
        args.cancel = true;
        this.rteObj.focusIn();
        this.saveSelection.restore();
        const itemData = args.itemData as { [key: string]: Object };
        const command = itemData.command;
        if (!(itemData.formatType === 'Inline')) {
            this.beforeApplyFormat(true);
        }
        switch (command) {
            case 'OL':
                this.rteObj.executeCommand('insertOrderedList');
                break;
            case 'UL':
                this.rteObj.executeCommand('insertUnorderedList');
                break;
            case 'CreateTable':
            case 'Image':
            case 'Audio':
            case 'Video':
                this.mentionObj.hidePopup();
                this.rteObj.showDialog(command === 'Video'? DialogType.InsertVideo: command === 'Audio'
                    ? DialogType.InsertAudio: command === 'Image'? DialogType.InsertImage: DialogType.InsertTable);
                break;
            case 'EmojiPicker':
                this.beforeApplyFormat(false);
                this.mentionObj.hidePopup();
                this.rteObj.showEmojiPicker();
                break;
            default:
                this.rteObj.executeCommand('formatBlock', command);
                break;
        }
    }
}

