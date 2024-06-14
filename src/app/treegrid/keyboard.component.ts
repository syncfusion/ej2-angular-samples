import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';
import { TreeGridAllModule } from '@syncfusion/ej2-angular-treegrid';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'keyboard.html',
    standalone: true,
    imports: [TreeGridAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class KeyBoardComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public numberrules: Object;
    public daterules: Object;
    public selectionSettings: Object;

    ngOnInit(): void {
        this.data = sampleData;
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            mode: 'Row'
        };
        this.numberrules = { number: true, min: 0 };
        this.taskidrules = { required: true, number: true };
        this.tasknamerules = { required: true };
        this.selectionSettings = { type: 'Multiple' };
        this.daterules = { date: true};
    }
}
