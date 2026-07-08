import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
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
import { DropDownButtonModule, DropDownButton, MenuEventArgs, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { SidebarModule, Sidebar } from '@syncfusion/ej2-angular-navigations';
import { ToastModule, Toast } from '@syncfusion/ej2-angular-notifications';
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { notionSuggestions, iconMapByIndex, modelIcons } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

@Component({
  selector: 'control-content',
  imports: [
    AIAssistViewModule,
    ButtonModule,
    DropDownButtonModule,
    DialogModule,
    SidebarModule,
    ToastModule,
    FabModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: 'ai-notion-ai-like.html',
  styleUrls: ['ai-notion-ai-like.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotionAICloneAssistComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['ai-notion-ai-like.component.css'];
  }

  @ViewChild('aiAssistViewRef')
  public aiAssistView: AIAssistViewComponent;

  @ViewChild('dialogRef')
  public dialogRef: DialogComponent;

  @ViewChild('fabRef')
  public fabRef: FabComponent;

  // State properties
  public sessionChats: any[] = [];
  public activeSessionId: string | null = null;
  public isFirstSessionAdded: boolean = false;
  public webIconCheckedState: boolean = true;
  public editIconCheckedState: boolean = true;
  public currentMode: string = 'Sidebar';
  public iconMapByIndex = iconMapByIndex;

  // Sidebar and Toast instances
  private sideObj: Sidebar;
  private toastObj: Toast;

  // DropDownButton instances
  private screenddbtnObj: DropDownButton;
  private historyddbtnObj: DropDownButton;
  private btnObj: DropDownButton;
  private settingsBtnObj: DropDownButton;

  // Component properties
  public promptSuggestions = notionSuggestions;
  public enableAttachments: boolean = true;
  
  public attachmentSettings: AttachmentSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };

  public speechToTextSettings: SpeechToTextSettingsModel = { enable: true };

  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      {
        iconCss: 'e-icons e-export',
        align: 'Right',
        tooltip: 'Share Chat'
      },
      {
        iconCss: 'e-icons e-history',
        align: 'Right',
        tooltip: 'Chat History',
        template: '<button id="history-icon"></button>'
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
        template: '<button id="screen-resizer"></button>'
      },
      {
        iconCss: 'e-icons e-horizontal-line',
        align: 'Right',
        tooltip: 'Hide Chat'
      }
    ],
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
      if (args.item.iconCss === 'e-icons e-edit-notes') {
        this.createNewSession();
        this.aiAssistView.promptSuggestions = notionSuggestions;
      } else if (args.item.iconCss === 'e-icons e-horizontal-line') {
        (document.querySelector('#dialogElem') as any).appendChild(
          document.getElementById('assistviewWrapper')
        );
        this.sideObj.hide();
        this.dialogRef.hide();
        this.toggleBackgroundState(true);
        this.fabRef.element.style.display = '';
      } else if (args.item.iconCss === 'e-icons e-export') {
        this.toastObj.show();
      }
    }
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
        iconCss: 'e-icons e-settings',
        align: 'Left',
        tooltip: 'Settings',
        template: '<button id="settings-icon"></button>'
      },
      {
        iconCss: 'e-icons e-edit',
        align: 'Left',
        tooltip: 'Edit access',
        visible: false
      },
      {
        iconCss: 'e-icons e-time-zone',
        align: 'Left',
        tooltip: 'Web access',
        visible: false
      },
      {
        align: 'Right',
        text: 'Auto',
        template: '<button id="custombtn">Auto</button>'
      },
      {
        iconCss: 'e-icons e-assist-speech-to-text',
        align: 'Right'
      },
      {
        iconCss: 'e-icons e-assist-send',
        align: 'Right'
      }
    ],
    itemClick: (args: ToolbarItemClickedEventArgs) => {
      if (
        args.item.iconCss === 'e-icons e-edit' ||
        args.item.iconCss === 'e-icons e-time-zone'
      ) {
        this.settingsBtnObj.toggle();
      }
    }
  };

  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      {
        iconCss: 'e-icons e-assist-copy'
      },
      {
        iconCss: 'e-icons e-assist-like'
      },
      {
        iconCss: 'e-icons e-assist-dislike'
      },
      {
        iconCss: 'e-icons e-assist-audio'
      }
    ]
  };

  private abortController?: AbortController;

  public onPromptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    this.aiAssistView.promptSuggestions = [];
    this.abortController = new AbortController();
    const content = 'Based on the following notes content:\n\n' + (document.querySelector('.notes-content') as HTMLElement).innerText + '\n\n---\n\nUser prompt: ' + args.prompt;
    const modifiedArgs = {
      prompt: content,
      attachedFiles: args.attachedFiles || []
    };
    this.aiAssistView.addPromptResponse(await getAIResponse(modifiedArgs as any, this.abortController));
    if (!this.isFirstSessionAdded && !this.activeSessionId) {
      this.createNewSession(true);
      this.isFirstSessionAdded = true;
    }
    this.aiAssistView.promptSuggestions = [];
  };

  public created = (): void => {
    // Initialize model dropdown
    let currentModel = 'Auto';
    let items = [
            {
                text: 'Auto',
                iconCss: 'e-icons e-assistview-icon'
            },
            {
                text: 'Sonnet 4.6',
                iconCss: 'model-icon model-sonet'
            },
            {
                text: 'Opus 4.6',
                iconCss: 'model-icon model-opus'
            },
            {
                text: 'Gemini 3.1 Pro',
                iconCss: 'model-icon model-gemini',
            },
            {
                text: 'GPT 5.2',
                iconCss: 'model-icon model-gpt',
            },
        ];

    this.btnObj = new DropDownButton({
      items: items,
      cssClass: 'e-caret-hide e-flat',
      iconCss: `model-icon ${modelIcons[currentModel]}`,
      beforeItemRender: (args: MenuEventArgs) => {
        if (currentModel === args.item.text) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        currentModel = args.item.text;
        this.btnObj.content = args.item.text;
        this.updateModelIcon(currentModel);
      }
    });
    this.btnObj.appendTo('#custombtn');

    // Initialize Settings dropdown
    let settingsItems = [
      {
        text: 'Can make changes',
        id: 'edit',
        iconCss: 'e-icons e-edit'
      },
      {
        text: 'Web access',
        id: 'web-access',
        iconCss: 'e-icons e-time-zone'
      },
      {
        separator: true
      },
      {
        text: 'Help Center',
        iconCss: 'e-icons e-info'
      }
    ];

    this.settingsBtnObj = new DropDownButton({
      items: settingsItems,
      iconCss: 'e-icons e-settings',
      cssClass: 'e-caret-hide e-flat',
      popupWidth: '230px',
        
      beforeItemRender: (args: MenuEventArgs) => {
      
        let item = args.item as any;
      
        // skip separator
        if (item.separator) {
          return;
        }
      
        if (item.text !== 'Help Center') {
        
          args.element.innerHTML = `
            <div class="settings-item">
              <span class="e-menu-icon ${item.iconCss}"></span>
              <span class="custom-class">${item.text}</span>
        
              <input
                type="checkbox"
                class="settings-switch"
                id="settings-switch-${item.id}"
              />
            </div>
          `;
        
        } else {
        
          args.element.innerHTML = `
            <div class="settings-item">
              <span class="e-menu-icon ${item.iconCss}"></span>
              <span class="custom-class">${item.text}</span>
            </div>
          `;
        }
      },
    
      open: this.onSettingsDropdownCreated
    });
    
    this.settingsBtnObj.appendTo('#settings-icon');

    // Initialize screen type dropdown
    let screenTypes = [
      { text: 'Sidebar' },
      { text: 'Floating' },
      { separator: true },
      { text: 'Full screen' }
    ];

    this.screenddbtnObj = new DropDownButton({
      items: screenTypes,
      iconCss: 'e-icons e-resize',
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (this.currentMode === args.item.text) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        this.moveAssistview(args.item.text);
      }
    });
    this.screenddbtnObj.appendTo('#screen-resizer');

    // Initialize history dropdown
    this.historyddbtnObj = new DropDownButton({
      items: [{ text: 'No Chat History' }],
      iconCss: 'e-icons e-history',
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
    this.historyddbtnObj.appendTo('#history-icon');

    // Initialize Sidebar
    this.sideObj = new Sidebar({
            target: '.notes-page',
            width: '400px',
            position: 'Right',
            animate: false
        });

    this.sideObj.appendTo('#notionSidebar');
    
    let wrapper = document.getElementById('assistviewWrapper');
    this.sideObj.element.appendChild(wrapper);
    this.toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
    // Initialize Toast
    this.toastObj = new Toast({
            content: 'Share chat option is clicked !',
            target: document.body,
            position: { X: 'Right', Y: 'Top' },
            showCloseButton: true
        });
    this.toastObj.appendTo('#toastTarget');
  };

  private onSettingsDropdownCreated = (): void => {
    this.settingsBtnObj.items.forEach((item: any) => {
      let isChecked = false;
      if (item.text === 'Help Center') {
        return;
      } else if (item.id === 'edit') {
        isChecked = this.editIconCheckedState;
      } else if (item.id === 'web-access') {
        isChecked = this.webIconCheckedState;
      }
      let switchElem = document.getElementById(`settings-switch-${item.id}`);
      if (!switchElem) return;
      new Switch({
        checked: isChecked,
        change: (args: ChangeEventArgs) => {
          this.toggleSwitch(args, item.text);
        }
      }).appendTo(switchElem);
    });
  };

  private dialogOpenClose = (): void => {
    this.dialogRef.visible = !this.dialogRef.visible;
  };

  private moveAssistview = (mode: string): void => {
    this.currentMode = mode;
    let wrapper = document.getElementById('assistviewWrapper');
    let fs = document.getElementById('fullscreenContainer');
    if (this.dialogRef.visible) {
            this.dialogRef.hide();
        }
    this.sideObj.hide();
    if (fs) {
      (fs as any).style.display = 'none';
    }

    switch (mode) {
      case 'Sidebar':
        this.sideObj.show();
        this.toggleBackgroundState(true);
        this.sideObj.element.appendChild(wrapper);
        this.toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
        break;

      case 'Floating':
        this.dialogRef.show();
        (document.querySelector('#dialogElem') as any).appendChild(wrapper);
        this.toggleBackgroundState(true);
        this.toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
        break;

      case 'Full screen':
        (fs as any).style.display = 'block';
        if (fs) {
          fs.appendChild(wrapper);
        }
        this.toggleBackgroundState(false);
        this.toggleIconClass('e-chevron-right-double', 'e-expand');
        break;
    }
  };

  private toggleIconClass = (removeClass: string, addClass: string): void => {
    let resizeBtn = document.querySelector('.screen-resizer') as any;
    if (resizeBtn) {
      let btn = resizeBtn.querySelector('.e-btn');
      if (btn) {
        btn.classList.remove(removeClass);
        btn.classList.add(addClass);
      }
    }
  };

  private toggleBackgroundState = (show: boolean): void => {
    let notionContainer = document.querySelector('.notes-app-container');
    if (notionContainer) {
      this.hiddenClass(notionContainer, show);
    }
  };

  private hiddenClass = (element: Element, show: boolean): void => {
    show
      ? element.classList.remove('e-hidden')
      : element.classList.add('e-hidden');
  };

  private toggleSwitch = (args: any, text: string): void => {
    let visibilty = !args.checked;
    if (text === 'Can make changes') {
      this.editIconCheckedState = !visibilty;
      let editIcon = (
        (this.aiAssistView as any).footerToolbarEle as any
      ).element.querySelector('.e-edit').closest('.e-toolbar-item');
      if (editIcon) {
        this.hiddenClass(editIcon, visibilty);
      }
    } else if (text === 'Web access') {
      this.webIconCheckedState = !visibilty;
      let webIcon = (
        (this.aiAssistView as any).footerToolbarEle as any
      ).element.querySelector('.e-time-zone').closest('.e-toolbar-item');
      if (webIcon) {
        this.hiddenClass(webIcon, visibilty);
      }
    }
  };

  private updateModelIcon = (modelName: string): void => {
    this.btnObj.iconCss = `model-icon ${modelIcons[modelName]}`;
    this.btnObj.dataBind();
  };

  private persistActiveSession = (): void => {
    if (!this.activeSessionId) return;

    let session = this.sessionChats.find((s: any) => s.id === this.activeSessionId);
    if (!session) return;

    session.prompts = this.aiAssistView.prompts;
  };

  private createNewSession = (isAuto = false): void => {
    let prompts = this.aiAssistView.prompts;

    if (!prompts || prompts.length === 0) {
      this.activeSessionId = null;
      this.aiAssistView.prompts = [];
      this.aiAssistView.dataBind();
      return;
    }

    if (this.activeSessionId) {
      this.persistActiveSession();
    } else {
      let session = {
        id: String(Date.now()),
        title: prompts[0] ? prompts[0].prompt : 'New Chat',
        prompts: prompts
      };

      this.sessionChats.push(session);
      this.activeSessionId = session.id;
      this.updateHistoryDropdown();
    }

    if (!isAuto) {
      this.activeSessionId = null;
      this.aiAssistView.prompts = [];
      this.aiAssistView.dataBind();
    }
  };

  private updateHistoryDropdown = (): void => {
    let items = this.sessionChats.map((session: any) => ({
      text:
        session.title.length > 30
          ? session.title.substring(0, 30) + '...'
          : session.title,
      id: session.id
    }));

    this.historyddbtnObj.items = items.length
      ? items
      : [{ text: 'No Chat History' }];

    this.historyddbtnObj.dataBind();
  };

  private ensureCurrentChatIsSaved = (): void => {
    let prompts = this.aiAssistView.prompts;
    if (!prompts || prompts.length === 0) {
      return;
    }
    if (this.activeSessionId) {
      this.persistActiveSession();
      return;
    }
    let session = {
      id: String(Date.now()),
      title: prompts[0] ? prompts[0].prompt : 'New Chat',
      prompts: prompts
    };
    this.sessionChats.push(session);
    this.updateHistoryDropdown();
  };

  private loadSession = (sessionId: any): void => {
    if (sessionId === this.activeSessionId) return;
    this.ensureCurrentChatIsSaved();
    let session = this.sessionChats.find((s: any) => s.id === sessionId);
    if (!session) return;
    this.activeSessionId = sessionId;
    this.aiAssistView.prompts = session.prompts;
    this.aiAssistView.promptSuggestions = [];
    this.aiAssistView.dataBind();
  };

  public onFabClick = (): void => {
    this.toggleBackgroundState(true);
    this.moveAssistview(this.currentMode);
    this.fabRef.element.style.display = 'none';
  };
}
