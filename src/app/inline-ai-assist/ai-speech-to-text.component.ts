import { Component, ViewChild, ViewEncapsulation, Inject, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import {
    InlineAIAssistModule,
    InlineAIAssistComponent,
    InlinePromptRequestEventArgs,
    ResponseSettingsModel,
    CommandSettingsModel,
    SpeechToTextSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { AI_SERVICE_URL, getUserID } from '../common/ai-service';

@Component({
    selector: 'control-content',
    templateUrl: 'ai-speech-to-text.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [InlineAIAssistModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class InlineAIAssistSpeechToTextComponent implements AfterViewInit, OnDestroy {
    constructor(@Inject('sourceFiles') private sourceFiles: any, private elementRef: ElementRef) {
        sourceFiles.files = [
            'ai-speech-to-text.html',
            'ai-speech-to-text.component.ts'
        ];
    }
    @ViewChild('inlinePrompt')
    public inlinePrompt!: InlineAIAssistComponent;
    public isPopupOpen: boolean = false;
    public isAccepted: boolean = false;
    public originalContentHTML: string = '';
    public savedRange: Range | null = null;
    public selectedSpan: HTMLSpanElement | null = null;
    public originalSpanHTML: string = '';
    public abortController: AbortController | undefined;
    public speechToTextSettings: SpeechToTextSettingsModel = {
        enable: true
    };
    public commandSettings: CommandSettingsModel = {
        commands: [
            {
                id: 'improveContent',
                label: 'Improve Content',
                iconCss: 'e-icons e-edit',
                tooltip: 'Improve the selected content',
                prompt: 'Improve the selected content.'
            },
            {
                id: 'shorten',
                label: 'Shorten',
                iconCss: 'e-icons e-shorten',
                tooltip: 'Shorten the selected text',
                prompt: 'Shorten the selected text.'
            },
            {
                id: 'elaborate',
                label: 'Elaborate',
                iconCss: 'e-icons e-elaborate',
                tooltip: 'Expand on the following content with more detail and explanation',
                prompt: 'Expand on the following content with more detail and explanation.'
            },
            {
                id: 'summarize',
                label: 'Summarize',
                iconCss: 'e-icons e-description',
                tooltip: 'Summarize the selected text',
                prompt: 'Summarize the selected text.'
            }
        ],
        popupWidth: '240px',
        popupHeight: 'auto'
    };
    public target: string = '.meeting-header';
    public relateTo: string | HTMLElement = '#targetContent';
    public popupWidth: string = '480px';
    public popupHeight: string = 'auto';
    public responseMode: string = 'Inline';
    public placeholder: string = 'Type prompt for meeting assistance...';
    public responseSettings: ResponseSettingsModel = {
        itemSelect: (args: any): void => {
            if (args.command.label === 'Accept') {
                this.isAccepted = true;
                if (this.selectedSpan && this.selectedSpan.parentNode) {
                    this.unwrapSelectedSpan();
                } else if (this.savedRange) {
                    this.restoreSelection();
                    if (this.savedRange) {
                        this.savedRange.deleteContents();
                        const response: string = (this.inlinePrompt.prompts[
                            this.inlinePrompt.prompts.length - 1
                        ] as any).response;
                        this.savedRange.insertNode(this.createFragmentFromHTML(response));
                        this.savedRange = null;
                    }
                }
                this.inlinePrompt.hidePopup();
                this.isPopupOpen = false;
            } else if (args.command.label === 'Discard') {
                this.isAccepted = false;
                if (this.selectedSpan && this.selectedSpan.parentNode) {
                    this.restoreOriginalSpan();
                }
                this.savedRange = null;
                this.inlinePrompt.hidePopup();
                this.isPopupOpen = false;
            }
        }
    };
    public onPopupClose(): void {
        if (!this.isAccepted && this.originalContentHTML) {
            const targetContent: HTMLElement | null = document.getElementById('targetContent');
            if (targetContent) {
                targetContent.innerHTML = this.originalContentHTML;
            }
        }
        this.selectedSpan = null;
        this.originalSpanHTML = '';
        this.savedRange = null;
        this.originalContentHTML = '';
        this.isAccepted = false;
        this.isPopupOpen = false;
        window.getSelection()?.removeAllRanges();
    }
    public promptRequest(args: InlinePromptRequestEventArgs): void {
        const selectedText: string = this.getSelectedText();
        let contextPrompt: string = args.prompt || '';
        if (selectedText && selectedText.length > 0) {
            contextPrompt += ' ' + selectedText;
        }
        if (!contextPrompt.trim()) {
            this.inlinePrompt.addResponse(
                "I'm here to assist with your meeting notes. Try selecting text and choosing a command."
            );
            return;
        }
        if (this.selectedSpan) {
            this.inlinePrompt.dataBind();
            getUserID().then((userID: string) => {
                try {
                    this.abortController = new AbortController();
                    fetch(AI_SERVICE_URL + '/api/stream', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: userID
                        },
                        body: JSON.stringify({
                            message: contextPrompt
                        }),
                        signal: this.abortController.signal
                    })
                        .then((response: Response) => {
                            if (!response.ok) {
                                return response.json().then((errorData: any) => {
                                    throw new Error(
                                        errorData.error || `HTTP Error ${response.status}`
                                    );
                                });
                            }
                            const reader: ReadableStreamDefaultReader<Uint8Array> | undefined =
                                response.body?.getReader();
                            const decoder: TextDecoder = new TextDecoder();
                            let fullText: string = '';

                            if (!reader) {
                                return Promise.resolve();
                            }
                            const processStream = (): Promise<void> => {
                                return reader
                                    .read()
                                    .then(
                                        (result: ReadableStreamReadResult<Uint8Array>):
                                            | Promise<void>
                                            | void => {
                                            const { value, done } = result;
                                            if (done) {
                                                this.inlinePrompt.addResponse(fullText, true);
                                                return Promise.resolve();
                                            }
                                            const chunk: string = decoder.decode(value, {
                                                stream: true
                                            });
                                            fullText += chunk;
                                            this.inlinePrompt.addResponse(fullText, false);
                                            const tempDiv: HTMLDivElement =
                                                document.createElement('div');
                                            tempDiv.textContent = fullText;
                                            const plainText: string =
                                                tempDiv.textContent || fullText;
                                            if (this.selectedSpan) {
                                                this.selectedSpan.textContent = plainText;
                                            }
                                            if ((this.inlinePrompt as any).popupObj) {
                                                (this.inlinePrompt as any).popupObj.refreshPosition();
                                            }
                                            return processStream();
                                        }
                                    );
                            };
                            return processStream();
                        })
                        .catch((error: Error) => {
                            if (error.name === 'AbortError') {
                                return;
                            }
                            setTimeout(() => {
                                const fallbackResponse =
                                    'We could not reach the AI service; please try again later.';
                                if (this.selectedSpan) {
                                    this.selectedSpan.innerHTML = fallbackResponse;
                                }
                                this.inlinePrompt.addResponse(fallbackResponse);
                            }, 1000);
                        });
                } catch (error) {
                }
            });
        } else {
            getUserID().then((userID: string) => {
                try {
                    this.abortController = new AbortController();
                    fetch(AI_SERVICE_URL + '/api/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            visitorId: userID,
                            messages: {
                                messages: [
                                    {
                                        role: 'system',
                                        content: 'You are a helpful assistant.'
                                    },
                                    {
                                        role: 'user',
                                        content: contextPrompt
                                    }
                                ]
                            }
                        }),
                        signal: this.abortController.signal
                    })
                        .then((response: Response) => {
                            if (!response.ok) {
                                return response.json().then((errorData: any) => {
                                    throw new Error(
                                        errorData.error || `HTTP Error ${response.status}`
                                    );
                                });
                            }
                            return response.json();
                        })
                        .then((result: any): void => {
                            if (result && result.response) {
                                const aiResponse: string = result.response.replace(
                                    'END_INSERTION',
                                    ''
                                );
                                this.inlinePrompt.addResponse(aiResponse, true);
                            }
                        })
                        .catch((error: Error) => {
                            if (error.name === 'AbortError') {
                                return;
                            }
                            setTimeout(() => {
                                this.inlinePrompt.addResponse(
                                    'We could not reach the AI service; please try again later.'
                                );
                            }, 1000);
                        });
                } catch (error) {
                }
            });
        }
    }
    public ngAfterViewInit(): void {
        const targetContent: HTMLElement | null = document.getElementById('targetContent');
        if (targetContent) {
            targetContent.addEventListener('mouseup', this.onContentMouseUp);
            targetContent.addEventListener('keyup', this.onContentKeyUp);
        }
    }
    public onContentMouseUp = (): void => {
        if (this.saveSelection()) {
            const selection: Selection | null = window.getSelection();
            const range: Range | null =
                selection && selection.rangeCount ? selection.getRangeAt(0) : null;
            if (range && !range.collapsed) {
                const targetContent: HTMLElement | null = document.getElementById('targetContent');
                if (targetContent) {
                    this.originalContentHTML = targetContent.innerHTML;
                }
                const wrapper: HTMLSpanElement = document.createElement('span');
                wrapper.className = 'e-inlineaiassist-selected-text';
                const selectedContent: DocumentFragment = range.extractContents();
                wrapper.appendChild(selectedContent);
                range.insertNode(wrapper);
                this.selectedSpan = wrapper;
                this.originalSpanHTML = wrapper.innerHTML;
                this.savedRange = document.createRange();
                this.savedRange.selectNodeContents(this.selectedSpan);
                this.inlinePrompt.relateTo = this.selectedSpan;
                this.inlinePrompt.dataBind();
            } else if (this.savedRange) {
                this.inlinePrompt.relateTo = this.savedRange.startContainer.parentElement || '#targetContent';
                this.inlinePrompt.dataBind();
            }
            this.inlinePrompt.dataBind();
            this.inlinePrompt.showPopup();
            this.isPopupOpen = true;
        }
    };
    public onContentKeyUp = (): void => {
        if (this.saveSelection() && this.isPopupOpen && this.savedRange) {
            this.relateTo =
                (this.savedRange.startContainer as HTMLElement | null)?.parentElement ||
                '#targetContent';
            this.inlinePrompt.dataBind();
        }
    };
    private saveSelection(): boolean {
        const selection: Selection | null = window.getSelection();
        if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
            this.savedRange = selection.getRangeAt(0).cloneRange();
            return true;
        }
        return false;
    }
    private restoreSelection(): boolean {
        if (!this.savedRange) {
            return false;
        }
        const selection: Selection | null = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(this.savedRange);
        }
        return true;
    }
    private createFragmentFromHTML(html: string): DocumentFragment {
        const tempDiv: HTMLDivElement = document.createElement('div');
        tempDiv.innerHTML = html || '';
        const fragment: DocumentFragment = document.createDocumentFragment();
        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
        }
        return fragment;
    }
    private unwrapSelectedSpan(): void {
        if (!this.selectedSpan || !this.selectedSpan.parentNode) {
            return;
        }
        const parent: Node = this.selectedSpan.parentNode;
        const fragment: DocumentFragment = this.createFragmentFromHTML(
            this.selectedSpan.innerHTML
        );
        parent.replaceChild(fragment, this.selectedSpan);
        this.selectedSpan = null;
        this.originalSpanHTML = '';
    }
    private restoreOriginalSpan(): void {
        if (!this.selectedSpan || !this.selectedSpan.parentNode) {
            return;
        }
        const parent: Node = this.selectedSpan.parentNode;
        const fragment: DocumentFragment = this.createFragmentFromHTML(this.originalSpanHTML);
        parent.replaceChild(fragment, this.selectedSpan);
        this.selectedSpan = null;
        this.originalSpanHTML = '';
    }
    private getSelectedText(): string {
        if (this.savedRange) {
            return this.savedRange.toString();
        }
        return '';
    }
    ngOnDestroy(): void {
        if (this.abortController) {
            this.abortController.abort();
        }
        const targetContent: HTMLElement | null = document.getElementById('targetContent');
        if (targetContent) {
            targetContent.removeEventListener('mouseup', this.onContentMouseUp);
            targetContent.removeEventListener('keyup', this.onContentKeyUp);
        }
    }
}
