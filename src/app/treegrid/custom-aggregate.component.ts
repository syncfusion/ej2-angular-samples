import { Component, OnInit, ViewChild } from '@angular/core';
import { summaryData } from './jsontreegriddata';
import { getObject, CustomSummaryType, GridModule } from '@syncfusion/ej2-angular-grids';
import { TreeGridComponent, TreeGridModule, AggregateService } from '@syncfusion/ej2-angular-treegrid';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'custom-aggregate.html',
    providers:[AggregateService],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, GridModule, DropDownListModule]

})
export class CustomAggregateComponent implements OnInit {
    public data: Object[] = []
    public foods: any;
    public value: string = 'Frozen seafood';
    public listObj : DropDownList;
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.data = summaryData;
        this.foods= [     { food : 'Frozen seafood'},
                          { food : 'Dairy'},
                          { food : 'Edible'},
                          { food : 'Solid crystals'}, ];
      
    }
    customAggregateFn (data: Object): number  {
        let sampleData: Object[] = getObject('result', data);
        let countLength: number; countLength = 0;
        var proxy = this;
        sampleData.filter((item: Object) => {
            let data: string = getObject('category', item);
            if (data === proxy.value) {
                countLength++;
            }
        });
        return countLength;
    }
    dataBound () : void {
        if (!isNullOrUndefined(this.listObj)) {
          this.listObj.destroy();
        }
        var proxy = this;
        this.listObj = new DropDownList({
            dataSource: proxy.foods,
            fields: { value: 'food' },
            placeholder: 'Select a Category',
            width: '150px',
            value: this.value,
            change: () => {
                setTimeout(
                    () => {
                        proxy.value = this.listObj.value.toString();
                        proxy.treegrid.refresh();
                    },
                    300
                );
            }
        });
      this.listObj.appendTo('#custom');
     }
}
