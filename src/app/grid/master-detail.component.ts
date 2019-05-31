import { Component, OnInit, OnChanges, Input, SimpleChanges, SimpleChange, Inject } from '@angular/core';
import { customerData, data } from './data';
import { SelectionService, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';


@Component({
    selector: 'ejs-griddetail',
    templateUrl: 'detail.html'
})
export class DetailComponent implements OnInit, OnChanges {
    @Input()
    public key: string;
    public data: Object[];

    ngOnInit(): void {
        this.data = [];
    }

    ngOnChanges(changes: SimpleChanges): void {
        let key: string = 'key';
        let change: SimpleChange = <SimpleChange>changes[key];

        this.data = data.filter((record: carType) => record.CustomerName === change.currentValue).slice(0, 5);
    }
}

type carType = { CustomerID: string, CustomerName: string, ContactName: string };

@Component({
    selector: 'ejs-gridmaster',
    templateUrl: 'master-detail.html',
    styleUrls: ['master-detail.style.css'],
    providers: [SelectionService]
})
export class MasterComponent implements OnInit {
    public data: Object[];
    public key: string = null;
    public names: string[] = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['detail.html', 'master-detail.style.css'];
    }

    public ngOnInit(): void {
        this.data = customerData.filter((e: carType) => this.names.indexOf(e.CustomerID) !== -1);
    }

    public onRowSelected(args: RowSelectEventArgs): void {
        let record: carType = <carType>args.data;
        this.key = record.ContactName;
    }
}
