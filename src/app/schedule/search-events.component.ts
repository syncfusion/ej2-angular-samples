import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import {
  ScheduleComponent, EJ2Instance, EventSettingsModel, DayService, WeekService,
  WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from './data';
import { Query, Predicate, DataManager, ReturnOption } from '@syncfusion/ej2-data';
import { Grid } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'control-content',
  templateUrl: 'search-events.html',
  /* custom code start*/
  styleUrls: ['search-events.style.css'],
  /* custom code end*/
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class SearchEventsComponent {
  public selectedDate: Date = new Date(2019, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;
  @ViewChild('subject') subjectObj: ElementRef;
  @ViewChild('location') locationObj: ElementRef;
  @ViewChild('startTime') startTimeObj: DatePickerComponent;
  @ViewChild('endTime') endTimeObj: DatePickerComponent;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['search-events.style.css'];
  }

  globalSearch(args: KeyboardEvent): void {
    let searchString: string = (args.target as HTMLInputElement).value;
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

  searchOnClick(): void {
    let searchObj: { [key: string]: any }[] = [];
    let endDate: Date;
    let formElements: HTMLInputElement[] = [
      this.subjectObj.nativeElement,
      this.locationObj.nativeElement
    ];
    formElements.forEach((node: HTMLInputElement) => {
      if (node.value && node.value !== '') {
        searchObj.push({
          field: node.name, operator: 'contains', value: node.value, predicate: 'or',
          matchcase: 'true'
        });
      }
    });
    if (this.startTimeObj.value) {
      searchObj.push({
        field: 'StartTime', operator: 'greaterthanorequal', value: this.startTimeObj.value, predicate: 'and',
        matchcase: false
      });
    }
    if (this.endTimeObj.value) {
      let date: Date = new Date(+this.endTimeObj.value);
      endDate = new Date(date.setDate(date.getDate() + 1));
      searchObj.push({
        field: 'EndTime', operator: 'lessthanorequal', value: endDate, predicate: 'and',
        matchcase: false
      });
    }
    if (searchObj.length > 0) {
      let filterCondition: { [key: string]: any } = searchObj[0];
      let predicate: Predicate = new Predicate(
        filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
      for (let i: number = 1; i < searchObj.length; i++) {
        predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
      }
      let result: Object[] = new DataManager(this.scheduleObj.getEvents(this.startTimeObj.value, endDate, true))
        .executeLocal(new Query().where(predicate));
      this.showSearchEvents('show', result);
    } else {
      this.showSearchEvents('hide');
    }
  }

  clearOnClick(): void {
    document.getElementById('schedule').style.display = 'block';
    (document.getElementById('form-search') as HTMLFormElement).reset();
    this.showSearchEvents('hide');
  }

  private showSearchEvents(type: string, data?: Object): void {
    if (type === 'show') {
      if (document.getElementById('grid').classList.contains('e-grid')) {
        let gridObj: Grid = (document.querySelector('#grid') as EJ2Instance).ej2_instances[0] as Grid;
        gridObj.dataSource = data;
        gridObj.dataBind();
      } else {
        let gridObj: Grid = new Grid({
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
      let gridObj: Object[] = (document.querySelector('#grid') as EJ2Instance).ej2_instances;
      if (gridObj && gridObj.length > 0 && !(gridObj[0] as Grid).isDestroyed) {
        (gridObj[0] as Grid).destroy();
      }
      this.scheduleObj.element.style.display = 'block';
    }
  }
}