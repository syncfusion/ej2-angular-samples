import { Component, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, CardSettingsModel,DialogEventArgs, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { kanbanPizzaData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { NgIf, NgClass } from '@angular/common';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-card-template',
  templateUrl: 'card-template.html',
  styleUrls: ['card-template.style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [KanbanModule, NgIf, NgClass, SBActionDescriptionComponent, SBDescriptionComponent, DropDownListModule, TextBoxModule, DatePickerModule]
})
export class CardTemplateComponent {
  @ViewChild('kanbanObj') kanbanObj: KanbanComponent;
  public kanbanData: Object[] = extend([], kanbanPizzaData, null, true) as Object[];
  public cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Description'
  };
  public categoryData: string[] = [
    'Menu',
    'Order',
    'Ready to Serve',
    'Delivered',
    'Served',
  ];
  
  onDialogClose(args: DialogEventArgs) {
    if(args.element.querySelector('Date') as any){
    args.data.Date = (args.element.querySelector('#Date') as any).ej2_instances[0].value.toLocaleString('es-PR').split(',')[0];
    }
  }

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['card-template.style.css'];
  }

}
