import { Component, OnInit, ViewChild } from '@angular/core';
import { summaryData } from './jsontreegriddata';
import { getObject, CustomSummaryType, GridModule, PdfExportProperties } from '@syncfusion/ej2-angular-grids';
import { TreeGridComponent, TreeGridModule, AggregateService,ToolbarService,ExcelExportService,PdfExportService, ToolbarItems } from '@syncfusion/ej2-angular-treegrid';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DropDownList, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-treegrid-container',
    templateUrl: 'custom-aggregate.html',
    providers:[AggregateService,ToolbarService,ExcelExportService,PdfExportService,],
    standalone: true,
    imports: [TreeGridModule, SBActionDescriptionComponent, SBDescriptionComponent, GridModule, DropDownListModule]

})
export class CustomAggregateComponent implements OnInit {
    public dataSource: Object[] = []
    public foods: any;
    public selectedCategory: string = 'Seafood';
    public listObj : DropDownList;
    public toolbarOptions?: ToolbarItems[];
    public customAggregateFn: (data: Object) => number;
    public  countLength: number = 0;
    public stringAlign:string="Left";
    public numberAlign:string="Right";
    @ViewChild('treegrid')
    public treegrid: TreeGridComponent;
    ngOnInit(): void {
        this.dataSource = summaryData;
        this.foods= [     { food : 'Seafood'},
                          { food : 'Dairy'},
                          { food : 'Edible'},
                          { food : 'Crystal'}, ];
        this.toolbarOptions = ['ExcelExport','PdfExport','CsvExport'];
        this.customAggregateFn = this.createCustomAggregateFn(this.selectedCategory);
      
    }
   
    //Custom aggregate function to calculate the count of items for the selected category.
   private createCustomAggregateFn(selectedValue: string): (data: Object) => number {
        return (data: Object): number => {
            const sampleDatas: any = getObject('result', data) ?? data;
            return sampleDatas
                ? sampleDatas.filter((item: Object) => getObject('category', item) === selectedValue).length
                : 0;
        };
    }

    //Handles the 'excelAggregateQueryCellInfo' event to customize aggregate cells during Excel export.
    public excelAggregateQueryCellInfo = (args: any): void => {
           if(args.cell.column.headerText === "Category")  {
                    args.style.value = "Count of " + this.selectedCategory + " : " +args.row.data.category.Custom;           
               }
        }
        
        //Handles the 'pdfAggregateQueryCellInfo' event to customize aggregate cells during PDF export.
      public pdfAggregateQueryCellInfo = (args: any): void => {
         if(args.cell.column.headerText === "Category")  { 
                    args.value = "Count of " + this.selectedCategory + " : " +args.row.data.category.Custom;
            }
        }

      //Initializes a DropDownList in the footer for category selection.
     onDataBound (args:any) : void {
        
        if (!isNullOrUndefined(this.listObj)) {
          this.listObj.destroy();
        }
        var proxy = this;
        this.listObj = new DropDownList({
            dataSource: proxy.foods,
            fields: { value: 'food' },
            placeholder: 'Select a Category',
            width: '110px',
            value: this.selectedCategory,
            change: () => {
                setTimeout(
                    () => {
                        this.selectedCategory = this.listObj.value.toString();
                        proxy.selectedCategory = this.selectedCategory;
                        proxy.customAggregateFn = proxy.createCustomAggregateFn(proxy.selectedCategory);
                        proxy.treegrid.refresh();
                    },
                    300
                );
            }
        });
      this.listObj.appendTo('#customers');
     
     }
      toolbarClick(args: Object | any) : void {
        if (args['item'].text === 'Excel Export') {
            this.treegrid?.excelExport();
        }
        else if (args['item'].text === 'PDF Export') {
            let exportProperties: PdfExportProperties = {
            pageOrientation: 'Landscape',
        };
            this.treegrid?.pdfExport(exportProperties);
        }
        else if (args['item'].text === 'CSV Export') {
            this.treegrid?.csvExport();
        }
    }
}
