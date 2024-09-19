import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { employeeDetail } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';

@Component({
    selector: 'ej2-gridheadertemplate',
    templateUrl: 'header-template.html',
    styleUrls: ['header-template.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent, ChipListModule]
})
export class HeaderTemplateComponent implements OnInit {
    public data: Object[];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['header-template.style.css'];
    }

    ngOnInit(): void {
        this.data = employeeDetail;
    }
}