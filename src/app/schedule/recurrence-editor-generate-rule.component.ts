import { Component, Inject, ViewEncapsulation } from '@angular/core';

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

}
