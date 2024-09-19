import { Component, ViewChild, Inject } from '@angular/core';
import { RichTextEditorComponent, RichTextEditorModule, ToolbarService, LinkService, ImageService, QuickToolbarService, HtmlEditorService, ToolbarClickEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { enableRipple } from '@syncfusion/ej2-base';
import { OpenAiModelRTE } from '../../azure-openai';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, ChipListComponent, ChipListModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { SkeletonModule, ToastComponent, ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
enableRipple(true);

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [RichTextEditorModule, DropDownButtonModule, DropDownListModule, ButtonModule, ChipListModule, SkeletonModule, ToastModule, DialogModule],
  providers: [ToolbarService, LinkService, ImageService, QuickToolbarService, HtmlEditorService],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.css'
})
export class SmartRichTextEditor {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-rich-text-editor.component.html',
      'rich-text-editor.component.css',
    ];
  }
  @ViewChild('dialog', { static: true }) public dialog!: DialogComponent;
  @ViewChild('queryCategory', { static: false }) public queryCategory!: DropDownListComponent;
  @ViewChild('languageCategory', { static: true }) public languageCategory!: DropDownListComponent;
  @ViewChild('defaultRTE', { static: true }) public defaultRTE!: RichTextEditorComponent;
  @ViewChild('chipList', { static: true }) public chipList!: ChipListComponent;
  @ViewChild('leftRte', { static: false }) public leftRte!: RichTextEditorComponent;
  @ViewChild('rightRte', { static: false }) public rightRte!: RichTextEditorComponent;
  @ViewChild('toastObj', { static: true }) public toastObj!: ToastComponent;
  @ViewChild('sentimentButton', { static: false }) public sentimentButton!: ButtonComponent;
  @ViewChild('regenerateButton', { static: false }) public regenerateButton!: ButtonComponent;
  @ViewChild('copyButton', { static: false }) public copyButton!: ButtonComponent;
  @ViewChild('replaceButton', { static: false }) public replaceButton!: ButtonComponent;
  @ViewChild('aiassistantButton', { static: true }) public aiassistantButton!: DropDownButton;
  @ViewChild('dialogContent', { static: true }) public dialogContent!: HTMLElement | null;
  public toolbarSettings = {
    items: [
      {
        tooltipText: 'AI Assist',
        template:
          '<button class="e-tbar-btn e-btn" tabindex="-1" id="ai_assistant_button_tbar" style="width:100%"><div class="e-rte-dropdown-btn-text">AI Assist</div></button>'
      },
      {
        tooltipText: 'Rephrase',
        template:
          '<button class="e-tbar-btn e-btn" tabindex="-1" id="ai_rephrase_button_tbar" style="width:100%"><div class="e-tbar-btn-text">Rephrase</div></button>'
      },
      'Bold',
      'Italic',
      'Underline',
      '|',
      'FontName',
      'FontSize',
      'FontColor',
      '|',
      'BackgroundColor',
      'Formats',
      'Alignments',
      '|',
      'OrderedList',
      'BulletFormatList',
      'CreateLink',
      'Image',
      '|',
      'createTable',
      'SourceCode',
      'Undo',
      'Redo',
    ],
  };
  public queryList: { ID: string; Text: string }[] = [
    { ID: "Rephrase", Text: "Rephrase" },
    { ID: "Grammar", Text: "Correct Grammar" },
    { ID: "Summarize", Text: "Summarize" },
    { ID: "Elaborate", Text: "Elaborate" },
    { ID: "Translate", Text: "Translate" },
    { ID: "SentimentAnalysis", Text: "Sentiment Analysis" }
  ];

  public languageList: { ID: string; Text: string }[] = [
    { ID: "EN", Text: "English" },
    { ID: "ZH", Text: "Chinese (Simplified)" },
    { ID: "ZHT", Text: "Chinese (Traditional)" },
    { ID: "ES", Text: "Spanish" },
    { ID: "HI", Text: "Hindi" },
    { ID: "AR", Text: "Arabic" },
    { ID: "BN", Text: "Bengali" },
    { ID: "PT", Text: "Portuguese" },
    { ID: "RU", Text: "Russian" },
    { ID: "JA", Text: "Japanese" },
    { ID: "DE", Text: "German" },
    { ID: "KO", Text: "Korean" },
    { ID: "FR", Text: "French" },
    { ID: "IT", Text: "Italian" },
    { ID: "TR", Text: "Turkish" }
  ];
  public editorContent: string = `
  <h2><span>Integrate AI with the Editor</span></h2>
  <p>Integrate the AI Assist into the rich text editor by capturing the content from the editor, sending it to the AI service, and displaying the results or suggestions back in the editor.</p>
  <h3>Summarize</h3>
  <p>This function condenses the selected content into a brief summary, capturing the main points succinctly.</p>
  <h3>Elaborate</h3>
  <p>This function expands the selected content, adding additional details and context.</p>
  <h3>Rephrase</h3>
  <p>This function rewrites the selected content to convey the same meaning using different words or structures. It also enables rephrase options and disables language selection.</p>
  <h3>Correct Grammar</h3>
  <p>This function reviews and corrects the grammar of the selected content, ensuring it adheres to standard grammatical rules.</p>
  <h3>Translate</h3>
  <p>This function translates the selected content into the specified language, enabling language selection and disabling rephrase options.</p>
`;
  public subQuery = '';
  public promptQuery = '';
  public isSentimentCheck: boolean = false;
  public resultData: string = '';
  public dropValIndex = 0;
  public apiResultData: any;
  public AIResult!: string;
  public translatelanguage!: string;
  public chipValue: string[] = ['Standard'];

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  onCreate(): void {
    if (!this.aiassistantButton) {
      this.aiassistantButton = new DropDownButton({
        items: [
          { text: 'Rephrase' },
          { text: 'Correct Grammar' },
          { text: 'Summarize' },
          { text: 'Elaborate' },
          { text: 'Translate' },
          { text: 'Sentiment Analysis' }
        ],
        iconCss: 'e-btn-icon e-icons e-assistview-icon e-icon-left',
        cssClass: 'menubutton e-tbar-btn e-tbar-btn-text',
        select: (args) => this.aiQuerySelectedMenu(args)
      });
      this.aiassistantButton.appendTo('#ai_assistant_button_tbar');
    }
    this.dialog.hide();
  }

  aiQuerySelectedMenu(args: any): void {
    this.dialogueOpen(args.item.text);
  }

  onToolbarClick(args: ToolbarClickEventArgs): void {
    if (args.item.tooltipText === 'Rephrase') {
      this.dialogueOpen("Rephrase");
    }
  }

  dialogueOpen(selectedQuery: string): void {
    var selectionText = this.defaultRTE.getSelectedHtml();
    if (selectionText) {
      let range: Range = (this.defaultRTE as any).formatter.editorManager.nodeSelection?.getRange((this.defaultRTE as any).contentModule.getDocument());
      (this.defaultRTE as any).formatter.editorManager.nodeSelection?.save(range, (this.defaultRTE as any).contentModule.getDocument());
      this.dropValIndex = this.queryList.findIndex(q => q.Text.toLowerCase() === selectedQuery.toLowerCase());
      this.queryCategory.index = this.dropValIndex;
      this.leftRte.value = this.promptQuery = selectionText;
      this.leftRte.refreshUI();
      this.dialog.show();
      this.updateAISugesstionsData(selectedQuery);
    } else {
      this.toastObj.timeOut = 2000;
      this.toastObj.content = 'Please select the content to perform the AI operation.';
      this.toastObj.show();
    }
  }

  updateAISugesstionsData(selectedQuery: string): void {
    (document.getElementById('language') as HTMLElement).style.display = 'none';
    (document.getElementById('chips-container') as HTMLElement).style.display = 'none';
    this.isSentimentCheck = false;
    switch (selectedQuery) {
      case "Summarize":
        this.subQuery = "Summarize the upcoming sentence shortly.";
        break;
      case "Elaborate":
        this.subQuery = "Elaborate on the upcoming sentence.";
        break;
      case "Rephrase":
        (document.getElementById('chips-container') as HTMLElement).style.display = '';
        this.subQuery = this.chipValue[0] + " rephrase the upcoming sentence.";
        break;
      case "Correct Grammar":
        this.subQuery = "Correct the grammar of the upcoming sentence.";
        break;
      case "Translate":
        (document.getElementById('language') as HTMLElement).style.display = '';
        this.subQuery = "Translate the upcoming sentence to " + this.translatelanguage + ".";
        break;
      case "Sentiment Analysis":
        this.isSentimentCheck = true;
        this.subQuery = "Analyze the sentiment and grammar of the following paragraphs and provide the expression score with an emoji followed by the sentiment in the format: \"😊 Neutral\". \n\nNOTE: Avoid any additional text or explanation:";
        break;
    }
    this.updateAISugesstions();
  }

  updateAISugesstions(): void {
    try {
      if (this.promptQuery) {
        (document.getElementById('skeletonId') as HTMLElement).style.display = '';
        (document.getElementById('rightRte') as HTMLElement).style.display = 'none';
        this.sentimentButton.element.style.display = 'none';
        this.regenerateButton.disabled = true;
        this.copyButton.disabled = true;
        this.replaceButton.disabled = true;
        this.apiResultData = this.getResponseFromOpenAI(this.subQuery, this.promptQuery);
        this.apiResultData.then((result: any) => {
          this.AIResult = this.isSentimentCheck ? this.promptQuery : result;
          this.sentimentButton.content = result.toLowerCase().includes("positive") ? "😊 Positive" : result.toLowerCase().includes("negative") ? "😞 Negative" : "😐 Neutral";
          this.sentimentButton.element.style.display = !this.isSentimentCheck ? 'none' : '';
          this.rightRte.value = this.AIResult;
          var noResultsFound = !(this.AIResult || this.promptQuery);
          (document.getElementById('no-results-found') as HTMLElement).style.display = noResultsFound ? '' : 'none';
          this.regenerateButton.disabled = noResultsFound;
          this.copyButton.disabled = noResultsFound;
          this.replaceButton.disabled = noResultsFound;
          (document.getElementById('skeletonId') as HTMLElement).style.display = 'none';
          (document.getElementById('rightRte') as HTMLElement).style.display = noResultsFound ? 'none' : '';
        });
      }
    } catch {
      this.toastObj.show();
    }
  }

  async getResponseFromOpenAI(subQuery: string, promptQuery: string): Promise<string> {
    const content = await OpenAiModelRTE(subQuery, promptQuery);
    return content ? content as string : '';
  }

  onQuerySelect(args: any): void {
    this.chipList.selectedChips = 0;
    this.languageCategory.index = 0;
    this.translatelanguage = "EN";
    this.updateAISugesstionsData(args.itemData.Text);
  }

  onLanguageSelect(args: any): void {
    this.translatelanguage = args.itemData.ID;
    this.updateAISugesstionsData("Translate");
  }

  onChipClick(args: any): void {
    this.chipValue[0] = args.text;
    this.updateAISugesstionsData("Rephrase");
  }

  closeDialog(): void {
    this.dialog.hide();
    this.rightRte.value = '';
    this.leftRte.value = '';
    this.promptQuery = '';
    this.chipValue[0] = 'Standard';
    this.AIResult = '';
    this.dropValIndex = 0;
    (document.getElementById('chips-container') as HTMLElement).style.display = '';
    (document.getElementById('language') as HTMLElement).style.display = 'none';
    this.sentimentButton.content = '😊 Neutral';
  }

  onOverlayClick(): void {
    let activeEle: HTMLElement | null = this.dialog.element.querySelector('.char_block.e-active');
    if (activeEle) {
      activeEle.classList.remove('e-active');
    }
    this.closeDialog();
  }

  dialogShow(): void {
    this.regenerateButton!.element.addEventListener('click', () => {
      this.updateAISugesstions();
    });
    this.copyButton!.element.addEventListener('click', () => {
      this.copyTextToClipboard(this.AIResult);
    });
    this.replaceButton!.element.addEventListener('click', () => {
      let range: Range = (this.defaultRTE as any).formatter.editorManager.nodeSelection?.getRange((this.defaultRTE as any).contentModule.getDocument());
      (this.defaultRTE as any).formatter.editorManager.nodeSelection?.restore(range);
      (this.defaultRTE as any).executeCommand('insertHTML', this.AIResult, { undo: true });
      this.closeDialog();
    });
    (this.dialog as DialogComponent).element.style.display = '';
  }

  showErrorToast(): void {
    this.toastObj.show();
  }

  copyTextToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard successfully!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        console.log('Text copied to clipboard using execCommand');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
}
