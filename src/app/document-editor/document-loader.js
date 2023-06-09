/**
 * Document editor - Document loader
 */
var DocumentLoader = /** @class */ (function () {
    function DocumentLoader(documentEditor) {
        this.hostUrl = 'https://services.syncfusion.com/angular/production/api/documenteditor/';
        this.documentEditor = undefined;
        this.documentEditor = documentEditor;
    }
    DocumentLoader.prototype.loadDefault = function (defaultDocument) {
        this.documentEditor.open(JSON.stringify(defaultDocument));
    };
    DocumentLoader.prototype.loadFile = function (path) {
        var _this = this;
        var baseUrl = this.hostUrl + 'import';
        var httpRequest = new XMLHttpRequest();
        httpRequest.open('POST', baseUrl, true);
        var waitingPopUp = document.getElementById('waiting-popup');
        var inActiveDiv = document.getElementById('popup-overlay');
        this.documentEditor.isReadOnly = true;
        waitingPopUp.style.display = 'block';
        inActiveDiv.style.display = 'block';
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200 || httpRequest.status === 304) {
                    _this.documentEditor.open(httpRequest.responseText);
                    _this.documentEditor.isReadOnly = false;
                    waitingPopUp.style.display = 'none';
                    inActiveDiv.style.display = 'none';
                }
                else {
                    waitingPopUp.style.display = 'none';
                    inActiveDiv.style.display = 'none';
                    _this.documentEditor.isReadOnly = false;
                    console.error(httpRequest.response);
                }
            }
        };
        var formData = new FormData();
        formData.append('files', path);
        this.documentEditor.documentName = path.name.substr(0, path.name.lastIndexOf('.'));
        httpRequest.send(formData);
    };
    DocumentLoader.prototype.destroy = function () {
        this.documentEditor = undefined;
        this.hostUrl = undefined;
    };
    return DocumentLoader;
}());
export { DocumentLoader };
//# sourceMappingURL=document-loader.js.map