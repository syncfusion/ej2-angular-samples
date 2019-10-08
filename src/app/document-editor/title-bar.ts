import { createElement, Event, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { DocumentEditor, FormatType } from '@syncfusion/ej2-angular-documenteditor';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
/**
 * Represents document editor title bar.
 */
export class TitleBar {
    private tileBarDiv: HTMLElement;
    private documentTitle: HTMLElement;
    private documentTitleContentEditor: HTMLElement;
    private export: DropDownButton;
    private print: Button;
    private open: Button;
    private documentEditor: DocumentEditor;
    private isRtl: boolean;
    constructor(element: HTMLElement, docEditor: DocumentEditor, isShareNeeded: Boolean, isRtl?: boolean) {
        this.isRtl = isRtl;
        //initializes title bar elements.
        this.tileBarDiv = element;
        this.documentEditor = docEditor;
        this.initializeTitleBar(isShareNeeded);
        this.wireEvents();
    }
    private initializeTitleBar = (isShareNeeded: Boolean): void => {
        let downloadText: string;
        let downloadToolTip: string;
        let printText: string;
        let printToolTip: string;
        let openText: string;
        let documentTileText: string;
        if (!this.isRtl) {
            downloadText = 'Download';
            downloadToolTip = 'Download this document.';
            printText = 'Print';
            printToolTip = 'Print this document (Ctrl+P).';
            openText = 'Open';
            documentTileText = 'Document Name. Click or tap to rename this document.';
        } else {
            downloadText = 'تحميل';
            downloadToolTip = 'تحميل هذا المستند';
            printText = 'طباعه';
            printToolTip = 'طباعه هذا المستند (Ctrl + P)';
            openText = 'فتح';
            documentTileText = 'اسم المستند. انقر أو اضغط لأعاده تسميه هذا المستند';
        }
        // tslint:disable-next-line:max-line-length
        this.documentTitle = createElement('label', { id: 'documenteditor_title_name', styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
        let iconCss: string = 'e-de-padding-right';
        let btnFloatStyle: string = 'float:right;';
        let titleCss: string = '';
        if (this.isRtl) {
            iconCss = 'e-de-padding-right-rtl';
            btnFloatStyle = 'float:left;';
            titleCss = 'float:right;';
        }
        // tslint:disable-next-line:max-line-length
        this.documentTitleContentEditor = createElement('div', { id: 'documenteditor_title_contentEditor', className: 'single-line', styles: titleCss });
        this.documentTitleContentEditor.appendChild(this.documentTitle);
        this.tileBarDiv.appendChild(this.documentTitleContentEditor);
        this.documentTitleContentEditor.setAttribute('title', 'Document Name. Click or tap to rename this document.');
        let btnStyles: string = btnFloatStyle + 'background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;'
            + 'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;'
            + 'margin-top: 2px;';
        // tslint:disable-next-line:max-line-length
        this.print = this.addButton('e-de-icon-Print ' + iconCss, printText, btnStyles, 'de-print', printToolTip, false) as Button;
        this.open = this.addButton('e-de-icon-Open ' + iconCss, openText, btnStyles, 'de-open', documentTileText, false) as Button;
        let items: ItemModel[] = [
            { text: 'Microsoft Word (.docx)', id: 'word' },
            { text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt' },
        ];
        // tslint:disable-next-line:max-line-length
        this.export = this.addButton('e-de-icon-Download ' + iconCss, downloadText, btnStyles, 'documenteditor-share', downloadToolTip, true, items) as DropDownButton;
        if (!isShareNeeded) {
            this.export.element.style.display = 'none';
        } else {
            this.open.element.style.display = 'none';
        }
    }
    private setTooltipForPopup(): void {
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
    }
    private wireEvents = (): void => {
        this.print.element.addEventListener('click', this.onPrint);
        this.open.element.addEventListener('click', (e: Event) => {
            if ((e.target as HTMLInputElement).id === 'de-open') {
                let fileUpload: HTMLInputElement = document.getElementById('uploadfileButton') as HTMLInputElement;
                fileUpload.value = '';
                fileUpload.click();
            }
        });
        this.documentTitleContentEditor.addEventListener('keydown', (e: KeyboardEventArgs) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.documentTitleContentEditor.contentEditable = 'false';
                if (this.documentTitleContentEditor.textContent === '') {
                    this.documentTitleContentEditor.textContent = 'Document1';
                }
            }
        });
        this.documentTitleContentEditor.addEventListener('blur', (): void => {
            if (this.documentTitleContentEditor.textContent === '') {
                this.documentTitleContentEditor.textContent = 'Document1';
            }
            this.documentTitleContentEditor.contentEditable = 'false';
            this.documentEditor.documentName = this.documentTitle.textContent;
        });
        this.documentTitleContentEditor.addEventListener('click', (): void => {
            this.updateDocumentEditorTitle();
        });
    }
    private updateDocumentEditorTitle = (): void => {
        this.documentTitleContentEditor.contentEditable = 'true';
        this.documentTitleContentEditor.focus();
        window.getSelection().selectAllChildren(this.documentTitleContentEditor);
    }
    // Updates document title.
    public updateDocumentTitle = (): void => {
        if (this.documentEditor.documentName === '') {
            this.documentEditor.documentName = 'Untitled';
        }
        this.documentTitle.textContent = this.documentEditor.documentName;
    }
    // tslint:disable-next-line:max-line-length
    private addButton(iconClass: string, btnText: string, styles: string, id: string, tooltipText: string, isDropDown: boolean, items?: ItemModel[]): Button | DropDownButton {
        let button: HTMLButtonElement = createElement('button', { id: id, styles: styles }) as HTMLButtonElement;
        this.tileBarDiv.appendChild(button);
        button.setAttribute('title', tooltipText);
        if (isDropDown) {
            // tslint:disable-next-line:max-line-length
            let dropButton: DropDownButton = new DropDownButton({ select: this.onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: (): void => { this.setTooltipForPopup(); } }, button);
            return dropButton;
        } else {
            let ejButton: Button = new Button({ iconCss: iconClass, content: btnText }, button);
            return ejButton;
        }
    }
    private onPrint = (): void => {
        this.documentEditor.print();
    }
    private onExportClick = (args: MenuEventArgs): void => {
        let value: string = args.item.id;
        switch (value) {
            case 'word':
                this.save('Docx');
                break;
            case 'sfdt':
                this.save('Sfdt');
                break;
        }
    }
    private save = (format: string): void => {
        // tslint:disable-next-line:max-line-length
        this.documentEditor.save(this.documentEditor.documentName === '' ? 'sample' : this.documentEditor.documentName, format as FormatType);
    }
}