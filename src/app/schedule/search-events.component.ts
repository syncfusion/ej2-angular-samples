import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ScheduleComponent, EJ2Instance, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';
import { Query, Predicate, DataManager, ReturnOption } from '@syncfusion/ej2-data';
import { Grid } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'search-events.html',
    styleUrls: ['search-events.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, DatePickerModule, ButtonModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SearchEventsComponent {
  public selectedDate: Date = new Date(2021, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  @ViewChild('subject') subjectObj: ElementRef;
  @ViewChild('location') locationObj: ElementRef;
  @ViewChild('startTime') startTimeObj: DatePickerComponent;
  @ViewChild('endTime') endTimeObj: DatePickerComponent;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['search-events.style.css'];
  }

  public globalSearch(args: KeyboardEvent): void {
    const searchString: string = (args.target as HTMLInputElement).value;
    if (searchString !== '') {
      new DataManager(this.scheduleObj.getEvents(null, null, true)).executeQuery(new Query().
        search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then((e: ReturnOption) => {
          if ((e.result as any).length > 0) {
            this.showSearchEvents('show', e.result);
          } else {
            this.showSearchEvents('hide');
          }
        });
    } else {
      this.showSearchEvents('hide');
    }
  }

  public searchOnClick(): void {
    const searchObj: Record<string, any>[] = [];
    let endDate: Date;
    const formElements: HTMLInputElement[] = [
      this.subjectObj.nativeElement,
      this.locationObj.nativeElement
    ];
    formElements.forEach((node: HTMLInputElement) => {
      if (node.value && node.value !== '') {
        searchObj.push({ field: node.name, operator: 'contains', value: node.value, predicate: 'or', matchcase: 'true' });
      }
    });
    if (this.startTimeObj.value) {
      searchObj.push({
        field: 'StartTime', operator: 'greaterthanorequal', value: this.startTimeObj.value, predicate: 'and', matchcase: false
      });
    }
    if (this.endTimeObj.value) {
      const date: Date = new Date(+this.endTimeObj.value);
      endDate = new Date(date.setDate(date.getDate() + 1));
      searchObj.push({ field: 'EndTime', operator: 'lessthanorequal', value: endDate, predicate: 'and', matchcase: false });
    }
    if (searchObj.length > 0) {
      const filter: Record<string, any> = searchObj[0];
      let predicate: Predicate = new Predicate(filter.field, filter.operator, filter.value, filter.matchcase);
      for (let i = 1; i < searchObj.length; i++) {
        predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
      }
      const eventDatas: Record<string, any>[] = this.scheduleObj.getEvents(this.startTimeObj.value, endDate, true);
      const result: Record<string, any>[] = new DataManager(eventDatas).executeLocal(new Query().where(predicate));
      this.showSearchEvents('show', result);
    } else {
      this.showSearchEvents('hide');
    }
  }

  public clearOnClick(): void {
    document.getElementById('schedule').style.display = 'block';
    (document.getElementById('form-search') as HTMLFormElement).reset();
    this.showSearchEvents('hide');
  }

  private showSearchEvents(type: string, data?: Record<string, any>): void {
    if (type === 'show') {
      if (document.getElementById('grid').classList.contains('e-grid')) {
        const gridObj: Grid = (document.querySelector('#grid') as EJ2Instance).ej2_instances[0] as Grid;
        gridObj.dataSource = data;
        gridObj.dataBind();
      } else {
        const gridObj: Grid = new Grid({
          dataSource: data,
          height: 505,
          width: 'auto',
          columns: [
            { field: 'Subject', headerText: 'Subject', width: 120 },
            { field: 'Location', headerText: 'Location', width: 120 },
            { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
            { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
          ]
        });
        gridObj.appendTo(document.querySelector('#grid') as HTMLElement);
        this.scheduleObj.element.style.display = 'none';
      }
    } else {
      const gridObj: Record<string, any>[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;
      if (gridObj && gridObj.length > 0 && !(gridObj[0] as Grid).isDestroyed) {
        (gridObj[0] as Grid).destroy();
      }
      this.scheduleObj.element.style.display = 'block';
    }
  }
}
