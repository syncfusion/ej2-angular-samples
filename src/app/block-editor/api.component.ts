import { Component, ViewEncapsulation, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { BlockModel, BlockEditorModule, BlockEditor, FocusEventArgs } from '@syncfusion/ej2-angular-blockeditor';
import { CheckBoxModule, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { blockDataAPI } from './blockData'

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.component.css'],   
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BlockEditorModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class BlockEditorAPIComponent implements AfterViewInit {
    @ViewChild('apiBlockEditor')
    public apiBlockEditor: BlockEditor;
    
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['checkbox.css'];
    }
    
    public blockDataAPI: BlockModel[] = blockDataAPI;
    public focusedBlock: string;
    ngAfterViewInit(): void {
        document.getElementById('getJson')?.addEventListener('click', () => {
            const jsonData = this.apiBlockEditor.getDataAsJson(this.focusedBlock);
            alert(JSON.stringify(jsonData, null, 2));
        });

        document.getElementById('getHtml')?.addEventListener('click', () => {
            const htmlData = this.apiBlockEditor.getDataAsHtml();
            alert(htmlData);
        });

        document.getElementById('getBlockCount')?.addEventListener('click', () => {
            alert('Total blocks: ' + this.apiBlockEditor.getBlockCount());
        });

        document.getElementById('selectall')?.addEventListener('click', () => {
            this.apiBlockEditor.selectAllBlocks();
        });

        document.getElementById('focusIn')?.addEventListener('click', () => {
            this.apiBlockEditor.focusIn();
        });

        document.getElementById('focusOut')?.addEventListener('click', () => {
            this.apiBlockEditor.focusOut();
        });

        document.getElementById('print')?.addEventListener('click', () => {
            this.apiBlockEditor.print();
        });
    }
    public readOnlyChange(args: ChangeEventArgs) : void {
        this.apiBlockEditor.readOnly = args.checked;
    }
    public enableDragDropChange(args: ChangeEventArgs) : void {
        this.apiBlockEditor.enableDragAndDrop = args.checked;
    }
    public onFocus(event: FocusEventArgs): void {
        this.focusedBlock = event.blockId;
    }
}