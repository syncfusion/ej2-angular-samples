/**
 * Rich Text Editor API functionality Sample
 */
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CheckBoxComponent, CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxComponent, NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { RichTextEditorComponent, ToolbarService, LinkService, ImageService, RichTextEditorModule, PasteCleanupService, VideoService, AudioService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
import { HtmlEditorService, CountService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { DropDownListComponent, FieldSettingsModel } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, CountService, QuickToolbarService, PasteCleanupService, VideoService, AudioService, TableService],
    standalone: true,
    imports: [SBActionDescriptionComponent, RichTextEditorModule, NumericTextBoxModule, CheckBoxModule, ButtonModule, SBDescriptionComponent]
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
    public numericplaceholder: string = "Maximum Length";
    public numericformat: string = 'n0';

    public onValChange(): void {
        this.rteObj.maxLength = this.numericObj.value;
    }

    public onChangeRead(): void {
        this.rteObj.readonly = this.readonlyObj.checked;
    }

    public onChangeEnable(): void {
        this.rteObj.enabled = this.enableObj.checked;
    }

    public onChangeHtml(): void {
        this.rteObj.enableHtmlEncode = this.enablehtmlObj.checked;
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