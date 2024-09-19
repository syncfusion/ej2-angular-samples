import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { pivotData } from './dataSource';
import { PivotViewAllModule, IDataSet, ToolbarArgs, PivotViewComponent } from '@syncfusion/ej2-angular-pivotview';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import { DialogAllModule, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { ChipListAllModule, ChipListComponent } from '@syncfusion/ej2-angular-buttons';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { TextBox } from '@syncfusion/ej2-inputs';
import { getAzureChatAIRequest } from '../../azure-openai';

@Component({
  selector: 'app-smart-pivottable',
  standalone: true,
  imports: [PivotViewAllModule, DialogAllModule, ChipListAllModule],
  templateUrl: './smart-pivottable.component.html',
  styleUrls: ['./smart-pivottable.component.css']
})
export class SmartPivotTableComponent implements OnInit {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    this.sourceFiles.files = [
      'ai-smart-pivottable.component.html',
      'smart-pivottable.component.css',
    ];
  }
  @ViewChild('pivotview', { static: true }) pivotView!: PivotViewComponent;
  @ViewChild('pivotDialog', { static: true }) dialog!: DialogComponent;
  @ViewChild('chip', { static: true }) chip!: ChipListComponent;

  public dropdownData: string[] = ['2025', '2026', '2027', '2028', '2029'];
  public description!: string;
  public dataSourceSettings: object = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Quarter' }],
    values: [{ name: 'Sold', caption: 'Units Sold', type: 'Count' }, { name: 'Amount', caption: 'Sold Amount', type: 'Min' }],
    dataSource: pivotData as IDataSet[],
    rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
    filterSettings: [{ name: 'Products', type: 'Include', items: ['Bikes', 'Road Bikes', 'Helmets', 'Bottles and Cages'] }]
  };
  public toolbarOptions!: string[];
  public chartSettings!: object;
  public dialogVisible: boolean = false;
  public buttons!: Object[];

  ngOnInit(): void {
    this.initializeSettings();
    this.updateContentBasedOnSelection(0);
  }

  initializeSettings(): void {


    this.toolbarOptions = ['Grid', 'Chart', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'];

    this.chartSettings = {
      value: 'Amount', enableExport: true, chartSeries: { type: 'Column', animation: { enable: false } }, enableMultipleAxis: false,
    };

    this.buttons = [{
      click: this.onSubmit.bind(this),
      buttonModel: { content: 'Submit', isPrimary: true }
    }];
  }

  toolbarRender(args: ToolbarArgs): void {
    (args.customToolbar as ItemModel[]).splice(5, 0, { type: 'Separator' });
    (args.customToolbar as ItemModel[]).splice(6, 0, {
      text: 'AI Assist', tooltipText: 'AI Assist',
      click: this.toolbarClicked.bind(this)
    });
  }

  toolbarClicked(): void {
    this.dialog.show();
  }

  getCellContent(e: any): string {
    if (e && e.targetCell.className.indexOf('e-valuescontent') > -1) {
      let year = e.cellInfo.columnHeaders.replace(/^FY\s*/, '');
      if (this.dropdownData.includes(year)) {
        e.targetCell.classList.add('e-custom-class');
      }
    }
    return '';
  }

  onSubmit(): void {
    this.dialog.hide();
    this.showSpinner();
    if (this.chip.selectedChips === 0) {
      let year = (document.getElementById('yearInput') as any).value;
      this.description = `Provide future data points up to the year ${year} along with the existing data from the provided data source.`;
    } else if (this.chip.selectedChips === 1) {
      let selectedFields = (document.getElementById('fieldsInput') as any).getAttribute("data-initial-value");
      let aggregationValue = (document.getElementById('aggregateInput') as any).value;
      this.description = `Suggest the best way to aggregate and view provided fields(${selectedFields}) using the provided data source. Use only these fields (${selectedFields}) to frame the rows, columns, and values, ensuring all the provided fields are included in the report and the same field should not be bind twice in different property of reports. **Ensure that the "type" property of the values fields holds the aggregation type as ${aggregationValue}. And the rows and values fields should not be empty in the report`;
    } else if (this.chip.selectedChips === 2) {
      let filterText: string = document.querySelector('#filterInput') as HTMLInputElement ? (document.querySelector('#filterInput') as HTMLInputElement).value as string : '';
      this.description = `Filter the Products field based on ${filterText} and return the filtersettings with corresponding items from the Products field `;
    }
    let input: string = this.frameContent();
    getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] })
      .then((result: any) => {
        let cleanedJsonData: string = result.replace(/^```json\n|```\n?$/g, '');
        this.pivotView.dataSourceSettings = JSON.parse(cleanedJsonData);
        this.hideSpinner();
      })
      .catch((error: any) => {
        console.error('Error fetching AI output:', error);
        this.hideSpinner();
      });
  }

  frameContent(): string {
    let filter: string = "Include, Exclude";
    let labelType: string = "Label, Number";
    let operators: string = `'Equals', 'DoesNotEquals',
      'BeginWith',
      'DoesNotBeginWith',
      'EndsWith',
      'DoesNotEndsWith',
      'Contains',
      'DoesNotContains',
      'GreaterThan',
      'GreaterThanOrEqualTo',
      'LessThan',
      'LessThanOrEqualTo',
      'Before',
      'BeforeOrEqualTo',
      'After',
      'AfterOrEqualTo',
      'Between',
      'NotBetween'`;
    let summary: string = `'Sum',
      'Product'
      'Count',
      'DistinctCount',
      'Median',
      'Min',
      'Max',
      'Avg',
      'Index',
      'PercentageOfGrandTotal',
      'PercentageOfColumnTotal',
      'PercentageOfRowTotal',
      'PercentageOfParentRowTotal',
      'PercentageOfParentColumnTotal',
      'PercentageOfParentTotal',
      'RunningTotals',
      'PopulationStDev',
      'SampleStDev',
      'PopulationVar',
      'SampleVar',
      'DifferenceFrom',
      'PercentageOfDifferenceFrom'`;
    let filterQuery: string = `The filterSettings property holds the filter settings. In this we have two types, member filtering and label filtering. The MemberFiltering has a Type property that is an values corresponding to ${filter} +
      and the MemberFiltering includes the items property that is an array of objects which contains the members of the fields to be included or excluded with the name property. +
      and the LabelFiltering has a Type property that is an values corresponding to ${labelType} +
      and the LabelFiltering property has a Condition property that is an values corresponding to ${operators}. +
      and the LabelFiltering property has a Value1 and Value2 property that depends based on the condition property. +
      Filters should not be applied to fields bound in Values and the same field should not be added to both label filters and member filters.+
      This filterSettings property is an array of objects that contains the filter settings with name and items property for the fields in the pivot table.For example: [{ name: 'Country', type: 'Include', items: ['USA', 'UK' ] }].+`;
    let filterItem: string = document.querySelector('#filterInput') as HTMLInputElement ? (document.querySelector('#filterInput') as HTMLInputElement).value as string : '';
    let pivotQuery: string = `The values property has a type property, which is an enum with values corresponding to ${summary}.`;
    let stringInput: string = `Given the following dataSource and the datasourcesettings(rows, columns and values) are bounded in the pivot table ${JSON.stringify(pivotData)} , ${JSON.stringify(this.dataSourceSettings)} respectively. 
    Return the newly prepared dataSourceSettings based on following user query: ${this.description} and the data source shouldn't change if the query contains a future data points and the reframed data source should contains all the fields(key) with its corresponding values(please refer the first object of the provided data source for the keys), And the items in the filters should be just an array of values, not objects. And the value of the items should be ${filterItem}.
    Generate an output in JSON format only and Should not include any additional information or content in response.
    Note: ${pivotQuery},
    ${filterQuery}`;
    return stringInput;
  }

  showSpinner(): void {
    createSpinner({ target: document.querySelector('.e-grid .e-content') as HTMLElement });
    showSpinner(document.querySelector('.e-grid .e-content') as HTMLElement);
  }

  hideSpinner(): void {
    hideSpinner(document.querySelector('.e-grid .e-content') as HTMLElement);
  }

  onChipSelectionChange(): void {
    this.updateContentBasedOnSelection(this.chip.selectedChips as number);
  }

  updateContentBasedOnSelection(selectedChipIndex: number) {
    let inlineDiv: HTMLElement = document.getElementById('inlineContent') as HTMLElement;
    if (inlineDiv) {
      inlineDiv.innerHTML = '';
    }
    if (selectedChipIndex === 0 && this.pivotView) {
      let yearInput: HTMLElement = document.createElement('input');
      yearInput.id = 'yearInput';
      let textSpan: HTMLElement = document.createElement('span');
      textSpan.id = 'contentText';
      textSpan.className = 'dropdown-size';
      textSpan.innerHTML = 'Provide future data points up to the year ';
      textSpan.appendChild(yearInput);
      textSpan.innerHTML += ' along with the existing data.';
      inlineDiv.appendChild(textSpan);
      let yearDropdown: DropDownList = new DropDownList({
        placeholder: 'Select a Year',
        width: '80px',
        popupHeight: '200px',
        popupWidth: '140px',
        index: 0,
        dataSource: this.dropdownData
      });
      yearDropdown.appendTo('#yearInput');
    } else if (selectedChipIndex === 1 && this.pivotView) {
      let textSpan: HTMLElement = document.createElement('span');
      textSpan.id = 'contentText';
      textSpan.innerHTML = 'Suggest the best way to aggregate and view provided fields ';
      let fieldsInput: HTMLElement = document.createElement('input');
      fieldsInput.id = 'fieldsInput';
      textSpan.appendChild(fieldsInput);
      textSpan.innerHTML += ' in ';
      let aggregateInput: HTMLElement = document.createElement('input');
      aggregateInput.id = 'aggregateInput';
      textSpan.appendChild(aggregateInput);
      textSpan.innerHTML += ' aggregate type.';
      inlineDiv.appendChild(textSpan);
      let fieldsMultiSelect: MultiSelect = new MultiSelect({
        placeholder: 'Select Fields',
        width: '150px',
        popupWidth: '180px',
        allowFiltering: true,
        dataSource: ['Country', 'Products', 'Product_Categories', 'Quarter', 'Year', 'Sold', 'Amount', 'In_Stock'], // Sample data
        mode: 'CheckBox',
        value: ['Year', 'Product_Categories', 'Sold']
      });
      fieldsMultiSelect.appendTo('#fieldsInput');
      let aggregateDropdown: DropDownList = new DropDownList({
        placeholder: 'Select aggregation type',
        width: '100px',
        popupHeight: '200px',
        popupWidth: '140px',
        index: 0,
        dataSource: ['Sum', 'Count', 'Product', 'Average', 'Min']
      });
      aggregateDropdown.appendTo('#aggregateInput');
    } else if (selectedChipIndex === 2 && this.pivotView) {
      let textSpan: HTMLElement = document.createElement('span');
      textSpan.id = 'contentText';
      textSpan.className = 'dropdown-size';
      textSpan.innerHTML = 'Filter the Products field based on ';
      let filterInput: HTMLInputElement = document.createElement('input');
      filterInput.id = 'filterInput';
      textSpan.appendChild(filterInput);
      inlineDiv.appendChild(textSpan);
      let filterTextBox: TextBox = new TextBox({
        placeholder: 'Enter filter category',
        cssClass: 'product-class',
        value: 'Bikes',
        width: '100%'
      });
      filterTextBox.appendTo('#filterInput');
    }
  }

}