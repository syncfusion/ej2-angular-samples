import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { resourceSampleData } from './data';
import { extend } from '@syncfusion/ej2-base';
import { Query, Predicate } from '@syncfusion/ej2-data';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CheckBoxComponent, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'resource.html',
    styleUrls: ['resource.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class ResourceComponent {
  public ownerCollections: Record<string, any>[] = [
    { OwnerText: 'Margaret', OwnerId: 1, Color: '#ea7a57' },
    { OwnerText: 'Robert', OwnerId: 2, Color: '#df5286' },
    { OwnerText: 'Laura', OwnerId: 3, Color: '#865fcf' }
  ];
  public resourceDataSource: Record<string, any>[] = this.ownerCollections;
  public allowMultiple = true;
  public selectedDate: Date = new Date(2021, 5, 6);
  public eventSettings: EventSettingsModel = { dataSource: extend([], resourceSampleData, null, true) as Record<string, any>[] };
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  @ViewChild('ownerOneObj') ownerOneObj: CheckBoxComponent;
  @ViewChild('ownerTwoObj') ownerTwoObj: CheckBoxComponent;
  @ViewChild('ownerThreeObj') ownerThreeObj: CheckBoxComponent;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['resource.style.css'];
  }

  public onChange(): void {
    let predicate: Predicate;
    const checkBoxes: CheckBoxComponent[] = [this.ownerOneObj, this.ownerTwoObj, this.ownerThreeObj];
    checkBoxes.forEach((checkBoxObj: CheckBoxComponent) => {
      if (checkBoxObj.checked) {
        if (predicate) {
          predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
        } else {
          predicate = new Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
        }
      }
    });
    this.scheduleObj.eventSettings.query = new Query().where(predicate);
  }

}
