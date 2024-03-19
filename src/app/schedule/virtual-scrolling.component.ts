import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, DragAndDropService, TimelineMonthService, GroupModel, EventSettingsModel, ResizeService, View, MonthService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'virtual-scrolling.html',
    styleUrls: ['virtual-scrolling.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [TimelineMonthService, MonthService, ResizeService, DragAndDropService],
    standalone: true,
    imports: [ScheduleModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class VirtualScrollingComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2021, 4, 1);
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['Resources']
  };
  public resourceDataSource: Record<string, any>[] = this.generateResourceData(1, 300, 'Resource');
  public allowMultiple = true;
  public virtualScroll = true;
  public eventSettings: EventSettingsModel = {
    dataSource: this.generateStaticEvents(new Date(2021, 4, 1), 300, 12)
  };

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['virtual-scrolling.style.css'];
  }

  public generateStaticEvents(start: Date, resCount: number, overlapCount: number): Record<string, any>[] {
    const data: Record<string, any>[] = [];
    let id = 1;
    for (let i = 0; i < resCount; i++) {
      const randomCollection: number[] = [];
      let random = 0;
      for (let j = 0; j < overlapCount; j++) {
        random = Math.floor(Math.random() * (30));
        random = (random === 0) ? 1 : random;
        if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
          randomCollection.indexOf(random - 2) !== -1) {
          random += (Math.max.apply(null, randomCollection) + 10);
        }
        for (let k = 1; k <= 2; k++) {
          randomCollection.push(random + k);
        }
        let startDate: Date = new Date(start.getFullYear(), start.getMonth(), random);
        startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
        const endDate: Date = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
        data.push({
          Id: id,
          Subject: 'Event #' + id,
          StartTime: startDate,
          EndTime: endDate,
          IsAllDay: (id % 10) ? false : true,
          ResourceId: i + 1
        });
        id++;
      }
    }
    return data;
  }

  public generateResourceData(startId: number, endId: number, text: string): Record<string, any>[] {
    const data: Record<string, any>[] = [];
    const colors: string[] = [
      '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c', '#fdd835', '#748ffc',
      '#9775fa', '#df5286', '#7fa900', '#fec200', '#5978ee', '#00bdae', '#ea80fc'
    ];
    for (let a: number = startId; a <= endId; a++) {
      const n: number = Math.floor(Math.random() * colors.length);
      data.push({ Id: a, Text: text + ' ' + a, Color: colors[n] });
    }
    return data;
  }

}
