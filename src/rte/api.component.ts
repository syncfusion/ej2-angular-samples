/**
 * RTE API functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService} from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, CountService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { Link, Count, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, CountService, QuickToolbarService]
})
export class APIComponent {
    @ViewChild('apiRTE')
    public rteObj: RichTextEditorComponent;
    @ViewChild('readonly')
    public readonlyObj: CheckBoxComponent;
    @ViewChild('enable')
    public enableObj: CheckBoxComponent;
    @ViewChild('enablehtml')
    public enablehtmlObj: CheckBoxComponent;
    @ViewChild('numeric')
    public numericObj: NumericTextBoxComponent;
    public maxLength: number = 1000;
    public numericValue: number = 1000;
    public numericmin: number = 555;
    public numericmax: number = 2000;
    public numericformat: string = 'n0';
    public onValChange(): void {
        this.rteObj.maxLength = this.numericObj.value;
        this.rteObj.dataBind();
    }
    public onChangeRead(): void {
        this.rteObj.readonly = this.readonlyObj.checked;
        this.rteObj.dataBind();
    }
    public onChangeEnable(): void {
        this.rteObj.enabled = this.enableObj.checked;
        this.rteObj.dataBind();
    }
    public onChangeHtml(): void {
        this.rteObj.enableHtmlEncode = this.enablehtmlObj.checked;
        this.rteObj.dataBind();
    }
    public getVal(): void {
        alert(this.rteObj.value);
    }
    public getSelect(): void {
        alert(this.rteObj.getSelection());
    }
    public selectAll(): void {
        this.rteObj.selectAll();
    }
}