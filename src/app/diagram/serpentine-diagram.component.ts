import { Component, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import {
  DiagramComponent,
  DiagramModule,
  NodeModel,
  ConnectorModel,
  Rect,
  SnapConstraints,
  DiagramTools,
  NodeConstraints,
  PortVisibility,
  ConnectorConstraints
} from '@syncfusion/ej2-angular-diagrams';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'control-content',
  templateUrl: 'serpentine-diagram.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DiagramModule, ButtonModule, CommonModule]
})
export class SerpentineDiagramComponent {
  @ViewChild('diagram')
  public diagram: DiagramComponent;

  // --- Data and Palette ---
  public medicalBreakthroughs = [
    { id: '1', year: '1796', title: 'Smallpox Vaccine', description: 'Edward Jenner develops the first successful vaccine using cowpox, marking a historic milestone in immunology.' },
    { id: '2', year: '1846', title: 'First Use of Anesthesia', description: 'William T. G. Morton demonstrates ether anesthesia publicly, revolutionizing surgical procedures by enabling pain-free operations.' },
    { id: '3', year: '1865', title: 'Germ Theory of Disease', description: 'Louis Pasteur proves microorganisms cause disease, establishing the foundation of modern microbiology.' },
    { id: '4', year: '1882', title: 'Discovery of the Tuberculosis Bacterium', description: 'Robert Koch identifies Mycobacterium tuberculosis, paving the way for accurate TB diagnosis and effective treatment.' },
    { id: '5', year: '1895', title: 'Discovery of X-Rays', description: 'Wilhelm Röntgen discovers X-rays, transforming medical imaging and diagnostic practices worldwide.' },
    { id: '6', year: '1901', title: 'Classification of Blood Types', description: 'Karl Landsteiner classifies major blood groups (A, B, O), enabling safe and reliable blood transfusions.' },
    { id: '7', year: '1921', title: 'Discovery of Insulin', description: 'Frederick Banting and Charles Best isolate insulin, turning diabetes into a manageable chronic condition.' },
    { id: '8', year: '1923', title: 'Diphtheria Vaccine Developed', description: 'Widespread use of the diphtheria toxoid vaccine begins, drastically reducing deaths from the disease.' },
    { id: '9', year: '1928', title: 'Discovery of Penicillin', description: 'Alexander Fleming discovers the first true antibiotic, heralding the antibiotic era.' },
    { id: '10', year: '1935', title: 'Sulfonamides Introduced', description: 'Sulfonamides, the first synthetic antibiotics, are introduced to effectively treat diverse bacterial infections.' },
    { id: '11', year: '1953', title: 'DNA Structure Identified', description: 'James Watson and Francis Crick reveal the double-helix structure of DNA, laying the groundwork for modern genetics.' },
    { id: '12', year: '1955', title: 'Polio Vaccine Approved', description: 'Jonas Salk’s IPV is approved as safe and effective, drastically reducing global polio cases.' },
    { id: '13', year: '1960', title: 'Introduction of Oral Contraceptives', description: 'The FDA approves the first oral contraceptive pill, revolutionizing reproductive health and social norms.' },
    { id: '14', year: '1967', title: 'First Human Heart Transplant', description: 'Dr. Christiaan Barnard performs the first successful human heart transplant, redefining cardiac surgery.' },
    { id: '15', year: '1971', title: 'CT Scan Invented', description: 'Godfrey Hounsfield and Allan Cormack invent CT scanning, dramatically improving internal medical imaging.' },
    { id: '16', year: '1978', title: 'Birth of First IVF Baby', description: 'Louise Brown becomes the first baby born through IVF, marking a breakthrough in reproductive medicine.' },
    { id: '17', year: '1980', title: 'Smallpox Eradicated', description: 'WHO declares smallpox eradicated, a historic triumph of global vaccination efforts.' },
    { id: '18', year: '1983', title: 'HIV Identified', description: 'Luc Montagnier and Robert Gallo identify HIV as the virus responsible for AIDS.' },
    { id: '19', year: '1990', title: 'Launch of Human Genome Project', description: 'The Human Genome Project launches, aiming to map all human genes and revolutionize personalized medicine.' },
    { id: '20', year: '1996', title: 'Introduction of HAART for HIV', description: 'HAART becomes the standard HIV treatment, transforming it into a manageable chronic condition.' }
  ];
  public palette: string[] = ['#2E86C1', '#2A6F1C', '#C25107', '#8E44AD', '#C0392B', '#40566d', '#8E7302'];

