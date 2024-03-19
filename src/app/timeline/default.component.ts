/**
 * Timeline Default Sample
 */

import { Component, ViewChild, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Timeline } from '@syncfusion/ej2-layouts';
import { TimelineAllModule } from '@syncfusion/ej2-angular-layouts';

@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['default.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TimelineAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class DefaultTimelineComponent implements OnInit{

    @ViewChild('defaultTimeline')
    public timelineObj: Timeline;
    public orderStatus: string[] = [];

    constructor( @Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['default.css'];
    }

    ngOnInit(): void {
        this.orderStatus = [
            'Ordered \n 9:15 AM, January 1, 2024',
            'Shipped \n 12:20 PM, January 4, 2024',
            'Out for delivery \n 07:00 AM, January 8, 2024',
            'Delivered \n Estimated delivery by 09:20 AM'
        ]
    }

}