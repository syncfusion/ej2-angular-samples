/**
 * Rich Text Editor Markdown Preview Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { addClass, removeClass, Browser } from '@syncfusion/ej2-base';
import { RichTextEditorComponent, ToolbarService, LinkService, EditorMode, ToolbarType, RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ImageService, MarkdownEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { createElement, KeyboardEventArgs, isNullOrUndefined } from '@syncfusion/ej2-base';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter'
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SplitterComponent, SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['markdown-preview.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, TableService, MarkdownEditorService],
    standalone: true,
    imports: [SBActionDescriptionComponent, SplitterModule, RichTextEditorModule, SBDescriptionComponent]
})
export class MarkdownOverviewComponent {

    @ViewChild('defaultRTE')
    public rteObj: RichTextEditorComponent;
    @ViewChild('splitterInstance') splitterObj: SplitterComponent;
    public srcArea: any;
    public textArea: any;
    public mode: EditorMode = 'Markdown';
    public placeholder: string = 'Enter the text here...';
    public value: string = `## Welcome to the Syncfusion® EJ2 Markdown Editor

The **Syncfusion Rich Text Editor** in **Markdown** mode delivers a lightweight, distraction-free editing experience with full Markdown syntax support — powered natively by Syncfusion’s own **MarkdownConverter**.

Write beautiful documents faster using simple, readable Markdown syntax and see the formatted result instantly with live preview.

### Why Choose Markdown Mode?

- Clean, plain-text syntax that is easy to read and write — even in raw form
- Input or modify text, apply formatting, and view the Markdown preview side-by-side using the splitter control.
- Toolbar + keyboard shortcuts for rapid formatting
- Easy to convert content to HTML or other formats
- Ideal for documentation, notes, and developer-focused content
- Reduces clutter and keeps the writing experience distraction-free

### Supported Markdown Features in Action

# Headings
## Markdown Editor Demo
### Create Clean, Structured Content
#### Organize Sections Effortlessly
##### Add Subheadings for Clarity
###### Provide Notes or Additional Info

Headings help structure your content, making it easier to read, scan, and organize information within the Markdown editor.

#### Text Formatting
**Bold text highlights important information.**

*Markdown makes writing simple and clean.*

**_You can also combine bold and italic for emphasis._**

~~Use strikethrough to indicate removed or outdated content.~~

\`Inline code is perfect for short code snippets like commands or variables.\`

### Table
Create simple tables to organize information clearly and quickly.

| Feature | Description |
|---------|-------------|
| Markdown   | Lightweight, easy-to-read formatting syntax |
| Preview    | Shows formatted output side-by-side |

#### Lists

**Unordered**
- Explore the editor features
- Add content with simple syntax
    - Insert nested bullet points
    - Organize topics hierarchically
- Keep your notes clear and readable

**Ordered**
1. Start writing your content
2. Apply Markdown formatting
    1. Add sub-steps for detailed tasks
    2. Improve clarity with structure
3. Review and finalize your document

**Task List**
- [x] Completed task
- [ ] Write documentation
- [ ] Release new version

#### Blockquotes

> Markdown makes writing on the web beautiful and readable.
>
> — John Gruber, Creator of Markdown

#### Code Blocks
Inline code: Use \`npm install &#64;syncfusion/ej2-richtexteditor\``; 
    public tools: ToolbarModule = {
        type: ToolbarType.Expand,
        enableFloating :false,
        items: ['Bold', 'Italic', 'StrikeThrough', '|', 'Formats', 'Blockquote', 'OrderedList',
        'UnorderedList', '|', 'CreateLink', 'Image', 'CreateTable',
        '|', 'Undo', 'Redo']
    };
    public onCreate(): void {
        setTimeout(()=>{
            this.rteObj.refreshUI();
            this.textArea = this.rteObj.contentModule.getEditPanel();
            this.srcArea = document.querySelector('.source-code');
            this.updateValue();
        },0)
    }
    public onChange(): void {
        this.updateValue();
    }
    public resizing(): void {
        this.rteObj.refreshUI();
    }
    public updateValue(): void {
        this.srcArea.innerHTML = MarkdownConverter.toHtml((this.rteObj.contentModule.getEditPanel() as HTMLTextAreaElement).value) as string;
    }
    public updateOrientation(): void {
        if (Browser.isDevice) {
            this.splitterObj.orientation = 'Vertical';
            (document.body.querySelector('.heading') as HTMLElement).style.width = 'auto';
        }
    }
}
