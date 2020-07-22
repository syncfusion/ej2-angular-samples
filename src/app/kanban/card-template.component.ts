import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel, DialogSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { kanbanPizzaData } from './data';

@Component({
  selector: 'app-card-template',
  templateUrl: 'card-template.component.html',
  styleUrls: ['card-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardTemplateComponent {
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanPizzaData, null, true) as Object[];
  public cardSettings: CardSettingsModel = {
    headerField: 'Id'
  };
  public dialogSettings: DialogSettingsModel = {
    fields: [
      { text: 'ID', key: 'Id', type: 'TextBox' },
      { key: 'Category', type: 'DropDown' },
      { key: 'Title', type: 'TextBox' },
      { key: 'Size', type: 'TextBox' },
      { key: 'Description', type: 'TextArea' }
  ]
  }

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['card-template.component.css'];
  }

}
