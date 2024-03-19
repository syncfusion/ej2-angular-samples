import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { customerData, data } from './data';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { SelectionService, RowSelectEventArgs, GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { NgIf } from '@angular/common';

type carType = { CustomerID: string, CustomerName: string, ContactName: string };

@Component({
    selector: 'ejs-gridmaster',
    templateUrl: 'master-detail.html',
    styleUrls: ['master-detail.style.css'],
    providers: [SelectionService],
    standalone: true,
    imports: [GridModule, NgIf, SBDescriptionComponent]
})
export class MasterdetailComponent implements OnInit {
    public data: Object[];
    public key: string = null;
    public names: string[] = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];

    @ViewChild('mastergrid') public mastergrid: GridComponent;

    @ViewChild('detailgrid') public detailgrid: GridComponent;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['master-detail.style.css'];
    }

    public ngOnInit(): void {
        this.data = customerData.filter((e: carType) => this.names.indexOf(e.CustomerID) !== -1);
    }

    public onRowSelected(args: RowSelectEventArgs): void {
        const queryData: any =  args.data;
        this.key = queryData.ContactName;
        const dataSource: object[] = new DataManager(data).executeLocal(new Query().where('CustomerName', 'equal', queryData.ContactName));
        this.detailgrid.dataSource = dataSource.slice(0, 5);
    }
}
