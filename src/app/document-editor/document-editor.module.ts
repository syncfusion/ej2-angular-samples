import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { DocumentEditorAllModule, DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { DropDownListModule, ComboBoxModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SliderModule, NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DocEditorComponent } from './default.component';
import { PrintComponent } from './print.component';
import { RightToLeftComponent } from './right-to-left.component';
import { BrowserModule } from '@angular/platform-browser';
import { StylesComponent } from './styles.component';
import { ParagraphFormattingComponent } from './paragraph-formatting.component';
import { CharacterFormattingComponent } from './character-formatting.component';
import { BulletsNumberingComponent } from './bullets-numbering.component';
import { HyperlinksBookmarksComponent } from './links-bookmarks.component';
import { TableFormattingComponent } from './table-formatting.component';
import { SectionFormattingComponent } from './section-formatting.component';
import { HeadersFootersComponent } from './headers-footers.component';
import { TableOfContentsComponent } from './table-of-contents.component';
import { CustomContextMenuComponent } from './custom-context-menu.component';
import { SharedModule } from '../common/shared.module';

export const documentEditorAppRoutes: Object[] = [
    // tslint:disable:max-line-length
    { path: ':theme/document-editor/default', component: DocEditorComponent, name: 'Default functionalities', order: '01', category: 'DocumentEditor', description: "The Document Editor component is used to create, edit, view, and print Word documents in web applications." },
    { path: ':theme/document-editor/character-formatting', component: CharacterFormattingComponent, name: 'Character Formatting', order: '02', category: 'Editing Features', description: "The Document Editor supports character formatting such as bold, italic, underline, subscript, superscript, font color, and more." },
    { path: ':theme/document-editor/paragraph-formatting', component: ParagraphFormattingComponent, name: 'Paragraph Formatting', order: '02', category: 'Editing Features', description: "The Document Editor supports paragraph formatting such as indentation, paragraph spacing, line spacing, and text alignment." },
    { path: ':theme/document-editor/styles', component: StylesComponent, name: 'Styles', order: '02', category: 'Editing Features', description: "The Document Editor supports both built-in and custom styles for character format and paragraph format." },
    { path: ':theme/document-editor/bullets-numbering', component: BulletsNumberingComponent, name: 'Bullets and Numbering', order: '02', category: 'Editing Features', description: "The Document Editor supports bullets and numbering. Both single list and multi-level lists can be added." },
    { path: ':theme/document-editor/links-bookmarks', component: HyperlinksBookmarksComponent, name: 'Hyperlinks and Bookmarks', order: '02', category: 'Editing Features', description: "The Document Editor supports hyperlinks and bookmarks. The link can be a file, mail, webpage, or bookmark." },
    { path: ':theme/document-editor/table-formatting', component: TableFormattingComponent, name: 'Table Formatting', order: '02', category: 'Editing Features', description: "The Document Editor supports table formatting such as cell margins, cell spacing, horizontal merge, vertical merge, border styles, background color, and more." },
    { path: ':theme/document-editor/section-formatting', component: SectionFormattingComponent, name: 'Section Formatting', order: '02', category: 'Editing Features', description: "The Document Editor supports section formatting such as page size, page margins, header distance, and footer distance." },
    { path: ':theme/document-editor/headers-footers', component: HeadersFootersComponent, name: 'Headers and Footers', order: '02', category: 'Editing Features', description: "The Document Editor supports headers and footers. Different headers and footers can be added to the first page, odd pages, and even pages." },
    { path: ':theme/document-editor/table-of-contents', component: TableOfContentsComponent, name: 'Table of Contents', order: '02', category: 'Editing Features', description: "The Document Editor supports table of contents with options for including hyperlink, page number, right-aligned tabs, and styles." },
    { path: ':theme/document-editor/print', component: PrintComponent, name: 'Print', order: '03', category: 'Print', type: 'update', description: "The Document Editor component is used to view and print Word documents in web applications by injecting only the modules that are necessary." },
    { path: ':theme/document-editor/right-to-left', component: RightToLeftComponent, name: 'Right to Left', order: '04', category: 'RTL', description: "The Document Editor component is used to create, edit, view, and print Word documents in web applications." },
    { path: ':theme/document-editor/custom-context-menu', component: CustomContextMenuComponent, name: 'Custom Context Menu', order: '05', category: 'Customization', type: 'new', description: "The Document Editor supports custom options for users who use to add custom options in context menu." }
];

export const documentEditorRouter: ModuleWithProviders = RouterModule.forChild(documentEditorAppRoutes);

@NgModule({
    // tslint:disable-next-line:max-line-length
    imports: [SharedModule, documentEditorRouter, FormsModule, ToolbarModule, DropDownListAllModule, ColorPickerModule, SplitButtonModule,
        ComboBoxModule, TabModule, DocumentEditorAllModule, DocumentEditorContainerAllModule, DropDownListModule, SliderModule, NumericTextBoxModule,
        CheckBoxModule, ButtonModule, DropDownButtonModule, DialogModule, BrowserModule],
    // tslint:disable-next-line:max-line-length
    declarations: [DocEditorComponent, CharacterFormattingComponent, ParagraphFormattingComponent, StylesComponent,
        BulletsNumberingComponent, HyperlinksBookmarksComponent, TableFormattingComponent, SectionFormattingComponent,
        HeadersFootersComponent, TableOfContentsComponent, PrintComponent, RightToLeftComponent, CustomContextMenuComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentEditorSampleModule {
}
