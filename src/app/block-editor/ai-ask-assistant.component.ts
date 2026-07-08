import { Component, ViewChild, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AIAssistViewModule,
  AIAssistViewComponent,
  PromptRequestEventArgs,
  ToolbarItemClickedEventArgs,
  AttachmentSettingsModel,
  SpeechToTextSettingsModel,
  ToolbarSettingsModel,
  FooterToolbarSettingsModel,
  ResponseToolbarSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';
import { ButtonModule, FabComponent, FabModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, DropDownButton, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogComponent, DialogModule, PositionDataModel } from '@syncfusion/ej2-angular-popups';
import { SidebarModule, Sidebar } from '@syncfusion/ej2-angular-navigations';
import { BlockEditorComponent, BlockModel, BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import blockData from './blockData.json';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';

interface ChatSession {
  id: string;
  title: string;
  prompts: any[];
}

@Component({
  selector: 'control-content',
  templateUrl: 'ai-ask-assistant.html',
  styleUrls: ['ai-ask-assistant.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    AIAssistViewModule,
    ButtonModule,
    DropDownButtonModule,
    DialogModule,
    SidebarModule,
    FabModule,
    BlockEditorModule,
    CommonModule
  ]
})
export class AskAIAssistantComponent implements OnDestroy {
  @ViewChild('aiAssistView')
  public aiAssistView: AIAssistViewComponent;

  @ViewChild('dialogRef')
  public dialogRef: DialogComponent;

  @ViewChild('fabRef')
  public fabRef: FabComponent;

  @ViewChild('blockEditorRef')
  public blockEditorRef: BlockEditorComponent;

  @ViewChild('sidebarRef')
  public sidebarRef: Sidebar;

  // State properties
  public sessionChats: ChatSession[] = [];
  public activeSessionId: string | null = null;
  public isFirstSessionAdded: boolean = false;
  public currentMode: string = 'Sidebar';
  public notionSuggestions: string[] = blockData['notionSuggestions'];
  public iconMapByIndex: { [key: number]: string } = blockData['iconMapByIndex'];
  public askAssistantData: BlockModel[] = blockData['askAssistantData'] as BlockModel[];
  public users: BlockModel[] = blockData['users'] as BlockModel[];
  public animationSettings: Object = { effect: 'FadeZoom' };
  public position: PositionDataModel = { X: 'right', Y: 0 };
  // Private references
  private screenDropdownRef: DropDownButton;
  private historyDropdownRef: DropDownButton;
  private abortControllerRef: AbortController | undefined;
  private lastPromptWasTranslate: boolean = false;

  // Component properties
  public enableAttachments: boolean = true;

  public attachmentSettings: AttachmentSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };

  public speechToTextSettings: SpeechToTextSettingsModel = { enable: true };

  public imageBlockSettings: any = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/RichTextEditor/SaveFile',
    path: 'https://services.syncfusion.com/angular/production/RichTextEditor/'
  };

  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      {
        iconCss: 'e-icons e-history',
        align: 'Right',
        tooltip: 'Chat History',
        cssClass: 'history-icon'
      },
      {
        iconCss: 'e-icons e-edit-notes',
        align: 'Right',
        tooltip: 'Start New chat'
      },
      {
        iconCss: 'e-icons e-resize',
        align: 'Right',
        tooltip: 'Switch Chat Mode',
        cssClass: 'screen-resizer'
      },
      {
        iconCss: 'e-icons e-chevron-right-double',
        align: 'Right',
        tooltip: 'Hide Chat'
      }
    ],
    itemClicked: (args: ToolbarItemClickedEventArgs) => this.onToolbarItemClicked(args)
  };

  public footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Bottom',
    items: [
      {
        iconCss: 'e-icons e-assist-attachment-icon',
        align: 'Left',
        tooltip: 'Attach File'
      },
      {
        iconCss: 'e-icons e-assist-speech-to-text',
        align: 'Right'
      },
      {
        iconCss: 'e-icons e-assist-send',
        align: 'Right'
      }
    ]
  };

  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy response' },
      { iconCss: 'e-icons e-block-add-icon', tooltip: 'Insert into this page' },
      { iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { iconCss: 'e-icons e-assist-dislike', tooltip: 'Need improvement' },
      { iconCss: 'e-icons e-assist-audio', tooltip: 'Read aloud' }
    ],
    itemClicked: (args: ToolbarItemClickedEventArgs) => this.onResponseToolbarItemClicked(args)
  };

  ngAfterViewInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    if (this.abortControllerRef) {
      this.abortControllerRef.abort();
    }
  }

  private initializeComponent(): void {
    // Hide FAB initially and set up click handler
    if (this.fabRef && this.fabRef.element) {
      this.fabRef.element.style.display = 'none';
      this.fabRef.element.onclick = () => {
        this.toggleBackgroundState(true);
        this.moveAssistview(this.currentMode);
        if (this.fabRef && this.fabRef.element) {
          this.fabRef.element.style.display = 'none';
        }
      };
    }

    // Move assistviewWrapper to sidebar
    const wrapper = document.getElementById('assistviewWrapper');
    if (this.sidebarRef && wrapper) {
      this.sidebarRef.element.appendChild(wrapper);
    }
  }

  public onAssistViewCreated = (): void => {
    // Initialize screen type dropdown
    this.screenDropdownRef = new DropDownButton({
      items: [{ text: 'Sidebar' }, { text: 'Floating' }],
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (this.currentMode === args.item.text) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        if (this.currentMode === args.item.text) return;
        this.moveAssistview(args.item.text);
      }
    });
    this.screenDropdownRef.appendTo('.screen-resizer');

    // Initialize history dropdown
    this.historyDropdownRef = new DropDownButton({
      items: [{ text: 'No Chat History' }],
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (this.activeSessionId === args.item.id) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        if (args.item.id) {
          this.loadSession(args.item.id);
        }
      }
    });
    this.historyDropdownRef.appendTo('.history-icon');
  };

  public onPromptRequest = (args: PromptRequestEventArgs): void => {
    if (this.aiAssistView) {
      this.aiAssistView.promptSuggestions = [];
    }

    getUserID().then((userID: string) => {
      try {
        this.abortControllerRef = new AbortController();
        let contentToProcess: string = this.blockEditorRef.getDataAsHtml();
        const isDocumentAction = this.notionSuggestions.includes(args.prompt);
        const isTranslatePage = args.prompt === 'Translate this page';
        const isTranslationFollowUp = this.lastPromptWasTranslate && !isDocumentAction;

        if (isTranslatePage) {
          this.lastPromptWasTranslate = true;
        }

        const messages = isTranslationFollowUp
          ? [
              {
                role: 'system',
                content: `
            You are an assistant for a Block Editor application.
            The user wants to translate the document HTML into a language they will specify.
            Rules:
            - If the user's input is a valid language name, translate ONLY the visible text inside the HTML tags into that language.
            - Preserve ALL HTML tags, attributes, and structure exactly as-is.
            - Do not translate tag names, attribute names, or attribute values.
            - Return ONLY the translated HTML with no explanation or extra text.
            - If the user's input is NOT a recognizable language, reply exactly: "Please provide a valid language name to translate the document."
                          `
                        },
                        {
                          role: 'user',
                          content: `
            Translate the document into: ${args.prompt}

            Document HTML:
            ${contentToProcess}
                          `
                        }
                      ]
                    : isDocumentAction
          ? [
              {
                role: 'system',
                content: `
        You are an assistant for a Block Editor application.

        You must answer ONLY using the provided Block Editor HTML content.

        Rules:
        - Treat the provided HTML as the complete document.
        - Do not use external knowledge.
        - Do not invent missing information.
        - Preserve the meaning of headings, lists, tables, quotes, and code blocks.
        - If the document is empty, say:
          "The document is empty."
        - If translation is requested without specifying a language, ask the user to specify the target language.
        `
              },
              {
                role: 'user',
                content: `
        Request:
        ${args.prompt}

        Document HTML:
        ${contentToProcess}
        `
              }
            ]
          : [
              {
                role: 'user',
                content: args.prompt
              }
            ];

        if (!isDocumentAction && !isTranslationFollowUp) {
          this.lastPromptWasTranslate = false;
        }

        fetch(AI_SERVICE_URL + '/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            visitorId: userID,
            messages: {
              messages
            }
          }),
          signal: this.abortControllerRef.signal
        })
          .then((response: Response) => {
            if (!response.ok) {
              return response.json().then((errorData: any) => {
                throw new Error(errorData.error || 'HTTP Error ' + response.status);
              });
            }
            return response.json();
          })
          .then((result: any) => {
            if (result && result.response) {
              const aiResponse: string = result.response.replace('END_INSERTION', '');
              if (isTranslationFollowUp) {
                const isInvalidLanguage = aiResponse.includes(
                  'Please provide a valid language name to translate the document.'
                );
                if (!isInvalidLanguage) {
                  this.lastPromptWasTranslate = false; // valid translation — reset
                }
              }
              if (this.aiAssistView) {
                this.aiAssistView.addPromptResponse(aiResponse);
                if (!this.isFirstSessionAdded && !this.activeSessionId) {
                  this.createNewSession(true);
                  this.isFirstSessionAdded = true;
                }
                this.aiAssistView.promptSuggestions = [];
              }
            }
          })
          .catch((error: Error) => {
            if (error.name === 'AbortError') {
              return;
            }
            this.lastPromptWasTranslate = false;
            setTimeout(() => {
              const fallbackResponse: string =
                'We could not reach the AI service; please try again later.';
              if (this.aiAssistView) {
                this.aiAssistView.addPromptResponse(fallbackResponse);
                if (!this.isFirstSessionAdded && !this.activeSessionId) {
                  this.createNewSession(true);
                  this.isFirstSessionAdded = true;
                }
                this.aiAssistView.promptSuggestions = [];
              }
            }, 1000);
          });
      } catch (error) {
        // catch error
      }
    });
  };

  private onToolbarItemClicked = (args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-edit-notes') {
      this.createNewSession();
      if (this.aiAssistView) {
        this.aiAssistView.promptSuggestions = this.notionSuggestions;
      }
    } else if (args.item.iconCss === 'e-icons e-horizontal-line' || args.item.iconCss === 'e-icons e-chevron-right-double') {
      // Move wrapper back to dialogElem before hiding
      const dialogElem = document.querySelector('#dialogElem');
      const wrapper = document.getElementById('assistviewWrapper');
      if (dialogElem && wrapper) {
        dialogElem.appendChild(wrapper);
      }
      if (this.sidebarRef) {
        this.sidebarRef.hide();
      }
      if (this.dialogRef) {
        this.dialogRef.hide();
      }
      this.toggleBackgroundState(true);
      if (this.fabRef && this.fabRef.element) {
        this.fabRef.element.style.display = '';
      }
    }
  };

  private onResponseToolbarItemClicked = (args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-block-add-icon') {
      const dataIndex = (args as any).dataIndex;
      if (dataIndex !== undefined && dataIndex !== null && this.aiAssistView) {
        const prompts = this.aiAssistView.prompts;
        if (prompts && prompts[dataIndex]) {
          const response =
            prompts[dataIndex].response || 'We could not reach the AI service; please try again later.';
          const currentPrompt: string = prompts[dataIndex].prompt;
          const previousPrompt: string = dataIndex > 0 ? prompts[dataIndex - 1]?.prompt : '';
          const isRecognizableLanguage: boolean =
            (
              previousPrompt === 'Translate this page' ||
              /translate this page to\s+\w+/i.test(currentPrompt)
            ) &&
            !response.includes('Please provide a valid language name to translate the document.');
          const htmlOutput: string | Promise<string> = MarkdownConverter.toHtml(response);
          if (this.blockEditorRef) {
            const blocks: BlockModel[] = this.blockEditorRef.parseHtmlToBlocks(
              htmlOutput as string
            );
            this.blockEditorRef.renderBlocksFromJson(blocks, isRecognizableLanguage ? true : false);
          }
        }
      }
    }
  };

  private toggleBackgroundState = (show: boolean): void => {
    const editorContainer = document.querySelector('.ask-ai-editor-container');
    if (editorContainer) {
      if (show) {
        editorContainer.classList.remove('e-hidden');
      } else {
        editorContainer.classList.add('e-hidden');
      }
    }
  };

  private toggleIconClass = (selectorIconClass: string, replaceIconClass: string): void => {
    const icon = (this.aiAssistView as any)?.toolbarHeader?.querySelector(
      `.${selectorIconClass}`
    );
    if (icon) {
      icon.className = `e-icons ${replaceIconClass}`;
    }
  };

  private updateHistoryDropdown = (sessions: ChatSession[]): void => {
    const items = sessions.map((session) => ({
      text: session.title.length > 30 ? session.title.substring(0, 30) + '...' : session.title,
      id: session.id
    }));
    if (this.historyDropdownRef) {
      this.historyDropdownRef.items = items.length ? items : [{ text: 'No Chat History' }];
      this.historyDropdownRef.dataBind();
    }
  };

  private persistActiveSession = (): void => {
    if (!this.activeSessionId || !this.aiAssistView) return;
    const session = this.sessionChats.find((s) => s.id === this.activeSessionId);
    if (session) {
      session.prompts = this.aiAssistView.prompts;
    }
  };

  private createNewSession = (isAuto: boolean = false): void => {
    const prompts = this.aiAssistView?.prompts;
    if (!prompts || prompts.length === 0) {
      this.activeSessionId = null;
      if (this.aiAssistView) {
        this.aiAssistView.prompts = [];
        this.aiAssistView.dataBind();
      }
      return;
    }
    if (this.activeSessionId) {
      this.persistActiveSession();
    } else {
      const session: ChatSession = {
        id: String(Date.now()),
        title: prompts[0] ? prompts[0].prompt : 'New Chat',
        prompts
      };
      this.sessionChats.push(session);
      this.activeSessionId = session.id;
      this.updateHistoryDropdown(this.sessionChats);
    }
    if (!isAuto) {
      this.activeSessionId = null;
      if (this.aiAssistView) {
        this.aiAssistView.prompts = [];
        this.aiAssistView.dataBind();
      }
    }
  };

  private ensureCurrentChatIsSaved = (): void => {
    const prompts = this.aiAssistView?.prompts;
    if (!prompts || prompts.length === 0) return;
    if (this.activeSessionId) {
      this.persistActiveSession();
      return;
    }
    const session: ChatSession = {
      id: String(Date.now()),
      title: prompts[0] ? prompts[0].prompt : 'New Chat',
      prompts
    };
    this.sessionChats.push(session);
    this.updateHistoryDropdown(this.sessionChats);
  };

  private loadSession = (sessionId: string): void => {
    if (sessionId === this.activeSessionId) return;
    this.ensureCurrentChatIsSaved();
    const session = this.sessionChats.find((s) => s.id === sessionId);
    if (!session || !this.aiAssistView) return;
    this.activeSessionId = sessionId;
    this.aiAssistView.prompts = session.prompts;
    this.aiAssistView.promptSuggestions = [];
    this.aiAssistView.dataBind();
  };

  private moveAssistview = (mode: string): void => {
    this.currentMode = mode;
    const wrapper = document.getElementById('assistviewWrapper');
    if (this.dialogRef && this.dialogRef.visible) {
      this.dialogRef.hide();
    }
    if (this.sidebarRef) {
      this.sidebarRef.hide();
    }

    switch (mode) {
      case 'Sidebar':
        if (this.sidebarRef) {
          this.sidebarRef.show();
        }
        this.toggleBackgroundState(true);
        if (this.sidebarRef && wrapper) {
          this.sidebarRef.element.appendChild(wrapper);
        }
        this.toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
        break;
      case 'Floating':
        if (this.dialogRef) {
          this.dialogRef.show();
        }
        const dialogElem = document.querySelector('#dialogElem');
        if (dialogElem && wrapper) {
          dialogElem.appendChild(wrapper);
        }
        this.toggleBackgroundState(true);
        this.toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
        break;
    }
  };
}
