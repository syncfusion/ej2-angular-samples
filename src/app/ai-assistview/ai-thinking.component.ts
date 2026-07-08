import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { AIAssistViewAllModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { AIAssistView, AssistThinking } from '@syncfusion/ej2-interactive-chat';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';

@Component({
  selector: 'control-content',
  imports: [AIAssistViewAllModule],
  standalone: true,
  templateUrl: 'ai-thinking.html',
  styleUrls: ['ai-thinking.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AIAssistThinkingComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['ai-thinking.component.css'];
    AIAssistView.Inject(AssistThinking);
  }
  @ViewChild('thinkingAIAssistView')
  public thinkingAIAssistView: AIAssistViewComponent;

  public promptSuggestions: string[] = [
    'Suggest ways to improve decision making',
    'Explain how climate change affects everyday life'
  ];

  public promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    const partialThinkingBlocks = {
      blockType: 'thinking',
      title: 'Thinking',
      collapsible: true,
      collapsed: true,
      isActive: true,
      stages: [
        {
          status: 'inprogress',
          content: 'Analyzing your request to deliver the most relevant response'
        }
      ]
    };

    const finalThinkingBlocks = {
      blockType: 'thinking',
      title: 'Thinking',
      collapsible: true,
      collapsed: true,
      isActive: false,
      stages: [
        {
          status: 'completed',
          content: 'Completed analysis and generated the most relevant response'
        }
      ]
    };

    this.thinkingAIAssistView.addPromptResponse(
      { blocks: [partialThinkingBlocks] },
      false
    );

    try {
      const userID = await getUserID();

      if (!userID) {
        return;
      }

      const abortController = new AbortController();
      const requestBody = {
        visitorId: userID,
        messages: {
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: args.prompt
            }
          ]
        },
        reasoning: {
          effort: 'medium',
          summary: 'concise'
        }
      };

      const response = await fetch(AI_SERVICE_URL + '/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: abortController.signal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || ('HTTP Error ' + response.status));
      }

      const result = await response.json();

      let responseText = '';

      if (result && result.response) {
        responseText = result.response.replace('END_INSERTION', '');
      }

      this.thinkingAIAssistView.addPromptResponse({
        blocks: [finalThinkingBlocks],
        response: responseText || 'We could not reach the AI service; please try again later.'
      });

    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      } 
      else if (error.message && error.message.indexOf('token limit') !== -1) {
        this.thinkingAIAssistView.addPromptResponse({ response: error.message });
      }
    
      this.thinkingAIAssistView.addPromptResponse({
        response: 'We could not reach the AI service; please try again later.'
      });
    }
  };
}
