import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { productData } from './data'; closest
import { closest } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { FilterService, SortService, GridComponent, GridModule, PageService, FilterSettingsModel, KeyboardEventArgs, PredicateModel } from '@syncfusion/ej2-angular-grids';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { TextBox, TextBoxModule, NumericTextBoxModule, NumericTextBox } from '@syncfusion/ej2-angular-inputs';
import { DropDownList, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'ej2-gridfilter-template',
    templateUrl: 'filter-template.html',
    styleUrls: ['filter-template.style.css'],
    providers: [FilterService, SortService, PageService],
    standalone: true,
    imports: [DropDownListModule, GridModule, TextBoxModule, NumericTextBoxModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class FilterTemplateComponent implements OnInit {
    public data: Object[];
    public filterSettings: FilterSettingsModel = {
        showFilterBarOperator: true,
        showFilterBarStatus: false,
    };
    public pageSettings: Object = { pageCount: 5 };
    public ddData: string[] = ['Both', 'true', 'false'];

    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('productIDTxtObj')
    public productIDTxtObj: NumericTextBox;
    @ViewChild('ProductNameTxtObj')
    public ProductNameTxtObj: TextBox;
    @ViewChild('minTextBox')
    public minTextBox: NumericTextBox;
    @ViewChild('maxTextBox')
    public maxTextBox: NumericTextBox;
    @ViewChild('StatusDDObj')
    public StatusDDObj: DropDownList;

    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['filter-template.style.css'];
    }

    public ngOnInit(): void {
        this.data = productData;
    }

    public dataBound(): void {
        this.productIDTxtObj!.element.classList.add('e-fltrtemp-focus');
        this.ProductNameTxtObj!.element.classList.add('e-fltrtemp-focus');
        this.minTextBox!.element.classList.add('e-fltrtemp-focus');
        this.maxTextBox!.element.classList.add('e-fltrtemp-focus');
        this.StatusDDObj!.element.firstElementChild?.classList.add('e-fltrtemp-focus');
        const filterBarOperatorDiv: HTMLDivElement = this.grid.getHeaderTable().querySelector('.e-filterdiv.e-fltrinputdiv');
        if (!filterBarOperatorDiv.querySelector('.e-cus-label')) {
            const label: HTMLElement = document.createElement('div');
            label.classList.add('e-cus-label');
            label.innerText = 'Stock';
            label.style.fontSize = '14px';
            label.style.fontWeight = '300';
            label.style.marginBottom = '5px';
            label.style.textAlign = 'start';
            filterBarOperatorDiv.insertBefore(label, filterBarOperatorDiv.firstChild);
        }
    }
    public keyPressed(args: KeyboardEventArgs) {
        if (args.keyCode === 13) {
            const target: Element = args.target as Element;
            const th: Element = closest(target, 'th');
            if (th && th.classList.contains('e-filterbarcell') && th.hasAttribute('e-mappinguid')) {
                const field: string = this.grid!.getColumnByUid(th.getAttribute('e-mappinguid')).field;
                if (field === 'UnitPrice') {
                    args.cancel = true;
                    if (this.minTextBox.element.value || this.maxTextBox.element.value) {
                        const filterColumns: PredicateModel[] =
                            this.grid.filterSettings.columns.filter((data) => data.field !== 'UnitPrice');
                        if (this.minTextBox.element.value) {
                            filterColumns.push({
                                field: 'UnitPrice',
                                operator: 'greaterthanorequal',
                                predicate: 'and',
                                value: parseFloat(this.minTextBox.element.value),
                            });
                        }
                        if (this.maxTextBox.element.value) {
                            filterColumns.push({
                                field: 'UnitPrice',
                                operator: 'lessthanorequal',
                                predicate: 'and',
                                value: parseFloat(this.maxTextBox.element.value),
                            });
                        }
                        setTimeout(() => {
                            this.grid.setProperties({
                                filterSettings: { columns: filterColumns },
                            });
                        }, 0);
                    } else {
                        const filterColumns: PredicateModel[] =
                            this.grid.filterSettings.columns.filter((data) => data.field === 'UnitPrice');
                        if (filterColumns.length) {
                            this.grid.removeFilteredColsByField('UnitPrice');
                        }
                    }
                }
                if (field === 'ProductID' || field === 'ProductName') {
                    args.cancel = true;
                    let elemValue: string | number =
                        field === 'ProductID' ? this.productIDTxtObj.element.value : this.ProductNameTxtObj.element.value.trim();
                    let operator: string = field === 'ProductID' ? 'equal' : 'startswith';
                    if ((elemValue as string).length > 0) {
                        if (field === 'ProductID') elemValue = parseFloat(elemValue as string);
                        this.grid!.filterByColumn(field, operator, elemValue);
                    } else {
                        this.grid!.clearFiltering([field]);
                    }
                }
            }
        }
    }

    public discontinuedChange(args: ChangeEventArgs) {
        if (args.value !== 'Both') {
            this.grid!.filterByColumn('Discontinued', 'equal', args.value === 'true' ? true : false);
        } else {
            this.grid!.clearFiltering(['Discontinued']);
        }
    }
}