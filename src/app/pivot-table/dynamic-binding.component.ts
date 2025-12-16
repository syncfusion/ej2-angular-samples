import { Component, OnInit, ViewEncapsulation, ViewChild,ElementRef, ChangeDetectorRef, } from '@angular/core';
import {
    IDataOptions, PivotView, FieldListService, CalculatedFieldService, ToolbarService,
    ConditionalFormattingService, ToolbarItems, DisplayOption, IDataSet, NumberFormattingService, PivotViewModule, OlapEngine, PivotEngine, ExcelExportService, PDFExportService
} from '@syncfusion/ej2-angular-pivotview';
import { FormsModule } from '@angular/forms';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { enableRipple, Browser } from '@syncfusion/ej2-base';
import { ChartSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/chartsettings';
import { Observable } from 'rxjs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { Menu } from '@syncfusion/ej2-navigations';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
enableRipple(false);

/**
 * Pivot Table Toolbar Sample
 */
declare var require: any;
let data: IDataSet[] = require('./Pivot_Data.json');
@Component({
    selector: 'ej2-pivotview-container',
    templateUrl: 'dynamic-binding.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['dynamic-binding.css'],
    providers: [CalculatedFieldService, ToolbarService, ConditionalFormattingService, FieldListService, NumberFormattingService, PDFExportService, ExcelExportService],
    standalone: true,
    imports: [PivotViewModule, ButtonModule, DialogModule, FormsModule, CommonModule, TextBoxModule, DropDownListModule,SBActionDescriptionComponent, SBDescriptionComponent]
})
export class DynamicBindingComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public toolbarOptions: ToolbarItems[];
  public chartSettings: ChartSettings;
  public displayOption: DisplayOption;
  public observable = new Observable();
  public dataSource: any;

  public connectMenuRef: Menu;
  public openMenuRef: Menu;

  @ViewChild('connectFile') connectFile!: ElementRef<HTMLInputElement>;
  @ViewChild('reportFile') reportFile!: HTMLInputElement;

  public isDialogOpen = false;
  public dialogType: any = '';
  public remoteUrl = '';
  public shouldAutoConfig = false;
  public isErrorDialogOpen = false;
  public errorMessage = '';
  public currentData: any[] = data;
  public olapProxyUrl = 'https://bi.syncfusion.com/olap/msmdpump.dll';
  public proxyBaseUrl = '';
  public olapConnected = false;
  public olapDataSources: string[] = [];
  public olapCatalogs: string[] = [];
  public olapCubes: string[] = [];
  public selectedDataSource = '';
  public selectedCatalog = '';
  public selectedCube = '';
  public loadingSources = false;
  public loadingCatalogs = false;
  public loadingCubes = false;
  public olapUiMessage = '';
  public defaultUrls = {
    CSV: 'https://cdn.syncfusion.com/data/sales-analysis.csv',
    JSON: 'https://cdn.syncfusion.com/data/sales-analysis.json',
  };

  @ViewChild('pivotview')
  public pivotObj: PivotView;

  @ViewChild('remoteDialog')
  public remoteDialogObj: DialogComponent;

  @ViewChild('error')
  public errorDialogObj: DialogComponent;

  @ViewChild('olap')
  public olapDialogObj: DialogComponent;

  toolbarRender(args: any) {
    const connectMenu: any = {
      template: '<ul id="connect_menu"></ul>',
      id: 'custom_toolbar',
    };
    args.customToolbar!.splice(0, 0, connectMenu);
    const openMenu: any = {
      template: '<ul id="open_menu"></ul>',
      id: 'open_toolbar',
    };
    args.customToolbar!.splice(1, 0, openMenu);
    const saveItem: any = {
      prefixIcon: 'e-save-report e-btn-icon e-icons',
      tooltipText: 'Save Pivot Report as JSON',
      click: this.toolbarClicked,
    };
    args.customToolbar!.splice(2, 0, saveItem);
    const separator3: any = {
      type: 'Separator',
    };
    args.customToolbar!.splice(3, 0, separator3);
  }

  toolbarClicked = async (args?: any): Promise<void> => {
    // Directly save without confirmation dialog
    await this.saveReport();
  };
  // Execute actual save after user confirms
  async saveReport(): Promise<void> {
    const pivot = this.pivotObj;
    if (!pivot) return;

    const download = (content: string, mime: string, filename: string) => {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    try {
      const persisted = pivot.getPersistData();
      let dataSourceSettingsOnly: any = {};
      let parsed: any;
      try {
        parsed = JSON.parse(persisted);
        var isOlapReport = parsed && parsed.dataSourceSettings && parsed.dataSourceSettings.providerType === 'SSAS';
        if (!isOlapReport && parsed && parsed.dataSourceSettings) { 
          this.dataSource = parsed.dataSourceSettings.dataSource;
          parsed.dataSourceSettings.dataSource = []; 
        }
        parsed.pivotValues = [];
        dataSourceSettingsOnly =
          parsed?.dataSourceSettings ?? pivot.dataSourceSettings ?? {};
      } catch {
        dataSourceSettingsOnly = pivot.dataSourceSettings ?? {};
      }
      const json = JSON.stringify(parsed, null, 2);
      download(json, 'application/json', 'pivot.json');
    } catch (err: any) {
      console.error('Save failed:', err);
      alert(`Failed to save: ${err.message}`);
    }
  }

  onDataBound() {
    const pivot = this.pivotObj;
    if (Browser.isDevice && pivot && pivot.enableRtl) {
      document.querySelector('.control-section')?.classList.add('e-rtl');
    }
    // Initialize or re-initialize connect menu safely (destroy-before-create)
    const connectEl = document.getElementById('connect_menu');
    if (connectEl) {
      const menuItems = [
        {
          iconCss: 'e-connect-report e-btn-icon e-icons',
          items: [
            {
              text: 'JSON',
              iconCss: 'e-json-icon e-icons',
              items: [
                { text: 'Local', id: 'local_json' },
                { text: 'Remote', id: 'remote_json' },
              ],
            },
            {
              text: 'CSV',
              iconCss: 'e-csv-icon e-icons',
              items: [
                { text: 'Local', id: 'local_csv' },
                { text: 'Remote', id: 'remote_csv' },
              ],
            },
            { text: 'OLAP(XMLA)', id: 'olap', iconCss: 'e-olap-icon e-icons' },
          ],
        },
      ];
      if (this.connectMenuRef) {
        this.connectMenuRef.destroy();
        this.connectMenuRef = null;
      }
      this.connectMenuRef = new Menu(
        {
          items: menuItems,
          select: this.gridToolbarClicked,
          cssClass: 'e-pivot-toolbar-menu',
        },
        '#connect_menu'
      );
    }
    const openEl = document.getElementById('open_menu');
    if (openEl) {
      const openMenuItems = [
        {
          iconCss: 'e-open-report e-btn-icon e-icons',
          items: [
            {
              text: 'Load Pivot Report',
              items: [
                {
                  text: 'Local JSON',
                  id: 'local_report',
                  iconCss: 'e-local-report-icon e-icons',
                },
                {
                  text: 'Remote JSON',
                  id: 'remote_report',
                  iconCss: 'e-remote-report-icon e-icons',
                },
              ],
            },
          ],
        },
      ];
      if (this.openMenuRef) {
        this.openMenuRef.destroy();
        this.openMenuRef = null;
      }
      this.openMenuRef = new Menu(
        {
          items: openMenuItems,
          select: this.openToolbarClicked,
          cssClass: 'e-pivot-toolbar-menu',
        },
        '#open_menu'
      );
    }
  }

  onEnginePopulated(args: any) {
    // Open Field List only after engine is populated so it reflects latest fields
    if (this.shouldAutoConfig && this.pivotObj) {
      this.shouldAutoConfig = false;
      this.pivotObj.displayOption = { view: 'Both', primary: 'Table' };
      if (this.pivotObj.dataSourceSettings.values?.length === 0) {
        (
          this.pivotObj.pivotFieldListModule.dialogRenderer as any
        ).onShowFieldList();
      }
    }
  }
  resetPivot() {
    const pivot = this.pivotObj;
    if (pivot && pivot.engineModule) {
      (pivot.engineModule as any).fieldList = {}; // Clear field list cache
    }
    if (pivot) {
      pivot.dataSourceSettings.rows = [];
      pivot.dataSourceSettings.columns = [];
      pivot.dataSourceSettings.values = [];
      pivot.dataSourceSettings.filters = [];
      pivot.dataSourceSettings.conditionalFormatSettings = [];
      pivot.dataSourceSettings.formatSettings = [];
      pivot.dataSourceSettings.drilledMembers = [];
      pivot.dataSourceSettings.fieldMapping = [];
      pivot.dataSourceSettings.excludeFields = [];
      pivot.dataSourceSettings.filterSettings = [];
      pivot.dataSourceSettings.sortSettings = [];
      pivot.dataSourceSettings.valueSortSettings = {};
      pivot.dataSourceSettings.calculatedFieldSettings = [];
      pivot.dataSourceSettings.groupSettings = [];
      pivot.dataSourceSettings.expandAll = false;
      pivot.dataSourceSettings.showGrandTotals = true;
      pivot.dataSourceSettings.showRowGrandTotals = true;
      pivot.dataSourceSettings.showColumnGrandTotals = true;
      pivot.dataSourceSettings.showSubTotals = true;
      pivot.dataSourceSettings.showRowSubTotals = true;
      pivot.dataSourceSettings.showColumnSubTotals = true;
    }
  }

  // Simple CSV parser: converts CSV string to 2D array (array of arrays)
  // Note: This is a basic parser; if your CSV contains quoted commas/newlines,
  // replace with a robust CSV parser library.
  parseCSV(csvString: string): string[][] {
    const lines = csvString.split(/\r?\n|\r/).filter((line) => line.trim());
    return lines.map((line) =>
      line
        .split(',')
        .map((cell) => cell.trim().replace(/^"|"$/g, '').replace(/""/g, '"'))
    );
  }

  // Detect if OLAP engine is active
  isOlapActive(): boolean {
    const pivot = this.pivotObj;
    if (!pivot) return false;
    const ds: any = pivot.dataSourceSettings || {};
    return (
      pivot.dataType === 'olap' ||
      !!pivot.olapEngineModule ||
      ds.providerType === 'SSAS'
    );
  }

  // Cleanly switch to relational mode by tearing down OLAP artifacts
  cleanOlapForRelational(): void {
    const pivot = this.pivotObj;
    if (!pivot) return;
    pivot.olapEngineModule = null;
    pivot.dataType = 'pivot';
    pivot.engineModule = new PivotEngine();
    if (pivot.dataSourceSettings) {
      pivot.dataSourceSettings.providerType = undefined;
      pivot.dataSourceSettings.catalog = undefined;
      pivot.dataSourceSettings.cube = undefined;
      pivot.dataSourceSettings.url = undefined;
    }
    pivot.refresh();
  }

  // Helper to bind data to Pivot in one place and request auto-config
  setPivotData(type: 'CSV' | 'JSON', data: any[] | string[][]): void {
    const pivot = this.pivotObj;
    if (!pivot) return;
    if (this.isOlapActive()) this.cleanOlapForRelational();
    pivot.dataSourceSettings.type = type;
    pivot.dataSourceSettings.dataSource = data as any;
    delete pivot.dataSourceSettings.url;
    this.currentData = data;
    this.shouldAutoConfig = true; // request auto-config after binding
    pivot.refresh();
  }

  // Helper function to apply report settings with data source injection if needed
  async applyReportSettings(
    pivot: any,
    reportSettings: any,
    isOlapReport: boolean,
    entireReportSettings: any
  ): Promise<void> {
    if (isOlapReport) {
      this.currentData = [];
      pivot.olapEngineModule = new OlapEngine();
      pivot.dataType = 'olap';
      pivot.loadPersistData(JSON.stringify(entireReportSettings));
      this.shouldAutoConfig = false; 
      pivot.refresh();
    } else {
      this.cleanOlapForRelational();
      const maybeDataUrl: string | undefined =
        reportSettings.dataUrl || reportSettings.url;
      const maybeCsvUrl: string | undefined = reportSettings.csvUrl;

      if (
        !reportSettings.dataSource ||
        reportSettings.dataSource.length === 0
      ) {
        try {
          if (maybeDataUrl) {
            const res = await fetch(maybeDataUrl, { cache: 'no-store' });
            if (!res.ok)
              throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const jsonData: any = await res.json();
            const arr = Array.isArray(jsonData)
              ? jsonData
              : jsonData?.data ?? jsonData;
            if (
              !Array.isArray(arr) ||
              arr.length === 0 ||
              typeof arr[0] !== 'object'
            ) {
              throw new Error(
                'Invalid JSON at dataUrl: expected an array of objects (or under "data").'
              );
            }
            reportSettings.type = 'JSON';
            reportSettings.dataSource = arr;
            this.currentData = arr;
          } else if (maybeCsvUrl) {
            const res = await fetch(maybeCsvUrl, { cache: 'no-store' });
            if (!res.ok)
              throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            const csvString = await res.text();
            const csvArray = this.parseCSV(csvString);
            if (!csvArray.length)
              throw new Error('CSV at csvUrl appears empty.');
            reportSettings.type = 'CSV';
            reportSettings.dataSource = csvArray;
            this.currentData = csvArray;
          } else {
            reportSettings.dataSource = this.currentData;
            reportSettings.type = pivot.dataSourceSettings.type || 'JSON';
          }
        } catch (e) {
          reportSettings.dataSource = this.currentData;
          reportSettings.type = pivot.dataSourceSettings.type || 'JSON';
        }
      }
      entireReportSettings.dataSourceSettings.dataSource = this.dataSource;
      pivot.loadPersistData(JSON.stringify(entireReportSettings));
      this.shouldAutoConfig = false;
      pivot.refresh();
    }
  }

  // File input change handler for local CSV/JSON
  async handleConnectFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // Detect CSV by dataset type or file extension
    const isCsv = input.dataset.type === 'csv' || /\.csv$/i.test(file.name);
    const reader = new FileReader();

    reader.onload = async (evt: ProgressEvent<FileReader>) => {
      try {
        const pivot = this.pivotObj;
        if (pivot && pivot.engineModule) {
          (pivot.engineModule as any).fieldList = {};
        }

        // Clear axes for a clean start
        if (pivot) {
          pivot.dataSourceSettings.rows = [];
          pivot.dataSourceSettings.columns = [];
          pivot.dataSourceSettings.values = [];
          pivot.dataSourceSettings.filters = [];
        }

        if (isCsv) {
          const csvString = String(evt.target?.result ?? '');
          const csvArray = this.parseCSV(csvString);
          if (!csvArray.length) {
            alert('CSV appears empty.');
            return;
          }
          this.setPivotData('CSV', csvArray);
        } else {
          const raw = String(evt.target?.result ?? '');
          const parsed = JSON.parse(raw);

          // Unwrap common API envelopes like JSONBin { record: {...} }
          const unwrappedData =
            parsed && typeof parsed === 'object' && 'record' in parsed
              ? (parsed as any).record
              : parsed;

          // Check if JSON looks like a saved PivotView report
          const looksLikeReport =
            !Array.isArray(unwrappedData) &&
            (unwrappedData?.dataSourceSettings ||
              unwrappedData?.rows ||
              unwrappedData?.columns ||
              unwrappedData?.values ||
              unwrappedData?.url ||
              unwrappedData?.providerType);

          if (looksLikeReport) {
            const reportSettings =
              (unwrappedData as any).dataSourceSettings ?? unwrappedData;
            const isOlapReport =
              (reportSettings as any)?.providerType === 'SSAS';
            if (pivot) this.resetPivot();
            if (pivot) {
              await this.applyReportSettings(
                pivot,
                reportSettings,
                isOlapReport,
                unwrappedData
              );
            }
            return;
          }

          // Otherwise treat as raw data array
          const dataArray = Array.isArray(unwrappedData)
            ? unwrappedData
            : unwrappedData?.data ?? unwrappedData;
          if (
            !Array.isArray(dataArray) ||
            dataArray.length === 0 ||
            typeof dataArray[0] !== 'object'
          ) {
            alert(
              'Invalid JSON: Provide a saved report or a non-empty array of objects (or under "data").'
            );
            return;
          }
          this.setPivotData('JSON', dataArray);
        }
      } catch (err: any) {
        alert(`Failed to load file: ${err.message}`);
      }
    };

    reader.readAsText(file);

    // Reset input so selecting the same file again triggers change
    input.value = '';
  }

  openToolbarClicked = (args?: any): void => {
    const itemId = args?.item?.id;
    if (!itemId) return;
    if (itemId === 'local_report') {
      // Trigger local JSON report upload
      const input = this.connectFile.nativeElement;
      if (input) {
        input.onchange = null;
        input.value = '';
        input.accept = '.json';
        delete input.dataset.type;
        input.onchange = (e: Event) => this.handleConnectFileChange(e);
        input.click();
        this.cdr.detectChanges();
      }
    }

    if (itemId === 'remote_report') {
      // Open remote JSON report dialog
      this.dialogType = 'JSON Report';
      this.remoteUrl = 'https://api.jsonbin.io/v3/b/6912d9ecd0ea881f40e12335';
      this.isDialogOpen = true;
      this.cdr.detectChanges();
    }
  };

  gridToolbarClicked = (args?: any): void => {
    const itemId = args?.item?.id;
    if (!itemId) return;
    if (!itemId || !this.connectFile?.nativeElement) return;
    if (itemId === 'local_csv' || itemId === 'local_json') {
      const ext = itemId === 'local_csv' ? 'CSV' : 'JSON';
      const input = this.connectFile.nativeElement;
      if (input) {
        input.onchange = null;
        input.value = '';
        input.accept = ext === 'CSV' ? '.csv' : '.json';
        input.dataset.type = ext;
        input.onchange = (e: Event) => this.handleConnectFileChange(e);
        input.click();
        this.cdr.detectChanges();
      }
    }

    if (itemId === 'remote_csv' || itemId === 'remote_json') {
      const type = itemId === 'remote_csv' ? 'CSV' : 'JSON';
      this.dialogType = type;
      this.remoteUrl = this.defaultUrls[type] || '';
      this.isDialogOpen = true;
      this.cdr.detectChanges();
    }

    if (itemId === 'olap') {
      // Open OLAP dialog
      this.dialogType = 'OLAP';
      this.isDialogOpen = true;
      this.olapConnected = false;
      this.olapUiMessage = '';
      this.loadingSources = false;
      this.loadingCatalogs = false;
      this.loadingCubes = false;
      this.olapDataSources = [];
      this.olapCatalogs = [];
      this.olapCubes = [];
      this.selectedDataSource = '';
      this.selectedCatalog = '';
      this.selectedCube = '';
      this.cdr.detectChanges();
    }
  };

  // Apply/refresh OLAP binding on the Pivot with current selections.
  async applyOlapBinding(opts?: {
    url?: string;
    catalog?: string;
    cube?: string;
  }): Promise<void> {
    const pivot = this.pivotObj;
    if (!pivot) return;

    const url = opts?.url ?? this.resolveEndpoint(this.olapProxyUrl);
    const catalog = opts?.catalog ?? this.selectedCatalog;
    const cube = opts?.cube ?? this.selectedCube;

    if (!url || !catalog || !cube) return;

    const olapDataSourceSettings: IDataOptions = {
      url,
      catalog,
      providerType: 'SSAS',
      cube,
      localeIdentifier: 1033,
      dataSource: [],
      rows: [],
      columns: [],
      values: [],
    };

    pivot.engineModule = null;
    pivot.olapEngineModule = new OlapEngine();
    pivot.dataType = 'olap';
    pivot.dataSourceSettings = olapDataSourceSettings;
    this.currentData = [];
    this.shouldAutoConfig = true;
    pivot.refresh();
  }

  // ========== XMLA helper functions (Discover over HTTP) ==========
  xmlaSoapEnvelope(
    requestType: string,
    restrictions: Record<string, string | number | boolean> = {},
    properties: Record<string, string | number | boolean> = {}
  ): string {
    const restrXml = Object.keys(restrictions).length
      ? `<Restrictions><RestrictionList>${Object.entries(restrictions)
          .map(([k, v]) => `<${k}>${String(v)}</${k}>`)
          .join('')}</RestrictionList></Restrictions>`
      : '<Restrictions />';
    const propXml = `<Properties><PropertyList>${Object.entries(properties)
      .map(([k, v]) => `<${k}>${String(v)}</${k}>`)
      .join('')}</PropertyList></Properties>`;
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header />
  <soap:Body>
    <Discover xmlns="urn:schemas-microsoft-com:xml-analysis">
      <RequestType>${requestType}</RequestType>
      ${restrXml}
      ${propXml}
    </Discover>
  </soap:Body>
</soap:Envelope>`;
  }

  // ✅ Resolve endpoint with optional proxy
  resolveEndpoint(endpoint: string): string {
    const trimmed = endpoint.trim();
    if (!this.proxyBaseUrl) return trimmed;
    const sep = this.proxyBaseUrl.includes('?') ? '&' : '?';
    return `${this.proxyBaseUrl}${sep}url=${encodeURIComponent(trimmed)}`;
  }

  // ✅ Post XMLA request
  async postXMLA(endpoint: string, bodyXml: string): Promise<string> {
    const url = this.resolveEndpoint(endpoint);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        Accept: 'text/xml, application/xml, */*;q=0.1',
      },
      body: bodyXml,
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return text;
  }

  // ✅ Parse XML rowset
  parseRowset(xmlText: string): Record<string, string>[] {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'text/xml');
    const rows = Array.from(xml.getElementsByTagNameNS('*', 'row'));
    const result: Record<string, string>[] = rows.map((r) => {
      const obj: Record<string, string> = {};
      Array.from(r.children).forEach((c) => {
        obj[(c as Element).localName] = (c.textContent ?? '').trim();
      });
      return obj;
    });

    const fault = xml.getElementsByTagNameNS('*', 'Fault')[0];
    if (fault) {
      const faultStr = fault.textContent || 'SOAP Fault';
      throw new Error(faultStr.trim());
    }
    return result;
  }

  // ✅ Discover Data Sources
  async discoverDataSources(endpoint: string): Promise<string[]> {
    const body = this.xmlaSoapEnvelope('DISCOVER_DATASOURCES');
    const xml = await this.postXMLA(endpoint, body);
    const rows = this.parseRowset(xml);
    return rows.map((r) => r.DataSourceName).filter(Boolean);
  }

  // ✅ Discover Catalogs
  async discoverCatalogs(
    endpoint: string,
    discoverCatalogs: string
  ): Promise<string[]> {
    const body = this.xmlaSoapEnvelope('DBSCHEMA_CATALOGS');
    const xml = await this.postXMLA(endpoint, body);
    const rows = this.parseRowset(xml);
    return rows.map((r) => r.CATALOG_NAME).filter(Boolean);
  }

  // ✅ Discover Cubes
  async discoverCubes(endpoint: string, catalog: string): Promise<string[]> {
    const body = this.xmlaSoapEnvelope('MDSCHEMA_CUBES', {
      CATALOG_NAME: catalog,
    });
    const xml = await this.postXMLA(endpoint, body);
    const rows = this.parseRowset(xml);
    return rows
      .filter((r) => r.CUBE_SOURCE === '1')
      .map((r) => r.CUBE_NAME)
      .filter(Boolean);
  }

  async loadRemoteAndBind(kind: 'CSV' | 'JSON', url: string): Promise<void> {
    const cleanUrl = url.trim();
    if (!cleanUrl) throw new Error('Empty URL');

    this.resetPivot();

    if (kind === 'CSV') {
      const res = await fetch(cleanUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const csvString = await res.text();
      const csvArray = this.parseCSV(csvString);
      if (!csvArray.length) throw new Error('CSV appears empty.');
      this.setPivotData('CSV', csvArray);
    } else {
      const res = await fetch(cleanUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const jsonData: any = await res.json();

      // Unwrap common API envelopes like JSONBin { record: {...} }
      const unwrappedData =
        jsonData && typeof jsonData === 'object' && 'record' in jsonData
          ? jsonData.record
          : jsonData;

      // Check if remote JSON looks like a saved PivotView report
      const looksLikeReport =
        !Array.isArray(unwrappedData) &&
        (unwrappedData?.dataSourceSettings ||
          unwrappedData?.rows ||
          unwrappedData?.columns ||
          unwrappedData?.values ||
          unwrappedData?.url ||
          unwrappedData?.providerType);

      if (looksLikeReport) {
        const reportSettings =
          (unwrappedData as any).dataSourceSettings ?? unwrappedData;
        const isOlapReport = (reportSettings as any)?.providerType === 'SSAS';
        this.resetPivot();
        const pivot = this.pivotObj;
        if (pivot) {
          await this.applyReportSettings(pivot, reportSettings, isOlapReport, unwrappedData);
          return;
        }
      }

      const arr = Array.isArray(unwrappedData)
        ? unwrappedData
        : unwrappedData?.data ?? unwrappedData;
      if (
        !Array.isArray(arr) ||
        arr.length === 0 ||
        typeof arr[0] !== 'object'
      ) {
        throw new Error(
          'Invalid JSON: Provide a saved report or a non-empty array of objects (or under "data").'
        );
      }
      this.setPivotData('JSON', arr);
    }
  }
  // Update handleOpenRemote function (replace the existing one)
  handleOpenRemote = async (): Promise<void> => {
    if (!this.remoteUrl.trim()) {
      this.errorMessage = 'Please enter a valid URL.';
      this.isDialogOpen = false; // Close input dialog
      this.isErrorDialogOpen = true;
      this.cdr.detectChanges();
    }

    try {
      await this.loadRemoteAndBind(
        this.dialogType as 'CSV' | 'JSON',
        this.remoteUrl
      );
      this.isDialogOpen = false;
      this.cdr.detectChanges();
      // Keep remoteUrl so user can reopen and tweak quickly
    } catch (err: any) {
      this.errorMessage =
        `Failed to load remote ${this.dialogType}: ${err.message}\n\n` +
        `Tip: Ensure the URL is accessible and allows CORS for your origin.`;
      this.isDialogOpen = false;
      this.isErrorDialogOpen = true;
      this.cdr.detectChanges();
    }
  };

  async onConnectClick(): Promise<void> {
    this.olapUiMessage = '';
    this.loadingSources = true;

    try {
      const sources = await this.discoverDataSources(this.olapProxyUrl);
      this.olapDataSources = sources;
      this.selectedDataSource = '';
      this.olapConnected = true;
      this.olapUiMessage = sources.length ? '' : 'No data sources found.';
    } catch (e: any) {
      const corsHint =
        ' If the browser blocks this due to CORS, configure a proxy base URL below and try again.';
      this.olapUiMessage = `Connect failed: ${e.message}.${corsHint}`;
      this.olapConnected = false;
      this.olapDataSources = [];
    } finally {
      this.loadingSources = false;
    }
  }

  async onDataSourceChange(e: any): Promise<void> {
    const v = e.value;
    this.selectedDataSource = v;
    this.selectedCatalog = '';
    this.selectedCube = '';
    this.olapCatalogs = [];
    this.olapCubes = [];

    if (!v) return;

    this.loadingCatalogs = true;
    try {
      const cats = await this.discoverCatalogs(this.olapProxyUrl, v);
      this.olapCatalogs = cats;
      this.selectedCatalog = '';
    } catch (err: any) {
      this.olapUiMessage = `Load catalogs failed: ${err.message}`;
    } finally {
      this.loadingCatalogs = false;
    }
  }

  async onCatalogChange(e: any): Promise<void> {
    const v = e.value;
    this.selectedCatalog = v;
    this.selectedCube = '';
    this.olapCubes = [];

    if (!v) return;

    this.loadingCubes = true;
    try {
      const cubes = await this.discoverCubes(this.olapProxyUrl, v);
      this.olapCubes = cubes;
      this.selectedCube = '';
    } catch (err: any) {
      this.olapUiMessage = `Load cubes failed: ${err.message}`;
    } finally {
      this.loadingCubes = false;
    }
  }

  async onCubeChange(e: any): Promise<void> {
    const v = e.value;
    this.selectedCube = v;

    // If user already bound OLAP, update live when cube changes
    const pivot = this.pivotObj;
    const isOlap =
      pivot && (pivot.dataSourceSettings as any)?.providerType === 'SSAS';

    if (isOlap && v) {
      await this.applyOlapBinding({ cube: v });
    }
  }

  async onOlapOk(): Promise<void> {
    const pivot = this.pivotObj;
    if (!pivot) {
      this.isDialogOpen = false;
      this.cdr.detectChanges();
      return;
    }

    if (!this.olapConnected || !this.selectedCatalog || !this.selectedCube) {
      alert('Please connect and select a Catalog and Cube.');
      this.cdr.detectChanges();
      return;
    }

    await this.applyOlapBinding({
      url: this.resolveEndpoint(this.olapProxyUrl),
      catalog: this.selectedCatalog,
      cube: this.selectedCube,
    });

    this.isDialogOpen = false;
    this.cdr.detectChanges();
  }

  onEnterKey(event: KeyboardEvent): void {
    debugger;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleOpenRemote();
    }
  }

  ngOnInit(): void {
    this.displayOption = { view: 'Both' } as DisplayOption;
    this.gridSettings = {
      columnWidth: Browser.isDevice ? 100 : 120,
    } as GridSettings;

    this.toolbarOptions = [
      'Grid',
      'Chart',
      'Export',
      'SubTotal',
      'GrandTotal',
      'Formatting',
      'FieldList',
    ] as ToolbarItems[];

    this.dataSourceSettings = {
      dataSource: data,
      type: 'JSON',
      expandAll: false, filters: [],
      drilledMembers: [{ name: 'Country', items: ['France'] }],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      rows: [{ name: 'Country' }, { name: 'Products' }],
      columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
      values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }]
    };
  }   
}