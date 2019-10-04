/**
 * RTE Custom-Toolbar Sample
 */
import { Component, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { ToolbarService, NodeSelection, LinkService, ImageService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorComponent, HtmlEditorService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog, ButtonPropsModel } from '@syncfusion/ej2-popups';
import { Tab } from '@syncfusion/ej2-navigations';

@Component({
    selector: 'control-content',
    templateUrl: 'insert-emoticons.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['insert-emoticons.css'],
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService]
})

export class InsertEmoticonsComponent {

    @ViewChild('customRTE')
    private rteObj: RichTextEditorComponent;

    @ViewChild('Dialog')
    private dialogObj: Dialog;

    @ViewChild('tabdefault')
    private tabobj: Tab;

    @ViewChild('rteSection')
    private rteSection: ElementRef;

    public selection: NodeSelection = new NodeSelection();
    public range: Range;
    public customBtn: HTMLElement;
    public dialogCtn: HTMLElement;
    public saveSelection: NodeSelection;

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
        { content: '&#128543;', title: 'Worried face' },
        { content: '&#128544;', title: 'Angry face' },
        { content: '&#128545;', title: 'Pouting face' },
        { content: '&#128546;', title: 'Crying face' },
        { content: '&#128547;', title: 'Persevering face' },
        { content: '&#128548;', title: 'Face with look of triumph' },
        { content: '&#128549;', title: 'Disappointed but relieved face' },
        { content: '&#128550;', title: 'Frowning face with open mouth' },
        { content: '&#128551;', title: 'Anguished face' },
        { content: '&#128552;', title: 'Fearful face' },
        { content: '&#128553;', title: 'Weary face' },
        { content: '&#128554;', title: 'Sleepy face' },
        { content: '&#128555;', title: 'Tired face' },
        { content: '&#128556;', title: 'Grimacing face' },
        { content: '&#128557;', title: 'Loudly crying face' },
        { content: '&#128558;', title: 'Face with open mouth' },
        { content: '&#128559;', title: 'Hushed face' },
        { content: '&#128560;', title: 'Face with open mouth and cold sweat' },
        { content: '&#128561;', title: 'Face screaming in fear' },
        { content: '&#128562;', title: 'Astonished face' },
        { content: '&#128563;', title: 'Flushed face' },
        { content: '&#128564;', title: 'Sleeping face' },
        { content: '&#128565;', title: 'char_block' },

    ];
    public animals: { [key: string]: Object }[] = [
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
        { title: 'Camel', content: '&#128042;' },
        { title: 'Two-Hump Camel', content: '&#128043;' },
        { title: 'Elephant', content: '&#128024;' },
        { title: 'Rhinoceros', content: '&#129423;' },
        { title: 'Mouse Face', content: '&#128045;' },
        { title: 'Mouse', content: '&#128001;' },
        { title: 'Rat', content: '&#128000;' },
        { title: 'Hamster Face', content: '&#128057;' },
        { title: 'Rabbit Face', content: '&#128048;' },
        { title: 'Rabbit', content: '&#128007;' },
        { title: 'Chipmunk', content: '&#128063;' },
        { title: 'Bat', content: '&#129415;' },
        { title: 'Bear Face', content: '&#128059;' },
        { title: 'Koala', content: '&#128040;' },
        { title: 'Panda Face', content: '&#128060;' },
        { title: 'Paw Prints', content: '&#128062;' },
        { title: 'Frog Face', content: '&#128056;' },
        { title: 'Crocodile', content: '&#128010;' },
        { title: 'Turtle', content: '&#128034;' },
        { title: 'Lizard', content: '&#129422;' },
        { title: 'Snake', content: '&#128013;' },
        { title: 'Dragon Face', content: '&#128050;' },
        { title: 'Dragon', content: '&#128009;' },
        { title: 'Sauropod', content: '&#129429;' },
        { title: 'T-Rex', content: '&#129430;' },
    ];
    public headerText: { [key: string]: Object }[]  = [{ text: '&#128578;' }, { text: '&#128053;' }];
    public tools: object = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
            'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode',
            {
                tooltipText: 'Insert Emoticons',
                template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%">'
                    + '<div class="e-tbar-btn-text" style="font-weight: 500;">&#128578;</div></button>'
            }, '|', 'Undo', 'Redo'
        ]
    };
    public dlgButtons: ButtonPropsModel[] = [{ buttonModel: { content: 'Insert', isPrimary: true }, click: this.onInsert.bind(this) },
    { buttonModel: { content: 'Cancel' }, click: this.dialogOverlay.bind(this) }];
    public header = 'Insert Emoticons';
    public target: HTMLElement = document.getElementById('rteSection');
    public height: string | number = 'auto';
    public onCreate(): void {
        this.customBtn = document.getElementById('custom_tbar') as HTMLElement;
        this.dialogCtn = document.getElementById('rteSpecial_char') as HTMLElement;
        this.dialogObj.target = document.getElementById('rteSection');
        this.customBtn.onclick = (e: Event) => {
            (this.rteObj.contentModule.getEditPanel() as HTMLElement).focus();
            this.dialogObj.element.style.display = '';
            this.range = this.selection.getRange(document);
            this.saveSelection = this.selection.save(this.range, document);
            this.dialogObj.show();
        };
    }
    public dialogCreate(): void {
        this.dialogCtn = this.tabobj.element;
        this.dialogCtn.onclick = (e: Event) => {
            const target: HTMLElement = e.target as HTMLElement;
            const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
            if (target.classList.contains('char_block')) {
                target.classList.add('e-active');
                if (activeEle) {
                    activeEle.classList.remove('e-active');
                }
            }
        };
    }

    public onInsert(): void {
        const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            this.saveSelection.restore();
            this.rteObj.executeCommand('insertText', activeEle.textContent);
            this.rteObj.formatter.saveData();
            this.rteObj.formatter.enableUndo(this.rteObj);
        }
        this.dialogOverlay();
    }

    public dialogOverlay(): void {
        const activeEle: Element = this.dialogObj.element.querySelector('.char_block.e-active');
        if (activeEle) {
            activeEle.classList.remove('e-active');
        }
        this.dialogObj.hide();
    }
    
    public actionCompleteHandler(e: any): void {
        if (e.requestType === 'SourceCode') {
        this.rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
        this.rteObj.getToolbar().querySelector('#custom_tbar').parentElement.classList.remove('e-overlay');
        }
    }
}
