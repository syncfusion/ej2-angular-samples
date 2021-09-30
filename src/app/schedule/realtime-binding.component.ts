import { Component, ViewEncapsulation, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  View, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ResizeService,
  DragAndDropService, NavigatingEventArgs, ActionEventArgs, ScheduleComponent
} from '@syncfusion/ej2-angular-schedule';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { scheduleData } from './data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'realtime-binding.html',
  providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class RealTimeBindingComponent implements OnInit, OnDestroy {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public data: Record<string, any>[] = scheduleData;
  public selectedDate: Date = new Date(2021, 0, 10);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  public isHubConnected = false;
  public connection: HubConnection;

  public ngOnInit(): void {
    const url = 'https://ej2.syncfusion.com/aspnetcore/scheduleHub/';
    this.connection = new HubConnectionBuilder().withUrl(url, { withCredentials: false }).withAutomaticReconnect().build();
    this.connection.on('ReceiveData', (action: string, data: View | Record<string, any>[]) => {
      if (action === 'view') {
        this.scheduleObj.currentView = data as View;
      }
      if (action === 'eventCreated' || action === 'eventChanged' || action === 'eventRemoved') {
        this.scheduleObj.eventSettings.dataSource = data as Record<string, any>[];
      }
    });

    this.connection.start().then(() => { this.isHubConnected = true; }).catch(() => { this.isHubConnected = false; });
  }

  public onNavigating(args: NavigatingEventArgs): void {
    if (args.action === 'view' && this.isHubConnected) {
      this.connection.invoke('SendData', args.action, args.currentView);
    }
  }

  public onActionComplete(args: ActionEventArgs): void {
    if (this.isHubConnected && (args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
      this.connection.invoke('SendData', args.requestType, this.scheduleObj.eventSettings.dataSource);
    }
  }

  public ngOnDestroy(): void {
    if (this.connection) {
      this.connection.stop().then(() => { this.isHubConnected = false; }).catch((err) => { console.log(err); });
    }
  }
}
