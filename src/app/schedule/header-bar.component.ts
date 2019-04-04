import { Component, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Popup } from '@syncfusion/ej2-popups';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { createElement, compile, extend } from '@syncfusion/ej2-base';
import {
    ScheduleComponent, EventSettingsModel, View, MonthService, ActionEventArgs, ToolbarActionArgs,
    EventRenderedArgs, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { employeeEventData } from './data';

/**
 * Sample for header bar customization
 */

@Component({
    selector: 'control-content',
    templateUrl: 'header-bar.html',
    styleUrls: ['header-bar.style.css'],
    providers: [MonthService, ResizeService, DragAndDropService],
    encapsulation: ViewEncapsulation.None
})
export class HeaderBarComponent {
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], employeeEventData, null, true) };
    public currentView: View = 'Month';
    public showHeaderBar: boolean;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['header-bar.style.css'];
    }

    @ViewChild('profilePopup')
    public profilePopup: Popup;

    onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
        if (args.requestType === 'toolbarItemRendering') {
            let userIconItem: ItemModel = {
                align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon'
            };
            args.items.push(userIconItem);
        }
    }
    onActionComplete(args: ActionEventArgs): void {
        let scheduleElement: HTMLElement = document.getElementById('schedule') as HTMLElement;
        if (args.requestType === 'toolBarItemRendered') {
            let userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
            userIconEle.onclick = () => {
                this.profilePopup.relateTo = userIconEle;
                this.profilePopup.dataBind();
                if (this.profilePopup.element.classList.contains('e-popup-close')) {
                    this.profilePopup.show();
                } else {
                    this.profilePopup.hide();
                }
            };
        }
        let userContentEle: HTMLElement = createElement('div', {
            className: 'e-profile-wrapper'
        });
        scheduleElement.parentElement.appendChild(userContentEle);

        let userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
        let getDOMString: (data: object) => NodeList = compile('<div class="profile-container"><div class="profile-image">' +
            '</div><div class="content-wrap"><div class="name">Nancy</div>' +
            '<div class="destination">Product Manager</div><div class="status">' +
            '<div class="status-icon"></div>Online</div></div></div>');
        let output: NodeList = getDOMString({});
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
    // function to handle the CheckBox change event
    onChange(args: ChangeEventArgs): void {
        this.scheduleObj.showHeaderBar = args.checked;
        this.scheduleObj.dataBind();
    }
    oneventRendered(args: EventRenderedArgs): void {
        let categoryColor: string = args.data.CategoryColor as string;
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