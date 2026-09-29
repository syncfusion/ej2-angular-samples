import { Component, ViewChild } from '@angular/core';
import { RichTextEditorUIComponent, RichTextEditorUIModule, ValueFormat } from '@syncfusion/ej2-angular-richtexteditor-ui';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'control-content',
    templateUrl: 'properties.html',
    styleUrls: ['properties.css'],
    standalone: true,
    imports: [ RichTextEditorUIModule, DropDownListModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent ]
})
export class PropertiesComponent {

    @ViewChild('editor')
    public editor: RichTextEditorUIComponent;
    public value: string = '<p>Welcome to Rich Text Editor</p>';
    public valueFormat: ValueFormat = 'html';
    public outputValue: string = '';
    public enablePersistence: boolean = true;
    public valueFormatData: { [key: string]: Object }[] = [
        { text: 'HTML', value: 'html' },
        { text: 'JSON', value: 'json' }
    ]

    public tools = {
        items: ['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'Formats', 'Alignment', '|', 'NumberFormatList', 'BulletFormatList', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
    };

    public onEditorChange(): void {
        this.log(this.editor.value);
    }

    public onValueFormatChange(args: any): void {
        const currentValue: string = this.editor.value as string;
        this.valueFormat = args.value as ValueFormat;
        this.editor.valueFormat = this.valueFormat;
        this.editor.value = currentValue;
        this.editor.dataBind();
        this.value = this.editor.value as string;
        this.log(this.editor.value);
    }

    public onEnableChange(args: any): void {
        this.editor.enable = args.checked;
    }

    public onReadOnlyChange(args: any): void {
        this.editor.readonly = args.checked;
    }

    public onEnableRtlChange(args: any): void {
        this.editor.enableRtl = args.checked;
    }

    public onEnablePersistenceChange(args: any): void {
        this.enablePersistence = args.checked;
        this.editor.enablePersistence = this.enablePersistence;
        this.editor.dataBind();
    }

    private log(value: unknown): void {
        this.outputValue =
            value === undefined || value === null
                ? String(value)
                : typeof value === 'string'
                    ? value
                    : JSON.stringify(value, null, 2);
    }

    public ngAfterViewInit(): void {
        this.log(this.editor.value);
    }
}
