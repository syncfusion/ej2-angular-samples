import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import {
  AIAssistViewModule,
  AIAssistViewComponent,
  PromptRequestEventArgs,
  ToolbarSettingsModel,
  ToolbarItemClickedEventArgs
} from '@syncfusion/ej2-angular-interactive-chat';
import { CommonModule } from '@angular/common';
import { getAIResponse } from '../common/ai-service';
import { skillPrompts, agentPrompts, mentionSystemPrompt, mentionSuggestions } from './mentionData';

export const weatherCardDefaults: { [key: string]: string } = {
    location: 'Unknown Location',
    temperature: '--',
    condition: '--',
    humidity: '--',
    windSpeed: '--'
};
export const skillMentionData: { id: string; name: string; description: string; iconCss: string }[] = [
    { id: 'translate',   name: 'translate',  description: 'Translate the response into a requested language.', iconCss: 'e-icons e-swap-arrow' },
    { id: 'help',        name: 'help',       description: 'Explain what the assistant can do and how to use it.',  iconCss: 'e-icons e-circle-info' },
    { id: 'search',      name: 'search',     description: 'Search for relevant and current information.',          iconCss: 'e-icons e-search' },
    { id: 'summarize',   name: 'summarize',  description: 'Condense the supplied content into the key points.',   iconCss: 'e-icons e-list-unordered' }
];
export const toolMentionData: { id: string; name: string; description: string }[] = [
    { id: 'getweather',    name: '/getWeather',    description: 'Get current weather for a city.' },
    { id: 'generatecode',  name: '/generateCode',  description: 'Generate code snippets from requirements.' },
    { id: 'websearch',     name: '/webSearch',     description: 'Search the web for current information.' }
];
export const mentionSources: any[] = [
    {
        mentionChar: '@',
        dataSource: skillMentionData,
        fields: { text: 'name', value: 'id', iconCss: 'iconCss' },
        filterType: 'StartsWith',
        highlight: true
    },
    {
        mentionChar: '/',
        dataSource: toolMentionData,
        showMentionChar: false,
        fields: { text: 'name', value: 'id' }
    }
];
export function buildSystemPrompt(mentions: any[]): string {
    const prompts: string[] = [];
    (mentions || []).forEach((mention: any) => {
        const id = mention && mention.itemData ? mention.itemData.id : undefined;
        if (id && skillPrompts[id]) {
            prompts.push(skillPrompts[id]);
        }
        if (id && agentPrompts[id]) {
            prompts.push(agentPrompts[id]);
        }
    });
    prompts.push(mentionSystemPrompt);
    return prompts.join('\n\n');
}
@Component({
  selector: 'control-content',
  templateUrl: 'ai-mention.html',
  styleUrls: ['ai-mention.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [AIAssistViewModule, CommonModule]
})
export class AIAssistMentionComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = [
      'ai-mention.html',
      'ai-mention.component.css',
      'mentionData.ts'
    ];
  }
  @ViewChild('mentionAIAssistView')
  public mentionAIAssistView: AIAssistViewComponent;
  @ViewChild('weatherCardTemplate')
  public weatherCardTemplate: any;
  public promptPlaceholder: string = "Type a prompt and use '/' for commands or '@' for tools...";
  public enableStreaming: boolean = true;
  public promptSuggestions: string[] = [...mentionSuggestions];
  public mentions: any[] = mentionSources;
  private abortController?: AbortController;
  public assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
      if (args.item.iconCss === 'e-icons e-refresh') {
        if (this.mentionAIAssistView) {
          this.mentionAIAssistView.prompts = [];
          this.mentionAIAssistView.promptSuggestions = [...mentionSuggestions];
        }
        if (this.abortController) {
          this.abortController.abort();
        }
      }
    }
  };
  ngAfterViewInit(): void {
    this.registerTools();
  }
  private registerTools(): void {
    if (!this.mentionAIAssistView) {
      return;
    }
    (this.mentionAIAssistView as any).registerToolUI({
      toolName: 'weather-card',
      template: this.weatherCardTemplate as any
    });
  }
  public stopRespondingClick = (): void => {
    if (this.abortController) {
      this.abortController.abort();
    }
  };
  public onPromptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    this.abortController = new AbortController();
    try {
      const aiArgs: any = {
        prompt: args.prompt,
        systemPrompt: buildSystemPrompt((args as any).mentions || [])
      };
      const reply = await getAIResponse(aiArgs, this.abortController);

      let aiData: { blocks?: any[] } = {};
      try {
        const jsonText: string = (reply && (reply as any).response) || '{}';
        aiData = JSON.parse(jsonText);
      } catch {
        aiData = {};
      }
      const blocks = aiData.blocks && aiData.blocks.length
        ? aiData.blocks
        : [{ blockType: 'text', content: 'We could not reach the AI service; please try again later.' }];
      this.mentionAIAssistView.addPromptResponse({ blocks });
    } catch {
      this.mentionAIAssistView.addPromptResponse(
        'We could not reach the AI service; please try again later.'
      );
    }
    this.mentionAIAssistView.promptSuggestions = [...mentionSuggestions];
  };
}
