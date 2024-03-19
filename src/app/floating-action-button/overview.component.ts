import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { EditSettingsModel, EditService, GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { FabModule } from '@syncfusion/ej2-angular-buttons';


@Component({
    selector: 'control-content',
    templateUrl: 'overview.html',
    styleUrls: ['overview.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [GridModule, FabModule],
    providers: [EditService]
})

export class OverviewFABComponent implements OnInit {

    public orders = [];
    public editSettings: EditSettingsModel;
    @ViewChild('Grid')
    public grid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['overview.css'];
    }

    public ngOnInit(): void {
        let orders = [];
        for (let i = 1; i < 10; i++) {
            orders.push({
                "OrderID": 10589 + i,
                "CustomerID": ["VINET", "TOMSP", "SUPRD", "CHOPS", "RICSU"][Math.floor(Math.random() * 5)],
                "Freight": (10.35 * i).toFixed(2),
                "ShippingCountry": ["France", "Brazil", "Switzerland", "Germany"][Math.floor(Math.random() * 4)]
            });
        }
        this.orders = orders;
        this.editSettings = { allowAdding: true, mode: 'Dialog' };
    }
    public fabClick() {        
         this.grid.addRecord();
    }
} 
