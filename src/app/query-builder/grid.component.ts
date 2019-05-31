/**
 * Grid Sample
 */

import { Component, ViewChild } from '@angular/core';
import { RuleModel , RuleChangeEventArgs} from '@syncfusion/ej2-querybuilder';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { hardwareData } from './data-source';
import { DataManager, Query, ReturnOption, Predicate } from '@syncfusion/ej2-data';
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { GridComponent, PageService, SelectionService } from '@syncfusion/ej2-angular-grids';

@Component({
    selector: 'control-content',
    templateUrl: 'grid.html',
    styleUrls: ['grid.css'],
    providers: [PageService, SelectionService]
})

export class GridQueryBuilderComponent {
    @ViewChild('querybuilder') qryBldrObj: QueryBuilderComponent;
    @ViewChild('grid') grid: GridComponent;

    dataSource = hardwareData;
    gridDataSource = hardwareData;
    pageSettings = { pageSize: 8, pageCount: 5 };

    importRules: RuleModel = {
        'condition': 'or',
        'rules': [{
            'label': 'Category',
            'field': 'Category',
            'type': 'string',
            'operator': 'endswith',
            'value': 'Laptop'
        }]
    };

    updateRule(args: RuleChangeEventArgs): void {
        const predicate: Predicate = this.qryBldrObj.getPredicate(args.rule);
        const fltrDataSource: Object[] = [];
        let dataManagerQuery: Query;
        if (isNullOrUndefined(predicate)) {
            dataManagerQuery = new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status']);
        } else {
            dataManagerQuery = new Query().select(['TaskID', 'Name', 'Category', 'SerialNo', 'InvoiceNo', 'Status'])
                .where(predicate);
        }
        new DataManager(hardwareData)
            .executeQuery(dataManagerQuery)
            .then((e: ReturnOption) => {
                (<Object[]>e.result).forEach((data: Object) => {
                    fltrDataSource.push(data);
                });
            });
        this.gridDataSource = fltrDataSource;
        this.grid.refresh();
    }
    onGridCreated(): void {
        this.updateRule({rule: this.qryBldrObj.getValidRules(this.qryBldrObj.rule)})
    }
}
