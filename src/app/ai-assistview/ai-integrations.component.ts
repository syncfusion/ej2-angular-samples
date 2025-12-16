import {
  Component,
  ViewChild,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AIAssistViewModule,
  AIAssistViewComponent,
  PromptRequestEventArgs,
} from '@syncfusion/ej2-angular-interactive-chat';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SidebarComponent, SidebarModule, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ListViewComponent, ListViewModule, } from '@syncfusion/ej2-angular-lists';
import { ToastComponent, ToastModule, } from '@syncfusion/ej2-angular-notifications';
import { marked } from 'marked';
import {AIToastComponent} from '../common/ai-toast.component';
import { getGeminiAIAssit, getdeepSeekAIAssit, getAzureOpenAIAssist } from './ai-services';
@Component({
  selector: 'app-root',
  templateUrl: './ai-integrations.html',
  styleUrls: ['./ai-integrations.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    AIAssistViewModule,
    SidebarModule,
    DropDownListModule,
    CommonModule,
    ListViewModule,
    ButtonModule,
    ToastModule,
    AIToastComponent
  ],
})
export class AIAsssitAISample {
  @ViewChild('aiAssistViewInst')
  private aiAssistViewInst!: AIAssistViewComponent;
  @ViewChild('sideObj')
  private sideObj?: SidebarComponent;
  @ViewChild('toast')
  private toastObj?: ToastComponent;
  public toastPosition: object = { X: 'right', Y: 'Top' };
  public showHeader: boolean = false;
  public enableDock: boolean = true;
  public dockSize: string = '50px';
  public enableGesture: boolean = false;
  public showBackdrop: boolean = false;
  public type: string = 'push';
  public enableAttachments: boolean = true;
  public attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };
  @ViewChild('togglebtn')
  public togglebtn?: ButtonComponent;
  public suggestions: string[] = [
    'How can AI help me plan my week?',
    'What are good habits for continuous learning?'
  ];
  private selectedConvId: string = '';
  public listData: any[] = [];
  private stopStreaming: boolean = false;
  private isMobile: boolean = false;
  public closeOnDocumentClick: boolean = false;
  public footerToolbarSettings = {
    toolbarPosition: 'Bottom'
  };
  // Gemini AI model requirements
  private geminiApiKey: string = '';
  private geminiModel: string = '';
  private deepseekApiKey: string = '';

  public models: any[] = [
    { id: 'gemini', name: 'Gemini 2.5 Flash' },
    { id: 'deepseek', name: 'DeepSeek-R1' },
    { id: 'openai', name: 'GPT-4o-mini(Azure)' }
  ];
  public modelFields: object = { text: 'name', value: 'id' };
  public selectedModel: string = 'openai';

  // Updates responsive layout settings whenever the window is resized.
  @HostListener('window:resize')
  onResize() {
    const newIsMobile = window.innerWidth <= 980;
    if (newIsMobile !== this.isMobile) {
      this.setSidebarConfig();
    }
  }
  // Initializes component state including local storage and left pane data.
  ngOnInit() {
    this.InitializingApp();
    this.listData = this.getLeftPaneData();
  }
  //Performs post-view initialization tasks such as configuring the sidebar and loading conversation data.
  ngAfterViewInit() {
    this.setSidebarConfig();
    if (this.listData.length === 0) {
      this.loadNewAIAssist();
    } else {
      this.onItemSelect(this.listData[0]);
    }
  }
  // Handles changes to the selected AI model and displays a toast notification.
  public onModelChange(args: any): void {
    this.selectedModel = args.value as 'gemini' | 'openai' | 'deepseek';
    const modelName =
      this.models.find((m) => m.id === this.selectedModel)?.name ||
      'the selected model';
    (this.toastObj as any)!.show({
      content: `<div class="toast-content"><span class="e-icons e-magic-wand"> </span> <span>You are using <b>${modelName}</b> with standard access</span></div>`,
    });
  }
  //Stops the streaming of AI responses for the current prompt.
  public handleStopResponse = () => {
    this.stopStreaming = true;
  };
  // Processes user prompts by dispatching requests to the selected AI provider.
  public promptRequest(args: PromptRequestEventArgs) {
    if (!args.prompt || !args.prompt.trim()) {
      return;
    }

    if (!this.selectedConvId) {
      this.selectedConvId = this.createNewConversation();
    }

    this.updateBannerStyle();
    this.updateConversationName(args.prompt);

    if (this.selectedModel === 'gemini') {
      this.handleGeminiRequest(args);
    } 
    else if(this.selectedModel === 'deepseek'){
      this.handleDeepSeekRequest(args);
    }
    else {
      this.handleOpenAIRequest(args);
    }
  }
  // Handles sidebar toggle behavior for mobile devices when the action button is clicked.
  btnClick() {
    if (this.isMobile) {
      (this.sideObj as any)?.toggle();
    }
  }
  // Toggles the sidebar visibility regardless of viewport size.
  public toggleSidebar() {
    (this.sideObj as any)?.toggle();
  }
  // Configures the sidebar for responsive layouts based on current viewport dimensions.
  private setSidebarConfig() {
    this.isMobile = window.innerWidth <= 980;
    if (this.isMobile) {
      this.enableDock = false;
      this.type = 'Over';
      this.showBackdrop = true;
      this.closeOnDocumentClick = true;
      (this.sideObj as any)?.hide();
    } else {
      this.enableDock = false;
      this.type = 'push';
      this.showBackdrop = false;
      this.closeOnDocumentClick = false;
      (this.sideObj as any)?.show();
    }
    (this.sideObj as any)?.dataBind();
  }
  // Loads an existing conversation into the view when an item is selected in the left pane.
  private onItemSelect(item: any): void {
    this.selectedConvId = item.id;
    this.updateAIAssistViewData(item.id);
    this.updateBannerStyle();

    if (this.isMobile && (this.sideObj as any)?.isOpen) {
      (this.sideObj as any)?.toggle();
    }
  }
  // Deletes a conversation from local storage and updates the view.
  public deleteConversation(convId: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    delete appData[convId];
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
    this.refreshConversationList();
    if (this.selectedConvId === convId) {
      if (this.listData.length > 0) {
        this.onItemSelect(this.listData[0]);
      } else {
        this.loadNewAIAssist();
      }
    }
  }
  // Returns a unique identifier from a conversation item for efficient list rendering.
  public trackById(index: number, item: any): any {
    return item.id;
  }
  // Generates the next sequential conversation identifier from persisted data.
  private getNextConvId(): string {
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    const ids = Object.keys(appData)
      .map((k) => parseInt(k))
      .filter((id) => !isNaN(id));
    const maxId = ids.length > 0 ? Math.max(...ids) : 0;
    return (maxId + 1).toString();
  }
  // Ensures that local storage is initialized for storing conversation data.
  private checkInitialLocalStorage(isClear?: boolean): void {
    if (!localStorage.getItem('aiassist-model') || isClear) {
      localStorage.setItem('aiassist-model', JSON.stringify({}));
    }
  }
  // Updates the stored conversation data with the latest prompts and responses.
  private checkAndUpdateLocalStorage(): void {
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    if (this.selectedConvId && appData[this.selectedConvId]) {
      appData[this.selectedConvId].prompts =
        this.aiAssistViewInst?.prompts?.map((p) => ({
          prompt: p.prompt || '',
          response: p.response || '',
        })) || [];
      localStorage.setItem('aiassist-model', JSON.stringify(appData));
    }
  }
  // Retrieves and formats conversation metadata for display in the left pane list.
  private getLeftPaneData() {
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    return Object.keys(appData)
      .map((k) => ({ id: k, num: parseInt(k) }))
      .filter((item) => !isNaN(item.num))
      .sort((a, b) => b.num - a.num)
      .map((item) => {
        const convData = appData[item.id];
        const name = convData?.name
          ? convData.name.split('\n')[0]
          : 'Untitled Conversation';
        return { text: name, id: item.id };
      });
  }
  // Adjusts the visibility of the banner based on the presence of prompts.
  private updateBannerStyle(): void {
    const bannerElem = document.querySelector('.banner-content') as HTMLElement;
    if (bannerElem) {
      bannerElem.style.display =
        (this.aiAssistViewInst?.prompts || []).length > 0 ? 'none' : 'block';
    }
  }
  // Updates the conversation title once the user submits the first meaningful prompt.
  private updateConversationName(prompt: string) {
    if (this.selectedConvId) {
      const appData = JSON.parse(
        localStorage.getItem('aiassist-model') || '{}'
      );
      const convData = appData[this.selectedConvId];
      if (convData && convData.name === 'New Conversation') {
        convData.name = prompt.slice(0, 40).trim() || 'Untitled Conversation';
        localStorage.setItem('aiassist-model', JSON.stringify(appData));
        this.refreshConversationList();
      }
    }
  }
  // Refreshes the conversation list to reflect the latest local storage data.
  private refreshConversationList(): void {
    this.listData = [...this.getLeftPaneData()];
  }
  //  Loads prompts and suggestions for a conversation into the AI Assist view.
  private updateAIAssistViewData(id: string | number): void {
    if (!this.aiAssistViewInst) return;
    this.aiAssistViewInst.prompts = [];
    this.aiAssistViewInst.promptSuggestions = this.suggestions;
    if (id) {
      const appData = JSON.parse(
        localStorage.getItem('aiassist-model') || '{}'
      );
      const convData = appData[id.toString()];
      if (convData) {
        this.aiAssistViewInst.prompts = convData.prompts || [];
        this.aiAssistViewInst.promptSuggestions =
          convData.promptSuggestions || this.suggestions;
      }
    }
  }
  // Clears current prompts and prepares the AI Assist view for a new conversation.
  public loadNewAIAssist(): void {
    this.selectedConvId = '';

    if (this.aiAssistViewInst) {
      this.aiAssistViewInst.prompts = [];
      this.aiAssistViewInst.promptSuggestions = this.suggestions;
    }

    this.updateBannerStyle();
    if (this.isMobile && (this.sideObj as any)?.isOpen) {
      (this.sideObj as any)?.toggle();
    }
  }
  // Creates a new conversation entry in local storage and returns its identifier.
  private createNewConversation(): string {
    const newId = this.getNextConvId();
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    appData[newId] = {
      name: 'New Conversation',
      prompts: [],
      promptSuggestions: [...this.suggestions],
    };
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
    this.refreshConversationList();
    return newId;
  }
  // Sets up local storage defaults and displays an informational toast on startup.
  private InitializingApp(): void {
    this.checkInitialLocalStorage();
  }
  // Streams AI responses character by character to simulate real-time output.
  private async streamAIResponse(fullResponse: string): Promise<string> {
    let streamedResponseText = '';
    if (fullResponse) {
      let i = 0;
      while (i < fullResponse.length && !this.stopStreaming) {
        streamedResponseText += fullResponse[i];
        i++;
        this.aiAssistViewInst.addPromptResponse(
          marked.parse(streamedResponseText),
          false
        );
        this.aiAssistViewInst.scrollToBottom();
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }
    return streamedResponseText;
  }
  // Sends the user prompt to the Gemini service and handles the streamed response.
  private handleGeminiRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    this.stopStreaming = false;
    try {
      const fullResponse = await getGeminiAIAssit(
        this.geminiApiKey,
        this.geminiModel,   // <-- model passed here
        args.prompt!
      );
      const streamedText = await this.streamAIResponse(fullResponse);
      if (!this.stopStreaming) {
        this.aiAssistViewInst.addPromptResponse(marked.parse(streamedText), true);
        this.checkAndUpdateLocalStorage();
      }
    } catch (error) {
      const errorMessage = '⚠️ Something went wrong while connecting to the Gemini service. Please check your API key/model.';
      this.aiAssistViewInst.addPromptResponse(marked.parse(errorMessage), true);
      this.checkAndUpdateLocalStorage();
    }
  };

  // Sends the user prompt to the DeepSeek service and processes the streamed response.
  private handleDeepSeekRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    this.stopStreaming = false;
    if (!this.aiAssistViewInst) return;
    try {
      const fullResponse = await getdeepSeekAIAssit(this.deepseekApiKey,args.prompt!);
      const streamedText = await this.streamAIResponse(fullResponse);
      if (!this.stopStreaming) {
        this.aiAssistViewInst.addPromptResponse(marked.parse(streamedText),true);
        this.checkAndUpdateLocalStorage();
      }
    } catch (error) {
      const errorMessage =
        '⚠️ Something went wrong while connecting to the DeepSeek service. Please check your API key.';
      this.aiAssistViewInst.addPromptResponse(marked.parse(errorMessage), true);
      this.checkAndUpdateLocalStorage();
    }
  };

  private handleOpenAIRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    this.stopStreaming = false;
    if (!this.aiAssistViewInst) return;
    try {
      const fullResponse = await getAzureOpenAIAssist({
        messages: args.prompt!
      });
      const streamedText = await this.streamAIResponse(fullResponse);
      if (!this.stopStreaming) {
        this.aiAssistViewInst.addPromptResponse(marked.parse(streamedText), true);
        this.checkAndUpdateLocalStorage();
      }
    } catch (error) {
      const errorMessage = '⚠️ Something went wrong while connecting to the OpenAI service. Please check your Azure endpoint, key, deployment, and API version.';
      this.aiAssistViewInst.addPromptResponse(marked.parse(errorMessage), true);
      this.checkAndUpdateLocalStorage();
    }
  };
}