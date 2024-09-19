import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SmartTextAreaComponent, SmartTextAreaModule, ChatParameters } from '@syncfusion/ej2-angular-inputs';
import { getAzureChatAIRequest } from '../../azure-openai';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DropDownListAllModule, SmartTextAreaModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SmartTextAreaDefaultComponent {
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        this.sourceFiles.files = ['ai-default.html', 'default.component.css'];
    }
    @ViewChild('textareaObj') public textareaObj!: SmartTextAreaComponent;

    public rolesData: string[] = [
        "Maintainer of an open-source project replying to GitHub issues",
        "Employee communicating with internal team",
        "Customer support representative responding to customer queries",
        "Sales representative responding to client inquiries"
    ];

    public serverAIRequest = async (settings: ChatParameters) => {
        let output = '';
        try {
            const response = await getAzureChatAIRequest(settings) as string;
            output = response;
        } catch (error) {
            console.error("Error:", error);
        }
        return output;
    };
    public presets: any = [
        {
            userRole: "Maintainer of an open-source project replying to GitHub issues",
            userPhrases: [
                "Thank you for contacting us.",
                "To investigate, we'll need a repro as a public Git repo.",
                "Could you please post a screenshot of NEED_INFO?",
                "This sounds like a usage question. This issue tracker is intended for bugs and feature proposals. Unfortunately, we don't have the capacity to answer general usage questions and would recommend StackOverflow for a faster response.",
                "We don't accept ZIP files as repros."
            ]
        },
        {
            userRole: "Customer support representative responding to customer queries",
            userPhrases: [
                "Thank you for reaching out to us.",
                "Can you please provide your order number?",
                "We apologize for the inconvenience.",
                "Our team is looking into this issue and will get back to you shortly.",
                "For urgent matters, please call our support line."
            ]
        },
        {
            userRole: "Employee communicating with internal team",
            userPhrases: [
                "Please find the attached report.",
                "Let's schedule a meeting to discuss this further.",
                "Can you provide an update on this task?",
                "I appreciate your prompt response.",
                "Let's collaborate on this project to ensure timely delivery."
            ]
        },
        {
            userRole: "Sales representative responding to client inquiries",
            userPhrases: [
                "Thank you for your interest in our product.",
                "Can I schedule a demo for you?",
                "Please find the pricing details attached.",
                "Our team is excited to work with you.",
                "Let me know if you have any further questions."
            ]
        }
    ];
    public width: string = '80%';
    public defaultPreset: string[] = [
        "Please find the attached report.",
        "Let's schedule a meeting to discuss this further.",
        "Can you provide an update on this task?",
        "I appreciate your prompt response.",
        "Let's collaborate on this project to ensure timely delivery."
    ];
    public dropDownChange(args: any): void {
        let selectedRole: string = args.value;
        let selectedPreset: any = this.presets.find((preset: any) => preset.userRole === selectedRole);
        this.textareaObj.userRole = selectedRole;
        this.textareaObj.UserPhrases = selectedPreset.userPhrases;
    }
}
