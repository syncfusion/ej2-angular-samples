import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DiagramComponent, NodeModel, ConnectorModel, PointPortModel, PaletteModel, SymbolInfo, SnapSettingsModel, SnapConstraints, PortVisibility, Native, SymbolPaletteComponent, PointModel, DecoratorModel, StrokeStyleModel, SymbolPaletteModule, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { AsyncSettingsModel, RemovingEventArgs } from '@syncfusion/ej2-inputs';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import {
    arrow, template1, template2, template3, template4, template8,
    template5, template6, template7, template10, template11, template12,
    template13, template14, template15, template16, template17, template18
} from './network-shapes-templates';
import { UploaderComponent, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { paletteIconClick } from './script/diagram-common';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';



/**
 * Sample for serialization
 */
@Component({
    selector: 'control-content',
    templateUrl: 'network-diagram.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, SymbolPaletteModule, ButtonModule, UploaderModule, DiagramModule, SBDescriptionComponent]
})
export class NetworkShapesDiagramComponent {

    private port: PointPortModel[] = [
        { id: 'port1', offset: { x: 0, y: 0.5 } },
        { id: 'port2', offset: { x: 1, y: 0.5 } },
        { id: 'port3', offset: { x: 0.5, y: 0.1 } },
        { id: 'port4', offset: { x: 0.5, y: 0.92 } }
    ];
    private port2: PointPortModel[] = [
        { id: 'port1', offset: { x: 0.45, y: 0.5 } },
        { id: 'port2', offset: { x: 0.97, y: 0.5 } },
        { id: 'port3', offset: { x: 0.5, y: 0.97 } }
    ];
    private port3: PointPortModel[] = [
        { id: 'port1', offset: { x: 0.05, y: 0.5 } },
        { id: 'port2', offset: { x: 1, y: 0.5 } },
        { id: 'port3', offset: { x: 0.85, y: 0.1 } },
        { id: 'port4', offset: { x: 0.6, y: 0.97 } }
    ];
    private port4: PointPortModel[] = [
        { id: 'port1', offset: { x: 0.34, y: 0.5 } },
        { id: 'port2', offset: { x: 0.75, y: 0.5 } },
        { id: 'port3', offset: { x: 0.5, y: 0.05 } },
        { id: 'port4', offset: { x: 0.6, y: 0.9 } }
    ];
    private port5: PointPortModel[] = [
        { id: 'port1', offset: { x: 0.02, y: 0.6 } },
        { id: 'port2', offset: { x: 0.98, y: 0.625 } },
        { id: 'port3', offset: { x: 0.5, y: 0.3 } },
        { id: 'port4', offset: { x: 0.5, y: 0.97 } }
    ];
//Initializes nodes for diagram
    public nodes: NodeModel[] = [
        {
            id: 'Server1', offsetX: 80, offsetY: 75,
            shape: { type: 'Native', content: template1 },
            annotations: [{ content: 'Server', offset: { x: 0.5, y: 0 }, margin: { bottom: 10 } }],
            ports: this.port
        },
        {
            id: 'WorkStation1', offsetX: 250, offsetY: 75,
            shape: { type: 'Native', content: template2 },
            annotations: [{ content: 'Work Station', margin: { bottom: 25 }, offset: { x: 1.4, y: 0.2 } }],
            ports: this.port2
        },
        {
            id: 'WorkStation2', offsetX: 350, offsetY: 75,
            shape: { type: 'Native', content: template2 },
            ports: this.port2
        },
        {
            id: 'modem1', offsetX: 450, offsetY: 125,
            shape: { type: 'Native', content: template3 },
            annotations: [{ content: 'Modem', margin: { right: 25 }, offset: { x: 0, y: 0.5 } }],
            ports: this.port5
        },
        {
            id: 'modem2', offsetX: 525, offsetY: 175,
            shape: { type: 'Native', content: template3 },
            annotations: [{ content: 'Modem1', margin: { bottom: 10 }, offset: { x: 0.5, y: 0 } }],
            ports: this.port5
        },
        {
            id: 'RemoteController1', offsetX: 600, offsetY: 125,
            shape: { type: 'Native', content: template4 },
            annotations: [{ content: 'Remote Controller', margin: { bottom: 10 }, offset: { x: 0.5, y: 0 } }],
            ports: this.port3
        },
        {
            id: 'modem3', offsetX: 350, offsetY: 205,
            shape: { type: 'Native', content: template3 },
            annotations: [{ content: 'Modem4', margin: { left: 35 }, offset: { x: 1, y: 0.5 } }],
            ports: this.port5
        },
        {
            id: 'modem4', offsetX: 450, offsetY: 245,
            shape: { type: 'Native', content: template3 },
            annotations: [{ content: 'Modem2', offset: { x: 0.5, y: 1.3 } }],
            ports: this.port5
        },
        {
            id: 'modem5', offsetX: 350, offsetY: 330,
            shape: { type: 'Native', content: template3 },
            annotations: [{ content: 'Modem3', margin: { right: 25 }, offset: { x: 0, y: 0.5 } }],
            ports: this.port5
        },
        {
            id: 'WorkStation3', offsetX: 600, offsetY: 250,
            shape: { type: 'Native', content: template2 },
            annotations: [{ content: 'Remote Work Staions', margin: { top: 12 }, offset: { x: 0.5, y: 1 } }],
            ports: this.port2
        },
        {
            id: 'WorkStation4', offsetX: 600, offsetY: 335,
            shape: { type: 'Native', content: template2 },
            annotations: [{ content: 'Portable Work Staions', margin: { top: 12 }, offset: { x: 0.5, y: 1 } }],
            ports: this.port2
        },
        {
            id: 'RemoteController2', offsetX: 80, offsetY: 400,
            shape: { type: 'Native', content: template4 },
            annotations: [{ content: 'Control Logic', margin: { top: 8 }, offset: { x: 0.5, y: 1 } }],
            ports: this.port3
        },
        {
            id: 'RemoteController3', offsetX: 500, offsetY: 400,
            shape: { type: 'Native', content: template4 },
            annotations: [{ content: 'Control Logic', margin: { top: 8 }, offset: { x: 0.5, y: 1 } }],
            ports: this.port3
        },
        {
            id: 'AnalogIO', offsetX: 160, offsetY: 500,
            shape: { type: 'Native', content: template5 },
            annotations: [{ content: 'Analog IO', margin: { top: 13 }, offset: { x: 0.5, y: 1 } }],
            ports: this.port4
        },
        {
            id: 'sensor', offsetX: 260, offsetY: 500,
            shape: { type: 'Native', content: template6 },
            annotations: [{ content: 'Sensor', margin: { top: 10 }, offset: { x: 0.5, y: 1 } }],
            ports: this.port
        },
        {
            id: 'DeviceDriver1', offsetX: 360, offsetY: 500,
            shape: { type: 'Native', content: template7 },
            annotations: [{ content: 'DriverA', offset: { x: 0.5, y: 1.3 } }],
            ports: this.port4
        },
        {
            id: 'DeviceDriver2', offsetX: 460, offsetY: 500,
            shape: { type: 'Native', content: template7 },
            annotations: [{ content: 'DriverB', offset: { x: 0.5, y: 1.3 } }],
            ports: this.port4
        },
        {
            id: 'DeviceDriver3', offsetX: 550, offsetY: 500,
            shape: { type: 'Native', content: template7 },
            annotations: [{ content: 'DriverC', offset: { x: 0.5, y: 1.3 } }],
            ports: this.port4
        },
        {
            id: 'HMI', offsetX: 625, offsetY: 450,
            shape: { type: 'Native', content: template8 },
            annotations: [{ content: 'HMI', offset: { x: 0.5, y: 1.3 } }],
            ports: this.port
        },
        {
            id: 'controlNet', offsetX: 218.5, offsetY: 380,
            shape: { type: 'Text', content: 'Control Net', }
        },
        {
            id: 'etherNet', offsetX: 218.5, offsetY: 190,
            shape: { type: 'Text', content: 'Ethernet', }
        },
        {
            id: 'deviceNet', offsetX: 345.5, offsetY: 555,
            shape: { type: 'Text', content: 'Device Net', }
        },
        {
            id: 'connector1', offsetX: 99, offsetY: 175
        },
        {
            id: 'connector2', offsetX: 250, offsetY: 125
        },
        {
            id: 'connector3', offsetX: 99, offsetY: 300
        },
        {
            id: 'connector4', offsetX: 178, offsetY: 435
        },
        {
            id: 'connector5', offsetX: 378, offsetY: 435
        },
        {
            id: 'connector6', offsetX: 370, offsetY: 380
        }
    ];
//Initializes connectors for diagram
    public connectors: ConnectorModel[] = [
        {
            id: 'connector11', sourceID: 'Server1', targetID: 'WorkStation1',
            targetPortID: 'port1'
        },
        {
            id: 'connector12', sourceID: 'WorkStation1', targetID: 'WorkStation2',
            sourcePortID: 'port2', targetPortID: 'port1'
        },
        {
            id: 'connector13', sourceID: 'WorkStation2', targetID: 'modem1', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            targetPortID: 'port3', sourcePortID: 'port2'
        },
        {
            id: 'connector14', sourceID: 'modem2', targetID: 'modem1', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            sourcePortID: 'port1', targetPortID: 'port4'
        },
        {
            id: 'connector15', sourceID: 'modem2', targetID: 'RemoteController1', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            sourcePortID: 'port2', targetPortID: 'port4'
        },
        {
            id: 'connector16', sourceID: 'WorkStation2', targetID: 'modem3',
            sourcePortID: 'port3', targetPortID: 'port3'
        },
        {
            id: 'connector17', sourceID: 'modem4', targetID: 'modem3', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            sourcePortID: 'port1', targetPortID: 'port4'
        },
        {
            id: 'connector18', sourceID: 'modem5', targetID: 'modem3',
            sourcePortID: 'port3', targetPortID: 'port4'
        },
        {
            id: 'connector19', sourceID: 'modem5', targetID: 'WorkStation4',
            sourcePortID: 'port2', targetPortID: 'port1'
        },
        {
            id: 'connector20', sourceID: 'modem4', targetID: 'WorkStation3',
            sourcePortID: 'port2', targetPortID: 'port1'
        },
        {
            id: 'connector21', sourceID: 'RemoteController2', targetID: 'RemoteController3',
            targetPortID: 'port1'
        },
        {
            id: 'connector22', sourceID: 'Server1', targetID: 'RemoteController2',
            sourcePortID: 'port4'
        },
        {
            id: 'connector23', sourceID: 'modem3', targetID: 'Server1', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            sourcePortID: 'port1', targetPortID: 'port4'
        },
        {
            id: 'connector24', sourceID: 'RemoteController2', targetID: 'AnalogIO',
            type: 'Orthogonal', sourcePortID: 'port2', targetPortID: 'port3'
        },
        {
            id: 'connector25', sourceID: 'RemoteController2', targetID: 'sensor', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            sourcePortID: 'port2', targetPortID: 'port3'
        },
        {
            id: 'connector26', sourceID: 'RemoteController2', targetID: 'DeviceDriver1', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            sourcePortID: 'port2', targetPortID: 'port3'
        },
        {
            id: 'connector27', sourceID: 'RemoteController2', targetID: 'DeviceDriver2', type: 'Orthogonal',
            segments: [{ type: 'Orthogonal', length: 25 }],
            sourcePortID: 'port2', targetPortID: 'port3'
        },
        {
            id: 'connector28', sourceID: 'HMI', targetID: 'DeviceDriver3', type: 'Orthogonal',
            sourcePortID: 'port1', targetPortID: 'port3'
        },
        {
            id: 'connector29', sourceID: 'HMI', type: 'Orthogonal', targetID: 'DeviceDriver2',
            sourcePortID: 'port1', targetPortID: 'port3'
        }
    ];

    @ViewChild('diagram')
    public diagram: DiagramComponent;
    @ViewChild('symbolpalette')
    public palete: SymbolPaletteComponent;
    @ViewChild('templateupload')
    public uploadObj: UploaderComponent;
    public button: ButtonComponent;
    public create(args: Object): void {
        this.diagram.fitToPage();
        paletteIconClick();
    }

    ngAfterViewInit(): void {
        document.getElementById('browse').onclick = () => {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
    }

    //Function to disable snapsettings
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };

    //Sets the default values of nodes
    public getNodeDefaults(node: NodeModel): NodeModel {
        node.style.strokeColor = '#5C90DF';
        node.style.fill = 'transparent';
        if (node.annotations.length !== 0) {
            node.annotations[0].style.color = 'black';
            node.annotations[0].style.fontSize = 12;
            node.annotations[0].style = {
                textWrapping: 'NoWrap',
            }
        }
        if (node.ports.length !== 0) {
            for (let i: number = 0; i < node.ports.length; i++) {
                node.ports[i].visibility = PortVisibility.Hidden;
            }
        }
        if (node.shape.type === 'Native') {
            if (node.id === 'Server1') {
                node.width = 50;
                node.height = 65;
            } else if (
                node.id === 'WorkStation1' || node.id === 'WorkStation2' ||
                node.id === 'WorkStation3' || node.id === 'WorkStation4'
            ) {
                node.width = 60;
                node.height = 40;
            } else if (
                node.id === 'RemoteController1' || node.id === 'RemoteController2' ||
                node.id === 'RemoteController3'
            ) {
                node.width = 25;
                node.height = 50;
            } else if (
                node.id === 'modem1' || node.id === 'modem2' || node.id === 'modem3' ||
                node.id === 'modem4' || node.id === 'modem5' || node.id === 'sensor'
            ) {
                node.width = 40;
                node.height = 30;
            } else if (
                node.id === 'DeviceDriver1' || node.id === 'DeviceDriver2' ||
                node.id === 'DeviceDriver3'
            ) {
                node.width = 30;
                node.height = 33;
            } else if (node.id === 'AnalogIO' || node.id === 'HMI') {
                node.width = 40;
                node.height = 50;
            }
            (node.shape as Native).scale = 'Stretch';
        }
        if (node.shape.type === 'Text') {
            node.width = 127;
            node.height = 40;
            node.style = { bold: true, fontSize: 16 };
        }
        if (
            node.id === 'connector1' || node.id === 'connector2' || node.id === 'connector3' ||
            node.id === 'connector4' || node.id === 'connector5' || node.id === 'connector6'
        ) {
            if (node.id !== 'connector2' && node.id !== 'connector6') {
                node.rotateAngle = 270;
            }
            node.width = 50;
            node.height = 20;
            node.style = { strokeColor: '#5C90DF', fill: 'white' };
            node.shape = { type: 'Path', data: arrow };
        }
        return node;
    }

    //Sets the default values of connectors
    public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
        connector.targetDecorator = { shape: 'Arrow', width: 8, height: 8, style: { fill: '#5C90DF', strokeColor: '#5C90DF' } };
        connector.style.strokeColor = '#5C90DF';
        if (connector.annotations.length !== 0) {
            connector.annotations[0].style.fill = 'white';
        }
        return connector;
    }


    //SymbolPalette Properties
    public expandMode: ExpandMode = 'Multiple';


    // initializes the network symbols to the UML Shapes in the symbol palette.
    private symbols: NodeModel[] = [
        //add the flow shapes to the symbol palette
        { id: 'server', shape: { type: 'Native', content: template1 } },
        { id: 'workStation', shape: { type: 'Native', content: template2 } },
        { id: 'modem', shape: { type: 'Native', content: template3 } },
        { id: 'remoteController', shape: { type: 'Native', content: template4 } },
        { id: 'hmi', shape: { type: 'Native', content: template8 } },
        { id: 'analogIO', shape: { type: 'Native', content: template5 } },
        { id: 'sensor', shape: { type: 'Native', content: template6 } },
        { id: 'deviceDriver', shape: { type: 'Native', content: template7 } },
        { id: 'Virtual-Server-Copy', shape: { type: 'Native', content: template10 } },
        { id: 'user', shape: { type: 'Native', content: template11 } },
        { id: 'User-group', shape: { type: 'Native', content: template12 } },
        { id: 'UPS', shape: { type: 'Native', content: template13 } },
        { id: 'Tablet', shape: { type: 'Native', content: template14 } },
        { id: 'Switch', shape: { type: 'Native', content: template15 } },
        { id: 'Subwoofer', shape: { type: 'Native', content: template16 } },
        { id: 'Speaker', shape: { type: 'Native', content: template17 } },
        { id: 'Security-camera', shape: { type: 'Native', content: template18 } },
        { id: 'arrow1', shape: { type: 'Path', data: arrow } }
    ];

    private sourcePoint: PointModel = { x: 0, y: 0 };
    private targetPoint: PointModel = { x: 40, y: 40 };
    private targetDecorator: DecoratorModel = { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } };
    private style: StrokeStyleModel = { strokeWidth: 2, strokeColor: '#757575' };

    // initializes the connector symbols to the UML Shapes in the symbol palette.
    private connectorSymbols: ConnectorModel[] = [
        {
            id: 'link11', type: 'Straight', sourcePoint: this.sourcePoint, targetPoint: this.targetPoint,
            targetDecorator: this.targetDecorator, style: this.style
        },
        {
            id: 'link12', type: 'Orthogonal', sourcePoint: this.sourcePoint, targetPoint: this.targetPoint,
            targetDecorator: this.targetDecorator, style: this.style
        }
    ];

    // Initializes the palettes to be displayed in the symbol palette.
    public palettes: PaletteModel[] = [
        { id: 'network', expanded: true, symbols: this.symbols, title: 'Network Shapes' },
        { id: 'connectors', expanded: true, symbols: this.connectorSymbols, title: 'Connectors' }
    ];

    public getSymbolInfo(): SymbolInfo {
        return { fit: true };
    }

    //Sets the default values of symbols
    public getSymbolDefaults(symbol: NodeModel): void {
        if (symbol.id === 'arrow1') {
            symbol.width = 75; symbol.height = 60;
            symbol.offsetX = 160; symbol.offsetY = 135;
            symbol.style.strokeColor = '#757575';
            symbol.style.fill = 'white';
        } else {
            if (symbol.id === 'remoteController') {
                symbol.width = 25;
            } else {
                symbol.width = 40;
            }
            symbol.height = 40; symbol.offsetX = 20;
            symbol.offsetY = 20;
            (symbol.shape as Native).scale = 'Stretch';
        }
    }

    public asyncSettings: AsyncSettingsModel = {
        saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
    };

    public dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

    public id: number = 0;

    //Used to add svg image to pallate 
    public onUploadSuccess(arg: any): void {
        let file1: any = arg.file;
        let file: any = file1.rawFile;
        let reader: FileReader = new FileReader();
        reader.addEventListener('load', (event: any): void => {
            let shape: NodeModel;
            let shapeContent: string = event.target.result;
            shape = { id: 'newshape' + this.id.toString(), shape: { type: 'Native', content: shapeContent } };
            this.palete.addPaletteItem('network', shape);
        });
        this.id++;
        reader.readAsText(file);
        this.uploadObj.clearAll();
    }

    // Disables posting raw files
    public onFileRemove(args: RemovingEventArgs): void {
        args.postRawFile = false;
    }
};