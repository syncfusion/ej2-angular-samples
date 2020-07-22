import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { HtmlModel, DiagramComponent, SnapSettingsModel, DiagramTools, NodeModel, SnapConstraints, ConnectorModel, AnnotationModel } from '@syncfusion/ej2-angular-diagrams';
import { CircularGauge, ILoadedEventArgs, GaugeTheme } from '@syncfusion/ej2-circulargauge';


/**
 * Sample for ComplexShapes
 */

@Component({
    selector: 'control-content',
    templateUrl: 'custom-shapes.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None

})

export class ComplexShapesDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    serverCreated = false;
    
    public pointerCap: Object = { radius: 7, color: '#757575' };
    public needleTail: Object = { length: '18%', color: '#757575' };
    public majorTicks: Object = { height: 10, offset: 5, color: '#9E9E9E' };        
    public minorTicks: Object = { height: 0 };

    public lineStyle: Object = {
        width: 10, color: 'transparent'
    };
    public annotations: Object = [{
        content: '<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>',
        radius: '30%', angle: 0, zIndex:'1'
    }, {
        content: '<div><span style="font-size:24px; color:#424242; font-family:Regular">65 MPH</span></div>',
        radius: '40%', angle: 180, zIndex:'1'
    }];
    //Initializing Label Style
    public labelStyle: Object = {
        position: 'Inside', useRangeColor: false,
        font: { size: '12px', fontFamily: 'Roboto', fontStyle: 'Regular' }
    };
    public cap: Object = {
        radius: 8,
        border: { width: 0 }
    };
    public tail: Object = {
        length: '25%',
    }
    public tool = DiagramTools.ZoomPan;
    public snapSettings = { constraints: SnapConstraints.None };


    public nodes: NodeModel[] = [
        {
            id: 'node1_template', offsetX: 300, offsetY: 250, width: 300, height: 300,
            shape: { type: "HTML" }
        }];

    public targetElement: HTMLElement;

    public node: NodeModel | ConnectorModel;
        public created(): void {
        this.diagram.bringToCenter(this.diagram.nameTable['node1_template'].wrapper.outerBounds);
    }
}
