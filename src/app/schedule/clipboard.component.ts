import { Component, ViewChild, OnInit } from '@angular/core';
import { extend, closest, isNullOrUndefined, removeClass, remove } from '@syncfusion/ej2-base';
import { ScheduleComponent, EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService, TimelineViewsService, TimelineMonthService, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ContextMenuComponent, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';
import { scheduleData } from './data';

@Component({
    selector: 'app-clipboard',
    templateUrl: 'clipboard.html',
    styleUrls: ['context-menu.style.css'],
    providers: [DayService, WeekService, WorkWeekService, MonthService, ResizeService, DragAndDropService, TimelineViewsService, TimelineMonthService],
    standalone: true,
    imports: [ScheduleModule, ContextMenuModule]
})
export class ClipboardComponent implements OnInit {
    @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
    @ViewChild('menuObj') public menuObj: ContextMenuComponent;

    public selectedDate: Date = new Date(2021, 0, 10);
    public eventSettings: EventSettingsModel = { dataSource: extend([], scheduleData, null, true) as Record<string, any>[] };
    public selectedTarget: Element;
    public targetElement: HTMLElement;
    public menuItems: MenuItemModel[] = [
        { text: 'Cut Event', iconCss: 'e-icons e-cut', id: 'Cut' },
        { text: 'Copy Event', iconCss: 'e-icons e-copy', id: 'Copy' },
        { text: 'Paste', iconCss: 'e-icons e-paste', id: 'Paste' }
    ];

    ngOnInit(): void {
        // Any initialization logic can be placed here
    }

    public onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
        if (newEventElement) {
            remove(newEventElement);
        }
        this.scheduleObj.closeQuickInfoPopup();
        this.targetElement = args.event.target as HTMLElement;
        if (closest(this.targetElement, '.e-contextmenu')) {
            return;
        }
        this.selectedTarget = closest(this.targetElement, '.e-appointment,.e-work-cells,' +
            '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells');
        if (isNullOrUndefined(this.selectedTarget)) {
            args.cancel = true;
            return;
        }
        if (this.selectedTarget.classList.contains('e-appointment')) {
            this.menuObj.showItems(['Cut', 'Copy'], true);
            this.menuObj.hideItems(['Paste'], true);
        } else {
            this.menuObj.showItems(['Paste'], true);
            this.menuObj.hideItems(['Cut', 'Copy'], true);
        }
    }

    public onMenuItemSelect(args: MenuEventArgs): void {
        const selectedMenuItem: string = args.item.id;
        switch (selectedMenuItem) {
            case 'Cut':
                this.scheduleObj.cut([this.selectedTarget] as HTMLElement[]);
                break;
            case 'Copy':
                this.scheduleObj.copy([this.selectedTarget] as HTMLElement[]);
                break;
            case 'Paste':
                this.scheduleObj.paste(this.targetElement);
                break;
        }
    }
}
