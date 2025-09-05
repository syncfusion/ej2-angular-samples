import { Component, OnInit } from '@angular/core';
import { FreezeService, GridModule, SortService } from '@syncfusion/ej2-angular-grids';
import { telecastData } from './data';
import { EmitType } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-grid-container',
    templateUrl: 'row-spanning-api.html',
    providers: [FreezeService, SortService],
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent]
})
export class RowSpanningComponentAPI implements OnInit {
    public data: Object[];
    public height: string | number;
    public width: string | number;
    public gridLines: string;
    public textWrap: boolean;
    public wrapSettings: Object;
    ngOnInit(): void {
        this.data = telecastData;
        this.gridLines = 'Both';
        this.height = 450;
        this.width = 'auto';
        this.textWrap = true
        this.wrapSettings = { wrapMode: 'Content' };
    }
}