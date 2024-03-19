import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { employeeData } from './data';
import { DetailRowService, SortService, GridModule } from '@syncfusion/ej2-angular-grids';
import { Internationalization } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

let instance: Internationalization = new Internationalization();

@Component({
    selector: 'ej2-griddetailtemplate',
    templateUrl: 'detail-template.html',
    styleUrls: ['detail-template.style.css'],
    providers: [DetailRowService, SortService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class DetailTemplateComponent implements OnInit {
    public data: any;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['detail-template.style.css'];
    }

    ngOnInit(): void {
        this.data = employeeData;
    }

    public format(value: Date): string {
        return instance.formatDate(value, { skeleton: 'yMd', type: 'date' });
    }
}

export interface DateFormat extends Window {
    format?: Function;
}