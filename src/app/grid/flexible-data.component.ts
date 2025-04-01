import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, ODataV4Adaptor, WebApiAdaptor, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import { CheckBoxChangeEventArgs, ColumnModel, DataResult, DataStateChangeEventArgs, GridComponent, GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListComponent, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Ajax } from '@syncfusion/ej2-base';
import { enableRipple, addClass, removeClass } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

@Component({
    selector: 'ej2-gridflexibledata',
    templateUrl: 'flexible-data.html',
    providers: [PageService],
    standalone: true,
    imports: [
        GridModule,
        DropDownListModule,
        CheckBoxModule,
        ButtonModule,
        SBActionDescriptionComponent,
        SBDescriptionComponent,
    ],
})
export class FlexibleDataBindingComponent implements OnInit {
  public data: DataManager;
  @ViewChild('grid')
  public grid: GridComponent;
  @ViewChild('dropdown')
  public serviceDropdown: DropDownListComponent;
  @ViewChild('pageCheckbox')
  public checkboxInstance: CheckBox;
  public fields: Object = { text: 'text', value: 'value' };
  public changedAdaptor: string = 'ODataV4Adaptor';
  public selectedService: string = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/';
  public adaptorName: string = 'ODataV4Adaptor';
  public defaultParam: string;
  public defaultHeader: string;
  public params: [string];
  public header: [string];
  public pagerCheckbox: CheckBox;
  public ddwidth: string = 'auto';
  public serviceURL: { [key: string]: Object }[] = [
    {
      text: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
      value: 'ODataV4Adaptor',
    },
    {
      text: 'https://services.syncfusion.com/angular/production/api/Orders',
      value: 'WebApiAdaptor',
    },
    {
      text: 'https://services.syncfusion.com/js/production/api/UrlDataSource',
      value: 'UrlAdaptor',
    },
    {
      text: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders',
      value: 'Custom Binding',
    },
  ];
  public defaultColumns: ColumnModel[] = [
    { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
    { field: 'CustomerID', width: 140, headerText: 'Customer ID' },
    { field: 'EmployeeID', headerText: 'Employee ID', width: 120, textAlign: 'Right' },
    { field: 'ShipCity', headerText: 'Ship City', width: 140 },
  ];
  public empColumns: ColumnModel[] = [
    {
      field: 'EmployeeID',
      headerText: 'Employee ID',
      width: 130,
      textAlign: 'Right',
    },
    { field: 'Employees', headerText: 'Employee Name', width: 150 },
    { field: 'Designation', headerText: 'Designation', width: 130 },
    {
      field: 'CurrentSalary',
      headerText: 'Current Salary',
      format: 'C2',
      textAlign: 'Right',
      width: 140,
    },
  ];
  public BASE_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';
  public ajax: Ajax = new Ajax({
    type: 'GET',
    mode: true,
    onFailure: (e: Error) => {
      return false;
    },
  });
  ngOnInit(): void {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      document.body.classList.add('e-mac-safari');
    }
    this.data = new DataManager({
      url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/',
      adaptor: new ODataV4Adaptor(),
      crossDomain: true
    });
    document.getElementById('payload-detail').innerHTML =
      "<b><u>Payload Information</u></b><br> Service URL: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/' <br> Adaptor Type: ODataV4Adaptor";
  }

  serviceChange(args: any): void {
    this.selectedService = this.serviceDropdown.text as string;
    this.changedAdaptor = this.serviceDropdown.value as string;
    this.adaptorName = this.serviceDropdown.value as string;
    let paramElements = document.querySelectorAll('.params_show_hide');
    let headerElements = document.querySelectorAll('.header_show_hide');
    removeClass(paramElements, 'hide_elem');
    removeClass(headerElements, 'hide_elem');
    if (this.changedAdaptor === 'Custom Binding') {
        addClass(paramElements, 'hide_elem');
    }
  }

  parameterOnClick = (args: any) => {
    this.httpAdditionalInfo('paramsKey', 'paramsValue', 'addParams');
  };

  headerOnClick = (args: any) => {
    this.httpAdditionalInfo('hkey', 'hvalue', 'hdvalue');
  };
  httpAdditionalInfo = (name: string, val: string, btn: string) => {
    let parameterKey = (document.getElementById(name) as any).value;
    let parameterValue = (document.getElementById(val) as any).value;
    parameterKey && parameterValue
      ? ((
        document.getElementById(btn) as any
      ).value += `{"${parameterKey}": "${parameterValue}"}\n`)
      : null;
    (document.getElementById(name) as any).value = '';
    (document.getElementById(val) as any).value = '';
  };

