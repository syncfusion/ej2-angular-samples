import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend, Internationalization, createElement, closest, remove, addClass, removeClass } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import {
    ScheduleComponent, Schedule, ActionEventArgs, PopupOpenEventArgs,
    ToolbarActionArgs, EventFieldsMapping, MonthService, EventSettingsModel
} from '@syncfusion/ej2-angular-schedule';

(window as TemplateFunction).getAirwaysName = (value: number) => {
    return (value === 1) ? 'Airways 1' : (value === 2) ? 'Airways 2' : 'Airways 3';
};
(window as TemplateFunction).getAirwaysImage = (value: number) => {
    return (value === 1) ? 'airways-1' : (value === 2) ? 'airways-2' : 'airways-3';
};
(window as TemplateFunction).getFormattedTime = (date: Date) => {
    let instance: Internationalization = new Internationalization();
    return instance.formatDate(date, { skeleton: 'Hm' });
};

interface TemplateFunction extends Window {
    getAirwaysName?: Function;
    getAirwaysImage?: Function;
    getFormattedTime?: Function;
}
@Component({
    selector: 'control-content',
    templateUrl: 'resources.html',
    styleUrls: ['resources.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [MonthService]
})

export class ResourcesComponent {
    public selectedDate: Date = new Date(2018, 3, 1);
    public resourceDataSource: Object[] = [
        { text: 'Airways 1', id: 1 },
        { text: 'Airways 2', id: 2 },
        { text: 'Airways 3', id: 3 }
    ];
    public allowMultiple: Boolean = true;
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
    public dManager: Object[] = [];
    private initialLoad: Boolean = true;
    public readonly: Boolean = true;
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['resources.style.css'];
    }

    onDataBinding(): void {
        if (this.initialLoad) {
            this.scheduleObj.eventSettings.dataSource = this.generateEvents(this.scheduleObj);
            this.initialLoad = false;
        }
    }

    onDataBound(): void {
        let eventCollections: Object[] = this.scheduleObj.getCurrentViewEvents();
        if (eventCollections.length > 0) {
            eventCollections.sort((a: { [key: string]: Object }, b: { [key: string]: Object }) =>
                ((<number>a.Fare) - (<number>b.Fare)));
            let indexDate: Date = new Date((<Date>(<{ [key: string]: Object }>eventCollections[0]).StartTime).getTime());
            indexDate.setHours(0, 0, 0, 0);
            let index: number = this.scheduleObj.getIndexOfDate(this.scheduleObj.activeView.renderDates, indexDate);
            let target: HTMLElement = this.scheduleObj.element.querySelectorAll('.e-work-cells')[index] as HTMLElement;
            addClass([target], 'best-price');
            target.appendChild(createElement('div', { className: 'best-price', innerHTML: 'Best Price' }));
        }
    }

    onPopupOpen(args: PopupOpenEventArgs): void {
        args.cancel = true;
    }

    onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
        if (args.requestType === 'toolbarItemRendering') {
            args.items[2].align = 'Center';
            args.items[2].suffixIcon = '';
            args.items = args.items.splice(2, 1);
        }
    }

    onChange(args: ChangeEventArgs): void {
        let tdElement: HTMLElement = this.scheduleObj.element.querySelector('.best-price:not(.e-work-cells)');
        if (tdElement) {
            removeClass([closest(tdElement, 'td')], 'best-price');
            remove(tdElement);
        }
        let scheduleData: Object[] = extend([], this.dManager, null, true) as Object[];
        let selectedResource: number[] = [];
        let resourceCollection: HTMLElement[] = [].slice.call(document.querySelectorAll('.e-resource'));
        resourceCollection.forEach((element: HTMLElement, index: number) => {
            if (element.getAttribute('aria-checked') === 'true') {
                selectedResource.push(index);
            }
        });
        let filteredData: Object[] = [];
        let resources: { [key: string]: Object }[] =
            this.scheduleObj.resourceBase.resourceCollection.slice(-1)[0].dataSource as { [key: string]: Object }[];
        for (let resource of selectedResource) {
            let data: Object[] = scheduleData.filter((event: { [key: string]: Object }) => resources[resource].id === event.AirlineId);
            filteredData = filteredData.concat(data);
        }
        filteredData = this.filterByFare(filteredData, this.scheduleObj);
        this.scheduleObj.eventSettings.dataSource = filteredData;
        this.scheduleObj.dataBind();
    }

    filterByFare(appointments: Object[], scheduleObj: Schedule): Object[] {
        let fieldMapping: EventFieldsMapping = scheduleObj.eventFields;
        appointments.sort((object1: { [key: string]: Object }, object2: { [key: string]: Object }) => {
            let d1: number = +(object1[fieldMapping.startTime] as Date);
            let d2: number = +(object2[fieldMapping.startTime] as Date);
            let d3: number = +(object1[fieldMapping.endTime] as Date);
            let d4: number = +(object2[fieldMapping.endTime] as Date);
            return ((d1 - d2) || ((d4 - d2) - (d3 - d1)));
        });
        let renderDate: Date[] = scheduleObj.activeView.getRenderDates();
        let finalData: Object[] = [];
        for (let date of renderDate) {
            if (scheduleObj.selectedDate.getMonth() === date.getMonth()) {
                let strTime: Date = new Date(+date);
                let endTime: Date = new Date(new Date(strTime.getTime()).setHours(23, 59, 59, 59));
                let perDayData: Object[] = scheduleObj.eventBase.filterEvents(strTime, endTime, appointments);
                if (perDayData.length > 0) {
                    perDayData.sort((a: { [key: string]: Object }, b: { [key: string]: Object }) => ((<number>a.Fare) - (<number>b.Fare)));
                    finalData.push(perDayData[0]);
                }
            }
        }
        return finalData;
    }

    //custom code start
    generateEvents(scheduleObj: Schedule): Object[] {
        let collections: Object[] = [];
        let dataCollections: { [key: string]: Object }[] = [
            {
                Id: 100,
                StartTime: new Date(2018, 3, 1, 8, 30),
                EndTime: new Date(2018, 3, 1, 10, 0),
                AirlineId: 1
            }, {
                Id: 102,
                StartTime: new Date(2018, 3, 1, 11, 0),
                EndTime: new Date(2018, 3, 1, 12, 0),
                AirlineId: 2
            }, {
                Id: 103,
                StartTime: new Date(2018, 3, 1, 14, 0),
                EndTime: new Date(2018, 3, 1, 15, 0),
                AirlineId: 3
            }
        ];
        let start: Date = new Date(2018, 3, 1);
        let dateCollections: Date[] = Array.apply(null, { length: 30 })
            .map((value: number, index: number) => { return new Date(start.getTime() + (1000 * 60 * 60 * 24 * index)); });
        let id: number = 1;
        let day: number = 0;
        for (let date of dateCollections) {
            let resource: number = 1;
            for (let data of dataCollections) {
                let strDate: Date = new Date((<Date>data.StartTime).getTime());
                let endDate: Date = new Date((<Date>data.EndTime).getTime());
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
        this.dManager = extend([], collections, null, true) as Object[];
        let filteredCollection: Object[] = this.filterByFare(collections, scheduleObj);
        return filteredCollection;
    }
    //custom code end
}