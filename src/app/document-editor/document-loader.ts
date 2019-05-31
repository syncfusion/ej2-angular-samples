import { DocumentEditor } from '@syncfusion/ej2-documenteditor';
/**
 * Document editor - Document loader
 */
export class DocumentLoader {
    private hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
    private documentEditor: DocumentEditor = undefined;


    constructor(documentEditor: DocumentEditor) {
        this.documentEditor = documentEditor;
    }
    public loadDefault(defaultDocument: Object): void {
        this.documentEditor.open(JSON.stringify(defaultDocument));
    }
    public loadFile(path: any): void {
        let baseUrl: string = this.hostUrl + 'api/documenteditor/import';
        let httpRequest: XMLHttpRequest = new XMLHttpRequest();
        httpRequest.open('POST', baseUrl, true);
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let inActiveDiv: HTMLElement = document.getElementById('popup-overlay');
        this.documentEditor.isReadOnly = true;
        waitingPopUp.style.display = 'block';
        inActiveDiv.style.display = 'block';
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200 || httpRequest.status === 304) {
                    this.documentEditor.open(httpRequest.responseText);
                    this.documentEditor.isReadOnly = false;
                    waitingPopUp.style.display = 'none';
                    inActiveDiv.style.display = 'none';
                } else {
                    waitingPopUp.style.display = 'none';
                    inActiveDiv.style.display = 'none';
                    this.documentEditor.isReadOnly = false;
                    console.error(httpRequest.response);
                }
            }
        };
        let formData: FormData = new FormData();
        formData.append('files', path);
        this.documentEditor.documentName = path.name.substr(0, path.name.lastIndexOf('.'));
        httpRequest.send(formData);
    }
    public destroy(): void {
        this.documentEditor = undefined;
        this.hostUrl = undefined;
    }
}