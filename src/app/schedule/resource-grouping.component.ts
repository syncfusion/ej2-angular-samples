import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, GroupModel, ResourceDetails, WeekService, MonthService, AgendaService, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'resource-grouping.html',
    styleUrls: ['resource-grouping.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [WeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class GroupComponent {
  public selectedDate: Date = new Date(2021, 3, 6);
  public resourceDataSource: Record<string, any>[] = [
    { AirlineName: 'Airways 1', AirlineId: 1, AirlineColor: '#EA7A57' },
    { AirlineName: 'Airways 2', AirlineId: 2, AirlineColor: '#357cd2' },
    { AirlineName: 'Airways 3', AirlineId: 3, AirlineColor: '#7fa900' }
  ];
  public group: GroupModel = { resources: ['Airlines'] };
  public allowMultiple = true;
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

  public getAirlineName(value: ResourceDetails): string {
    return ((value as ResourceDetails).resourceData) ?
      (value as ResourceDetails).resourceData[(value as ResourceDetails).resource.textField] as string
      : value.resourceName;
  }

  public getAirlineImage(value: ResourceDetails): string {
    const airlineName: string = this.getAirlineName(value);
    return airlineName.replace(' ', '-').toLowerCase();
  }

  public getAirlineModel(value: ResourceDetails): string {
    const airlineName: string = this.getAirlineName(value);
    return (airlineName === 'Airways 1') ? 'CRJ 700' : (airlineName === 'Airways 2') ? 'Airbus A330' : 'ATR 72-600';
  }

  public getAirlineSeats(value: ResourceDetails): number {
    const airlineName: string = this.getAirlineName(value);
    return (airlineName === 'Airways 1') ? 50 : (airlineName === 'Airways 2') ? 75 : 100;
  }

  public generateEvents(): Record<string, any>[] {
    const subjectCollection: string[] = ['Barcelona to Los Angeles', 'Los Angeles to Barcelona'];
    const collections: Record<string, any>[] = [];
    const dataCollections: number[] = [1, 2, 3];
    let id = 1;
    for (const data of dataCollections) {
      const startDate: Date = new Date(2021, 3, 1);
      startDate.setMilliseconds(1000 * 60 * 60 * .5 * (data - 1));
      const lastDate: Date = new Date((+startDate) + (1000 * 60 * 60 * 24 * 30));
      for (let date: Date = startDate; date.getTime() < lastDate.getTime(); date = new Date(date.getTime() + (1000 * 60 * 60 * 5))) {
        const strDate: Date = new Date(+date);
        const endDate: Date = new Date((+strDate) + (1000 * 60 * 60 * (2.5 + (0.5 * data))));
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
