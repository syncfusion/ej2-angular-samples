import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Popup } from '@syncfusion/ej2-popups';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import {
  ScheduleComponent, EventSettingsModel, View, MonthService, ActionEventArgs,
  EventRenderedArgs, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';

/**
 * Sample for header bar customization
 */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'control-content',
  templateUrl: 'header-bar.html',
  styleUrls: ['header-bar.style.css'],
  providers: [MonthService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class HeaderBarComponent {
  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild('profilePopup') public profilePopup: Popup;

  public selectedDate: Date = new Date(2021, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: extend([], employeeEventData, null, true) as Record<string, any>[] };
  public currentView: View = 'Month';
  public showHeaderBar: boolean;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['header-bar.style.css'];
  }

  public onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const userIconItem: ItemModel = { align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon' };
      args.items.push(userIconItem);
    }
  }

  public onActionComplete(args: ActionEventArgs): void {
    const scheduleElement: HTMLElement = document.getElementById('schedule') as HTMLElement;
    if (args.requestType === 'toolBarItemRendered') {
      const userIcon: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
      userIcon.onclick = () => {
        this.profilePopup.relateTo = userIcon;
        this.profilePopup.dataBind();
        if (this.profilePopup.element.classList.contains('e-popup-close')) {
          this.profilePopup.show();
        } else {
          this.profilePopup.hide();
        }
      };
    }
    const userContentEle: HTMLElement = createElement('div', { className: 'e-profile-wrapper' });
    scheduleElement.parentElement.appendChild(userContentEle);

    const userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
    const getDOMString: (data: Record<string, any>) => NodeList = compile('<div class="profile-container"><div class="profile-image">' +
      '</div><div class="content-wrap"><div class="name">Nancy</div>' +
      '<div class="destination">Product Manager</div><div class="status">' +
      '<div class="status-icon"></div>Online</div></div></div>');
    const output: NodeList = getDOMString({});
    this.profilePopup = new Popup(userContentEle, {
      content: output[0] as HTMLElement,
      relateTo: userIconEle,
      position: { X: 'left', Y: 'bottom' },
      collision: { X: 'flip', Y: 'flip' },
      targetType: 'relative',
      viewPortElement: scheduleElement,
      width: 185,
      height: 80
    });
    this.profilePopup.hide();
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

}
