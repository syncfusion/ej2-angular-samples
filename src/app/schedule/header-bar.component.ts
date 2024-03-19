import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
// custom code start
import { fromEvent, Subscription } from 'rxjs';
// custom code end
import { Popup } from '@syncfusion/ej2-popups';
import { ChangeEventArgs, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, View, MonthService, ActionEventArgs, EventRenderedArgs, ResizeService, DragAndDropService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for header bar customization
 */

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-content',
    templateUrl: 'header-bar.html',
    styleUrls: ['header-bar.style.css'],
    providers: [MonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ScheduleModule, CheckBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class HeaderBarComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('profilePopup') public profilePopup: Popup;

  public selectedDate: Date = new Date(2021, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: extend([], employeeEventData, null, true) as Record<string, any>[] };
  public currentView: View = 'Month';
  public showHeaderBar: boolean;
  // custom code start
  private keydownSubscription: Subscription;
  private clickSubscription: Subscription;
  // custom code end

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['header-bar.style.css'];
  }

  public onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'toolBarItemRendered') {
      const scheduleElement: HTMLElement = document.getElementById('schedule') as HTMLElement;
      const userIcon: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
      userIcon.onclick = () => {
        if (this.profilePopup.element.classList.contains('e-popup-close')) {
          this.profilePopup.show();
        } else {
          this.profilePopup.hide();
        }
      };
      const userContentEle: HTMLElement = createElement('div', { className: 'e-profile-wrapper' });
      scheduleElement.parentElement.appendChild(userContentEle);
      const getDOMString: (data: Record<string, any>) => NodeList = compile('<div class="profile-container"><div class="profile-image">' +
        '</div><div class="content-wrap"><div class="name">Nancy</div>' +
        '<div class="destination">Product Manager</div><div class="status">' +
        '<div class="status-icon"></div>Online</div></div></div>');
      const output: NodeList = getDOMString({});
      this.profilePopup = new Popup(userContentEle, {
        content: output[0] as HTMLElement,
        relateTo: '.e-schedule-user-icon',
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' },
        targetType: 'relative',
        viewPortElement: scheduleElement,
        width: 185,
        height: 80
      });
      this.profilePopup.hide();

      // custom code start
      const hidePopup: (event: KeyboardEvent | MouseEvent) => void = (event: KeyboardEvent | MouseEvent): void => {
        if (this.profilePopup.element.classList.contains('e-popup-open') && (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape') ||
          (event.type === 'click' && event.target && !((event.target as HTMLElement).closest('.e-schedule-user-icon') ||
            (event.target as HTMLElement).closest('.e-profile-wrapper'))))) {
          this.profilePopup.hide();
        }
      }
      this.keydownSubscription = fromEvent(document, 'keydown').subscribe(hidePopup.bind(this));
      this.clickSubscription = fromEvent(document, 'click').subscribe(hidePopup.bind(this));
      this.scheduleObj.toolbarItems[this.scheduleObj.toolbarItems.length - 1].click = null;
      // custom code end
    }
  }

  public onChange(args: ChangeEventArgs): void {
    if (!args.checked) {
      this.profilePopup.hide();
    }
    this.scheduleObj.showHeaderBar = args.checked;
    this.scheduleObj.dataBind();
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  // custom code start
  ngOnDestroy() {
    this.keydownSubscription.unsubscribe();
    this.clickSubscription.unsubscribe();
  }
  // custom code end
}
