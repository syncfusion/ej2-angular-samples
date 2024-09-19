import { Component, ViewChild, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonModule, SmartPasteButtonModule, ChatOptions , RadioButtonModule, ChipListModule, ClickEventArgs } from '@syncfusion/ej2-angular-buttons';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextAreaModule, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { getAzureChatAIRequest } from '../../azure-openai';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, ChipListModule, TextBoxModule, RadioButtonModule, SmartPasteButtonModule, ComboBoxModule, TextAreaModule, DatePickerModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SmartPasteDefaultComponent implements OnInit {
    constructor(@Inject('sourceFiles') private sourceFiles: any, private fb: FormBuilder) {
        this.sourceFiles.files = ['ai-default.html', 'default.component.css'];
    }
    @ViewChild('copyContent') public copyContent: any;
    @ViewChild('chipList') public chipList: any;
    @ViewChild('copybutton') public copyButton: any;
    @ViewChild('smart') public smartPaste: any;
    bugForm!: FormGroup;
    browsers: string[] = ['Chrome', 'Firefox', 'Edge', 'Safari'];

    ngOnInit(): void {
        this.bugForm = this.fb.group({
            bugName: [''],
            reporterName: [''],
            submittedDate: [''],
            bugDescription: [''],
            reproduceSteps: [''],
            bugPriority: [''],
            browser: ['']
        });
    }

    // Property Pane Code
    public bugPresets: string[] = [
        "Issue with the dropdown menu",
        "Trouble logging into the website",
        "Search functionality not working",
        "Images missing on the product page"
    ];

    public bugReports: string[] = [
        `Hi, this is Alice. On July 3rd, I've come across a bug where the dropdown menu in the navigation bar doesn't close after selecting an item. I just navigated to the homepage, opened the dropdown menu in the navigation bar, clicked an item in the dropdown and then the issue occurred which happens only on Chrome. Though this doesn't seem like a serious/important bug, kindly look into it and resolve it. Regards, J Alice Abraham`,
        `Hey team, On May 2nd, K John Doe reported an issue where the login page refreshes instead of logging in when the user clicks the login button. This problem prevents users from accessing their accounts, making it a critical issue that needs immediate attention. The issue has been observed across all major browsers. To reproduce the issue, open any browser and navigate to the website's login page. Enter a valid username and password, then click the Login button.`,
        `Hi, Whenever I type something in the search bar and hit search, it doesn't return any results, even for items I know exist. This problem was noticed by Jane Smith on July 5th in FireFox browser. You can repro the issue by opening the site in the Firefox browser and navigate to the search bar. Type in any search term, including items that are known to exist, and click the search button. The search functionality fails to return any results, displaying an empty result set even for valid queries. This is quite important, but not urgent. Please look into it. Regards, M William Marker`,
        `Hello, When I selected the category option on the landing page and chose the electronics category, the images were missing on the product page. The placeholders are there, but no actual images are loading. This happens on all browsers. I reported this on July 3rd. It's not urgent, but it does affect the user experience. Regards, L Mike Johnson`
    ];

    onReset(): void {
        this.bugForm.reset();
    }

    public serverAIRequest = async (settings: ChatOptions) => {
        let output = '';
        try {
            const response = await getAzureChatAIRequest(settings) as string;
            output = response;
        } catch (error) {
            console.error("Error:", error);
        }
        return output;
    };
    
    onCreated(): void {
        this.smartPaste.aiAssistHandler = this.serverAIRequest;
    }

    async onCopy(): Promise<void> {
        await navigator.clipboard.writeText(this.copyContent.nativeElement.innerHTML);
        this.copyButton.content = "Copied";
        this.copyButton.iconCss = "e-icons e-check";
    }

    public onChipClick(e: ClickEventArgs): void {
        this.copyContent.nativeElement.innerHTML = this.bugReports[e.index as number] as string;
        this.chipList.selectedChips = e.index as number;
        this.copyButton.content = "Copy";
        this.copyButton.iconCss = "e-icons e-copy";
    }
}
