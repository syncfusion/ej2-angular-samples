import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RecurrenceEditor, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'recurrence-editor-populate-rule.html',
    styleUrls: ['recurrence-editor.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DropDownListModule, RecurrenceEditorModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RecPopulateComponent {
  @ViewChild('recObject') public recObject: RecurrenceEditor;

  public value = 'FREQ=DAILY;INTERVAL=1';
  public datas: Record<string, string>[] = [
    { rule: 'FREQ=DAILY;INTERVAL=1' },
    { rule: 'FREQ=DAILY;INTERVAL=2;UNTIL=20410606T000000Z' },
    { rule: 'FREQ=DAILY;INTERVAL=2;COUNT=8' },
    { rule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;UNTIL=20410729T000000Z' },
    { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1;UNTIL=20410729T000000Z' },
    { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1' },
    { rule: 'FREQ=YEARLY;BYDAY=MO;BYSETPOS=-1;INTERVAL=1;COUNT=5' }];
  public fields: Record<string, any> = { text: 'rule', value: 'rule' };
  public index = 0;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['recurrence-editor.style.css'];
  }

  public onChange(e: ChangeEventArgs): void {
    this.recObject.setRecurrenceRule(e.value as string);
  }

}
