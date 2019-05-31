import { DocumentEditor, ViewChangeEventArgs } from '@syncfusion/ej2-angular-documenteditor';
import { createElement, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { DropDownButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
/**
 * Represents document editor status bar.
 */
export class StatusBar {
    private documentEditor: DocumentEditor;
    private statusBarDiv: HTMLElement;
    private pageCount: HTMLElement;
    private zoom: DropDownButton;
    private pageNumberLabel: HTMLElement;
    private editablePageNumber: HTMLElement;
    public startPage: number = 1;
    get editorPageCount(): number {
        return this.documentEditor.pageCount;
    }
    constructor(parentElement: HTMLElement, docEditor: DocumentEditor) {
        this.statusBarDiv = parentElement;
        this.documentEditor = docEditor;
        this.initializeStatusBar();
        this.wireEvents();
    }
    private initializeStatusBar = (): void => {
        let label: HTMLElement = createElement('label', { styles: 'margin-top: 6px;margin-right: 2px' });
        label.textContent = 'Page ';
        this.statusBarDiv.appendChild(label);

        // tslint:disable-next-line:max-line-length
        this.pageNumberLabel = createElement('label', { id: 'documenteditor_page_no', styles: 'text-transform:capitalize;white-space:pre;overflow:hidden;user-select:none;cursor:text;height:17px;max-width:150px' });
        this.editablePageNumber = createElement('div', { id: 'editablePageNumber', styles: 'border: 1px solid #F1F1F1;display: inline-flex;height: 17px;padding: 0px 4px;', className: 'single-line e-de-pagenumber-text' });
        this.editablePageNumber.appendChild(this.pageNumberLabel);
        this.updatePageNumber();
        this.statusBarDiv.appendChild(this.editablePageNumber);
        this.editablePageNumber.setAttribute('title', 'The current page number in the document. Click or tap to navigate specific page.');
        // tslint:disable-next-line:max-line-length
        let label1: HTMLElement = createElement('label', { styles: 'margin-left:2px;letter-spacing: 1.05px;' });
        label1.textContent = 'of';
        this.statusBarDiv.appendChild(label1);
        // tslint:disable-next-line:max-line-length
        this.pageCount = createElement('label', { id: 'documenteditor_pagecount', styles: 'margin-left:6px;letter-spacing: 1.05px;' });
        this.statusBarDiv.appendChild(this.pageCount);
        this.updatePageCount();
        let zoomBtn: HTMLButtonElement = createElement('button', {
            id: 'documenteditor-zoom',
            // tslint:disable-next-line:max-line-length
            className: 'e-de-print-statusbar'
        }) as HTMLButtonElement;
        this.statusBarDiv.appendChild(zoomBtn);
        zoomBtn.setAttribute('title', 'Zoom level. Click or tap to open the Zoom options.');
        let items: ItemModel[] = [
            {
                text: '200%',
            },
            {
                text: '175%',
            },
            {
                text: '150%',
            },
            {
                text: '125%',
            },
            {
                text: '100%',
            },
            {
                text: '75%',
            },
            {
                text: '50%',
            },
            {
                text: '25%',
            },
            {
                separator: true
            },
            {
                text: 'Fit one page'
            },
            {
                text: 'Fit page width',
            },
        ];
        this.zoom = new DropDownButton({ content: '100%', items: items, select: this.onZoom }, zoomBtn);
    }
    private onZoom = (args: MenuEventArgs) => {
        this.setZoomValue(args.item.text);
        this.updateZoomContent();
    }
    public updateZoomContent = (): void => {
        this.zoom.content = Math.round(this.documentEditor.zoomFactor * 100) + '%';
    }
    private setZoomValue = (text: string): void => {
        if (text.match('Fit one page')) {
            this.documentEditor.fitPage('FitOnePage');
        } else if (text.match('Fit page width')) {
            this.documentEditor.fitPage('FitPageWidth');
        } else {
            this.documentEditor.zoomFactor = parseInt(text, 0) / 100;
        }
    }
    /**
     * Updates page count.
     */
    public updatePageCount = (): void => {
        this.pageCount.textContent = this.editorPageCount.toString();
    }
    /**
     * Updates page number.
     */
    public updatePageNumber = (): void => {
        this.pageNumberLabel.textContent = this.startPage.toString();
    }
    public updatePageNumberOnViewChange = (args: ViewChangeEventArgs): void => {
        if (this.documentEditor.selection
            && this.documentEditor.selection.startPage >= args.startPage && this.documentEditor.selection.startPage <= args.endPage) {
            this.startPage = this.documentEditor.selection.startPage;
        } else {
            this.startPage = args.startPage;
        }
        this.updatePageNumber();
    }
    private wireEvents = (): void => {
        this.editablePageNumber.addEventListener('keydown', (e: KeyboardEventArgs) => {
            if (e.which === 13) {
                e.preventDefault();
                let pageNumber: number = parseInt(this.editablePageNumber.textContent, 0);
                if (pageNumber > this.editorPageCount) {
                    this.updatePageNumber();
                } else {
                    if (this.documentEditor.selection) {
                        this.documentEditor.selection.goToPage(parseInt(this.editablePageNumber.textContent, 0));
                    } else {
                        this.documentEditor.scrollToPage(parseInt(this.editablePageNumber.textContent, 0));
                    }
                }
                this.editablePageNumber.contentEditable = 'false';
                if (this.editablePageNumber.textContent === '') {
                    this.updatePageNumber();
                }
            }
            if (e.which > 64) {
                e.preventDefault();
            }
        });
        this.editablePageNumber.addEventListener('blur', (): void => {
            if (this.editablePageNumber.textContent === '' || parseInt(this.editablePageNumber.textContent, 0) > this.editorPageCount) {
                this.updatePageNumber();
            }
            this.editablePageNumber.contentEditable = 'false';
        });
        this.editablePageNumber.addEventListener('click', (): void => {
            this.updateDocumentEditorPageNumber();
        });
    }
    private updateDocumentEditorPageNumber = (): void => {
        this.editablePageNumber.contentEditable = 'true';
        this.editablePageNumber.focus();
        window.getSelection().selectAllChildren(this.editablePageNumber);
    }
}