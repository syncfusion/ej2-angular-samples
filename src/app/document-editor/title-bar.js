import { createElement } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-angular-buttons';
import { DropDownButton } from '@syncfusion/ej2-angular-splitbuttons';
/**
 * Represents document editor title bar.
 */
var TitleBar = /** @class */ (function () {
    function TitleBar(element, docEditor, isShareNeeded, isRtl) {
        var _this = this;
        this.initializeTitleBar = function (isShareNeeded) {
            var downloadText;
            var downloadToolTip;
            var printText;
            var printToolTip;
            var openText;
            var documentTileText;
            if (!_this.isRtl) {
                downloadText = 'Download';
                downloadToolTip = 'Download this document.';
                printText = 'Print';
                printToolTip = 'Print this document (Ctrl+P).';
                openText = 'Open';
                documentTileText = 'Document Name. Click or tap to rename this document.';
            }
            else {
                downloadText = 'تحميل';
                downloadToolTip = 'تحميل هذا المستند';
                printText = 'طباعه';
                printToolTip = 'طباعه هذا المستند (Ctrl + P)';
                openText = 'فتح';
                documentTileText = 'اسم المستند. انقر أو اضغط لأعاده تسميه هذا المستند';
            }
            // tslint:disable-next-line:max-line-length
            _this.documentTitle = createElement('label', { id: 'documenteditor_title_name', styles: 'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;user-select:none;cursor:text' });
            var iconCss = 'e-de-padding-right';
            var btnFloatStyle = 'float:right;';
            var titleCss = '';
            if (_this.isRtl) {
                iconCss = 'e-de-padding-right-rtl';
                btnFloatStyle = 'float:left;';
                titleCss = 'float:right;';
            }
            // tslint:disable-next-line:max-line-length
            _this.documentTitleContentEditor = createElement('div', { id: 'documenteditor_title_contentEditor', className: 'single-line', styles: titleCss });
            _this.documentTitleContentEditor.appendChild(_this.documentTitle);
            _this.tileBarDiv.appendChild(_this.documentTitleContentEditor);
            _this.documentTitleContentEditor.setAttribute('title', 'Document Name. Click or tap to rename this document.');
            var btnStyles = btnFloatStyle + 'background: transparent;box-shadow:none; font-family: inherit;border-color: transparent;'
                + 'border-radius: 2px;color:inherit;font-size:12px;text-transform:capitalize;margin-top:4px;height:28px;font-weight:400;'
                + 'margin-top: 2px;';
            // tslint:disable-next-line:max-line-length
            _this.print = _this.addButton('e-de-icon-Print ' + iconCss, printText, btnStyles, 'de-print', printToolTip, false);
            _this.open = _this.addButton('e-de-icon-Open ' + iconCss, openText, btnStyles, 'de-open', documentTileText, false);
            var items = [
                { text: 'Microsoft Word (.docx)', id: 'word' },
                { text: 'Syncfusion Document Text (.sfdt)', id: 'sfdt' },
            ];
            // tslint:disable-next-line:max-line-length
            _this.export = _this.addButton('e-de-icon-Download ' + iconCss, downloadText, btnStyles, 'documenteditor-share', downloadToolTip, true, items);
            if (!isShareNeeded) {
                _this.export.element.style.display = 'none';
            }
            else {
                _this.open.element.style.display = 'none';
            }
        };
        this.wireEvents = function () {
            _this.print.element.addEventListener('click', _this.onPrint);
            _this.open.element.addEventListener('click', function (e) {
                if (e.target.id === 'de-open') {
                    var fileUpload = document.getElementById('uploadfileButton');
                    fileUpload.value = '';
                    fileUpload.click();
                }
            });
            _this.documentTitleContentEditor.addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    _this.documentTitleContentEditor.contentEditable = 'false';
                    if (_this.documentTitleContentEditor.textContent === '') {
                        _this.documentTitleContentEditor.textContent = 'Document1';
                    }
                }
            });
            _this.documentTitleContentEditor.addEventListener('blur', function () {
                if (_this.documentTitleContentEditor.textContent === '') {
                    _this.documentTitleContentEditor.textContent = 'Document1';
                }
                _this.documentTitleContentEditor.contentEditable = 'false';
                _this.documentEditor.documentName = _this.documentTitle.textContent;
            });
            _this.documentTitleContentEditor.addEventListener('click', function () {
                _this.updateDocumentEditorTitle();
            });
        };
        this.updateDocumentEditorTitle = function () {
            _this.documentTitleContentEditor.contentEditable = 'true';
            _this.documentTitleContentEditor.focus();
            window.getSelection().selectAllChildren(_this.documentTitleContentEditor);
        };
        // Updates document title.
        this.updateDocumentTitle = function () {
            if (_this.documentEditor.documentName === '') {
                _this.documentEditor.documentName = 'Untitled';
            }
            _this.documentTitle.textContent = _this.documentEditor.documentName;
        };
        this.onPrint = function () {
            _this.documentEditor.print();
        };
        this.onExportClick = function (args) {
            var value = args.item.id;
            switch (value) {
                case 'word':
                    _this.save('Docx');
                    break;
                case 'sfdt':
                    _this.save('Sfdt');
                    break;
            }
        };
        this.save = function (format) {
            // tslint:disable-next-line:max-line-length
            _this.documentEditor.save(_this.documentEditor.documentName === '' ? 'sample' : _this.documentEditor.documentName, format);
        };
        this.isRtl = isRtl;
        //initializes title bar elements.
        this.tileBarDiv = element;
        this.documentEditor = docEditor;
        this.initializeTitleBar(isShareNeeded);
        this.wireEvents();
    }
    TitleBar.prototype.setTooltipForPopup = function () {
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[0].setAttribute('title', 'Download a copy of this document to your computer as a DOCX file.');
        // tslint:disable-next-line:max-line-length
        document.getElementById('documenteditor-share-popup').querySelectorAll('li')[1].setAttribute('title', 'Download a copy of this document to your computer as an SFDT file.');
    };
    // tslint:disable-next-line:max-line-length
    TitleBar.prototype.addButton = function (iconClass, btnText, styles, id, tooltipText, isDropDown, items) {
        var _this = this;
        var button = createElement('button', { id: id, styles: styles });
        this.tileBarDiv.appendChild(button);
        button.setAttribute('title', tooltipText);
        if (isDropDown) {
            // tslint:disable-next-line:max-line-length
            var dropButton = new DropDownButton({ select: this.onExportClick, items: items, iconCss: iconClass, cssClass: 'e-caret-hide', content: btnText, open: function () { _this.setTooltipForPopup(); } }, button);
            return dropButton;
        }
        else {
            var ejButton = new Button({ iconCss: iconClass, content: btnText }, button);
            return ejButton;
        }
    };
    return TitleBar;
}());
export { TitleBar };
//# sourceMappingURL=title-bar.js.map