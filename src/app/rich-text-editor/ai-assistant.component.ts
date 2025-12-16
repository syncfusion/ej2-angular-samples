import { Component, Inject, ViewChild, ViewEncapsulation } from "@angular/core";
import { AIAssistantPromptRequestArgs, AIAssistantService, HtmlEditorService, ImageService, LinkService, PasteCleanupService, QuickToolbarService, QuickToolbarSettingsModel, RichTextEditorComponent, RichTextEditorModule, TableService, ToolbarService, ToolbarSettingsModel, CodeBlockService } from "@syncfusion/ej2-angular-richtexteditor";
import { SBActionDescriptionComponent } from "../common/adp.component";
import { AI_SERVICE_URL, getUserID } from "../common/ai-service";
import { CommonModule } from "@angular/common";
import { AIToastComponent } from "../common/ai-toast.component";

@Component({
    selector: 'control-content',
    templateUrl: 'ai-assistant.html',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    providers: [AIAssistantService, HtmlEditorService, ToolbarService, QuickToolbarService, ImageService, TableService, LinkService, PasteCleanupService, CodeBlockService],
    imports: [SBActionDescriptionComponent, CommonModule,  RichTextEditorModule, SBActionDescriptionComponent, AIToastComponent]
})
export class AIAssistantEditorComponent {
    @ViewChild('editor')
    public editor: RichTextEditorComponent;

    public userID: string;

    public abortController: AbortController;

    public toolbarSettings: ToolbarSettingsModel = {
        items: ['AICommands', 'AIQuery', '|', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '|', 'Alignments', 'Formats', 'OrderedList', 
        'UnorderedList', 'CheckList', 'CodeBlock',  'Blockquote', 'CreateLink', 'Image', 'CreateTable', '|', 'SourceCode', '|', 'Undo', 'Redo' ]  
    };

    public quickToolbarSettings: QuickToolbarSettingsModel = {
        text: ['AICommands', 'AIQuery', '|', 'Bold', 'Italic', 'Underline', 'StrikeThrough', 'Fontcolor', 'BackgroundColor', '|' , 'Unorderedlist', 'Orderedlist']
    }

    constructor(@Inject('sourceFiles') sourceFiles: any) {
        sourceFiles.files = ['service.ts', 'ai-assistant.html'];
    }

    async onAIAssistantPromptRequest(args: AIAssistantPromptRequestArgs): Promise<void> {
        this.userID = await getUserID();
        console.log(this.userID);
        try {
            this.abortController = new AbortController();
            const response: Response = await fetch(AI_SERVICE_URL + '/api/stream', {
                method: 'POST',
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization": this.userID
                },
                body: JSON.stringify( { message: args.prompt + (args.text) }),
                signal: this.abortController.signal
            });
            if (!response.ok) {
                const errorData = await response.json(); // read the JSON body
                throw new Error(errorData.error || `HTTP Error ${response.status}`);
            }
            const stream: ReadableStream<string> = response.body.pipeThrough(new TextDecoderStream());
            let fullText: string = '';
            for await (const chunk of stream as unknown as AsyncIterable<string>) {
                fullText += chunk;
                this.editor.addAIPromptResponse(fullText, false);
            }
            this.editor.addAIPromptResponse(fullText, true); // Final update
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('AI Request aborted by user.');
                return;
            } else if (error.message.includes('token limit')) {
                this.editor.addAIPromptResponse(error.message, false);
                this.editor.addAIPromptResponse(error.message, true);
                document.querySelector('.banner-message').innerHTML = error.message;
                document.querySelector('.sb-header1').classList.remove('sb-hide');
            } else {
                console.error('There was a problem with your fetch operation:', error);
            }
        }
    }
}