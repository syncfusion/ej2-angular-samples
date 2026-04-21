import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { InlineAIAssistModule, InlineAIAssistComponent, InlinePromptRequestEventArgs, ResponseSettingsModel, CommandSettingsModel, InlineToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { RichTextEditorModule, RichTextEditorComponent, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, NodeSelection, QuickToolbarSettingsModel, ToolbarClickEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { AI_SERVICE_URL, getUserID } from "../common/ai-service";

@Component({
    selector: 'control-content',
    templateUrl: 'ai-rich-text-editor.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService],
    imports: [RichTextEditorModule, InlineAIAssistModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class InlineAIAssistRTEComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = [];
    }

    @ViewChild('rteEditor')
    public rteEditor!: RichTextEditorComponent;

    @ViewChild('rtePrompt')
    public rtePrompt!: InlineAIAssistComponent;

    // Internal state variables
    private rteSelection: NodeSelection = new NodeSelection();
    private range: Range | null = null;
    private selectedText: string = '';
    private selectedSpan: HTMLElement | null = null;
    private abortController: AbortController | null = null;

    // Initial RTE content
    public rteValue: string = `<p><strong>Introduction</strong></p>
            <p>Technology has transformed the way we communicate and collaborate in both personal and professional 
                settings. Digital tools enable instant connectivity across global distances, breaking down traditional 
                barriers and creating new opportunities for innovation and growth.</p>
            <p><strong>Key Benefits</strong></p>
            <p>The integration of artificial intelligence into everyday applications is revolutionizing user experiences. 
                From smart assistants to predictive analytics, AI-powered features help users accomplish tasks more 
                efficiently while providing personalized recommendations based on individual preferences and behavior 
                patterns.</p>
            <p><strong>Implementation Approach</strong></p>
            <p>When adopting new technologies, organizations should focus on user training and change management. 
                A phased rollout allows teams to adapt gradually while providing feedback for continuous improvement. 
                Clear communication about benefits and proper support resources are essential for successful adoption 
                and long-term sustainability of technological initiatives.</p>
            <p><strong>Future Outlook</strong></p>
            <p>As digital transformation continues to accelerate, businesses must remain adaptable and open to 
                emerging trends. Cloud computing, automation, and data-driven decision-making will play increasingly 
                important roles in shaping competitive advantages. Organizations that embrace innovation while 
                maintaining focus on user needs will be best positioned for future success.</p>`;

    // Quick toolbar settings
    public quickToolbarSettings: QuickToolbarSettingsModel = {
        text: [
            { prefixIcon: 'e-icons e-ai-chat', tooltipText: 'AI Assistant' } as any,
            'Bold',
            'Italic',
            'Underline',
            'StrikeThrough',
            'FontColor',
            'BackgroundColor',
            '|',
            'UnorderedList',
            'OrderedList'
        ]
    };

    // Command settings for the Inline AI Prompt
    public commandSettings: CommandSettingsModel = {
        popupWidth: '250px',
        commands: [
            {
                label: 'Improve Content',
                prompt: 'Improve the clarity, coherence, and overall quality of the following content:',
                iconCss: 'e-icons e-magic-wand'
            },
            {
                label: 'Shorten',
                prompt: 'Shorten the following content without losing its core message:',
                iconCss: 'e-icons e-shorten'
            },
            {
                label: 'Elaborate',
                prompt: 'Expand on the following content with more detail and explanation:',
                iconCss: 'e-icons e-elaborate'
            },
            {
                label: 'Simplify',
                prompt: 'Simplify the language and make the following content easier to understand:',
                iconCss: 'e-icons e-text-wrap'
            },
            {
                label: 'Summarize',
                prompt: 'Summarize the following content in a concise and clear way:',
                iconCss: 'e-icons e-collapse-2'
            },
            {
                label: 'Check Grammar & Spelling',
                prompt: 'Check the following content for grammar and spelling mistakes, and correct them:',
                iconCss: 'e-icons e-grammar-check'
            }
        ]
    };

    // Response settings for handling Accept/Reject actions
    public responseSettings: ResponseSettingsModel = {
        itemSelect: (args: any) => {
            if (args.command.label === 'Accept') {
                if (this.selectedSpan && this.selectedSpan.parentNode) {
                    const parent = this.selectedSpan.parentNode;
                    const textContent = this.selectedSpan.textContent || this.selectedSpan.innerText;
                    const textNode = document.createTextNode(textContent);
                    parent.replaceChild(textNode, this.selectedSpan);
                    this.selectedSpan = null;
                    this.rteEditor.formatter.saveData();
                    this.rteEditor.formatter.enableUndo(this.rteEditor);
                }
                this.rtePrompt.hidePopup();
            } else if (args.command.label === 'Discard') {
                this.rteEditor.formatter.saveData();
                this.selectedSpan = null;
                this.rteEditor.executeCommand('undo');
                this.rteEditor.clearUndoRedo();
                window.getSelection()?.removeAllRanges();
                this.rtePrompt.hidePopup();
            }
        }
    };

    public inlineToolbarSettings: InlineToolbarSettingsModel = {
        itemClick: (args: any) => {
            if (args.item.iconCss === 'e-icons e-inline-stop') {
                if (this.abortController) {
                    this.abortController.abort();
                }
            }
        }
    }

    // Toolbar click handler
    public onToolbarClick(args: ToolbarClickEventArgs): void {
        if (args.item.prefixIcon === 'e-icons e-ai-chat') {
            this.range = this.rteSelection.getRange(document);
            const relateToEl = this.range.endContainer.parentElement;
            this.selectedText = this.rteEditor.getSelection();

            if (this.selectedText && this.selectedText.length > 0) {
                const wrapper = document.createElement('span');
                wrapper.className = 'e-inlineaiassist-selected-text';
                const selectedContent = this.range.extractContents();
                wrapper.appendChild(selectedContent);
                this.range.insertNode(wrapper);
                this.selectedSpan = wrapper;
                this.rtePrompt.relateTo = relateToEl ? relateToEl : wrapper;
                this.rtePrompt.dataBind();
                this.rtePrompt.showPopup();
            }
        }
    }

    // Event handler for popup close
    public onClose(): void {
        if (this.abortController) {
            this.abortController.abort();
        }
        if (this.selectedSpan) {
            this.rteEditor.formatter.saveData();
            this.rteEditor.executeCommand('undo');
            this.rteEditor.clearUndoRedo();
            window.getSelection()?.removeAllRanges();
            this.selectedSpan = null;
        }
    }

    // Prompt request handler with AI service streaming integration
    public promptRequest(args: InlinePromptRequestEventArgs): void {
        if (this.rteEditor.formatter.getUndoRedoStack().length === 0) {
            this.rteEditor.formatter.saveData();
        }

        let contextPrompt = args.prompt;
        if (this.selectedText && this.selectedText.length > 0) {
            contextPrompt = contextPrompt + ' ' + this.selectedText;
        }

        if (this.selectedSpan) {
            this.rtePrompt.dataBind();
            getUserID().then((userID: string) => {
                try {
                    this.abortController = new AbortController();

                    fetch(AI_SERVICE_URL + '/api/stream', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': userID
                        },
                        body: JSON.stringify({ message: contextPrompt }),
                        signal: this.abortController.signal
                    })
                        .then((response) => {
                            if (!response.ok) {
                                return response.json().then((errorData) => {
                                    throw new Error(errorData.error || `HTTP Error ${response.status}`);
                                });
                            }

                            const reader = response.body?.getReader();
                            if (!reader) {
                                throw new Error('No response body reader available');
                            }

                            const decoder = new TextDecoder();
                            let fullText = '';

                            const processStream = (): Promise<void> => {
                                return reader.read().then((result) => {
                                    const { value, done } = result;

                                    if (done) {
                                        if (this.selectedSpan && this.selectedSpan.parentNode) {
                                            this.rtePrompt.addResponse(fullText, true);
                                            const newRange = document.createRange();
                                            newRange.selectNodeContents(this.selectedSpan!);
                                            this.rteEditor.selectRange(newRange);
                                            this.range = this.rteSelection.getRange(document);
                                        }
                                        return;
                                    }

                                    if (!this.selectedSpan || !this.selectedSpan.parentNode) {
                                        return;
                                    }

                                    const chunk = decoder.decode(value, { stream: true });
                                    fullText += chunk;
                                    this.rtePrompt.addResponse(fullText, false);
                                    const tempDiv = document.createElement('div');
                                    const htmlResult = MarkdownConverter.toHtml(fullText);
                                    tempDiv.innerHTML = typeof htmlResult === 'string' ? htmlResult : fullText;
                                    const plainText = tempDiv.textContent || tempDiv.innerText || fullText;

                                    if (this.selectedSpan) {
                                        this.selectedSpan.innerHTML = plainText;
                                    }

                                    if ((this.rtePrompt as any).popupObj) {
                                        (this.rtePrompt as any).popupObj.refreshPosition();
                                    }

                                    return processStream();
                                });
                            };

                            return processStream();
                        })
                        .catch((error) => {
                            if (error.name === 'AbortError') {
                                return;
                            }
                            setTimeout(() => {
                                const fallbackResponse = 'We could not reach the AI service; please try again later.';
                                if (this.selectedSpan && this.selectedSpan.parentNode) {
                                    this.selectedSpan.innerHTML = fallbackResponse;
                                    this.rtePrompt.addResponse(fallbackResponse);
                                    const newRange = document.createRange();
                                    newRange.selectNodeContents(this.selectedSpan);
                                    this.rteEditor.selectRange(newRange);
                                    this.range = this.rteSelection.getRange(document);
                                }
                            }, 1000);
                        });
                } catch (error) {}
            });
        }
    }
}
