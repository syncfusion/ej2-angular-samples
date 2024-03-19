import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend, Internationalization, createElement, closest, remove, addClass, removeClass } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { ScheduleComponent, Schedule, ActionEventArgs, PopupOpenEventArgs, EventFieldsMapping, MonthService, EventSettingsModel, CallbackFunction, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

(window as TemplateFunction).getAirwaysName = (value: number) => {
  return (value === 1) ? 'Airways 1' : (value === 2) ? 'Airways 2' : 'Airways 3';
};
(window as TemplateFunction).getAirwaysImage = (value: number) => {
  return (value === 1) ? 'airways-1' : (value === 2) ? 'airways-2' : 'airways-3';
};
(window as TemplateFunction).getFormattedTime = (date: Date) => {
  const instance: Internationalization = new Internationalization();
  return instance.formatDate(date, { skeleton: 'Hm' });
};

interface TemplateFunction extends Window {
  getAirwaysName?: CallbackFunction;
  getAirwaysImage?: CallbackFunction;
  getFormattedTime?: CallbackFunction;
}
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'resources.html',
    styleUrls: ['resources.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MonthService],
    standalone: true,
    imports: [ScheduleModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class ResourcesComponent {
  public selectedDate: Date = new Date(2021, 3, 1);
  public resourceDataSource: Record<string, any>[] = [
    { text: 'Airways 1', id: 1 },
    { text: 'Airways 2', id: 2 },
    { text: 'Airways 3', id: 3 }
  ];
  public allowMultiple = true;
  public eventSettings: EventSettingsModel = {
    template: '<div class="template-wrapper">' +
      '<div class="fare-detail">$${Fare}</div>' +
      '<div class="airline-name" style="display:flex;padding-left:5px;">' +
      '<div class="airline-logo ${getAirwaysImage(data.AirlineId)}"></div>' +
      '<div class="airway-name">${getAirwaysName(data.AirlineId)}</div>' +
      '</div></div>',
    enableTooltip: true,
    tooltipTemplate: '<div class="event-tooltip">' +
      '<div class="airline-header">' +
      '<div class="airline-logo ${getAirwaysImage(data.AirlineId)}"></div>' +
      '<div class="airline-name">${getAirwaysName(data.AirlineId)}</div>' +
      '</div>' +
      '<div class="airline-details text-size">' +
      '<div class="airline-title">Fare Details:</div>' +
      '<div class="airline-fare">$${Fare} per person</div>' +
      '</div>' +
      '<div class="airline-flex-row text-size">' +
      '<div class="airline-flex-col airline-title border-right">Arrival</div>' +
      '<div class="airline-flex-col airline-title text-right">Depature</div>' +
      '</div>' +
      '<div class="airline-flex-row text-size">' +
      '<div class="airline-flex-col border-right">${getFormattedTime(data.StartTime)}</div>' +
      '<div class="airline-flex-col margin-right text-right">${getFormattedTime(data.EndTime)}</div>' +
      '</div></div>'
  };
  public dManager: Record<string, any>[] = [];
  private initialLoad = true;
  public readonly = true;
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['resources.style.css'];
  }

  public onDataBinding(): void {
    if (this.initialLoad) {
      this.scheduleObj.eventSettings.dataSource = this.generateEvents(this.scheduleObj);
      this.initialLoad = false;
    }
  }

  public onDataBound(): void {
    const eventCollections: Record<string, any>[] = this.scheduleObj.getCurrentViewEvents();
    if (eventCollections.length > 0) {
      eventCollections.sort((a: Record<string, number>, b: Record<string, number>) => a.Fare - b.Fare);
      const indexDate: Date = new Date(((eventCollections[0] as Record<string, any>).StartTime as Date).getTime());
      indexDate.setHours(0, 0, 0, 0);
      const index: number = this.scheduleObj.getIndexOfDate(this.scheduleObj.activeView.renderDates, indexDate);
      const target: HTMLElement = this.scheduleObj.element.querySelectorAll('.e-work-cells')[index] as HTMLElement;
      addClass([target], 'best-price');
      target.appendChild(createElement('div', { className: 'best-price', innerHTML: 'Best Price' }));
    }
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    args.cancel = true;
  }

  public onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      args.items[2].align = 'Center';
      args.items[2].suffixIcon = '';
      args.items = args.items.splice(2, 1);
    }
  }

  public onChange(args: ChangeEventArgs): void {
    const tdElement: HTMLElement = this.scheduleObj.element.querySelector('.best-price:not(.e-work-cells)');
    if (tdElement) {
      removeClass([closest(tdElement, 'td')], 'best-price');
      remove(tdElement);
    }
    const scheduleData: Record<string, any>[] = extend([], this.dManager, null, true) as Record<string, any>[];
    const selectedResource: number[] = [];
    const resourceCollection: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-resource'));
    resourceCollection.forEach((element: HTMLElement, index: number) => {
      let resEle: Element = element.querySelector('.e-icons');
      if (resEle && resEle.classList.contains('e-check')) {
        selectedResource.push(index);
      }
    });
    let filteredData: Record<string, any>[] = [];
    const resources: Record<string, any>[] =
      this.scheduleObj.resourceBase.resourceCollection.slice(-1)[0].dataSource as Record<string, any>[];
    for (const resource of selectedResource) {
      const data: Record<string, any>[] = scheduleData.filter((event: Record<string, any>) => resources[resource].id === event.AirlineId);
      filteredData = filteredData.concat(data);
    }
    filteredData = this.filterByFare(filteredData, this.scheduleObj);
    this.scheduleObj.eventSettings.dataSource = filteredData;
    this.scheduleObj.dataBind();
  }

  public filterByFare(appointments: Record<string, any>[], scheduleObj: Schedule): Record<string, any>[] {
    const fieldMapping: EventFieldsMapping = scheduleObj.eventFields;
    appointments.sort((object1: Record<string, any>, object2: Record<string, any>) => {
      const d1: number = +(object1[fieldMapping.startTime] as Date);
      const d2: number = +(object2[fieldMapping.startTime] as Date);
      const d3: number = +(object1[fieldMapping.endTime] as Date);
      const d4: number = +(object2[fieldMapping.endTime] as Date);
      return ((d1 - d2) || ((d4 - d2) - (d3 - d1)));
    });
    const renderDate: Date[] = scheduleObj.activeView.getRenderDates();
    const finalData: Record<string, any>[] = [];
    for (const date of renderDate) {
      if (scheduleObj.selectedDate.getMonth() === date.getMonth()) {
        const strTime: Date = new Date(+date);
        const endTime: Date = new Date(new Date(strTime.getTime()).setHours(23, 59, 59, 59));
        const perDayData: Record<string, any>[] = scheduleObj.eventBase.filterEvents(strTime, endTime, appointments);
        if (perDayData.length > 0) {
          perDayData.sort((a: Record<string, any>, b: Record<string, any>) => ((a.Fare as number) - (b.Fare as number)));
          finalData.push(perDayData[0]);
        }
      }
    }
    return finalData;
  }

  // custom code start
  public generateEvents(scheduleObj: Schedule): Record<string, any>[] {
    const collections: Record<string, any>[] = [];
    const dataCollections: Record<string, any>[] = [
      {
        Id: 100,
        StartTime: new Date(2021, 3, 1, 8, 30),
        EndTime: new Date(2021, 3, 1, 10, 0),
        AirlineId: 1
      },
      {
        Id: 102,
        StartTime: new Date(2021, 3, 1, 11, 0),
        EndTime: new Date(2021, 3, 1, 12, 0),
        AirlineId: 2
      },
      {
        Id: 103,
        StartTime: new Date(2021, 3, 1, 14, 0),
        EndTime: new Date(2021, 3, 1, 15, 0),
        AirlineId: 3
      }
    ];
    const start: Date = new Date(2021, 3, 1);
    const dateCollections: Date[] = Array.apply(null, { length: 30 }).map((value: number, index: number) =>
      new Date(start.getTime() + (1000 * 60 * 60 * 24 * index)));
    let id = 1;
    let day = 0;
    for (const date of dateCollections) {
      let resource = 1;
      for (const data of dataCollections) {
        const strDate: Date = new Date((data.StartTime as Date).getTime());
        const endDate: Date = new Date((data.EndTime as Date).getTime());
        collections.push({
          Id: id,
          StartTime: new Date(strDate.setDate(strDate.getDate() + day)),
          EndTime: new Date(endDate.setDate(endDate.getDate() + day)),
          AirlineId: resource,
          Fare: ((Math.random() * 500) + 100).toFixed(2)
        });
        resource += 1;
        id += 1;
      }
      day += 1;
    }
    this.dManager = extend([], collections, null, true) as Record<string, any>[];
    const filteredCollection: Record<string, any>[] = this.filterByFare(collections, scheduleObj);
    return filteredCollection;
  }
  // custom code end
}
