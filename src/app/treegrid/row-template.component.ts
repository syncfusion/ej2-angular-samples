import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { textdata } from './jsontreegriddata';
import { TreeGridComponent, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { Internationalization } from '@syncfusion/ej2-base';
import { NgClass } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

let instance: Internationalization = new Internationalization();

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'row-template.html',
    styleUrls: ['row-template.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, NgClass]
})
export class RowTemplateComponent implements OnInit {
    public data: Object[] = [];

    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;

    ngOnInit(): void {
        this.data = textdata;
    }

    public format(value: Date): string {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }
    
}

export interface DateFormat extends Window {
    format?: Function;
}



