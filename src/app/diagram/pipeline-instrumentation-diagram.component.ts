import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  NodeConstraints,
  DiagramTools,
  Diagram,
  ConnectorBridging,
  DiagramModule,
  ScrollSettingsModel,
  SnapConstraints,
  PortVisibility,
  PointPortModel,
  FlipDirection,
  GradientModel,
  LinearGradientModel,
  RadialGradientModel,
  SnapSettingsModel,
  DiagramConstraints
} from '@syncfusion/ej2-angular-diagrams';
import { Switch } from '@syncfusion/ej2-angular-buttons';
import { NumericTextBox } from '@syncfusion/ej2-angular-inputs';
import { LinearGauge, Annotations } from '@syncfusion/ej2-angular-lineargauge';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';

LinearGauge.Inject(Annotations);
Diagram.Inject(ConnectorBridging);

@Component({
  selector: 'control-content',
  templateUrl: './pipeline-instrumentation-diagram.html',
  styleUrls: ['pipeline-instrumentation-diagram.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class PipelineInstrumentationDiagramComponent implements AfterViewInit {
  @ViewChild('diagram')
  public diagram!: DiagramComponent;

  private numericBox: NumericTextBox;
  private gauge: LinearGauge;
  private tankFlow1: boolean = true;
  private tankFlow2: boolean = true;
  private tankFlow3: boolean = true;
  private pumpFlow: boolean = true;
  private autoStopped: boolean = false;
  private isDiagramCreated: boolean = false;
  private pressureInterval: any;
  private animationIntervals: Record<string, number> = {};
  private gradualStopIntervals: Record<string, number> = {};
  private inputTankOn: boolean = false;
  private checkbox: Switch;
  private checkValve1CloseBtn: Switch;
  private checkValve2CloseBtn: Switch;
  private checkValve3CloseBtn: Switch;
  // System states
  private isSystemLocked = false; // When pump is off, lock tank valves
  private isStorageShutdown = false; // When storage is off but pump can still be controlled

  private tank1RadialGradient: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
    stops: [{ color: 'white', offset: 0 }, { color: '#e88a25', offset: 100 }],
    type: 'Radial'
  }
  private tank2RadialGradient: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
    stops: [{ color: 'white', offset: 0 }, { color: 'purple', offset: 100 }],
    type: 'Radial'
  }
  private tankGradientColor: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 25, fy: 25, r: 50,
    stops: [{ color: 'white', offset: 0 }, { color: '#76b5c5', offset: 100 }],
    type: 'Radial'
  };
  private storagetankGradientColor: GradientModel | LinearGradientModel | RadialGradientModel = {
    cx: 50, cy: 50, fx: 50, fy: 50, r: 80,
    stops: [{ color: 'white', offset: 0 }, { color: '#CECECE', offset: 100 }],
    type: 'Radial'
  };

  ngAfterViewInit(): void {
    // Initialize after view is ready
    setTimeout(() => {
      this.isDiagramCreated = true;
      this.appendHTMLElements();
      this.runAnimation();
    }, 100);
  }

  // Nodes array
  public nodes: NodeModel[] = [
    { id: 'Chemical', offsetX: 720, offsetY: 20, annotations: [{ content: 'Chemical Reactor System P&ID', style: { fontSize: 18, bold: true } }], shape: { type: 'Text' }, constraints: NodeConstraints.Default & ~NodeConstraints.Select },
    { id: 'tank1Top', offsetX: 200, offsetY: 225, height: 50, width: 100, shape: { type: 'Basic', shape: 'Ellipse' }, style: { gradient: this.tank1RadialGradient }, constraints: NodeConstraints.Default & ~NodeConstraints.Select },
    { id: 'tank1Bottom', offsetX: 200, offsetY: 375, height: 50, width: 100, shape: { type: 'Basic', shape: 'Ellipse' }, style: { gradient: this.tank1RadialGradient } },
    { id: 'tank1container', offsetX: 200, offsetY: 300, height: 150, width: 100, shape: { type: 'Basic', shape: 'Rectangle' }, style: { gradient: this.tank1RadialGradient }, annotations: [{ content: 'Tank1', style: { color: 'black' } }] },
    { id: 'Tank1Group', children: ['tank1Top', 'tank1Bottom', 'tank1container'], style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 } },
    { id: 'tank2Top', offsetX: 370, offsetY: 225, height: 50, width: 100, shape: { type: 'Basic', shape: 'Ellipse' }, style: { gradient: this.tank2RadialGradient } },
    { id: 'tank2Bottom', offsetX: 370, offsetY: 375, height: 50, width: 100, shape: { type: 'Basic', shape: 'Ellipse' }, style: { gradient: this.tank2RadialGradient } },
    { id: 'tank2container', offsetX: 370, offsetY: 300, height: 150, width: 100, shape: { type: 'Basic', shape: 'Rectangle' }, style: { gradient: this.tank2RadialGradient }, annotations: [{ content: 'Tank2', style: { color: 'black' } }] },
    { id: 'Tank2Group', children: ['tank2Top', 'tank2Bottom', 'tank2container'], style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }  },
    { id: 'tank3Top', offsetX: 750, offsetY: 325, height: 70, width: 170, shape: { type: 'Basic', shape: 'Ellipse' }, style: { gradient: this.tankGradientColor } },
    { id: 'tank3Bottom', offsetX: 750, offsetY: 575, height: 70, width: 170, shape: { type: 'Basic', shape: 'Ellipse' }, style: { gradient: this.tankGradientColor } },
    { id: 'reacterInletThread1', offsetX: 810, offsetY: 290, shape: { type: 'Flow', shape: 'Data' }, height: 25, width: 35, rotateAngle: 10, style: { fill: '#469A22' } },
    { id: 'reacterInletThread2', offsetX: 750, offsetY: 278, shape: { type: 'Basic', shape: 'Rectangle' }, height: 25, width: 15, style: { fill: '#656764' } },
    { id: 'reacterInletThread3', offsetX: 750, offsetY: 268, shape: { type: 'Basic', shape: 'Rectangle' }, height: 10, width: 25, style: { fill: '#656764' } },
    { id: 'pressureGuageNode', offsetX: 600, offsetY: 130, style: { fill: 'green' }, height: 70, width: 70, shape: { type: 'HTML', content: '<div class="pressure-container" style="width:100%;height:100%"><div class="pressure-indicator"><div class="pressure-gauge"><div class="needle" id="needle"></div></div><div class="pressure-value" id="pressureValue"> 0 PSI</div></div></div>' } },
    { id: 'pumpBase', offsetX: 750, offsetY: 110, shape: { type: 'Flow', shape: 'SequentialAccessStorage' }, height: 100, width: 100, rotateAngle: 90, flip: FlipDirection.Vertical, style: { fill: '#E2EAF4' } },
    { id: 'pumpBody', offsetX: 750, offsetY: 110, shape: { type: 'Flow', shape: 'SequentialAccessStorage' }, height: 90, width: 90, rotateAngle: 90, style: { fill: '#E2EAF4' } },
    { id: 'pumpRotator', offsetX: 750, offsetY: 110, shape: { type: 'HTML', content: '<div style="display:flex;left: -25px;position: absolute;"><div class="pump-container"><div class="pump-body"></div><div class="fan-blades" id="fan"><div class="blade"></div><div class="blade"></div><div class="hub"></div></div></div><div id="pumpCheckBoxContainer"><input id="pumpCheckBox" type="checkbox"/></div></div>' }, height: 50, width: 50 },
    { id: 'pumpGroup', children: ['pumpBase', 'pumpBody', 'pumpRotator'], style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 } },
    { id: 'tank3container', offsetX: 750, offsetY: 450, height: 250, width: 170, shape: { type: 'Basic', shape: 'Rectangle' }, style: { gradient: this.tankGradientColor }, annotations: [{ content: 'STIRRED TANK \nREACTOR (STR)', style: { color: 'black', fontSize: 20, bold: true, italic: true } }] },
    { id: 'tank3cooler', offsetX: 750, offsetY: 490, height: 250, width: 185, shape: { type: 'Basic', shape: 'Rectangle', cornerRadius: 50 }, style: { fill: "#3D58B0" } },
    { id: 'Tank3Group', children: ['tank3cooler', 'tank3Top', 'tank3Bottom', 'tank3container'], style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }  },
    { id: 'coolantcontroller', offsetX: 500, offsetY: 650, height: 70, width: 150, annotations: [{ content: 'Coolant Controller', style: { color: 'Orange', fontSize: 15, italic: true, bold: true }, offset: { x: 0.5, y: 0.8 } }], shape: { type: 'Flow', shape: 'Card' }, style: { fill: "#656874" } },
    { id: 'coolantValue', offsetX: 500, offsetY: 650, height: 60, width: 100, shape: { type: 'HTML', content: '<div><input id="numeric" type="text"/></div>' }, style: { fill: "#656874" } },
    { id: 'thermometerNode', offsetX: 920, offsetY: 600, height: 100, width: 100, shape: { type: 'HTML', content: '<div style="width:100%;height:100%"><div id="thermometer"></div></div>' }, style: { fill: "#656874" } },
    // Control valve groups
    { id: 'controlvalve1', offsetX: 450, offsetY: 100, shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve2', offsetX: 420, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve3', offsetX: 450, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 50, style: { fill: '#65B091' } },
    { id: 'controlvalve4', offsetX: 480, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve5', offsetX: 450, offsetY: 90, shape: { type: 'Basic', shape: 'Ellipse' }, height: 5, width: 35, style: { fill: '#65B091' } },
    { id: 'controlvalveBox1', offsetX: 450, offsetY: 115, shape: { type: 'HTML', content: '<div style="height:100%;width:100%"><div id="showFlowContainer1" style="background:#ffb734;height:100%;width:100%;border-radius: 3px;border:1px solid"></div><div class="switch-container"><div id="switch-buttons1"></div></div></div>' }, height: 15, width: 35, style: { fill: '#65B091' } },
    { id: 'controlValveGroup1', children: ['controlvalve1', 'controlvalve2', 'controlvalve3', 'controlvalve4', 'controlvalve5', 'controlvalveBox1'], offsetX: 270, offsetY: 500,style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }  },
    { id: 'controlvalve6', offsetX: 450, offsetY: 100, shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve7', offsetX: 420, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve8', offsetX: 450, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 50, style: { fill: '#65B091' } },
    { id: 'controlvalve9', offsetX: 480, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve10', offsetX: 450, offsetY: 90, shape: { type: 'Basic', shape: 'Ellipse' }, height: 5, width: 35, style: { fill: '#65B091' } },
    { id: 'controlvalveBox2', offsetX: 450, offsetY: 115, shape: { type: 'HTML', content: '<div style="height:100%;width:100%"><div id="showFlowContainer2" style="background:#7C099C;height:100%;width:100%;border-radius: 3px;border:1px solid"></div><div class="switch-container"><div id="switch-buttons2"></div></div></div>' }, height: 15, width: 35, style: { fill: '#65B091' } },
    { id: 'controlValveGroup2', children: ['controlvalve6', 'controlvalve7', 'controlvalve8', 'controlvalve9', 'controlvalve10', 'controlvalveBox2'], offsetX: 450, offsetY: 130, style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 }  },
    { id: 'reacterOutletThread1', offsetX: 855, offsetY: 407.5, shape: { type: 'Basic', shape: 'Rectangle' }, height: 25, width: 15, style: { fill: '#C9B100' } },
    { id: 'reacterOutletThread2', offsetX: 845, offsetY: 407.5, shape: { type: 'Basic', shape: 'Rectangle' }, height: 35, width: 25, style: { fill: '#C9B100' } },
    { id: 'controlvalve11', offsetX: 450, offsetY: 100, shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve12', offsetX: 420, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve13', offsetX: 450, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 20, width: 50, style: { fill: '#65B091' } },
    { id: 'controlvalve14', offsetX: 480, offsetY: 115, shape: { type: 'Flow', shape: 'Process' }, height: 25, width: 10, style: { fill: '#65B091' } },
    { id: 'controlvalve15', offsetX: 450, offsetY: 90, shape: { type: 'Basic', shape: 'Ellipse' }, height: 5, width: 35, style: { fill: '#65B091' } },
    { id: 'controlvalveBox3', offsetX: 450, offsetY: 115, shape: { type: 'HTML', content: '<div style="height:100%;width:100%"><div id="showFlowContainer3" style="background:red;height:100%;width:100%;border-radius: 3px;border:1px solid"></div><div class="switch-container"><div id="switch-buttons3"></div></div></div>' }, height: 15, width: 35, style: { fill: '#65B091' } },
    { id: 'controlValveGroup3', children: ['controlvalve11', 'controlvalve12', 'controlvalve13', 'controlvalve14', 'controlvalve15', 'controlvalveBox3'], offsetX: 970, offsetY: 400, style: { fill: 'transparent', strokeColor: 'transparent', strokeWidth: 0 } },
    { id: 'mixer1', shape: { type: 'Basic', shape: 'Octagon' }, offsetX: 550, offsetY: 230, height: 70, width: 70, annotations: [{ content: 'Mixer' }], style: { gradient: { cx: 50, cy: 50, fx: 25, fy: 25, r: 50, stops: [{ color: 'white', offset: 0 }, { color: '#415086', offset: 100 }], type: 'Radial' } } },
    { id: 'temperatureAlarm', offsetX: 680, offsetY: 292, height: 30, width: 30, annotations: [{ content: "TA", rotationReference: 'Page', style: { bold: true } }], shape: { type: 'Flow', shape: 'DirectData' }, rotateAngle: 245, style: { gradient: { cx: 50, cy: 50, fx: 25, fy: 25, r: 50, stops: [{ color: 'white', offset: 0 }, { color: '#EA8257', offset: 100 }], type: 'Radial' } } },
    { id: 'leveltransmitter', offsetX: 800, offsetY: 350, height: 30, width: 50, shape: { type: 'Flow', shape: 'Process' }, style: { fill: '#79247D' }, annotations: [{ content: '54 L', style: { color: 'gold', bold: true } }] },
    { id: 'productInletThread1', offsetX: 1200, offsetY: 500, shape: { type: 'Basic', shape: 'Rectangle' }, height: 10, width: 30, style: { fill: '#D47A39' } },
    { id: 'ProductTank', offsetX: 1200, offsetY: 600, height: 200, width: 200, shape: { type: 'Flow', shape: 'PreDefinedProcess' }, style: { gradient: this.storagetankGradientColor }, annotations: [{ content: "Storage", offset: { x: 0.5, y: 0.1 } }, { content: 'Tank', offset: { x: 0.5, y: 0.9 } }] },
    { id: 'ProductTankQuantity', offsetX: 1200, offsetY: 600, height: 130, width: 100, shape: { type: "HTML", content: '<div class="product-container"><div class="product" id="productStorage"></div></div>' } }
  ];
  // Connectors array
  public connectors: ConnectorModel[] = [
    { id: 'Connector1', sourceID: 'Tank1Group', targetID: 'controlvalve2', sourcePortID: "bottomPort", targetPortID: "inletLeftPort", style: { strokeColor: 'orange', strokeDashArray: '5,5' }, addInfo: { animate: true } },
    { id: 'Connector2', sourceID: 'Tank2Group', targetID: 'controlvalve7', sourcePortID: "topPort", targetPortID: "inletLeftPort", style: { strokeColor: '#7C099C' }, addInfo: { animate: true } },
    { id: 'Connector3', sourceID: 'controlvalve4', targetID: 'mixer1', sourcePortID: "outletRightPort", targetPortID: "bottomPort", style: { strokeColor: 'orange' }, addInfo: { animate: true } },
    { id: 'Connector4', sourceID: 'controlvalve9', targetID: 'mixer1', sourcePortID: "outletRightPort", targetPortID: "topPort", style: { strokeColor: '#7C099C' }, addInfo: { animate: true } },
    { id: 'Connector5', sourceID: 'coolantcontroller', targetID: 'tank3cooler', sourcePortID: "outletRightPort", targetPortID: "inletLeftPort", style: { strokeColor: 'blue' } },
    { id: 'Connector6', sourceID: 'coolantcontroller', targetID: 'tank3cooler', sourcePortID: "inletLeftPort", targetPortID: "bottomPort", style: { strokeColor: '#d6185bff' } },
    { id: 'Connector9', sourceID: 'reacterOutletThread1', targetID: 'controlvalve12', sourcePortID: "outletRightPort", targetPortID: "inletLeftPort", style: { strokeColor: 'red' }, addInfo: { animate: true } },
    { id: 'Connector10', sourceID: 'controlvalve14', targetID: 'productInletThread1', sourcePortID: "outletRightPort", targetPortID: "topPort", style: { strokeColor: 'red' }, addInfo: { animate: true } },
    { id: 'Connector11', sourceID: 'mixer1', targetID: 'pumpBase', sourcePortID: "outletRightPort", targetPortID: "pumpPort1", style: { strokeColor: '#8DC276' }, addInfo: { animate: true } },
    { id: 'Connector12', sourceID: 'pumpBase', targetID: 'reacterInletThread1', sourcePortID: "pumpPort2", targetPortID: "topPort", style: { strokeColor: '#8DC276' }, addInfo: { animate: true } },
    { id: 'Connector13', sourceID: 'mixer1', targetID: 'pressureGuageNode', sourcePortID: "mixertopressureport", targetPortID: "pressuretomixerport", style: { strokeColor: 'black', strokeWidth: 1, strokeDashArray: '5,1' } },
    { id: 'Connector14', sourceID: 'Tank3Group', targetID: 'thermometerNode', sourcePortID: "tankport10", targetPortID: "thermoPort", style: { strokeColor: 'black', strokeWidth: 1, strokeDashArray: '5,1' } }
  ];
  public onLoad() {
    setTimeout(() => {
      if (this.isDiagramCreated) {
        this.appendHTMLElements();
        this.diagram.fitToPage({ canZoomOut: true });
        this.runAnimation();
      }
    }, 100);
  }
  // Function to set default values for nodes in the diagram
  public getNodeDefaults(node: NodeModel): NodeModel {
    node.ports = this.getPorts(node.id as string);
    node.constraints = (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~NodeConstraints.Select
    node.addInfo = { valve: true }
    return node;
  }
  private getPorts(nodeId: string): PointPortModel[] {
    const staticPorts: PointPortModel[] = [
      { id: 'inletLeftPort', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
      { id: 'outletRightPort', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden },
      { id: 'topPort', offset: { x: 0.5, y: 0 }, visibility: PortVisibility.Hidden },
      { id: 'bottomPort', offset: { x: 0.5, y: 1 }, visibility: PortVisibility.Hidden }
    ];
    if (nodeId === "tank1") staticPorts.push({ id: 'tankPort1', offset: { x: 1, y: 0.2 }, visibility: PortVisibility.Visible }, { id: 'tankPort2', offset: { x: 1, y: 0.8 }, visibility: PortVisibility.Visible });
    if (nodeId === "mixer1") staticPorts.push({ id: 'mixertopressureport', offset: { x: 0.94, y: 0.1 }, visibility: PortVisibility.Hidden });
    if (nodeId === "pressureGuageNode") staticPorts.push({ id: 'pressuretomixerport', offset: { x: 0.7, y: 0.5 }, visibility: PortVisibility.Hidden });
    if (nodeId === "thermometerNode") staticPorts.push({ id: 'thermoPort', offset: { x: 0.2, y: 0.3 }, visibility: PortVisibility.Hidden });
    if (nodeId === "Tank3Group") staticPorts.push({ id: 'tankport10', offset: { x: 0.97, y: 0.8 }, visibility: PortVisibility.Hidden });
    if (nodeId === "pumpBase") staticPorts.push({ id: 'pumpPort1', offset: { x: 0.94, y: 0.1 }, visibility: PortVisibility.Hidden }, { id: 'pumpPort2', offset: { x: 0.97, y: 0.95 }, visibility: PortVisibility.Hidden });
    return staticPorts;
  }

  // Function to set default values for connectors in the diagram
  public getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal'; // Connector type set to Orthogonal
    connector.cornerRadius = 3;
    if (connector.id === "Connector5" || connector.id === "Connector6") {
      connector.style = { strokeWidth: 5, strokeDashArray: "10,1" };
    } else {
      connector.style = { strokeWidth: 10 };
    }
    // Connector style with specific stroke color and width
    connector.targetDecorator = { shape: "None" }; // Target decorator style
    if (connector.id == "Connector13" || connector.id == "Connector14") {
      connector.style = { strokeWidth: 2, strokeDashArray: "10,1" };
      connector.type = "Straight";
    }
    return connector;
  }
  public tools: DiagramTools = DiagramTools.ZoomPan;
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  constraints = DiagramConstraints.Default & ~DiagramConstraints.UndoRedo;
  private appendHTMLElements() {
    this.appendTemperatureControl();
    this.appendCollantValue();
    this.addPumpCheckBox();
    this.appendvalveControls();
  }
  // Function called when diagram is created
  public onCreated(): void {
    this.isDiagramCreated = true;
    this.appendHTMLElements();
    this.diagram.fitToPage({ canZoomOut: true }); // Fit the diagram to the page
    this.runAnimation(); // Start all animations initially
  }
  // ===== CORE SYSTEM LOGIC =====
  private shutDownPump() {
    this.isSystemLocked = true;
    this.pumpFlow = false;
    // Stop pump animations
    this.startPumpAnimation(false);
    this.updatePressureAnimation(true);
    this.animatePathFlow("Connector11_path", false, '#A7A2A2', true);
    setTimeout(() => { this.animatePathFlow("Connector12_path", false, "#A7A2A2", true); }, 500);
    setTimeout(() => {
      if (this.checkValve3CloseBtn && this.checkValve3CloseBtn.checked) {
        this.checkValve3CloseBtn.toggle();
      }
    }, 600);
    setTimeout(() => {
      // Close all valves including storage valve when pump shuts down
      if (this.checkValve1CloseBtn && this.checkValve1CloseBtn.checked) {
        this.checkValve1CloseBtn.toggle();
      }
      if (this.checkValve2CloseBtn && this.checkValve2CloseBtn.checked) {
        this.checkValve2CloseBtn.toggle();
      }
    }, 700);
  }
  private startUpPump() {
    this.isSystemLocked = false;  // Important: Reset system lock when pump starts
    this.isStorageShutdown = false;  // Reset storage shutdown state
    this.pumpFlow = true;
    // Start pump animations
    this.startPumpAnimation(true);
    this.updatePressureAnimation(false);
    this.animatePathFlow("Connector11_path", true, '#8DC276');
    setTimeout( () => this.animatePathFlow("Connector12_path", true, "#8DC276", true), 500);
    setTimeout(() => {
      if (this.checkValve1CloseBtn && !this.checkValve1CloseBtn.checked && !this.inputTankOn) {
        this.checkValve1CloseBtn.toggle();
      }
      if (this.checkValve2CloseBtn && !this.checkValve2CloseBtn.checked && !this.inputTankOn) {
        this.checkValve2CloseBtn.toggle();
      }
    }, 600);
    setTimeout(() => {
      if (this.checkValve3CloseBtn && !this.checkValve3CloseBtn.checked) {
        this.checkValve3CloseBtn.toggle();
      }
      if (this.checkbox && !this.checkbox.checked) {
        this.checkbox.toggle();
      }
    }, 700);
    this.autoStopped = false;
  }

  private shutDownStorage() {
    this.isStorageShutdown = true;
    // Stop storage animations
    this.animatePathFlow("Connector9_path", false, 'red', true);
    setTimeout(() => this.animatePathFlow("Connector10_path", false, "#A7A2A2", true), 500);
    this.startStorageAnimation(false);
  }
  private startUpStorage() {
    this.isStorageShutdown = false;
    this.animatePathFlow("Connector9_path", true, 'red');
    setTimeout(() => this.animatePathFlow("Connector10_path", true, "red"), 500);
    this.startStorageAnimation(true);
  }
  // NEW FUNCTION: Start entire system from storage valve
  private startUpSystemFromStorage() {
    if (this.checkbox && !this.checkbox.checked) {
      this.checkbox.toggle(); // This will call startUpPump()
    }
    if (this.checkValve1CloseBtn && !this.checkValve1CloseBtn.checked) {
      this.checkValve1CloseBtn.toggle();
    }
    if (this.checkValve2CloseBtn && !this.checkValve2CloseBtn.checked) {
      this.checkValve2CloseBtn.toggle();
    }
    this.animatePathFlow("Connector9_path", true, 'red');
    setTimeout(() => this.animatePathFlow("Connector10_path", true, "red"), 500);
    this.startStorageAnimation(true);
    this.isSystemLocked = false;
    this.isStorageShutdown = false;
  }
  private checkTankValveShutdown() {
    // If both tank valves are manually closed, shut down entire system
    if (!this.tankFlow1 && !this.tankFlow2 && this.pumpFlow) {
      if (this.checkbox && this.checkbox.checked) {
        this.checkbox.toggle();
      }
      if (this.checkValve3CloseBtn && this.checkValve3CloseBtn.checked) {
        this.checkValve3CloseBtn.toggle();
      }
    }
  }
  // ===== VALVE CONTROL LOGIC =====
  private appendvalveControls() {
    const valveButtons = ['valveButton1', 'valveButton2', 'valveButton3'];
    const switchContainers = ['switch-buttons1', 'switch-buttons2', 'switch-buttons3'];

    // Cleanup existing elements
    valveButtons.forEach((id, index) => {
      const existingInput = document.getElementById(id);
      if (existingInput) {
        const switchInstance = (existingInput as any).ej2_instances?.[0];
        if (switchInstance && switchInstance instanceof Switch) {
          switchInstance.destroy();
        }
        existingInput.remove(); // Remove the HTML element from the DOM
      }

      const switchContainer = document.getElementById(switchContainers[index]);
      if (switchContainer) {
        while (switchContainer.firstChild) {
          switchContainer.firstChild.remove();
        }
      }
    });

    // --- APPEND AND INITIALIZE PHASE ---
    // Valve 1 (Tank 1 inlet) - Start as ON
    const newInput1 = document.createElement('input');
    newInput1.type = 'checkbox';
    newInput1.id = 'valveButton1';
    document.getElementById('switch-buttons1')?.appendChild(newInput1);

    this.checkValve1CloseBtn = new Switch({
      checked: true,
      change: this.checkValve1Change.bind(this)
    });
    this.checkValve1CloseBtn.appendTo('#valveButton1');

    // Valve 2 (Tank 2 inlet) - Start as ON
    const newInput2 = document.createElement('input');
    newInput2.type = 'checkbox';
    newInput2.id = 'valveButton2';
    document.getElementById('switch-buttons2')?.appendChild(newInput2);

    this.checkValve2CloseBtn = new Switch({
      checked: true,
      change: this.checkValve2Change.bind(this)
    });
    this.checkValve2CloseBtn.appendTo('#valveButton2');
    // Valve 3 (Storage outlet) - Start as ON
    const newInput3 = document.createElement('input');
    newInput3.type = 'checkbox';
    newInput3.id = 'valveButton3';

    document.getElementById('switch-buttons3')?.appendChild(newInput3);
    this.checkValve3CloseBtn = new Switch({
      checked: true,
      change: this.checkValve3Change.bind(this)
    });
    this.checkValve3CloseBtn.appendTo('#valveButton3');
  }
  private checkValve1Change (args: any) {
    if (this.isSystemLocked && args.checked) {
      this.isSystemLocked = false;
      this.inputTankOn = true;
      setTimeout(() => this.inputTankOn = false, 2000);
      this.startUpPump();
      this.startUpStorage();
    }
    this.valveStateClick1(args.checked ? 'Open' : 'Close');
  }
  private checkValve2Change (args: any) {
      if (this.isSystemLocked && args.checked) {
        this.isSystemLocked = false;
        this.inputTankOn = true;
        setTimeout(() => this.inputTankOn = false, 2000);
        this.startUpPump();
        this.startUpStorage();
      }
      this.valveStateClick2(args.checked ? 'Open' : 'Close');
    }
  private checkValve3Change(args: any) {
        if (!args.checked) {
          // Storage valve manually closed - shut down pump if running
          if (this.checkbox && this.checkbox.checked) {
            this.checkbox.toggle(); // This will trigger shutDownPump()
          }
          this.shutDownStorage();
        } else {
          // Storage valve manually opened
          if (this.isSystemLocked || this.isStorageShutdown) {
            // If system was locked, restart the entire system
            this.startUpSystemFromStorage();
          } else if (this.pumpFlow && !this.isSystemLocked) {
            // Normal operation - just start storage
            this.startUpStorage();
          }
        }
        this.valveStateClick3(args.checked ? 'Open' : 'Close');
      }
  private valveStateClick1(action: string) {
    const flow: HTMLElement = document.getElementById("showFlowContainer1");
    this.updateValveState(flow, action, 1);
  }
  private valveStateClick2(action: string) {
    const flow: HTMLElement = document.getElementById("showFlowContainer2");
    this.updateValveState(flow, action, 2);
  }
  private valveStateClick3(action: string) {
    const flow: HTMLElement = document.getElementById("showFlowContainer3");
    this.updateValveState(flow, action, 3);
  }
  private updateValveState(flow: HTMLElement, action: string, valveNumber: number) {
    if (!flow) return;

    if (action === "Close") {
      flow.style.background = "#e5e7eb";

      switch (valveNumber) {
        case 1:
          this.tankFlow1 = false;
          this.animatePathFlow("Connector1_path", false, '#ffb734', true);
          setTimeout(() => this.animatePathFlow("Connector3_path", false, "#A7A2A2", true), 500);
          break;
        case 2:
          this.tankFlow2 = false;
          this.animatePathFlow("Connector2_path", false, '#7C099C', true);
          setTimeout(() => this.animatePathFlow("Connector4_path", false, "#A7A2A2", true), 500);
          break;
        case 3:
          this.tankFlow3 = false;
          this.animatePathFlow("Connector9_path", false, 'red', true);
          setTimeout(() => this.animatePathFlow("Connector10_path", false, "#A7A2A2", true), 500);
          this.startStorageAnimation(false);
          break;
      }

      // Check if both tank valves are closed
      if (valveNumber <= 2) {
        this.checkTankValveShutdown();
      }

    } else if (action === "Open") {
      // Check conditions for opening valves
      let canOpen = false;

      if (valveNumber <= 2) {
        // Tank valves can only open if pump is running and system is not locked
        canOpen = this.pumpFlow && !this.isSystemLocked && !this.isStorageShutdown;
      } else if (valveNumber === 3) {
        // Storage valve can open if pump is running and system is not locked
        canOpen = this.pumpFlow && !this.isSystemLocked;
      }
      if (canOpen) {
        switch (valveNumber) {
          case 1:
            this.tankFlow1 = true;
            flow.style.background = "#ffb734";
            this.animatePathFlow("Connector1_path", true, '#ffb734');
            setTimeout(() => this.animatePathFlow("Connector3_path", true, "#ffb734"), 100);
            break;
          case 2:
            this.tankFlow2 = true;
            flow.style.background = "#7C099C";
            this.animatePathFlow("Connector2_path", true, '#7C099C');
            setTimeout(() => this.animatePathFlow("Connector4_path", true, "#7C099C"), 100);
            break;
          case 3:
            this.tankFlow3 = true;
            flow.style.background = "red";
            this.animatePathFlow("Connector9_path", true, 'red');
            setTimeout(() => this.animatePathFlow("Connector10_path", true, "red"), 100);
            this.startStorageAnimation(true);
            break;
        }
      }
    }
  }

  // ===== PUMP CONTROL LOGIC =====
  private addPumpCheckBox() {
    if (this.checkbox) this.checkbox.destroy();
    this.checkbox = new Switch({
      checked: true, // Start as ON
      change: this.onCheckBoxChange.bind(this)
    });
    this.checkbox.appendTo('#pumpCheckBox');
  }
  private onCheckBoxChange(args: any) {
    if (args.checked) {
      this.startUpPump();
    } else {
      // Pump manually turned OFF
      this.shutDownPump();
    }
  }
  // ===== ANIMATION FUNCTIONS =====

  private runAnimation() {
    this.addFlowAnimationClass();
    this.startConnectorAnimation();
    this.startPumpAnimation(true);
    this.startStorageAnimation(true);
    this.updatePressureAnimation(false);
  }

  private addFlowAnimationClass() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dashFlow { 
            to { stroke-dashoffset: -15; } 
        }
        .flow-animation { 
            stroke-dasharray: 10, 10 !important; 
            stroke-dashoffset: 0 !important; 
            animation: dashFlow 1s linear infinite !important;
         }`;
    document.head.appendChild(style);
  }
  private startPumpAnimation(start: boolean) {
    const pumpElement = document.getElementById('fan');
    if (pumpElement) {
      if (start) {
        pumpElement.classList.add('rotate-animation');
      } else {
        pumpElement.classList.remove('rotate-animation');
      }
    }
  }

  private startStorageAnimation(on: boolean) {
    const storageElement = document.getElementById('productStorage');
    if (!storageElement) return;
    if (on) {
      // Restart animation
      storageElement.classList.remove('fill-animation', 'paused');
      void storageElement.offsetWidth; // Force reflow
      storageElement.classList.add('fill-animation');
    } else {
      // Pause animation without removing it
      storageElement.classList.add('paused');
    }
  }

  private hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
  }

  private animatePathFlow(pathId: string, animate: boolean, color?: string, slow?: boolean) {
    const dashArray = "10,5"; const speed = 30;
    const path = document.getElementById(pathId);
    if (!path) return;
    // **FIRST: Clean up any existing intervals for this path**
    if (this.animationIntervals[pathId]) {
      clearInterval(this.animationIntervals[pathId]);
      delete this.animationIntervals[pathId];
    }
    if (this.gradualStopIntervals[pathId]) {
      clearInterval(this.gradualStopIntervals[pathId]);
      delete this.gradualStopIntervals[pathId];
    }
    if (animate) {
      let offset = 0;
      path.setAttribute("stroke", color as string);
      path.setAttribute("stroke-dasharray", dashArray);

      // Start new interval and store its ID
      const intervalId = window.setInterval(() => {
        offset = (offset - 1) % 1000;
        path.setAttribute("stroke-dashoffset", offset as any);
      }, speed);
      this.animationIntervals[pathId] = intervalId;
    } else {
      if (slow) {
        const currentColor = path.getAttribute('stroke') || color;
        let offset = parseFloat(path.getAttribute("stroke-dashoffset") || "0");
        let step = 0;
        const steps = 30;
        const duration = 1000;
        const interval = duration / steps;

        const startColor = this.hexToRgb(currentColor);
        const endColor = this.hexToRgb(currentColor); // white or background color

        this.gradualStopIntervals[pathId] = window.setInterval(() => {
          step++;
          offset = (offset - 1) % 1000;
          path.setAttribute("stroke-dashoffset", offset.toString());

          const progress = step / steps;
          const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
          const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
          const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
          path.setAttribute("stroke", color as string);

          if (step >= steps) {
            // **CRITICAL: Complete cleanup when animation finishes**
            clearInterval(this.gradualStopIntervals[pathId]);
            delete this.gradualStopIntervals[pathId];
            path.setAttribute("stroke", color); // Final color
            path.setAttribute("stroke-dasharray", "none");
            path.setAttribute("stroke-dashoffset", "0"); // Reset offset
          }
        }, interval);

      } else {
        // Immediate stop
        path.setAttribute("stroke", color || "black");
        path.setAttribute("stroke-dasharray", "none");
        path.setAttribute("stroke-dashoffset", "0");
      }

    }
  }


  private startConnectorAnimation() {
    let diagramConnectors = this.diagram.connectors;
    for (let i = 0; i < diagramConnectors.length; i++) {
      // Toggle between two styles to simulate movement
      const currentConnector = diagramConnectors[i];
      const sourceNode: NodeModel = this.diagram.getObject(currentConnector.sourceID as string) as NodeModel;
      if (sourceNode && sourceNode.addInfo && (sourceNode.addInfo as any).valve && currentConnector.addInfo && (currentConnector.addInfo as any).animate) {
        this.animatePathFlow(currentConnector.id + "_path", true, (currentConnector as any).style.strokeColor)
      }
    }
  }
  // ===== OTHER CONTROL FUNCTIONS =====
  private appendCollantValue() {
    // renders collant value NumericTextBox
    if (this.numericBox) this.numericBox.destroy();
    this.numericBox = new NumericTextBox({
      min: -50, max: 75, value: 12, step: 2, format: '##.##',
      change: (args) => {
        (this.gauge.axes[0] as any).pointers[0].value = 28 + args.value;
        (this.gauge.axes[0] as any).pointers[0].color = this.getColorFromTemperature(28 + args.value);
      }
    });
    this.numericBox.appendTo('#numeric');
  }


  private appendTemperatureControl() {
    if (this.gauge) {
      this.gauge.destroy();
    }
    this.gauge = new LinearGauge({
      height: "120px",
      container: { width: 4, height: 100, roundedCornerRadius: 5, type: 'Thermometer', border: { width: 1 } },
      background: 'transparent',
      axes: [{
        minimum: -20, maximum: 100,
        pointers: [{ value: 40, height: 10, width: 4, placement: 'Center', offset: 0, markerType: 'Triangle', color: '#2674a5ff', type: 'Bar' }],
        line: {
          width: 0
        },
        majorTicks: {
          height: 7, interval: 30
        },
        minorTicks: {
          height: 0, interval: 5
        },
        labelStyle: {
          font: { fontFamily: 'inherit' }
        }
      }],
      annotations: [{ content: '<div style="font-size:13px;margin-left: 30px;margin-top: -50px;"> °C </div>', axisIndex: 0, axisValue: 50, x: 0, y: 0, zIndex: '1' }]
    });
    this.gauge.appendTo('#thermometer');
  }

  private getColorFromTemperature(value: number): string {
    if (value < 30) return 'cyan';
    if (value < 60) return 'blue';
    if (value < 80) return 'orange';
    return 'red';
  }


  private updatePressureAnimation(highPressureMode: boolean) {
    if (this.pressureInterval) {
      clearInterval(this.pressureInterval);
    }
    this.pressureInterval = setInterval(() => {
      let randomPressure: number = highPressureMode ? Math.floor(Math.random() * 16) + 90 : Math.floor(Math.random() * 21) + 20;
      this.updatePressure(randomPressure);
    }, 2000);
  }

  private updatePressure(psi: number) {
    const needle = document.getElementById('needle') as HTMLElement;
    const valueDisplay = document.getElementById('pressureValue') as HTMLElement;
    if (needle && valueDisplay) {
      psi = Math.max(0, Math.min(psi, 100));
      const angle = -90 + (psi / 100) * 90;
      needle.style.transform = `rotate(${angle}deg)`;
      valueDisplay.textContent = `${psi} PSI`;
    }
  }
}