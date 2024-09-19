import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewChecked, ElementRef } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, AIAssistViewAllModule } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Button } from "@syncfusion/ej2-angular-buttons";
import { TextArea } from "@syncfusion/ej2-angular-inputs";
import { defaultPromptResponseData, defaultSuggestions } from './promptResponseData';

@Component({
    selector: 'control-content',
    templateUrl: 'custom-views.html',
    styleUrls: ['custom-views.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [AIAssistViewModule, AIAssistViewAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AIAssistCustomViewsComponent{
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['custom-views.component.css'];
    }

    @ViewChild('viewsAIAssistView')
    public viewsAIAssistView: AIAssistViewComponent;

    public prompts: { [key: string]: string | string[] } [] = defaultPromptResponseData;

    public suggestions: string[] = defaultSuggestions;

    public viewTemplate: string = '<div class="view-container"><h5>Custom view content</h5></div>';

    public promptViewContent = () => {
        var suggestionsElem = '';
        this.suggestions.forEach((suggestion) => {
            suggestionsElem += `<li class="suggestion-item e-card">${suggestion}</li>`;
        });
        return `<div class="view-container">
                   <textarea id="promptTextarea"></textarea>
                   <button id="generateBtn"></button>
                   <ul class="suggestions">${suggestionsElem}</ul>
                </div>`;
    };

    public responseViewContent = () => {
        return `<div class="view-container response-view">
            <div class="responseItemContent default-response e-card">
            <span class="e-icons e-circle-info"></span>
            No prompt provided. Please enter a prompt and click 'Generate Prompt' to see the response.</div>
        </div>`;
    };

    public onCreate = () => {
        var textareaObj: TextArea = new TextArea({
            placeholder: "Enter your prompt...",
            rows: 5,
            resizeMode: 'None',
            input: (e) => {
                generateBtn.disabled = !e.value;
            }
        });
        textareaObj.appendTo('#promptTextarea');

        var generateBtn: Button = new Button({ cssClass: 'e-primary generate-btn', content:'Generate Prompt', disabled: true });
        generateBtn.appendTo('#generateBtn');
        generateBtn.element.addEventListener('click',() => {
            var promptValue = textareaObj.value;
            if (promptValue) {
                textareaObj.value = '';
                generateBtn.disabled = true;
                this.viewsAIAssistView.activeView = 1;
                this.viewsAIAssistView.dataBind();   
                this.updateResponseView(promptValue);
            }
        });

        this.viewsAIAssistView.element.querySelector('.view-container .suggestions').addEventListener('click',(e) => {
            if ((e.target as any).classList.contains('suggestion-item')) {
                textareaObj.value = (e.target as any).textContent;
                generateBtn.disabled = false;
            }
        });
    };

    public updateResponseView = (prompt: string) => {
        var responseView = this.viewsAIAssistView.element.querySelector('.view-container');
        var separatorElem = '<hr style="height: 1px;margin: 0;">';
        var responseItemElem = `<div class="responseItemContent e-card">
                                    <div class="response-header"><b>Prompt:</b> ${prompt}</div>${separatorElem}
                                    <div class="content">
                                        <div class="e-skeleton e-shimmer-wave" style="width: 100%; height: 20px;"></div>
                                        <div class="e-skeleton e-shimmer-wave" style="width: 80%; height: 20px;"></div>
                                        <div class="e-skeleton e-shimmer-wave" style="width: 100%; height: 20px;"></div>
                                    </div>
                                    ${separatorElem}
                                    <div class="options">
                                        <button id="copyBtn" class="e-btn e-normal e-skeleton e-shimmer-wave">Copy</button>
                                    </div>
                                </div>`;
        var defaultResponse = responseView.querySelector('.default-response');
        if (defaultResponse) {
            defaultResponse.remove();
        }
        responseView.innerHTML = responseItemElem + responseView.innerHTML;
        setTimeout(() => {
            var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

            var response = foundPrompt ? foundPrompt.response : defaultResponse;
            responseView.children[0].querySelector('.content').innerHTML = response as string;
            var copyBtn = responseView.children[0].querySelector('#copyBtn');
            copyBtn.classList.remove('e-skeleton', 'e-shimmer-wave');
            copyBtn.addEventListener('click', function(e) {
                var textToCopy = (e.target as any).parentElement.parentElement.querySelector('.content').textContent;
                navigator.clipboard.writeText(textToCopy).then(function() {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                    }, 1000);
                });                
            });

        }, 2000);
    };
}
