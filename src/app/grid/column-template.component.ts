import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SortService, GridModule } from '@syncfusion/ej2-angular-grids';
import { employeeData } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridcolumntemplate',
    templateUrl: 'column-template.html',
    styleUrls: ['column-template.style.css'],
    providers: [SortService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ColumnTemplateComponent implements OnInit {
    public data: Object[];
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['column-template.style.css'];
    }

    ngOnInit(): void {
        this.data = employeeData;
    }

}