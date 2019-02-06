import { Component, OnInit } from '@angular/core';
import { sampleData } from './jsontreegriddata';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'keyboard.html'
})
export class KeyBoardComponent implements OnInit {
    public data: Object[] = [];
    public editSettings: Object;
    public taskidrules: Object;
    public tasknamerules: Object;
    public numberrules: Object;
    public daterules: Object;

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
        this.daterules = { date: true};
    }
}