  // --- Layout Constants (aligned with sample) ---
  public nodeSize = 110;
  public hGap = 60;
  public vGap = 150;

  public baseMargin = 50;
  public curveRadius = this.hGap * 1.5;
  public curveBowOffset = 70;
  public curvePadding = this.curveRadius + (2 * this.curveBowOffset);
  public totalMargin = this.baseMargin + this.curvePadding;

  public initialY = 80;

  // Connector visuals
  public connectorStrokeWidth = 12;
  public decoratorWidth = 20;
  public decoratorHeight = 30;
  public decoratorPivotInner = 0.25;
  public decoratorPivotOuter = 0.25;
  public decoratorPath = 'M 16 16 c -8 1 -7 1 -11 3 C 7 16 7 13 5 10 c 4 2 3 2 11 3 z';

  public area = new Rect(0, 0, 1500, 1500);

  // --- Diagram Properties for Binding ---
  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];
  public tool: DiagramTools = DiagramTools.ZoomPan;
  public snapSettings = { constraints: SnapConstraints.None };
  public scrollSettings = { scrollableArea: this.area, currentZoom: 1, viewPortHeight: 600 };
  public activeZoom = 0.65; // default selected zoom

  created(): void {
    // Initialize to 0.65 zoom, reset offsets, then render layout on next frame
    requestAnimationFrame(() => {
      const currentZoom = this.diagram.scrollSettings.currentZoom || 0.65;
      const targetZoom = 0.65;
      const focusPoint = {
        x: this.diagram.scrollSettings.viewPortWidth || this.diagram.element.clientWidth / 2,
        y: this.diagram.scrollSettings.viewPortHeight / 2
      };
      if (Math.abs(currentZoom - targetZoom) > 0.001) {
        this.diagram.zoom(targetZoom / currentZoom, focusPoint);
      }
      this.diagram.scrollSettings.horizontalOffset = 0;
      this.diagram.scrollSettings.verticalOffset = 0;
      this.renderSerpentineLayout();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: Event): void {
    // Debounced-like re-render
    requestAnimationFrame(() => this.renderSerpentineLayout());
  }

  // Zoom buttons click handler
  public zoomClick(level: number): void {
    const currentZoom = this.diagram.scrollSettings.currentZoom || 0.65;
    const zoomFactor = level / currentZoom;
    const focusPoint = {
      x: (this.diagram.scrollSettings.viewPortWidth || this.diagram.element.clientWidth) / 2,
      y: this.diagram.scrollSettings.viewPortHeight / 2
    };
    this.diagram.zoom(zoomFactor, focusPoint);
    this.renderSerpentineLayout();

    this.diagram.scrollSettings.horizontalOffset = 0;
    this.diagram.scrollSettings.verticalOffset = 0;
    this.diagram.dataBind();

    this.activeZoom = level;
  }

  // Shared decorator factory
  private createDecorator(color: string, pivotX: number) {
    return {
      shape: 'Custom' as const,
      width: this.decoratorWidth,
      height: this.decoratorHeight,
      pivot: { x: pivotX },
      pathData: this.decoratorPath,
      style: { fill: color, strokeColor: color }
    };
  }

  private renderSerpentineLayout(): void {
    const container = this.diagram.element as HTMLElement;
    if (!container) return;

    const zoom = this.diagram.scrollSettings.currentZoom || 1;
    const effectiveWidth = container.clientWidth / zoom;

    const nodes: NodeModel[] = [];
    const connectors: ConnectorModel[] = [];

    let currentX = this.totalMargin + (this.nodeSize / 2);
    let currentY = this.initialY;
    let direction: 1 | -1 = 1;

    this.medicalBreakthroughs.forEach((breakthrough, index) => {
      const exceedsRight = direction === 1 && (currentX + (this.nodeSize / 2) > effectiveWidth - this.totalMargin);
      const exceedsLeft = direction === -1 && (currentX - (this.nodeSize / 2) < this.totalMargin);

      if (exceedsRight || exceedsLeft) {
        currentY += this.vGap;
        direction = direction === 1 ? -1 : 1;
        currentX = direction === 1
          ? this.totalMargin + (this.nodeSize / 2)
          : effectiveWidth - this.totalMargin - (this.nodeSize / 2);
      }

      const color = this.palette[index % this.palette.length];

      const node: NodeModel = {
        id: `breakthrough_${breakthrough.id}`,
        offsetX: currentX,
        offsetY: currentY,
        width: this.nodeSize,
        height: this.nodeSize,
        shape: { type: 'Basic', shape: 'Ellipse' },
        style: { fill: color, strokeColor: 'white', strokeWidth: 4 },
        annotations: [
          { content: breakthrough.year, offset: { y: 0.3 }, style: { color: 'white', fontSize: 16, bold: true } },
          {
            content: breakthrough.title,
            width: 80,
            offset: { y: 0.65 },
            style: { color: 'white', fontSize: 12, textOverflow: 'Wrap', textWrapping: 'WrapWithOverflow' }
          }
        ],
        ports: [
          { id: 'port_left', offset: { x: 0, y: 0.5 }, visibility: PortVisibility.Hidden },
          { id: 'port_right', offset: { x: 1, y: 0.5 }, visibility: PortVisibility.Hidden }
        ],
        // Non-selectable, tooltip enabled
        constraints: (NodeConstraints.Default | NodeConstraints.Tooltip) & ~NodeConstraints.Select,
        tooltip: {
          content: `<p style="font-size: small;"><b>${breakthrough.title} (${breakthrough.year})</b><br/><br/>${breakthrough.description}</p>`,
          position: 'BottomCenter',
          relativeMode: 'Object',
          width: 200
        }
      };
      nodes.push(node);

      currentX += direction * (this.nodeSize + this.hGap);
    });

    for (let i = 0; i < nodes.length - 1; i++) {
      const sourceNode = nodes[i];
      const targetNode = nodes[i + 1];

      const rowChanged = sourceNode.offsetY !== targetNode.offsetY;

      let sourcePortId: 'port_left' | 'port_right';
      let targetPortId: 'port_left' | 'port_right';

      if (rowChanged) {
        const nextRowStartsOnRight = (sourceNode.offsetX as number) < (targetNode.offsetX as number);
        sourcePortId = nextRowStartsOnRight ? 'port_right' : 'port_left';
        targetPortId = sourcePortId;
      } else {
        const leftToRight = (sourceNode.offsetX as number) < (targetNode.offsetX as number);
        sourcePortId = leftToRight ? 'port_right' : 'port_left';
        targetPortId = leftToRight ? 'port_left' : 'port_right';
      }

      const color = sourceNode.style.fill as string;

      const connector: ConnectorModel = {
        id: `connector_${i + 1}`,
        sourceID: sourceNode.id,
        targetID: targetNode.id,
        sourcePortID: sourcePortId,
        targetPortID: targetPortId,
        style: { strokeColor: color, strokeWidth: this.connectorStrokeWidth },
        // On row change, place target decorator pivot at 0 for a cleaner turn cap
        targetDecorator: this.createDecorator(color, rowChanged ? 0 : this.decoratorPivotInner),
        sourceDecorator: this.createDecorator(color, this.decoratorPivotOuter),
        constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select
      };

      if (rowChanged) {
        // Position control points on the outer side of the turn using 1.3 multiplier
        const goingRight = (sourceNode.offsetX as number) < (targetNode.offsetX as number);
        const sign = goingRight ? 1.3 : -1.3;
        const controlX =
          (sourceNode.offsetX as number) + sign * ((this.nodeSize / 2) + this.curveRadius + 2 * this.curveBowOffset);

        connector.type = 'Bezier';
        connector.segments = [
          {
            type: 'Bezier',
            point1: { x: controlX, y: (sourceNode.offsetY as number) + 5 },
            point2: { x: controlX, y: (targetNode.offsetY as number) - 15 }
          }
        ];
      } else {
        connector.type = 'Straight';
      }

      connectors.push(connector);
    }

    // Bind to diagram
    this.nodes = nodes;
    this.connectors = connectors;
  }
}