import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-angular-schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'recurrence-editor-generate-rule.html',
  styleUrls: ['recurrence-editor.style.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecGeneraterComponent {
  public selectedType = 1;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['recurrence-editor.style.css'];
  }

  public onChange(args: RecurrenceEditorChangeEventArgs): void {
    const outputElement: HTMLElement = document.querySelector('#rule-output') as HTMLElement;
    outputElement.innerText = args.value;
  }

}
