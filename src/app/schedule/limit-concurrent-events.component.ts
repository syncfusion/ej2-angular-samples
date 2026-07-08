import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, View, EventSettingsModel, DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService, ScheduleModule, NavigatingEventArgs } from '@syncfusion/ej2-angular-schedule';
import { RadioButtonModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { overlappingData } from './data';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'limit-concurrent-events.html',
    styleUrls: ['limit-concurrent-events.style.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [DayService, WeekService, WorkWeekService, ResizeService, DragAndDropService, SBDescriptionComponent, SBActionDescriptionComponent],
    standalone: true,
    imports: [ScheduleModule, RadioButtonModule, ButtonModule, NumericTextBoxModule]
})
export class LimitConcurrentEventsComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date(2026, 4, 29);
  public currentView: View = 'Week';
  public displayMode: string = 'limited';
  public maxEventsLimit: number = 1;
  public eventSettings: EventSettingsModel = { dataSource: extend([], overlappingData, null, true) as Record<string, any>[] };

  public getMaxStack(): number {
    return this.displayMode === 'all' ? 0 : this.maxEventsLimit;
  }

  public onDisplayModeChange(mode: string): void {
    this.displayMode = mode;
    if (mode === 'all') {
      this.scheduleObj.activeViewOptions.maxEventStack = 0;
    } else {
      this.scheduleObj.activeViewOptions.maxEventStack = this.maxEventsLimit;
    }
    this.scheduleObj.refreshEvents();
  }

  public onLimitChange(value: number): void {
    this.maxEventsLimit = value;
    this.scheduleObj.activeViewOptions.maxEventStack = value;
    this.scheduleObj.refreshEvents();
  }

  private applyMaxStackToAllViews(value: number): void {
    if (!this.scheduleObj) { return; }
    const currentViews: any[] = this.scheduleObj.views as any[];
    const updatedViews: any[] = currentViews.map((view: any) => ({
      ...view,
      maxEventStack: value
    }));
    this.scheduleObj.setProperties({ views: updatedViews }, true);
    this.scheduleObj.dataBind();
    this.scheduleObj.refreshEvents();
  }

  public onNavigating(args: NavigatingEventArgs): void {
    if (args.action === 'view') {
      const value: number = this.displayMode === 'all' ? 0 : this.maxEventsLimit;
      this.applyMaxStackToAllViews(value);
    }
  }

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['limit-concurrent-events.style.css'];
  }
}
