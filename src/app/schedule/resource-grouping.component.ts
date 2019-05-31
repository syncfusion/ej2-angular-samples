import { Component, Inject, ViewEncapsulation } from '@angular/core';
import {
    EventSettingsModel, GroupModel, ResourceDetails, TreeViewArgs, WeekService, MonthService, AgendaService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';

@Component({
    selector: 'control-content',
    templateUrl: 'resource-grouping.html',
    styleUrls: ['resource-grouping.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [WeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})

export class GroupComponent {
    public selectedDate: Date = new Date(2018, 3, 1);
    public resourceDataSource: Object[] = [
        { AirlineName: 'Airways 1', AirlineId: 1, AirlineColor: '#EA7A57' },
        { AirlineName: 'Airways 2', AirlineId: 2, AirlineColor: '#357cd2' },
        { AirlineName: 'Airways 3', AirlineId: 3, AirlineColor: '#7fa900' }
    ];
    public group: GroupModel = { resources: ['Airlines'] };
    public allowMultiple: Boolean = true;
    public eventSettings: EventSettingsModel = {
        dataSource: this.generateEvents(),
        fields: {
            subject: { title: 'Travel Summary', name: 'Subject' },
            location: { title: 'Source', name: 'Location' },
            description: { title: 'Comments', name: 'Description' },
            startTime: { title: 'Departure Time', name: 'StartTime' },
            endTime: { title: 'Arrival Time', name: 'EndTime' }
        }
    };

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['resource-grouping.style.css'];
    }

    getAirlineName(value: ResourceDetails | TreeViewArgs): string {
        return ((value as ResourceDetails).resourceData) ?
            (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
            : (value as TreeViewArgs).resourceName;
    }
    getAirlineImage(value: ResourceDetails | TreeViewArgs): string {
        let airlineName: string = this.getAirlineName(value);
        return airlineName.replace(' ', '-').toLowerCase();
    }
    getAirlineModel(value: ResourceDetails | TreeViewArgs): string {
        let airlineName: string = this.getAirlineName(value);
        return (airlineName === 'Airways 1') ? 'CRJ 700' : (airlineName === 'Airways 2') ? 'Airbus A330' : 'ATR 72-600';
    }
    getAirlineSeats(value: ResourceDetails | TreeViewArgs): number {
        let airlineName: string = this.getAirlineName(value);
        return (airlineName === 'Airways 1') ? 50 : (airlineName === 'Airways 2') ? 75 : 100;
    }
    generateEvents(): Object[] {
        let subjectCollection: string[] = ['Barcelona to Los Angeles', 'Los Angeles to Barcelona'];
        let collections: Object[] = [];
        let dataCollections: number[] = [1, 2, 3];
        let id: number = 1;
        for (let data of dataCollections) {
            let startDate: Date = new Date(2018, 3, 1);
            startDate.setMilliseconds(1000 * 60 * 60 * .5 * (data - 1));
            let lastDate: Date = new Date((+startDate) + (1000 * 60 * 60 * 24 * 30));
            for (let date: Date = startDate; date.getTime() < lastDate.getTime(); date = new Date(date.getTime() + (1000 * 60 * 60 * 5))) {
                let strDate: Date = new Date(+date);
                let endDate: Date = new Date((+strDate) + (1000 * 60 * 60 * (2.5 + (0.5 * data))));
                collections.push({
                    Id: id,
                    Subject: subjectCollection[id % 2],
                    StartTime: new Date(+strDate),
                    EndTime: new Date(+endDate),
                    AirlineId: data
                });
                id += 1;
            }
        }
        return collections;
    }
}