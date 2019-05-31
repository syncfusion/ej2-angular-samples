import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    DiagramComponent, PrintAndExport, IExportOptions, Diagram, MarginModel, FileFormats,
    ConnectorModel, BasicShapeModel, ShapeStyleModel, SnapSettingsModel, SnapConstraints
} from '@syncfusion/ej2-angular-diagrams';
import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { ClickEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
Diagram.Inject(PrintAndExport);

/**
 * Sample for print export
 */
@Component({
    selector: 'control-content',
    templateUrl: 'print-export.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})

export class PrintExportDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    public shape1: BasicShapeModel = { type: 'Basic', shape: 'Diamond' };
    public ellipse: BasicShapeModel = { type: 'Basic', shape: 'Ellipse' };

    public style: ShapeStyleModel = { strokeColor: '#868686', fill: '#d5f5d5' };
    public style1: ShapeStyleModel = { strokeColor: '#8f908f', fill: '#e2f3fa' };
    public radialstyle: ShapeStyleModel = { strokeColor: '#a8a8a8', fill: '#fef0db' };
    public radialstyle1: ShapeStyleModel = { strokeColor: '#a8a8a8', fill: '#faebee' };

    public margin: MarginModel = { left: 15, right: 15, bottom: 15, top: 15 };
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    public exportTypes: ItemModel[] = [
        { text: 'JPG' }, { text: 'PNG' },
        { text: 'BMP' }, { text: 'SVG' }
    ];

    public multiplePage: boolean = false;

    public getConnectorDefaults(connector: ConnectorModel, diagram: Diagram): ConnectorModel {
        connector.style.strokeColor = '#6d6d6d';
        return connector;
    };

    public create(args: Object): void {
        this.diagram.fitToPage();
        this.diagram.dataBind();
    }

    public onselect(args: MenuEventArgs): void {
        let exportOptions: IExportOptions = {};
        exportOptions.format = args.item.text as FileFormats;
        exportOptions.mode = 'Download';
        exportOptions.region = 'PageSettings';
        exportOptions.multiplePage = this.multiplePage;
        exportOptions.fileName = 'Export';
        exportOptions.pageHeight = 400;
        exportOptions.pageWidth = 400;
        this.diagram.exportDiagram(exportOptions);
    }

    public toolbarEditorClick(args: ClickEventArgs): void {
        let printOptions: IExportOptions = {};
        if (args.item.text === 'Print') {
            printOptions.mode = 'Data';
            printOptions.region = 'PageSettings';
            printOptions.multiplePage = this.multiplePage;
            printOptions.pageHeight = 400;
            printOptions.pageWidth = 400;
            this.diagram.print(printOptions);
        }
    }

}