import { Component, OnInit } from '@angular/core';
import { employeeData } from './data'
import { ReorderService, SortService, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../../common/dp.component';
import { SBActionDescriptionComponent } from '../../common/adp.component';

@Component({
    selector: 'ej-gridreorder',
    templateUrl: 'reorder.html',
    providers: [ReorderService, SortService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class ReorderComponent implements OnInit {
    public data: Object[];

    ngOnInit(): void {
        this.data = employeeData;
    }
}