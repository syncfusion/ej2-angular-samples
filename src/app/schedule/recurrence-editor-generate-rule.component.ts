import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'recurrence-editor-generate-rule.html',
    /* custom code start*/
    styleUrls: ['recurrence-editor.style.css'],
    /* custom code end*/
    encapsulation: ViewEncapsulation.None
})
export class RecGeneraterComponent {
    public selectedType: number = 1;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['rec-editor.style.css'];
    }

    onChange(args: RecurrenceEditorChangeEventArgs): void {
        let outputElement: HTMLElement = <HTMLElement>document.querySelector('#rule-output');
        outputElement.innerText = args.value;
    }
}
