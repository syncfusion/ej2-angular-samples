import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  IDataOptions, PivotFieldListComponent, PivotViewComponent, DisplayOption,
  EnginePopulatedEventArgs, CalculatedFieldService, FieldListService, PivotChartService, IDataSet,
  PivotFieldListModule, PivotViewModule, ToolbarService as PivotToolbar, PivotActionBeginEventArgs
} from '@syncfusion/ej2-angular-pivotview';
import { Browser, setStyleAttribute, enableRipple } from '@syncfusion/ej2-base';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { Switch } from '@syncfusion/ej2-buttons';
import { ToolbarModule, SidebarModule, ToolbarComponent, SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
enableRipple(false);

/**
 * Pivot Field List default sample
 */
/* tslint:disable */
declare var require: any;
let Pivot_Data: IDataSet[] = require('./Pivot_Data.json');

@Component({
  selector: 'ej2-pivotview-container',
  templateUrl: 'pivot-chart-fieldlist.html',
  styleUrls: ['pivot-chart-fieldlist.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [CalculatedFieldService, FieldListService, PivotChartService, PivotToolbar],
  standalone: true,
  imports: [PivotViewModule, SBActionDescriptionComponent, SBDescriptionComponent, PivotFieldListModule, ToolbarModule, SidebarModule]
})
export class PivotChartFieldListComponent implements OnInit {
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public chartSettings: ChartSettings;
  public displayOption: DisplayOption;
  public toolbarOptions: string[] = ['Grid', 'Chart'];
  public isInitial = false;
  public displayOptionDropDown: DropDownList;
  public primaryViewDropDown: DropDownList;
  public isChecked = true;
  public displayOptionItem = 'Both';
  public preference = 'Chart';

  @ViewChild('pivotview')
  public pivotObj: PivotViewComponent;

  @ViewChild('pivotfieldlist')
  public fieldlistObj: PivotFieldListComponent;

  @ViewChild('defaultToolbar')
  public toolbarObj: ToolbarComponent;

  @ViewChild('defaultSidebar')
  public sideObj: SidebarComponent;

  actionBegin(args: PivotActionBeginEventArgs): void {
    if (args.actionName == 'Aggregate field') {
      args.cancel = true;
    }
    if (args.actionName == "Show table view") {
      this.primaryViewDropDown.value = 'Table';
    } else if (args.actionName == "Show chart view") {
      this.primaryViewDropDown.value = 'Chart';
    }
  }

  afterEnginePopulate(arge: EnginePopulatedEventArgs): void {
    if (!Browser.isDevice && this.fieldlistObj && this.pivotObj) {
      this.fieldlistObj.update(this.pivotObj);
    }
  }

  afterPopulate(arge: EnginePopulatedEventArgs): void {
    this.fieldlistObj.updateView(this.pivotObj);
  }

  ToolbarCliked(args: any) {
    if (args.item.id == "fieldlist") {
      this.sideObj.toggle();
      this.toolbarObj.items[3].prefixIcon = this.sideObj.isOpen ? 'sb-icons sb-icon-Next' : 'sb-icons sb-icon-Previous';
      this.toolbarObj.items[3].tooltipText = this.sideObj.isOpen ? 'Collapse Field List' : 'Expand Field List';
    }
    if (Browser.isDevice) {
      this.sideObj.isOpen = false;
      this.toolbarObj.items[3].prefixIcon = 'sb-icons sb-icon-Next pivot-fieldList';
    }
  }

  dataBound() {
    if (document.getElementById('displayOptionddl') && document.getElementById('displayOptionddl') && document.getElementById('toolbar-switch') && !this.isInitial) {
      this.isInitial = true;
      this.displayOptionDropDown = new DropDownList({
        floatLabelType: 'Auto',
        width: 100,
        value: this.displayOptionItem,
        change: (args: any) => {
          this.displayOptionItem = args.value;
          if (args.value !== 'Both') {
            this.primaryViewDropDown.readonly = true;
            this.pivotObj.displayOption = { view: args.value as any };
          } else if (args.value == 'Both') {
            this.primaryViewDropDown.readonly = false;
            this.pivotObj.displayOption = {
              view: args.value,
              primary: this.primaryViewDropDown.value as any,
            };
          }
          this.pivotObj.refresh();
        }
      });
      this.displayOptionDropDown.appendTo('#displayOptionddl');
      this.primaryViewDropDown = new DropDownList({
        floatLabelType: 'Auto',
        width: 100,
        value: this.preference,
        change: (args: any) => {
          this.preference = args.value;
          if (this.pivotObj.displayOption.view == 'Both') {
            this.pivotObj.displayOption = { view: 'Both', primary: args.value as any };
            this.pivotObj.refresh();
          }
        }
      });
      this.primaryViewDropDown.appendTo('#primaryViewddl');
      let layoutSwitch: Switch = new Switch({
        checked: this.isChecked,
        cssClass: 'pivot-toolbar-switch',
        change: (args: any) => {
          this.isChecked = args.checked;
          this.pivotObj.showToolbar = !this.pivotObj.showToolbar;
          this.pivotObj.refresh();
        }
      });
      layoutSwitch.appendTo('#toolbar-switch');
    }
  };

  ondataBound(): void {
    if (Browser.isDevice) {
      this.pivotObj.element.style.width = '100%';
      this.pivotObj.allowCalculatedField = true;
      this.pivotObj.showFieldList = true;
    }
    this.pivotObj.tooltip.destroy();
    this.pivotObj.refresh();
  };

  onLoad(): void {
    if (Browser.isDevice) {
      this.fieldlistObj.renderMode = 'Popup';
      this.fieldlistObj.target = '.control-section';
      setStyleAttribute(document.getElementById('PivotFieldList'), {
        width: '0',
        height: '0',
        float: 'left',
        'display': 'none'
      });
    }
  };

  onChange(): void {
    if (!this.sideObj.isOpen) {
      document.getElementById('pivot_container').style.width = '100%';
    } else {
      document.getElementById('pivot_container').style.width = '64%';
    }
    setTimeout(() => {
      this.pivotObj.layoutRefresh();
    }, 700);
  }

  beforeCreate(): void {
    this.isInitial = false;
    if (this.pivotObj) {
      this.pivotObj.layoutRefresh();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (Browser.isDevice) {
        this.sideObj.isOpen = false;
        this.toolbarObj.items[3].prefixIcon = 'sb-icons sb-icon-Next pivot-fieldList';
        this.pivotObj.toolbar = ['Grid', 'Chart', 'FieldList'];
      }
      this.pivotObj.layoutRefresh();
    }, 700);
  }

  ngOnInit(): void {
    this.displayOption = { view: 'Both', primary: 'Chart' } as DisplayOption;
    this.chartSettings = {
      title: 'Sales Analysis',
      chartSeries: { type: 'Column' },
      load: (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
          selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
      }
    } as ChartSettings;

    this.gridSettings = {
      columnWidth: Browser.isDevice ? 100 : 120
    } as GridSettings;

    this.dataSourceSettings = {
      dataSource: Pivot_Data,
      expandAll: false,
      allowLabelFilter: true,
      allowValueFilter: true,
      columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
      { name: 'Amount', caption: 'Sold Amount' }],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
      enableSorting: true
    };
  }
}