import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultRTEComponent } from './rich-text-editor.component';
import { ResizeComponent } from './resize-editor.component';
import { FullFeatureComponent } from './tools.component';
import { EventsComponent } from './client-side-events.component';
import { APIComponent } from './api.component';
import { EnterKeyComponent } from './enter-key-configuration.component';
import { IFrameComponent } from './iframe.component';
import { InlineComponent } from './inline.component';
import { ToolbarTypeComponent } from './types.component';
import { InsertSpecialCharactersComponent } from './insert-special-characters.component';
import { PasteCleanupComponent } from './paste-cleanup.component';
import { ImageComponent } from './image.component';
import { MarkdownDefaultComponent } from './markdown-editor.component';
import { MarkdownPreviewComponent } from './markdown-editor-preview.component';
import { MarkdownCustomComponent } from './markdown-editor-custom-format.component';
import { PrintComponent } from './print.component';
import { BlogPostComponent } from './blog-posting.component';
import { AjaxLoadComponent } from './ajax-load.component';
import { FileBrowserComponent } from './file-browser.component';
import { FormComponent } from './reactive-form.component';
import { TemplateDrivenComponent } from './template-driven.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons'
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { BrowserModule } from '@angular/platform-browser';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { InsertEmoticonsComponent } from './insert-emoticons.component';
import { ButtonModule} from '@syncfusion/ej2-angular-buttons';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { AutoSaveComponent } from './auto-save.component';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { TributeComponent } from './tribute.component';
import { OnlineHtmlEditorComponent } from './online-html-editor.component';

