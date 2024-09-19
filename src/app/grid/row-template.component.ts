import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { pizzaData } from './data';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons'
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridrowtemplate',
    templateUrl: 'row-template.html',
    styleUrls: ['row-template.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent, ChipListModule]
})
export class RowTemplateComponent implements OnInit {
    public data: Object[];

    @ViewChild('grid')
    public grid: GridComponent;

    ngOnInit(): void {
        this.data = pizzaData;
    }
}