import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, PrintAndExport, IExportOptions, Diagram, MarginModel, FileFormats, ConnectorModel, BasicShapeModel, ShapeStyleModel, SnapSettingsModel, SnapConstraints, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { ItemModel } from '@syncfusion/ej2-splitbuttons';
import { ClickEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBActionDescriptionComponent } from '../common/adp.component';
Diagram.Inject(PrintAndExport);

/**
 * Sample for print export
 */
@Component({
    selector: 'control-content',
    templateUrl: 'print-export.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ToolbarModule, DropDownButtonModule, CheckBoxModule, DiagramModule, SBDescriptionComponent]
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
    public annotationTextStyle: DiagramModule = { fill: 'white' };
    public exportTypes: ItemModel[] = [
        { text: 'JPG' },
        { text: 'PNG' },
        { text: 'SVG' }
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
    // Export the diagram object based on the format.
    public onSelectExportFormat(args: MenuEventArgs): void {
        const exportOptions: IExportOptions = {
            format: args.item.text as FileFormats,
            mode: 'Download',
            region: 'PageSettings',
            multiplePage: this.multiplePage,
            fileName: 'Export',
            pageHeight: 500,
            pageWidth: 500
        };

        this.diagram.exportDiagram(exportOptions);
    }
    // Click event to perform printing the diagram objects.
    public onItemClick(args: ClickEventArgs): void {
        if (args.item.text === 'Print') {
            const printOptions: IExportOptions = {
                mode: 'Data',
                region: 'PageSettings',
                multiplePage: this.multiplePage,
                pageHeight: 500,
                pageWidth: 500
            };

            this.diagram.print(printOptions);
        }
    }

}