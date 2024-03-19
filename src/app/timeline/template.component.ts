/**
 * Timeline Default Sample
 */

import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Timeline } from '@syncfusion/ej2-layouts';
import { TimelineAllModule, TimelineItemModel } from '@syncfusion/ej2-angular-layouts';

@Component({
    selector: 'control-content',
    templateUrl: 'template.html',
    styleUrls: ['template.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TimelineAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})

export class TemplateTimelineComponent {

    @ViewChild('templateTimeline')
    public timelineObj: Timeline;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['template.css'];
    }

    public gitHubRoadmap = [
        { icon: "sf-icon-commit", message: "Created 10 commits in 5 repositories" },
        { icon: "sf-icon-create", message: "Created 1 repository" },
        { icon: "sf-icon-pull", message: "Created a pull request in <u>organization/new-control-roadmap</u>" },
        { icon: "sf-icon-review", message: "Reviewed 3 pull requests in 2 repositories" }
    ];

    public timelineItems: TimelineItemModel[] = this.gitHubRoadmap.map(({ icon, message }) => ({
        dotCss: icon,
        content: message
    }));

}