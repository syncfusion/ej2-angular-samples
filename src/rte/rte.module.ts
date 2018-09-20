import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DefaultRTEComponent } from './rich-text-editor.component';
import { FullFeatureComponent } from './tools.component';
import { EventsComponent } from './client-side-events.component';
import { APIComponent } from './api.component';
import { IFrameComponent } from './iframe.component';
import { InlineComponent } from './inline.component';
import { ToolbarTypeComponent } from './types.component';
import { CustomToolsComponent } from './custom-toolbar.component';
import { ImageComponent } from './image.component';
import { MarkdownDefaultComponent } from './markdown-editor.component';
import { MarkdownPreviewComponent } from './markdown-editor-preview.component';
import { MarkdownCustomComponent } from './markdown-editor-custom-format.component';
import { PrintComponent } from './print.component';
import { BlogPostComponent } from './blog-posting.component';
import { AjaxLoadComponent } from './ajax-load.component';
import { FormComponent } from './reactive-form.component';
import { TemplateDrivenComponent } from './template-driven.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { BrowserModule } from '@angular/platform-browser';

export const rteAppRoutes: Object[] = [
    { path: ':theme/rte/tools', component: FullFeatureComponent, name: 'Overview', description: 'This demo shows the overview of an HTML and markdown editor that is useful for creating and editing content with formatting using RichTextEditor control.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/rich-text-editor', component: DefaultRTEComponent, name: 'Default Functionalities', description: 'This demo for Essential JS2 RichTextEditor control shows the default rendering of the RichTextEditor control with minimum configuration.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/image', component: ImageComponent, name: 'Image', description: 'The demo demonstrates the option to insert images to your content from a local path or server path with image captions and then link URLs to the images.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/inline', component: InlineComponent, name: 'Inline', description: 'This demo for Essential JS2 RichTextEditor control demonstrates on how to activate the editor on demand while editing the content.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/iframe', component: IFrameComponent, name: 'IFrame', description: 'This demo for Essential JS2 RichTextEditor control demonstrates the default rendering of the RichTextEditor in iframe mode.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/print', component: PrintComponent, name: 'Print', description: 'This demo for Essential JS2 RichTextEditor control shows how to print the content of the editor with its styles.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/ajax-load', component: AjaxLoadComponent, name: 'Ajax Content', description: 'This demo for Essential JS2 RichTextEditor control demonstrates how to load content to the editor from an external source using Ajax library.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/api', component: APIComponent, name: 'API', description: 'This demo demonstrate the usage of API in RichTextEditor control.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/client-side-events', component: EventsComponent, name: 'Events', description: 'This demo for  Essential JS2 RichTextEditor control shows the events that have been triggered during the RichTextEditor operations.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/blog-posting', component: BlogPostComponent, name: 'Use Case', description: 'This demo for  Essential JS2 RichTextEditor control demonstrates how to design forum application using RichTextEditor.', order: '01', category: 'RichTextEditor' },
    { path: ':theme/rte/types', component: ToolbarTypeComponent, name: 'Type', description: 'This demo for Essential JS2 RichTextEditor control demonstrates the different behavior of toolbar support in the RichTextEditor.', order: '03', category: 'Toolbar' },
    { path: ':theme/rte/custom-toolbar', component: CustomToolsComponent, name: 'Custom Tool', description: 'This demo for Essential JS2 RichTextEditor control shows the users to add their commands to the toolbar along with the built-in commands.', order: '03', category: 'Toolbar' },
    { path: ':theme/rte/markdown-editor', component: MarkdownDefaultComponent, name: 'Overview', description: 'This demo for Essential JS2 RichTextEditor control shows the markdown editing in the RichTextEditor with complete features.', order: '04', category: 'Markdown Editor' },
    { path: ':theme/rte/markdown-editor-preview', component: MarkdownPreviewComponent, name: 'Preview', description: 'This demo for Essential JS2 RichTextEditor control shows the users to switch between editing content and its visual preview in Markdown Editor.', order: '04', category: 'Markdown Editor' },
    { path: ':theme/rte/markdown-editor-custom-format', component: MarkdownCustomComponent, name: 'Custom Format', description: 'This demo for Essential JS2 RichTextEditor control demonstrates on how to customize tags of markdown formatting in RichTextEditor.', order: '04', category: 'Markdown Editor' },
    { path: ':theme/rte/reactive-form', component: FormComponent, name: 'Reactive Form', description: 'This demo demonstrates the reactive forms support of the RichTextEditor control.', order: '07', category: 'Forms' },
    { path: ':theme/rte/template-driven', component: TemplateDrivenComponent, name: 'Template Driven', description: 'This demo demonstrates the template-driven forms support of the RichTextEditor control.', order: '07', category: 'Forms' }

];

export const RTERouter: ModuleWithProviders = RouterModule.forChild(rteAppRoutes);

@NgModule({
    imports: [BrowserModule, RTERouter, SharedModule, FormsModule, ReactiveFormsModule,
        RichTextEditorAllModule, CheckBoxModule, DialogModule, NumericTextBoxModule],
    exports: [RichTextEditorAllModule, CheckBoxModule, DialogModule, NumericTextBoxModule],
    declarations: [
        DefaultRTEComponent,
        FullFeatureComponent,
        APIComponent,
        EventsComponent,
        IFrameComponent,
        ToolbarTypeComponent,
        InlineComponent,
        CustomToolsComponent,
        ImageComponent,
        MarkdownDefaultComponent,
        MarkdownPreviewComponent,
        MarkdownCustomComponent,
        PrintComponent,
        BlogPostComponent,
        AjaxLoadComponent,
        FormComponent,
        TemplateDrivenComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RTESampleModule {
}