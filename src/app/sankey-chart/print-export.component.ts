import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Sankey, SankeyAllModule, SankeyLoadedEventArgs, SankeyExportService, SankeyHighlightService, SankeyLegendService, SankeyTooltipService, ExportType } from '@syncfusion/ej2-angular-charts';
import { loadSankeyTheme } from './theme-color';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';

@Component({
  selector: 'control-content',
  templateUrl: './print-export.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SankeyAllModule,
    SBDescriptionComponent,
    SBActionDescriptionComponent
  ],
  providers: [
    SankeyLegendService,
    SankeyTooltipService,
    SankeyHighlightService,
    SankeyExportService
  ]
})
export class SankeyPrintExportComponent implements AfterViewInit {

  @ViewChild('sankey') public sankey: Sankey;
  @ViewChild('exportPanel') exportPanelRef!: ElementRef<HTMLDivElement>;
  @ViewChild('chartShell') chartShellRef!: ElementRef<HTMLDivElement>;
  @ViewChild('chartHost') chartHostRef!: ElementRef<HTMLDivElement>;
  @ViewChild('expFileName') expFileNameRef!: ElementRef<HTMLInputElement>;

  public title = 'Supply Chain Management';
  public subTitle = 'Source: OECD‑ITF Global Freight Data';
  public margin = { left: 20, right: 20, top: 20, bottom: 20 };
  public linkStyle = { opacity: 0.4, curvature: 0.5, colorType: 'Source' };
  public labelSettings = Browser.isDevice ? { visible: false } : { visible: true }
  public tooltip = {
    enable: true,
    nodeTemplate: '${name}: ${value}k shipments',
    linkTemplate: '${start.name}: ${start.out}k → ${target.name}: ${target.in}k shipments'
  };
  public legendSettings = Browser.isDevice ? { visible: false } : { visible: true }
  public exportType!: DropDownList;

  ngAfterViewInit(): void {

    this.exportType = new DropDownList({
      dataSource: ['JPEG', 'PNG', 'SVG', 'PDF'],
      index: 0,
      width: "100%"
    });

    this.exportType.appendTo('#expType');

    const buttons = {
      btnPrint: () => this.onPrint(),
      btnExport: () => this.openPanel(),
      btnClosePanel: () => this.closePanel(),
      btnCancelExport: () => this.closePanel(),
      btnDoExport: () => this.onExport()
    };

    Object.entries(buttons).forEach(([id, handler]) => {
      document.getElementById(id)?.addEventListener('click', handler);
    });
  }

  public load(args: SankeyLoadedEventArgs): void {
    loadSankeyTheme(args);
  }

  public togglePanel(open: boolean): void {
    const panel = this.exportPanelRef.nativeElement;
    const shell = this.chartShellRef.nativeElement;
    const host = this.chartHostRef.nativeElement;

    if (!open) {
      const btnExport = document.getElementById('btnExport');
      if (btnExport) {
        btnExport.focus();
      }
      document.removeEventListener('keydown', this.handlePanelKeydown);
    } else {
      document.addEventListener('keydown', this.handlePanelKeydown);
      setTimeout(() => {
        this.expFileNameRef.nativeElement.focus();
      });
    }

    panel.setAttribute('aria-hidden', (!open).toString());
    panel.classList.toggle('open', open);
    shell.classList.toggle('with-panel', open);

    if (Browser.isDevice) {
      host.style.display = open ? 'none' : '';
      shell.classList.toggle('mobile-panel-open', open);
    }
  }

  public handlePanelKeydown = (event: KeyboardEvent): void => {
    // Close panel on Escape key
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closePanel();
    }
  }

  public openPanel(): void {
    this.togglePanel(true);
    setTimeout(() => {
      this.refreshChart();
    },250);
   
  }

  public closePanel(): void {
    this.togglePanel(false);
    setTimeout(() => {
      this.refreshChart();
    },250);
  }

  public onPrint(): void {
    this.sankey.print();
  }

  public onExport(): void {
    const fileName = (this.expFileNameRef.nativeElement.value || 'Sankey').trim();
    this.sankey.export(this.exportType.value as ExportType, fileName);
    this.closePanel();
  }

  public refreshChart(): void {
    const animation=this.sankey.animation;
    animation.enable=false;
    this.sankey.refresh();
    animation.enable=true;
  }
}