  createObjectArray = (headers: any) => {
    let result = headers
      .trim()
      .split('\n')
      .map((head: any) => JSON.parse(head));
    return result;
  };

  getData = (state: DataStateChangeEventArgs): Promise<DataResult> => {
    this.defaultParam = (document.getElementById('addParams') as any).value;
    this.params = this.defaultParam
      ? this.createObjectArray(this.defaultParam)
      : [];
    const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
    if (this.checkboxInstance.checked) {
      this.ajax.url =
        this.BASE_URL + '?' + pageQuery + '&$count=true';
    } else {
      this.ajax.url =
        this.BASE_URL + '?' + '&$count=true';
    }
    return this.ajax.send().then((response: any) => {
      let data: any = JSON.parse(response);
      return {
        result: data['value'],
        count: parseInt(data['@odata.count'], 10),
      };
    });
  };
  async executeCustomData(state: DataStateChangeEventArgs) {
    let result = await this.getData(state);
    this.grid.changeDataSource(result, this.defaultColumns);
  }
  public dataStateChangeHandler(args: DataStateChangeEventArgs) {
    // Define your custom event behavior here
    this.executeCustomData(args);
  }

  connectOnclick(e: any) {
    this.grid.query.params = [];
    this.grid.query.queries = [];
    this.defaultParam = (document.getElementById('addParams') as any).value;
    this.defaultHeader = (document.getElementById('hdvalue') as any).value;
    this.header = this.defaultHeader
      ? this.createObjectArray(this.defaultHeader)
      : [];
    this.params = this.defaultParam
      ? this.createObjectArray(this.defaultParam)
      : [];
    let newDataSource: any;
    let checkboxState: boolean = this.checkboxInstance.checked;
    let newQuery: Query = new Query();
    this.params.forEach((obj: any) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          newQuery.addParams(key, value);
          if (
            this.changedAdaptor !== 'UrlAdaptor' &&
            this.changedAdaptor !== 'Custom Binding' &&
            key === 'skip'
          ) {
            newQuery.skip(value);
          } else if (
            this.changedAdaptor !== 'UrlAdaptor' &&
            this.changedAdaptor !== 'Custom Binding' &&
            key === 'take'
          ) {
            newQuery.take(value);
          }
        }
      }
    });
    this.grid.setProperties(
      { query: newQuery, allowPaging: checkboxState },
      true
    );
    if (this.changedAdaptor === 'Custom Binding') {
      let state = { skip: 0, take: 12 };
      this.executeCustomData(state);
    } else {
      let col = this.changedAdaptor === 'UrlAdaptor'
        ? this.empColumns
        : this.defaultColumns;
      if (this.changedAdaptor === 'ODataV4Adaptor') {
        newDataSource = new DataManager({
          url: 'https://services.syncfusion.com/angular/production/api/Orders',
          adaptor: new ODataV4Adaptor(),
          headers: this.header,
          crossDomain: true
        });
      } else if (this.changedAdaptor === 'UrlAdaptor') {
        newDataSource = new DataManager({
          url: 'https://services.syncfusion.com/js/production/api/UrlDataSource',
          adaptor: new UrlAdaptor(),
          headers: this.header,
          crossDomain: true
        });
        this.grid.query.addParams('dataCount', '1000');
      } else if (this.changedAdaptor === 'WebApiAdaptor') {
        newDataSource = new DataManager({
          url: 'https://services.syncfusion.com/angular/production/api/Orders',
          adaptor: new WebApiAdaptor(),
          headers: this.header,
          crossDomain: true
        });
      }
      this.grid.changeDataSource(newDataSource, col);
    }
    let payloadInfo: string;
    if (this.changedAdaptor === 'Custom Binding') {
      payloadInfo = `<b>Payload Information</b> <br> Custom Binding <br> Service URL: ${this.selectedService} <br>`;
    }
    else {
      payloadInfo = `<b>Payload Information</b> <br> Service URL: ${this.selectedService} <br> Adaptor Type: ${this.changedAdaptor} <br> Additional Parameters: ${this.defaultParam} <br> Headers: ${this.defaultHeader}`;
    }
    document.getElementById('payload-detail').innerHTML = '';
    document.getElementById('payload-detail').innerHTML += payloadInfo;
    (document.getElementById('addParams') as any).value = '';
    (document.getElementById('hdvalue') as any).value = '';
  }
}
