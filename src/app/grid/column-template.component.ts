import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { SortService, GridModule, FilterService, IFilter, Column, GridComponent, Filter } from '@syncfusion/ej2-angular-grids';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import { employeeDetail } from './data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { NgIf } from '@angular/common';

@Component({
    selector: 'ej2-gridcolumntemplate',
    templateUrl: 'column-template.html',
    styleUrls: ['column-template.style.css'],
    providers: [SortService, FilterService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, GridModule, SBDescriptionComponent, NgIf, ChipListModule]
})
export class ColumnTemplateComponent implements OnInit {
    @ViewChild('grid')
    public grid?: GridComponent;
    public data: Object[];
    public filterSettings: Object;
    public filter?: IFilter;
    public dropInstance?: MultiSelect;
    constructor(@Inject('sourceFiles') private sourceFiles: any) {
        sourceFiles.files = ['column-template.style.css'];
    }

    ngOnInit(): void {
        this.data = employeeDetail;
        this.filterSettings = {
            type: 'CheckBox',
            operators: {
                stringOperator: [
                    { value: 'contains', text: 'Contains' },
                    { value: 'doesnotcontain', text: 'Does Not Contains' },
                ],
            },
        },
        this.filter = {
            type: 'Menu',
            ui: {
                create: (args: { target: Element; column: object }) => {
                    const flValInput: HTMLElement = createElement('input', {
                        className: 'flm-input',
                    });
                    args.target.appendChild(flValInput);
                    let dropdownData: string[] = [
                        'Phone',
                        'Mouse',
                        'Laptop',
                        'Keyboard',
                        'Headset',
                        'Tablet',
                        'Projector',
                        'Printer',
                        'Calculator',
                    ];
                    this.dropInstance = new MultiSelect({
                        dataSource: dropdownData,
                        placeholder: 'Select a value',
                        popupHeight: '200px',
                        allowFiltering: true,
                        mode: 'Box',
                    });
                    this.dropInstance.appendTo(flValInput);
                },
                write: (args: any) => {
                    if (args.filteredValue && args.filteredValue.length > 0) {
                        (this.dropInstance as MultiSelect).value = args.filteredValue.split(', ');
                    }
                },
                read: (args: {
                    column: Column;
                    operator: string;
                    fltrObj: Filter;
                }) => {
                    (this.grid as GridComponent).removeFilteredColsByField(
                        args.column.field
                    );
                    if ((this.dropInstance as MultiSelect).value && (this.dropInstance as MultiSelect).value.length) {
                        args.fltrObj.filterByColumn(
                            args.column.field,
                            args.operator,
                            (this.dropInstance as MultiSelect).value.sort().join(', ')
                        );
                    }
                },
            },
        }
    }
}