export const rteAppRoutes: Object[] = [
    { path: ':theme/rich-text-editor/tools', component: FullFeatureComponent, name: 'Overview', description: 'This demo describes basic and advanced features of the angular rich text editor control (WYSIWYG HTML Editor) with all its tools and functionalities.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/rich-text-editor', component: DefaultRTEComponent, name: 'Default Functionalities', description: 'This demo shows how to render angular rich text editor (WYSIWYG HTML editor) control with a minimum configuration setting.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/image', component: ImageComponent, name: 'Image', description: 'This demo explains how to insert images with a blob or base64 format, link to the images, image upload, rotate left/right, and more in angular WYSIWYG HTML Editor.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/inline', component: InlineComponent, name: 'Inline', description: 'This demo shows inline WYSIWYG HTML editor that is displayed when selecting the content or simply focusing on the content inside the angular Rich Text Editor.', order: '01', category: 'Rich Text Editor' },
    { path:':theme/rich-text-editor/paste-cleanup', component:PasteCleanupComponent, name:'Paste from MS Word', description:'This demo explains how to clean up HTML when pasting a content from Microsoft Word, Visual Studio Code, Visual Studio, or a web page in angular HTML Editor.', order:'01', category:'Rich Text Editor' },
    { path: ':theme/rich-text-editor/iframe', component: IFrameComponent, name: 'IFrame', description: 'This demo shows how to render a classic angular rich text editor (iframe editor) that was designed by using the iframe element covering all tool functionalities.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/print', component: PrintComponent, name: 'Print', description: 'This demo sample shows how to print the content of the angular rich text editor (HTML editor) with styles and formatting using the print module.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/ajax-load', component: AjaxLoadComponent, name: 'Ajax Content', description: 'This demo shows how to load the content to the editor from external sources like external pages andfiles using the AJAX library in angular WYSIWYG Editor.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/resize-editor', component: ResizeComponent, name: 'Resizable Editor', description: 'This demo explains how to render a resizable angular Editor that allows resizing an editor and viewing its content with an enlarging or shrunk scale.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/api', component: APIComponent, name: 'API', description: 'This demo covers important APIs of the angular rich text editor such as content length, HTML encoding, read-only, retrieve the selected content, and more.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/enter-key-configuration', component: EnterKeyComponent, name: 'Enter Key Configuration', description: 'This demo explains the API usage to customize the enter and shift + enter key actions in the Rich Text Editor content.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/client-side-events', component: EventsComponent, name: 'Events', description: 'This demo explains client-side events of angular HTML Text Editor that is triggered on editing and formatting operations with an event tracer.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/blog-posting', component: BlogPostComponent, name: 'Use Case', description: 'The Rich Text Editor is used in most real-time applications. The angular rich text editor example shows how to design a forum application in angular application.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/auto-save', component: AutoSaveComponent, name: 'Auto Save', description: 'This demo shows how to autosave the content of the editor with customized time intervals and retrieve the saved content in angular Rich Text Editor.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/file-browser', component: FileBrowserComponent, name: 'File Browser', description: 'This demo shows how to insert the image into the Rich Text Editor content using FileManager.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/online-html-editor', component: OnlineHtmlEditorComponent, name: 'Online Html Editor', description: 'The online HTML editor is a demo that provides LIVE experience for both content and HTML editing with Rich Text Editor features in a real-world scenario.', order: '01', category: 'Rich Text Editor' },
    { path: ':theme/rich-text-editor/types', component: ToolbarTypeComponent, name: 'Type', description: 'This demo demonstrates different types and behaviors of a toolbar used in the angular HTML Editor such as expand/collapse, multirow, and floating.', order: '02', category: 'Toolbar' },
    { path: ':theme/rich-text-editor/insert-emoticons', component: InsertEmoticonsComponent, name: 'Insert Emoticons', description: 'This demo demonstrates how to insert emoticons into the rich content in angular WYSIWYG HTML Editor using a custom tool in the editor toolbar.', order: '03', category: 'Custom Tool' },
    { path: ':theme/rich-text-editor/insert-special-characters', component: InsertSpecialCharactersComponent, name: 'Insert Special Characters', description: 'This demo for Syncfusion angular rich text editor component shows the users to add their commands to the toolbar along with the built-in commands.', order: '03', category: 'Custom Tool' },
    { path: ':theme/rich-text-editor/markdown-editor', component: MarkdownDefaultComponent, name: 'Overview', description: 'This demo covers all supported features and functionalities of the JavaScript Markdown editor, which  is another mode of the angular Rich Text Editor.', order: '04', category: 'Markdown Editor'},
    { path: ':theme/rich-text-editor/markdown-editor-preview', component: MarkdownPreviewComponent, name: 'Preview', description: 'This demo shows how to render a angular Markdown editor with LIVE preview for markdown content editing using a third-party library, "marked js".', order: '04', category: 'Markdown Editor' },
    { path: ':theme/rich-text-editor/markdown-editor-custom-format', component: MarkdownCustomComponent, name: 'Custom Format', description: 'This demo explains how to convert markdown content (with the custom format) to valid HTML markup using Markdown-to-HTML of the markdown parser in angular', order: '04', category: 'Markdown Editor' },
    { path: ':theme/rich-text-editor/reactive-form', component: FormComponent, name: 'Reactive Form', description: 'This demo explains how to validate the content and track status using a reactive form of Angular with form group attribute in the Angular WYSIWYG editor.', order: '07', category: 'Forms' },
    { path: ':theme/rich-text-editor/template-driven', component: TemplateDrivenComponent, name: 'Template Driven', description: 'This demo shows template-driven support of an Angular that helps two-way binding using ng-form and ng-model, and name attributes in Angular HTML Editor.', order: '07', category: 'Forms' },
    { path: ':theme/rich-text-editor/tribute', component: TributeComponent, name: 'Tribute JS', description: 'This demo shows how to integrate Mention library like Tribute JS within the JavaScript HTML text editor to get the autocomplete popup with a suggestion list.', order: '08', category: 'Third-parties Integration' }
];

export const RTERouter: ModuleWithProviders<any> = RouterModule.forChild(rteAppRoutes);

@NgModule({
    imports: [BrowserModule, RTERouter, SharedModule, FormsModule, ReactiveFormsModule,TabModule,
        RichTextEditorAllModule, SplitterModule, CheckBoxModule, DialogModule, NumericTextBoxModule,ButtonModule,SwitchModule, RadioButtonModule, TextBoxModule, DropDownListModule],
    exports: [RichTextEditorAllModule, SplitterModule, CheckBoxModule, SwitchModule, DialogModule,TabModule, NumericTextBoxModule,ButtonModule, RadioButtonModule, TextBoxModule, DropDownListModule],
    declarations: [
        DefaultRTEComponent,
        FullFeatureComponent,
        APIComponent,
        EnterKeyComponent,
        EventsComponent,
        IFrameComponent,
        ToolbarTypeComponent,
        PasteCleanupComponent,
        ResizeComponent,
        InlineComponent,
        InsertSpecialCharactersComponent,
        InsertEmoticonsComponent,
        ImageComponent,
        MarkdownDefaultComponent,
        MarkdownPreviewComponent,
        MarkdownCustomComponent,
        PrintComponent,
        BlogPostComponent,
        FileBrowserComponent,
        AjaxLoadComponent,
        FormComponent,
        TemplateDrivenComponent,
        InsertEmoticonsComponent,
        AutoSaveComponent,
        TributeComponent,
        OnlineHtmlEditorComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RTESampleModule {
}