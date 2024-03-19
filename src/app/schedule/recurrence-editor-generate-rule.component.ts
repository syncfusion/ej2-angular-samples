import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'recurrence-editor-generate-rule.html',
    styleUrls: ['recurrence-editor.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RecurrenceEditorModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RecGeneraterComponent {
  public selectedType = 1;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['recurrence-editor.style.css'];
  }

}
