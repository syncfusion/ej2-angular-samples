import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicEditingComponent } from './basic-editing.component';
import { ToolbarComponent } from './toolbar.component';
import { PropertiesComponent } from './properties.component';
import { MethodsComponent } from './methods.component';
import { EventsComponent } from './events.component';
import { FullFeaturedEditingComponent } from './full-featured-editing.component';
import { InlineEditingComponent } from './inline-editing.component';
import { SlashCommandsComponent } from './slash-commands.component';
import { EmailComposerComponent } from './email-composer.component';
import { ForumPostEditorComponent } from './forum-post-editor.component';
import { HtmlPreviewComponent } from './html-preview.component';
import { EditorInDialogComponent } from './editor-in-dialog.component';
import { ChatUiComponent } from './chat-ui.component';
import { TabComponent } from './tab.component';

export const rteUIAppRoutes: Object[] = [
    { path: ':theme/rich-text-editor-ui/basic-editing', component: BasicEditingComponent, name: 'Basic Editing', description: 'This sample demonstrates the basic rendering of the Rich Text Editor UI component with a focused toolbar set and a pre-populated weekly update document.', order: '01', category: ' Editor' },
    { path: ':theme/rich-text-editor-ui/full-featured-editing', component: FullFeaturedEditingComponent, name: 'Full Featured Editing', description: 'This sample demonstrates the full-featured Rich Text Editor UI with the complete toolbar, slash command support, and a pre-populated document.', order: '01', category: ' Editor' },
    { path: ':theme/rich-text-editor-ui/inline-editing', component: InlineEditingComponent, name: 'Inline Editing', description: 'This sample demonstrates the inline editing mode of the Rich Text Editor UI component. The top toolbar is hidden, and formatting tools are available through a quick toolbar on text selection.', order: '01', category: ' Editor' },
    { path: ':theme/rich-text-editor-ui/toolbar', component: ToolbarComponent, name: 'Toolbar', description: 'This sample demonstrates the different toolbar configurations of the Rich Text Editor UI component. Use the dropdown controls to change the toolbar type, position, and floating behavior dynamically.', order: '02', category: 'Features' },
    { path: ':theme/rich-text-editor-ui/slash-commands', component: SlashCommandsComponent, name: 'Slash Commands', description: 'This sample demonstrates the slash command feature of the Rich Text Editor UI, which allows users to apply formatting and execute custom commands by typing the "/" character.', order: '02', category: 'Features' },
    { path: ':theme/rich-text-editor-ui/properties', component: PropertiesComponent, name: 'Properties', description: 'This sample demonstrates the properties of the Rich Text Editor UI component.', order: '03', category: 'API' },
    { path: ':theme/rich-text-editor-ui/methods', component: MethodsComponent, name: 'Methods', description: 'This sample demonstrates the public methods exposed by the Rich Text Editor UI component. Use the property panel on the right to invoke each method and observe the resulting behavior.', order: '03', category: 'API' },
    { path: ':theme/rich-text-editor-ui/events', component: EventsComponent, name: 'Events', description: 'This sample demonstrates the events that trigger on every action of the Rich Text Editor. The event details are showcased in the event trace panel.', order: '03', category: 'API' },
    { path: ':theme/rich-text-editor-ui/email-composer', component: EmailComposerComponent, name: 'Email Composer', description: 'This sample demonstrates an email composer experience built with the Rich Text Editor UI. Recipients are picked using the MultiSelect component, a Subject field captures the email subject, and the editor provides a rich text area for composing the message with Slash Command support.', order: '04', category: 'Use Cases' },
    { path: ':theme/rich-text-editor-ui/forum-post-editor', component: ForumPostEditorComponent, name: 'Forum Post Editor', description: 'This sample demonstrates a forum discussion interface built with the Rich Text Editor UI and ListView. Users can compose formatted comments, post them, and manage existing comments using copy and delete actions.', order: '04', category: 'Use Cases' },
    { path: ':theme/rich-text-editor-ui/html-preview', component: HtmlPreviewComponent, name: 'HTML Preview', description: 'This sample demonstrates the HTML preview functionality of the Rich Text Editor UI. The editor is paired with a Splitter and a CodeMirror instance to show a live, two-way preview of the underlying HTML source.', order: '04', category: 'Use Cases' },
    { path: ':theme/rich-text-editor-ui/editor-in-dialog', component: EditorInDialogComponent, name: 'Editor in Dialog', description: 'This sample demonstrates how to render the Rich Text Editor UI component inside a Dialog component for composing messages or content.', order: '05', category: 'Integration' },
    { path: ':theme/rich-text-editor-ui/chat-ui', component: ChatUiComponent, name: 'Chat UI', description: 'This sample demonstrates a chat interface built with the Chat UI component and the Rich Text Editor UI as the message composer.', order: '05', category: 'Integration' },
    { path: ':theme/rich-text-editor-ui/tab', component: TabComponent, name: 'Tab', description: 'This sample demonstrates how to embed the Rich Text Editor UI inside a Tab component.', order: '05', category: 'Integration' },
];

export const RTEUISampleModule: ModuleWithProviders<any> = RouterModule.forChild(rteUIAppRoutes);
