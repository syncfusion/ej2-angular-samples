import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CarouselModule, CarouselComponent } from '@syncfusion/ej2-angular-navigations';
import { DropDownButton } from '@syncfusion/ej2-angular-splitbuttons';
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, CarouselModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistTemplateComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.component.css'];
    }

    @ViewChild('templateAiAssistView')
    public templateAiAssistView: AIAssistViewComponent;

    @ViewChild('carousel')
    public carouselObj: CarouselComponent;

    public promptsData: PromptModel[] = [
        {
            response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
        }
    ];

    public prompts: { [key: string]: string | string[] } [] = defaultPromptResponseData;

    public suggestion: string[] = defaultSuggestions;

    public promptSuggestionsHeader: string = 'Hello! Ask Questions, to better understand how your prompt interacts with AI AssistView!';

    public toolbarSettings: ToolbarSettingsModel = {
        items: [
            { type: 'Input', template: '<button id="ddMenu"></button>', align: 'Right' }
        ]
    };

    public created = () => {
        var dropdown: DropDownButton = new DropDownButton({
            items: [
                { text: 'Settings', iconCss: 'e-icons e-settings' },
                { separator: true },
                { text: 'Log out' }
            ],
            iconCss: 'e-icons e-user',
            cssClass: 'e-caret-hide',
        }, '#ddMenu');
        var proxy = this;
        setTimeout(function() {
            proxy.carouselObj.element.addEventListener('click', proxy.handleAction);
            proxy.carouselObj.element.addEventListener('touchstart', proxy.handleAction);
        });
    };

    public buttonsVisibility: string = 'Visible';
    public showIndicators: boolean = false;
    public partialVisible: boolean = true;

    public dataSource = [
        { imagePath: './assets/ai-assistview/images/moscow.jpg', title:'Moscow', suggestion: 'How do I prioritize tasks effectively?'  },
        { imagePath: './assets/ai-assistview/images/bridge.jpg', title:'Bridge', suggestion: 'How do I set daily goals in my work day?'  },
        { imagePath: './assets/ai-assistview/images/london.jpg', title:'London', suggestion: 'Steps to publish a e-book with marketing strategy'  },
        { imagePath: './assets/ai-assistview/images/tokyo.jpg', title:'Tokyo', suggestion: 'What tools or apps can help me prioritize tasks?'  }
    ];

    public handleAction = (e) => {
        var target = e.target;
        var prompt = '';
        if (target.tagName === 'IMG') {
            prompt = e.target.nextElementSibling.textContent;
        } else if (target.className === 'e-card-header') {
            prompt = e.target.textContent;
        }
        if (prompt) { this.templateAiAssistView.executePrompt(prompt); }
    };

    public promptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt.trim());
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

            this.templateAiAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            this.templateAiAssistView.promptSuggestions = foundPrompt?.suggestions as string[] || this.suggestion;
        }, 2000);
    };

    public cleanPrompt(prompt: string): string {
        return prompt.replace('<span class="e-icons e-circle-info"></span>', '');
    };
}
