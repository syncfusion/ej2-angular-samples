import { Component, OnInit, ViewChild } from '@angular/core';
import { energyData } from './data';
import { AggregateService, GroupService, GridComponent, SortService, GridModule, PageService, FilterService, ColumnModel } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';


@Component({
    selector: 'ej2-gridaggregategroup',
    templateUrl: 'aggregate-group.html',
    providers: [AggregateService, GroupService, SortService, PageService, FilterService],
    standalone: true,
    imports: [GridModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class AggregateGroupComponent implements OnInit {
    public data: Object[];
    public filterSettings: Object;
    public energyColumns: ColumnModel[];
    public groupSettings: { [x: string]: Object } = { showDropArea: false, columns: ['ConsumptionCategory'], showGroupedColumn:true };
    public gridLines: string;
    @ViewChild('grid')
    public grid: GridComponent;

    public ngOnInit(): void {
        this.data = energyData;
        this.filterSettings = { type: 'Excel'};
        this.gridLines = 'Vertical';
        this.energyColumns = [
            { field: 'EnergyConsumed', headerText: 'Consumed', width: 150, textAlign: 'Right', clipMode:'EllipsisWithTooltip'},
            { field: 'EnergyProduced', headerText: 'Produced', width: 300, textAlign: 'Right', clipMode:'EllipsisWithTooltip'},
        ]
    }
}