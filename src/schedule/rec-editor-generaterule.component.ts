import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-ng-schedule';

@Component({
    templateUrl: 'rec-editor-generaterule.html',
    styleUrls: ['rec-editor.style.css'],
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
