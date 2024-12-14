import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule, TabModule } from '@syncfusion/ej2-angular-navigations';
import { DocumentEditorAllModule, DocumentEditorContainerAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { DropDownListModule, ComboBoxModule, DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { SliderModule, NumericTextBoxModule, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { DocEditorComponent } from './default.component';
import { PrintComponent } from './print.component';
import { ExportComponent } from './advanced-exporting.component';
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
import { DocumentEditorChartComponent } from './chart.component';
import { DocumentEditorProtectionComponent } from './document-protection.component';
import { CommentsComponent } from './comments.components';
import { AutoSaveComponent } from './auto-save.component';
import { ToolbarCustomizationComponent } from './toolbar-customization.component';
import { WebLayoutComponent } from './web-layout.component';
import { TrackChangesComponent } from './track-changes.component';
import { FormFieldsComponent } from './form-fields.component';
import { MailMergeComponent } from './mail-merge.component';
import { NotesComponent } from './notes.component';
import {ColorPickerCustomizationComponent} from './color-picker-customization.component';
import { HeadingNavigationComponent } from './heading-navigation.component';
import { MultipleColumnsComponent } from './multiple-columns.component';
import { DocumentListComponent } from './document-list.component';
import { RuleComponent } from './ruler.component';
import { BindUIDocumentComponent } from './bindUI-to-document.component';
import { AutoShapesComponent } from './autoshapes.component';

export const documentEditorAppRoutes: Object[] = [
    // tslint:disable:max-line-length
    { path: ':theme/document-editor/default', component: DocEditorComponent, name: 'Default functionalities', order: '01', category: 'DocumentEditor', description: "The Document Editor component is used to create, edit, view, and print Word documents in web applications." },
    { path: ':theme/document-editor/bindUI-to-document', component: BindUIDocumentComponent, name: 'Bind UI To Document', order: '01', category: 'DocumentEditor', description: "The Document Editor component in Angular platform is used to create, edit, view, and print Word documents in web applications." },
    { path: ':theme/document-editor/document-list', component: DocumentListComponent, name: 'Document List', order: '02', category: 'File Management', description: "The Document Editor component in JavaScript platform is used to opening a Word document in both read-only and editable modes using the Document Editor. It is presented in a modal dialog, initiated from a list of documents within the grid view." },
    { path: ':theme/document-editor/mail-merge', component: MailMergeComponent, name: 'Mail Merge', order: '03', category: 'Mail Merge', description: "The Document Editor component provides support to mail merge document with the help of Syncfusion® DocIO." },
    { path: ':theme/document-editor/comments', component: CommentsComponent, name: 'Comments', order: '04', category: 'Review', description: "The Document Editor component supports add and edit comments in a Word document for comment discussion." },
    { path: ':theme/document-editor/track-changes', component: TrackChangesComponent, name: 'Track Changes', order: '04', category: 'Review', description: "The Document Editor component in JavaScript platform allows users to view, make changes and accept or reject them in a Word document." },
    { path: ':theme/document-editor/document-protection', component: DocumentEditorProtectionComponent, name: 'Document Protection', order: '05', category: 'Security', description: "The Document Editor provides document protection supports to restrict the types of changes can be made to the document by a user/user group." },
    { path: ':theme/document-editor/custom-context-menu', component: CustomContextMenuComponent, name: 'Custom Context Menu', order: '06', category: 'Customization', description: "The Document Editor supports custom options for users who use to add custom options in context menu." },
    { path: ':theme/document-editor/auto-save', component: AutoSaveComponent, name: 'Auto Save', order: '06', category: 'Customization', description: "The Document Editor supports auto save functionality to let the users for saving the documents automatically at customized time interval." },
    { path: ':theme/document-editor/toolbar-customization', component: ToolbarCustomizationComponent, name: 'Toolbar Customization', order: '06', category: 'Customization', description: "The Document Editor component supports to hide or show existing items in toolbar.Also,to add new items in toolbar." },
    { path: ':theme/document-editor/color-picker-customization', component: ColorPickerCustomizationComponent, name: 'Color Picker Customization', order: '06', category: 'Customization', description: "The Document Editor component supports to to customize color picker in appearance." },
    { path: ':theme/document-editor/right-to-left', component: RightToLeftComponent, name: 'Right to Left', order: '07', category: 'RTL', description: "The Document Editor component is used to create, edit, view, and print Word documents in web applications." },
    { path: ':theme/document-editor/print', component: PrintComponent, name: 'Print', order: '08', category: 'Exporting', description: "The Document Editor component is used to view and print Word documents in web applications by injecting only the modules that are necessary." },
    { path: ':theme/document-editor/advancedExporting', component: ExportComponent, name: 'Advanced Exporting', order: '08', category: 'Exporting', description: "The Document Editor component is used to export the document to other formats like Pdf, Rtf, HTML, ODT, WordML etc. from document editor" },
    { path: ':theme/document-editor/table-of-contents', component: TableOfContentsComponent, name: 'Table of Contents', order: '09', category: 'References', description: "The Document Editor supports table of contents with options for including hyperlink, page number, right-aligned tabs, and styles." },
    { path: ':theme/document-editor/notes', component: NotesComponent, name: 'Footnotes and Endnotes', order: '09', category: 'References', description: "The DocumentEditor provides support to insert footnotes and endnotes to provide more information about something in the document." },
    { path: ':theme/document-editor/autoshapes', component: AutoShapesComponent, name: 'Auto Shapes', order: '10', category: 'Shapes', description: "The Document Editor component supports Auto shapes preservation." },
    { path: ':theme/document-editor/web-layout', component: WebLayoutComponent, name: 'Web Layout', order: '11', category: 'View', description: "The Document Editor component supports continuous layout type to display a word document in a single page." },
    { path: ':theme/document-editor/ruler', component: RuleComponent, name: 'Ruler', order: '11', category: 'View', description: "The Document Editor component supports ruler to set tab stops, margins, indents and move table borders." },
    { path: ':theme/document-editor/heading-navigation', component: HeadingNavigationComponent, name: 'Heading navigation', order: '11', category: 'View', description: "The Document Editor component supports ruler to set tab stops, margins, indents and move table borders." },
    { path: ':theme/document-editor/character-formatting', component: CharacterFormattingComponent, name: 'Character Formatting', order: '12', category: 'Editing Features', description: "The Document Editor supports character formatting such as bold, italic, underline, subscript, superscript, font color, and more." },
    { path: ':theme/document-editor/paragraph-formatting', component: ParagraphFormattingComponent, name: 'Paragraph Formatting', order: '12', category: 'Editing Features', description: "The Document Editor supports paragraph formatting such as indentation, paragraph spacing, line spacing, and text alignment." },
    { path: ':theme/document-editor/styles', component: StylesComponent, name: 'Styles', order: '12', category: 'Editing Features', description: "The Document Editor supports both built-in and custom styles for character format and paragraph format." },
    { path: ':theme/document-editor/bullets-numbering', component: BulletsNumberingComponent, name: 'Bullets and Numbering', order: '12', category: 'Editing Features', description: "The Document Editor supports bullets and numbering. Both single list and multi-level lists can be added." },
    { path: ':theme/document-editor/links-bookmarks', component: HyperlinksBookmarksComponent, name: 'Hyperlinks and Bookmarks', order: '12', category: 'Editing Features', description: "The Document Editor supports hyperlinks and bookmarks. The link can be a file, mail, webpage, or bookmark." },
    { path: ':theme/document-editor/table-formatting', component: TableFormattingComponent, name: 'Table Formatting', order: '12', category: 'Editing Features', description: "The Document Editor supports table formatting such as cell margins, cell spacing, horizontal merge, vertical merge, border styles, background color, and more." },
    { path: ':theme/document-editor/section-formatting', component: SectionFormattingComponent, name: 'Section Formatting', order: '12', category: 'Editing Features', description: "The Document Editor supports section formatting such as page size, page margins, header distance, and footer distance." },
    { path: ':theme/document-editor/headers-footers', component: HeadersFootersComponent, name: 'Headers and Footers', order: '12', category: 'Editing Features', description: "The Document Editor supports headers and footers. Different headers and footers can be added to the first page, odd pages, and even pages." },
    { path: ':theme/document-editor/form-fields', component: FormFieldsComponent, name: 'Form Fields', order: '12', category: 'Editing Features', description: "The Document Editor component in JavaScript platform allows users to design and fill legacy form fields (text, check box, and drop down) in a Word document." },
    { path: ':theme/document-editor/multiple-columns', component: MultipleColumnsComponent, name: 'Multiple Columns', order: '12', category: 'References', description: "The Document Editor supports add or remove columns." },
    { path: ':theme/document-editor/chart', component: DocumentEditorChartComponent, name: 'Chart Preservation', order: '13', category: 'Charts', description: "The Document Editor supports chart preservation for users who use to view their business reports with intuitive graphical data visualization." },
];

export const DocumentEditorSampleModule: ModuleWithProviders<any> = RouterModule.forChild(documentEditorAppRoutes);


