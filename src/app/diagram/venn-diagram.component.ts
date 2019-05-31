import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { BasicShapeModel, SnapConstraints, DiagramTools, SnapSettingsModel, PointModel, ShapeStyleModel } from '@syncfusion/ej2-diagrams';

/**
 * Sample for Venn Diagram
 */

@Component({
    selector: 'control-content',
    templateUrl: 'venn-diagram.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})
export class VennDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    public shape: BasicShapeModel = { type: 'Basic', shape: 'Ellipse' };
    public style1: ShapeStyleModel = { fill: '#f2f2f2', strokeColor: '#acacac', strokeWidth: 1 };
    public style2: ShapeStyleModel = { fill: '#feb42f', opacity: 0.2, strokeColor: '#feb42f' };
    public style3: ShapeStyleModel = { fill: '#6acbd4', opacity: 0.2, strokeColor: '#6acbd4' };
    public style4: ShapeStyleModel = { fill: '#ed1d79', opacity: 0.2, strokeColor: '#ed1d79' };
    public offset1: PointModel = { x: 0.5, y: 0.10 };
    public offset2: PointModel = { x: 0.5, y: 0.4 };
    public offset3: PointModel = { x: 0.45, y: 0.8 };
    public offset4: PointModel = { x: 0.5, y: 0.7 };
    public offset5: PointModel = { x: 0.7, y: 0.35 };
    public offset6: PointModel = { x: 0.7, y: 0.6 };
    public offset7: PointModel = { x: 0.5, y: 0.8 };
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public create(args: Object): void {
        this.diagram.fitToPage();
        this.diagram.dataBind();
    }
}