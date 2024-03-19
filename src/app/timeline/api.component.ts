/**
 * Timeline API Sample
 */

import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';
import { TimelineAllModule, TimelineModule } from '@syncfusion/ej2-angular-layouts';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'control-content',
    templateUrl: 'api.html',
    styleUrls: ['api.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TimelineAllModule, DropDownListModule, SwitchModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class APITimelineComponent {

    @ViewChild('apiTimeline')
    public timelineObj: Timeline;

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['api.css'];
    }

    public travelItenary = [
        { date: "May 13, 2024", details: "Flight Booking: Reserving airline tickets", icon: "sf-icon-onward" },
        { date: "June 20, 2024", details: "Hotel Accommodation: Booking lodging for the trip", icon: "sf-icon-accomodation" },
        { date: "July 2, 2024", details: "Excursion Plans: Organized visits to popular attractions", icon: "sf-icon-explore" },
        { date: "Aug 14, 2024", details: "Return Journey: Flight Confirmation", icon: "sf-icon-return" }
    ];
    public orientationData: string[] = [ 'Horizontal', 'Vertical' ];
    public alignData: string[] = [ 'Before', 'After', 'Alternate', 'Alternatereverse' ];

    public timelineItems = this.travelItenary.map(({ date, details, icon }) => ({
        dotCss: icon,
        content: date,
        oppositeContent: details
    }));

    handleTogglers = (args: any, prop: string) => {
        this.timelineObj.items.forEach((item, index) => {
            item[prop] = args.checked ? this.timelineItems[index][prop] : "";
        });
    };

    handleTimeline = (args: any, prop: string) => {
        this.timelineObj[prop] = args.value;
    };

    toggleReverse = (args: any) => {
        this.timelineObj.reverse = args.checked
    };

}