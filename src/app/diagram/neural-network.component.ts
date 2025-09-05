import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiagramComponent, DiagramModule ,NodeModel, ConnectorModel, DiagramTools, SnapConstraints, NodeConstraints, ConnectorConstraints, SnapSettingsModel, DiagramConstraints } from '@syncfusion/ej2-angular-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
@Component({
  selector: 'control-content',
  templateUrl: 'neural-network.html',   // <-- this is your HTML template file
  styleUrls: ['diagram-style.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DiagramModule,SBActionDescriptionComponent,SBDescriptionComponent]
})
export class NeuralNetworkComponent {
  @ViewChild('diagram') diagram!: DiagramComponent;

  public tool: DiagramTools = DiagramTools.ZoomPan;
  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
  constraints: DiagramConstraints = DiagramConstraints.Default &~ DiagramConstraints.UndoRedo;
  // These properties will hold your node and connector arrays for binding
  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];

  // Meta-data for layout/labels/colors
  private layerSizes: number[] = [3, 5, 4, 2];
  private layerNames: string[] = ["Input Layer", "Hidden Layer 1", "Hidden Layer 2", "Output Layer"];
  private layerColors: string[] = ["#0087EA", "#FE871F", "#7925E5", "#04AE45"];
  private nodeLabels: string[][] = [
    ["Feature 1", "Feature 2", "Feature 3"],
    ["H1-1", "H1-2", "H1-3", "H1-4", "H1-5"],
    ["H2-1", "H2-2", "H2-3", "H2-4"],
    ["Output 1", "Output 2"]
  ];

  ngOnInit() {
    // Build the diagram data on component init
    this.nodes = [];
    this.connectors = [];
    this.buildLayerLabelNodes();
    this.buildNeuronNodes();
    this.buildConnectors();
  }

  // Build the colored layer label nodes shown on top
  buildLayerLabelNodes() {
    this.layerNames.forEach((name, i) => {
      this.nodes.push({
        id: `label_${i}`,
        offsetX: 200 + i * 250,
        offsetY: 50,
        width: 150,
        height: 40,
        style: { fill: "transparent", strokeColor: "transparent" },
        annotations: [{
          template: `
            <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
              <div style="width:12px;height:12px;border-radius:6px;background:${this.layerColors[i]};margin-right:10px;"></div>
              <span style="font-weight:bold;font-size:14px;color:#495057;">${name}</span>
            </div>
          `,
        }],
        constraints: NodeConstraints.Default & ~NodeConstraints.Select
      });
    });
  }

  // Build neuron nodes per layer
  buildNeuronNodes() {
    for (let l = 0; l < this.layerSizes.length; l++) {
      for (let n = 0; n < this.layerSizes[l]; n++) {
        const nodeLabel = this.nodeLabels[l][n];
        this.nodes.push({
          id: `neuron_${l}_${n}`,
          width: 70, height: 70,
          offsetX: 200 + l * 250,
          offsetY: 120 + ((5 - this.layerSizes[l]) * 100 / 2) + n * 100,
          style: { fill: this.layerColors[l], strokeColor: this.layerColors[l], strokeWidth: 2 },
          shape: { type: "Basic", shape: "Ellipse" },
          annotations: [{
            content: nodeLabel,
            style: { fontSize: 12, color: "white", bold: true }
          }],
          tooltip: {
            content: `
              <div style="padding:8px 12px; border-radius:6px; font-family:'Segoe UI',sans-serif; min-width:160px;">
                <div style="font-weight:bold;font-size:13px;margin-bottom:4px;">
                  🧠 Neuron Information
                </div>
                <hr style="margin:2px 0 5px 0;"/>
                <div style="font-size:13px;margin-bottom:2px;">
                  <span style="font-weight:bold;">Layer:</span>
                  <span >${this.layerNames[l]}</span>
                </div>
                <div style="font-size:13px;">
                  <span style="font-weight:bold;">Neuron:</span>
                  <span >${nodeLabel}</span>
                </div>
              </div>`,
            position: "TopCenter"
          },
          constraints: NodeConstraints.Default | NodeConstraints.Tooltip
        });
      }
    }
  }

  // Deterministic random for demo
  randomSeed = 42;
  random() {
    this.randomSeed = Math.sin(this.randomSeed) * 10000;
    return this.randomSeed - Math.floor(this.randomSeed);
  }

  // Build connectors between neurons
  buildConnectors() {
    for (let l = 0; l < this.layerSizes.length - 1; l++) {
      for (let n = 0; n < this.layerSizes[l]; n++) {
        for (let m = 0; m < this.layerSizes[l + 1]; m++) {
          const weight = Math.round((this.random() * 2 - 1) * 100) / 100;
          const weightColor = weight >= 0 ? "#2ecc71" : "#e74c3c";
          this.connectors.push({
            id: `conn_${l}_${n}_${m}`,
            sourceID: `neuron_${l}_${n}`,
            targetID: `neuron_${l + 1}_${m}`,
            type: 'Straight',
            style: {
              strokeColor: weight >= 0 ? "#2196f3" : "#f44336",
              strokeWidth: Math.max(1, Math.min(3, Math.abs(weight) * 3)),
              opacity: 0.7
            },
            targetDecorator: {
              shape: "Arrow",
              style: {
                fill: weight >= 0 ? "#2196f3" : "#f44336",
                strokeColor: weight >= 0 ? "#2196f3" : "#f44336"
              }
            },
            annotations: [{
              content: String(weight),
              style: { fontSize: 13, color: "#495057", fill: "white" }
            }],
            tooltip: {
              content: `
                <div style="padding:8px 12px; border-radius:6px; font-family:'Segoe UI',sans-serif; min-width:160px;">
                  <div style="font-weight:bold;font-size:13px;margin-bottom:4px;">
                    🔗 Connection Details
                  </div>
                  <hr style="margin:2px 0 5px 0;"/>
                  <div style="font-size:13px;margin-bottom:2px;">
                    <span style="font-weight:bold;">Weight:</span>
                    <span style="color:${weightColor};font-weight:bold;">${weight}</span>
                  </div>
                  <div style="font-size:13px;margin-bottom:1px;">
                    <span style="font-weight:bold;">From:</span>
                    <span >neuron_${l}_${n}</span>
                  </div>
                  <div style="font-size:13px;">
                    <span style="font-weight:bold;">To:</span>
                    <span >neuron_${l + 1}_${m}</span>
                  </div>
                </div>`,
              position: "TopCenter"
            },
            constraints: ConnectorConstraints.Default | ConnectorConstraints.Tooltip
          });
        }
      }
    }
  }
  diagramCreated: boolean = false
  created(): void {
    this.diagramCreated = true;
    this.diagram.fitToPage();
  }
  load(): void {
    if (this.diagramCreated) {
      this.diagram.fitToPage();
    }
  }
}