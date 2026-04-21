import { Component, ViewChild, ViewEncapsulation, Inject, OnInit, ElementRef } from '@angular/core';
import { InlineAIAssistModule, InlineAIAssistComponent, InlinePromptRequestEventArgs, ResponseSettingsModel, CommandSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AI_SERVICE_URL, getUserID } from "../common/ai-service";

@Component({
    selector: 'control-content',
    templateUrl: 'ai-overview.html',
    styleUrls: ['ai-overview.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ ButtonModule, InlineAIAssistModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class InlineAIAssistOverviewComponent implements OnInit {
    constructor(@Inject('sourceFiles') private sourceFiles: any, private elementRef: ElementRef) {
        sourceFiles.files = ['ai-overview.component.css'];
    }

    @ViewChild('overviewInlineAIAssist')
    public overviewInlineAIAssist!: InlineAIAssistComponent;

    // Internal state variables
    private abortController: AbortController | null = null;
    private selectedCommandText: string = '';
    private currentHoveredParagraph: HTMLElement | null = null;
    private isGlobalRequest: boolean = false;
    private isPopupOpen: boolean = false;
    private mutationObserver: MutationObserver | null = null;
    private initialEmailContent: string = "<p>\nDear Team,\n</p>\n<p>\nI hope this email finds you well. I wanted to provide you with an update on our current project status. We successfully completed Phase 1 last week, and I'm pleased to share that all deliverables were met according to schedule. The client presentation went well and they expressed satisfaction with our progress.\n</p>\n<p>\nAs we move forward into Phase 2, I would appreciate it if everyone could submit their progress reports by Friday. Additionally, we should schedule a team meeting next week to discuss the upcoming timeline and address any questions or concerns you may have.\n</p>\n<p>\nThank you for your continued dedication and hard work on this project.\n</p>\n<p>\nBest regards,<br>\nProject Management Team\n</p>";

    public commandSettings: CommandSettingsModel = {
        commands: [
            {
                id: 'summarize',
                label: 'Summarize',
                tooltip: 'Create a brief summary',
                prompt: 'Summarize the main points',
                iconCss: 'e-icons e-collapse-2'
            },
            {
                id: 'fix-grammar',
                label: 'Fix Grammar',
                tooltip: 'Correct grammar and spelling',
                prompt: 'Fix grammar, spelling, and punctuation errors',
                iconCss: 'e-icons e-grammar-check'
            },
            {
                id: 'make-professional',
                label: 'Make Professional',
                tooltip: 'Transform to formal business tone',
                prompt: 'Rewrite this in a professional, formal business tone',
                iconCss: 'e-icons e-annotation-edit'
            },
            {
                id: 'make-friendly',
                label: 'Make Friendly',
                tooltip: 'Make the tone more casual and friendly',
                prompt: 'Rewrite this in a friendly, casual tone',
                iconCss: 'e-icons e-ai-chat'
            }
        ],
        itemSelect: (args: any) => {
            this.selectedCommandText = args.command.label;
        }
    };

    public responseSettings: ResponseSettingsModel = {
        itemSelect: (args: any) => {
            if (args.command.label === 'Accept') {
                if (this.isGlobalRequest) {
                    const emailContent = document.getElementById('emailContent');
                    if (emailContent && this.overviewInlineAIAssist) {
                        emailContent.innerHTML = this.overviewInlineAIAssist.prompts[this.overviewInlineAIAssist.prompts.length - 1].response;
                        emailContent.querySelectorAll(':scope > p').forEach((para) => this.attachHoverEvent(para as HTMLElement));
                    }
                } else {
                    if (this.currentHoveredParagraph && this.overviewInlineAIAssist) {
                        this.currentHoveredParagraph.innerHTML = this.overviewInlineAIAssist.prompts[this.overviewInlineAIAssist.prompts.length - 1].response;
                    }
                }
                this.overviewInlineAIAssist?.hidePopup();
            } else if (args.command.label === 'Discard') {
                this.overviewInlineAIAssist?.hidePopup();
            }
        }
    };

    public promptRequest(args: InlinePromptRequestEventArgs): void {
        getUserID().then((userID: string) => {
            try {
                this.abortController = new AbortController();
                let contentToProcess = '';

                if (this.isGlobalRequest) {
                    const emailContentElem = document.getElementById('emailContent');
                    contentToProcess = emailContentElem ? emailContentElem.innerText : '';
                } else if (this.currentHoveredParagraph) {
                    contentToProcess = this.currentHoveredParagraph.innerText;
                }

                fetch(AI_SERVICE_URL + '/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        visitorId: userID,
                        messages: {
                            messages: [
                                { role: 'system', content: 'You are a helpful assistant.' },
                                { role: 'user', content: args.prompt + (contentToProcess) }
                            ]
                        }
                    }),
                    signal: this.abortController.signal
                })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            throw new Error(errorData.error || `HTTP Error ${response.status}`);
                        });
                    }
                    return response.json();
                })
                .then((result) => {
                    if (result && result.response) {
                        const aiResponse = result.response.replace('END_INSERTION', '');
                        this.overviewInlineAIAssist.addResponse(aiResponse);
                    }
                })
                .catch((error) => {
                    if (error.name === 'AbortError') {
                        return;
                    }
                    setTimeout(() => {
                        const fallbackResponse = 'We could not reach the AI service; please try again later.';
                        this.overviewInlineAIAssist.addResponse(fallbackResponse);
                        this.selectedCommandText = '';
                    }, 1000);
                });
            } catch (error) {}
        });
    }

    public onOpen(): void {
        this.isPopupOpen = true;
    }

    public onClose(): void {
        this.isPopupOpen = false;
        this.selectedCommandText = '';
        this.isGlobalRequest = false;
    }

    ngOnInit(): void {
        this.initializeComponent();
    }

    private initializeComponent(): void {
        const sparkleButton = this.elementRef.nativeElement.querySelector('#sparkleBtn');
        const emailContent = this.elementRef.nativeElement.querySelector('#emailContent');
        if (emailContent) {
            emailContent.querySelectorAll(':scope > p').forEach((para: any) => this.attachHoverEvent(para));

            emailContent.addEventListener('input', () => {
                if (sparkleButton) {
                    sparkleButton.style.display = 'none';
                }
            });

            emailContent.addEventListener('mouseleave', (e: MouseEvent) => {
                if (sparkleButton && e.relatedTarget !== sparkleButton && !sparkleButton.matches(':hover')) {
                    sparkleButton.style.display = 'none';
                }
            });

            this.mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeName === 'P') {
                            this.attachHoverEvent(node as HTMLElement);
                        }
                    });
                });
            });
            this.mutationObserver.observe(emailContent, { childList: true, subtree: true });
        }
    }

    private attachHoverEvent(paragraph: HTMLElement): void {
        const sparkleButton = this.elementRef.nativeElement.querySelector('#sparkleBtn');

        paragraph.addEventListener('mouseenter', () => {
            if (!this.isPopupOpen && paragraph.parentElement?.classList.contains('email-body')) {
                this.currentHoveredParagraph = paragraph;
                const emailRect = paragraph.parentElement.parentElement?.getBoundingClientRect();
                const rect = paragraph.getBoundingClientRect();
                const buttonHeight = 30;

                if (emailRect && sparkleButton) {
                    const topPosition = (rect.top - emailRect.top) + (rect.height / 2) - (buttonHeight / 2);
                    sparkleButton.style.position = 'absolute';
                    sparkleButton.style.left = '20px';
                    sparkleButton.style.top = topPosition + 'px';
                    sparkleButton.style.display = 'block';
                }
            }
        });
    }

    public onSparkleMouseEnter(): void {
        const sparkleButton = this.elementRef.nativeElement.querySelector('#sparkleBtn');
        if (sparkleButton) {
            sparkleButton.style.display = 'block';
        }
    }

    public onSparkleMouseLeave(): void {
        const sparkleButton = this.elementRef.nativeElement.querySelector('#sparkleBtn');
        if (sparkleButton) {
            sparkleButton.style.display = 'none';
        }
    }

    public onSparkleClick(): void {
        if (this.currentHoveredParagraph) {
            this.isGlobalRequest = false;
            this.overviewInlineAIAssist.relateTo = this.currentHoveredParagraph;
            this.overviewInlineAIAssist.dataBind();
            this.overviewInlineAIAssist.showPopup();
        }
    }

    public onAIAssistantClick(event: Event): void {
        this.isGlobalRequest = true;
        this.overviewInlineAIAssist.relateTo = event.target as HTMLElement;
        this.overviewInlineAIAssist.dataBind();
        this.overviewInlineAIAssist.showPopup();
    }

    public onSendEmailClick(): void {
        const emailContentElem = this.elementRef.nativeElement.querySelector('#emailContent');
        const sparkleButton = this.elementRef.nativeElement.querySelector('#sparkleBtn');
        if (emailContentElem) {
            emailContentElem.innerHTML = this.initialEmailContent;
            emailContentElem.querySelectorAll(':scope > p').forEach((para: any) => this.attachHoverEvent(para));
            if (sparkleButton) {
                sparkleButton.style.display = 'none';
            }
        }
    }
}
 