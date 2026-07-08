import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { ButtonModule, SwitchModule, ChangeEventArgs, Switch } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, DropDownButtonComponent, MenuEventArgs, DropDownButton } from '@syncfusion/ej2-angular-splitbuttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { defaultPromptResponseData } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

@Component({
    selector: 'control-content',
    templateUrl: 'ai-claude-like.html',
    styleUrls: ['ai-claude-like.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        AIAssistViewModule,
        ButtonModule,
        SwitchModule,
        DropDownButtonModule,
        CommonModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent
    ]
})
export class AIAssistClaudeCloneComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['ai-claude-like.component.css'];
    }

    @ViewChild('claudeAIAssistView')
    public claudeAIAssistView: AIAssistViewComponent;

    public isFirstPrompt: boolean = true;
    public containerClass: string = 'middle-footer';
    public currentModel: string = 'Opus 4.6';
    public extendedThinkingEnabled: boolean = false;
    private abortController?: AbortController;

    public prompts: { [key: string]: string | string[] }[] = defaultPromptResponseData;

    public modelItems = [
        {
            text: 'Opus 4.6',
            description: 'Most capable for ambitious work'
        },
        {
            text: 'Sonnet 4.6',
            description: 'Most efficient for everyday tasks'
        },
        {
            text: 'Haiku 4.5',
            description: 'Fastest for quick answers'
        },
        {
            text: 'Extended thinking',
            description: 'Think longer for complex tasks',
            id: 'extended-thinking'
        }
    ];

    public footerToolbarSettings = {
        toolbarPosition: 'Bottom',
        items: [
            {
                iconCss: 'e-icons e-assist-attachment-icon',
                align: 'Left'
            },
            {
                align: 'Right',
                template: '<button id="custombtn">Opus 4.6</button>'
            }
        ]
    };

    public attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };

    public onCreate = () => {
        this.initializeModelDropdown();
    };

    public initializeModelDropdown = () => {
        setTimeout(() => {
            const custombtn = document.getElementById('custombtn');
            if (custombtn && !custombtn.classList.contains('e-dropdown-btn')) {
                const dropdownBtn = new DropDownButton({
                    items: this.modelItems,
                    content: this.currentModel,
                    cssClass: 'e-flat claude_model',
                    beforeItemRender: (args: MenuEventArgs) => {
                        const item = args.item as any;
                        if (this.currentModel === item.text) {
                            args.element.classList.add('e-selected');
                        }
                        let contentHtml = `
                            <div class="model-content">
                                <div class="model-name">${item.text}</div>
                                <div class="model-description">${item.description || ''}</div>
                            </div>
                        `;
                        if (item.id === 'extended-thinking') {
                            contentHtml = `
                                <div class="model-item">
                                    ${contentHtml}
                                    <div class="toggle-container">
                                        <input
                                            type="checkbox"
                                            class="extended-thinking-toggle"
                                            id="extended-thinking-switch" />
                                    </div>
                                </div>
                            `;
                        } else {
                            contentHtml = `
                                <div class="model-item">
                                    ${contentHtml}
                                </div>
                            `;
                        }
                        args.element.innerHTML = contentHtml;
                    },
                    open: () => {
                        // Initialize the Syncfusion Switch after the popup opens
                        setTimeout(() => {
                            const toggleInput = document.getElementById(
                                'extended-thinking-switch'
                            ) as HTMLInputElement;

                            if (
                                toggleInput &&
                                !toggleInput.classList.contains('e-switch')
                            ) {
                                new Switch({
                                    checked: this.extendedThinkingEnabled,
                                    change: (args: ChangeEventArgs) => {
                                        this.extendedThinkingEnabled =
                                            args.checked || false;
                                    }
                                }).appendTo(toggleInput);

                                // Prevent menu from closing when clicking the toggle
                                const toggleContainer =
                                    toggleInput.closest('.toggle-container');

                                if (toggleContainer) {
                                    toggleContainer.addEventListener(
                                        'click',
                                        (e: Event) => {
                                            e.stopPropagation();
                                        }
                                    );
                                }
                            }
                        }, 0);
                    },
                    select: (args: MenuEventArgs) => {
                        const item = args.item as any;
                        if (item.id === 'extended-thinking') {
                            return;
                        }
                        this.currentModel = item.text;
                        dropdownBtn.content = item.text;
                        dropdownBtn.dataBind();
                    }
                });
                dropdownBtn.appendTo(custombtn);
            }
        }, 100);
    };

    public promptRequest = async (args: PromptRequestEventArgs) => {
        if (this.isFirstPrompt) {
            this.containerClass = 'bottom-footer';
            this.isFirstPrompt = false;
        }
        this.abortController = new AbortController();
        const foundPrompt = this.prompts.find((p: any) => p.prompt === args.prompt);
        const response = foundPrompt ? (foundPrompt as any).response : await getAIResponse(args as any, this.abortController);
        this.claudeAIAssistView.addPromptResponse(response);
    };
}
