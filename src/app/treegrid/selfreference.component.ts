import { Component, OnInit } from '@angular/core';
import { projectData } from './jsontreegriddata';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'selfreference.html',
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class SelfReferenceComponent implements OnInit {
    public data: Object[] = [];

    ngOnInit(): void {
        this.data = projectData;
    }
}