import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    NodeModel, ConnectorModel, DiagramTools, SnapSettingsModel, GridlinesModel, RulerSettingsModel
} from '@syncfusion/ej2-diagrams';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';

/**
 * Sample for DrawingTool
 */
@Component({
    selector: 'control-content',
    templateUrl: 'drawing-tool.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None
})

export class DrawingToolDiagramComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;

    public rulerSettings: RulerSettingsModel = { showRulers: true, dynamicGrid: true }
    public continuousDraw: boolean = true;

    private interval: number[] = [1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25,
        9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75];
    private horizontalGridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: this.interval };
    private verticalGridlines: GridlinesModel = { lineColor: '#e0e0e0', lineIntervals: this.interval };

    public snapSettings: SnapSettingsModel = {
        snapObjectDistance: 5, horizontalGridlines: this.horizontalGridlines, verticalGridlines: this.verticalGridlines
    };

    ngOnInit(): void {
        document.getElementById('appearance').onclick = this.documentClick.bind(this);
    }

    // custom code start
    public getNativeContent(): string {
        let str: string = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="350.000000pt" ' +
            'height="229.000000pt" viewBox="0 0 350.000000 229.000000" ' +
            'preserveAspectRatio="xMidYMid meet"> <metadata>' +
            ' Created by potrace 1.11, written by Peter Selinger 2001-2013' +
            ' </metadata> <g transform="translate(0.000000,229.000000) scale(0.100000,-0.100000)"' +
            ' fill="#de6ca9" stroke="none"><path d="M0 1145 l0 -1145 1750 0 1750 0 0 1145 0 1145' +
            ' -1750 0 -1750 0 0 -1145z m1434 186 c19 -8 26 -18 26 -37 0 -24 -3 -26' +
            ' -27 -19 -16 3 -58 9 -94 12 -63 5 -67 4 -88 -23 -23 -29 -21 -60 6 -81 8' +
            ' -6 47 -19 86 -29 55 -13 80 -25 106 -51 31 -31 33 -37 29 -88 -8 -94 -69' +
            ' -133 -193 -122 -90 7 -115 20 -115 58 0 26 3 30 18 24 91 -38 168 -41 204' +
            ' -8 23 21 23 75 1 96 -10 8 -49 23 -88 33 -88 22 -135 63 -135 118 0 92 67 140' +
            ' 181 131 31 -2 68 -9 83 -14z m854 -6 c38 -15 42 -21 42 -51 l0 -33 -47 25' +
            ' c-41 22 -58 25 -115 22 -58 -3 -72 -8 -97 -32 -79 -75 -59 -259 32 -297 35' +
            ' -15 106 -18 150 -6 26 7 27 10 27 67 l0 60 -50 0 c-47 0 -50 2 -50 25 0 25' +
            ' 1 25 80 25 l81 0 -3 -97 -3 -98 -40 -20 c-22 -10 -65 -21 -95 -23 -153 -11' +
            ' -242 74 -243 230 0 145 93 235 233 224 30 -2 74 -12 98 -21z m-638 -169 l67' +
            ' -178 40 103 c22 57 53 139 69 182 28 75 29 77 62 77 19 0 32 -4 30 -9 -1 -5' +
            ' -39 -104 -83 -220 l-80 -211 -37 0 c-35 0 -37 2 -56 53 -11 28 -48 124 -81 ' +
            '211 -34 87 -61 163 -61 168 0 5 14 8 32 6 31 -3 32 -5 98 -182z" />' +
            '</g> </svg>';
        return str;
    }
    // custom code end

    public documentClick(args: MouseEvent): void {
        let target: HTMLElement = args.target as HTMLElement;
        // custom code start
        let selectedElement: HTMLCollection = document.getElementsByClassName('e-selected-style');
        if (selectedElement.length && target.id !== '' && target.id !== 'checked') {
            selectedElement[0].classList.remove('e-selected-style');
        }
        // custom code end
        let drawingObject: NodeModel | ConnectorModel = null;
        if (target.className === 'image-pattern-style') {
            switch (target.id) {
                case 'shape1':
                    drawingObject = { shape: { type: 'Basic', shape: 'Rectangle' } };
                    break;
                case 'shape2':
                    drawingObject = { shape: { type: 'Basic', shape: 'Ellipse' } };
                    break;
                case 'shape3':
                    drawingObject = { shape: { type: 'Basic', shape: 'Hexagon' } };
                    break;
                case 'shape4':
                    drawingObject = { shape: { type: 'Basic', shape: 'Pentagon' } };
                    break;
                case 'shape5':
                    drawingObject = { shape: { type: 'Basic', shape: 'Triangle' } };
                    break;
                case 'straight':
                    drawingObject = { type: 'Straight' };
                    break;
                case 'ortho':
                    drawingObject = { type: 'Orthogonal' };
                    break;
                case 'cubic':
                    drawingObject = { type: 'Bezier' };
                    break;
                case 'path':
                    drawingObject = {
                        shape: {
                            type: 'Path',
                            data: 'M540.3643,137.9336L546.7973,159.7016L570.3633,159.7296L550.7723,171.9366L558.9053,194.9966L540.3643,' +
                                '179.4996L521.8223,194.9966L529.9553,171.9366L510.3633,159.7296L533.9313,159.7016L540.3643,137.9336z'
                        }
                    };
                    break;
                case 'image':
                    drawingObject = { shape: { type: 'Image', source: '/source/diagram/employees/Clayton.png' } };
                    break;
                case 'svg':
                    drawingObject = { shape: { type: 'Native', content: this.getNativeContent() } };
                    break;
                case 'text':
                    drawingObject = { shape: { type: 'Text' } };
                    break;
            }
            if (drawingObject) {
                this.diagram.drawingObject = drawingObject;
                this.diagram.tool = this.continuousDraw ? DiagramTools.ContinuousDraw : DiagramTools.DrawOnce;
                this.diagram.dataBind();
                // custom code start
                target.classList.add('e-selected-style');
                // custom code end
            }
        }
    };

    public diagramCreate(args: Object): void {
        this.diagram.drawingObject = { shape: { type: 'Basic', shape: 'Rectangle' } };
        this.diagram.tool = DiagramTools.ContinuousDraw;

    }
}