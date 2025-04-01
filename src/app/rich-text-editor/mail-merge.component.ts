import { Component, ViewChild } from '@angular/core';
import {
    ToolbarService,
    LinkService,
    ImageService,
    HtmlEditorService,
    RichTextEditorModule,
    QuickToolbarService,
    TableService,
    PasteCleanupService,
    ActionCompleteEventArgs,
    ActionBeginEventArgs,
    RichTextEditorComponent
} from '@syncfusion/ej2-angular-richtexteditor';
import { DropDownButtonModule, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { MentionModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'control-content',
    templateUrl: 'mail-merge.html',
    styleUrls: ['mail-merge.css'],
    providers: [
        ToolbarService,
        LinkService,
        ImageService,
        HtmlEditorService,
        QuickToolbarService,
        TableService,
        PasteCleanupService,
    ],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, DropDownButtonModule, MentionModule, SBDescriptionComponent],
})
export class MailMergeComponent {
    @ViewChild('mailMergeEditor', { static: false }) public mailMergeEditor!: RichTextEditorComponent;
    @ViewChild('mentionObj') public mentionObj: any;
    @ViewChild('toolsRTE') public rteObj!: RichTextEditorComponent;

    public rteValue: string = `<p>Dear <span contenteditable="false" class="e-mention-chip"><span>{{FirstName}}</span></span> <span contenteditable="false" class="e-mention-chip"><span>{{LastName}}</span></span>,</p>
   <p>We are thrilled to have you with us! Your unique promotional code for this month is: <span contenteditable="false" class="e-mention-chip"><span>{{PromoCode}}</span></span>.</p>
   <p>Your current subscription plan is: <span contenteditable="false" class="e-mention-chip"><span>{{SubscriptionPlan}}</span></span>.</p>
   <p>Your customer ID is: <span contenteditable="false" class="e-mention-chip"><span>{{CustomerID}}</span></span>.</p>
   <p>Your promotional code expires on: <span contenteditable="false" class="e-mention-chip"><span>{{ExpirationDate}}</span></span>.</p>
   <p>Feel free to browse our latest offerings and updates. If you need any assistance, don't hesitate to contact us at <a href="mailto:{{SupportEmail}}"><span contenteditable="false" class="e-mention-chip"><span>{{SupportEmail}}</span></span></a> or call us at <span contenteditable="false" class="e-mention-chip"><span>{{SupportPhoneNumber}}</span></span>.</p>
   <p>Best regards,<br>The <span contenteditable="false" class="e-mention-chip"><span>{{CompanyName}}</span></span> Team</p>`;

    public items: ItemModel[] = [
        { text: 'First Name' },
        { text: 'Last Name' },
        { text: 'Support Email' },
        { text: 'Company Name' },
        { text: 'Promo Code' },
        { text: 'Support Phone Number' },
        { text: 'Customer ID' },
        { text: 'Expiration Date' },
        { text: 'Subscription Plan' },
    ];

   public dropdownContent : string = `<span style="display:inline-flex;"><span class="e-rte-dropdown-btn-text">Insert Field</span></span>`;
   
   public textToValueMap: { [key: string]: string } = {
        'First Name': 'FirstName',
        'Last Name': 'LastName',
        'Support Email': 'SupportEmail',
        'Company Name': 'CompanyName',
        'Promo Code': 'PromoCode',
        'Support Phone Number': 'SupportPhoneNumber',
        'Customer ID': 'CustomerID',
        'Expiration Date': 'ExpirationDate',
        'Subscription Plan': 'SubscriptionPlan'
    };

    public fieldsData: { [key: string]: string } = { text: 'text' };
    public mentionChar: string = '{{';
    public mergeData: any = [
        { text: 'First Name', value: 'FirstName' },
        { text: 'Last Name', value: 'LastName' },
        { text: 'Support Email', value: 'SupportEmail' },
        { text: 'Company Name', value: 'CompanyName' },
        { text: 'Promo Code', value: 'PromoCode' },
        { text: 'Support Phone Number', value: 'SupportPhoneNumber' },
        { text: 'Customer ID', value: 'CustomerID' },
        { text: 'Expiration Date', value: 'ExpirationDate' },
        { text: 'Subscription Plan', value: 'SubscriptionPlan' },
    ];

    public tools: object = {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
            'CreateLink', 'Image', 'CreateTable', '|',
            { tooltipText: 'Merge Data', template: '#merge_data' },
            { tooltipText: 'Insert Field', template: '#insertField' },
            'SourceCode', '|', 'Undo', 'Redo'
        ],
    };

    onActionBegin(args: ActionBeginEventArgs) {
        if (
            args.requestType === 'EnterAction' &&
            this.mentionObj.element.classList.contains('e-popup-open')
        ) {
            args.cancel = true;
        }
    }

    OnActionComplete(e: ActionCompleteEventArgs): void {
        if (e.requestType === 'SourceCode') {
            this.mailMergeEditor.getToolbar().querySelector('#merge_data').parentElement.classList.add('e-overlay');
            this.mailMergeEditor.getToolbar().querySelector('#insertField').parentElement.classList.add('e-overlay');
        } else if (e.requestType === 'Preview') {
            this.mailMergeEditor.getToolbar().querySelector('#merge_data').parentElement.classList.remove('e-overlay');
            this.mailMergeEditor.getToolbar().querySelector('#insertField').parentElement.classList.remove('e-overlay');
        }
    }

    onItemSelect(args: MenuEventArgs): void {
        if (args.item.text != null) {
            const value = this.textToValueMap[args.item.text];
            const trimmedValue = value.trim();
            this.mailMergeEditor.formatter.editorManager.nodeSelection.restore();
            this.mailMergeEditor.executeCommand(
                'insertHTML',
                `<span contenteditable="false" class="e-mention-chip"><span>{{${trimmedValue}}}</span></span>&nbsp;`,
                { undo: true }
            );
        }
    }

    public displayTemplate(data: any): string {
        return `{{${data.value}}}`;
    }

    public placeholderData: any = {
        FirstName: 'John',
        LastName: 'Doe',
        PromoCode: 'ABC123',
        SubscriptionPlan: 'Premium',
        CustomerID: '123456',
        ExpirationDate: '2024-12-31',
        SupportEmail: 'support@example.com',
        SupportPhoneNumber: '+1-800-555-5555',
        CompanyName: 'Example Inc.',
    };

    onClickHandler(): void {
        if (this.mailMergeEditor) {
            let editorContent = this.mailMergeEditor.value;
            let mergedContent = this.replacePlaceholders(editorContent, this.placeholderData);
            if ((this.mailMergeEditor as any).formatter.getUndoRedoStack().length === 0) {
                (this.mailMergeEditor as any).formatter.saveData();
            }
            this.mailMergeEditor.value = mergedContent;
            this.mailMergeEditor.dataBind();
            (this.mailMergeEditor as any).formatter.saveData();
        } else {
            console.log('MailMergeEditor is not initialized.');
        }
    }

    replacePlaceholders(template: string, data: { [key: string]: string }): string {
        return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
            const value = data[key.trim()];
            const result = value !== undefined ? value : match;
            return result;
        });
    }
}
