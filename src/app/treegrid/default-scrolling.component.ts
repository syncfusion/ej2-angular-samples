import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'default-scrolling.html',
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DefaultScrollingComponent implements OnInit {
    public data: Object[] = [];
    public dateformat: Object;
    
    ngOnInit(): void {
        this.data = sampleData;
        this.dateformat = { type: 'dateTime', format: 'dd/MM/yyyy' };
    }
}