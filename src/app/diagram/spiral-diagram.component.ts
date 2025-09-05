import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  DiagramModule
} from '@syncfusion/ej2-angular-diagrams';
import {
  NodeModel,
  ConnectorModel,
  SnapConstraints,
  DiagramTools,
  SnapSettingsModel,
  NodeConstraints,
  Connector,
  DiagramConstraints
} from '@syncfusion/ej2-diagrams';

import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

interface LifeCycleStep {
  title: string;
  color: string;
  icon?: string;
}


/**
 * Sample for Spiral Diagram
*/

@Component({
  selector: 'control-content',
  templateUrl: 'spiral-diagram.html',
  styleUrls: ['spiral-diagram.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class SpiralDiagramComponent implements OnInit {
  @ViewChild('diagram')
  public diagram: DiagramComponent;
  private diagramCreated : boolean = false; 
  constraints: DiagramConstraints = DiagramConstraints.Default &~ DiagramConstraints.UndoRedo;

  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];
  public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
  public tool = DiagramTools.ZoomPan;

  private centerX = 500;
  private centerY = 500;
  private angle = 180;
  private angleStep = 30;
  private radius = 200;
  private radiusStep = 65;

  private lifecycleSteps: LifeCycleStep[] = [
    { title: 'Lifecycle \nof \nSoftware ', color: 'hsl(0, 0%, 20%)' },
    { title: 'Ideation', color: 'hsl(10,80%,60%)', icon: 'sf-icon-ideation' },
    { title: 'Planning', color: 'hsl(20,80%,60%)', icon: 'sf-icon-planning' },
    { title: 'Requirement Analysis', color: 'hsl(30,80%,60%)', icon: 'sf-icon-requirement-analysis' },
    { title: 'Research', color: 'hsl(40,80%,60%)', icon: 'sf-icon-research' },
    { title: 'Design', color: 'hsl(50,75%,62%)', icon: 'sf-icon-design' },
    { title: 'Prototyping', color: 'hsl(60,75%,62%)', icon: 'sf-icon-prototyping' },
    { title: 'Frontend Development', color: 'hsl(140,70%,55%)', icon: 'sf-icon-front-end-development' },
    { title: 'Backend Development', color: 'hsl(150,70%,55%)', icon: 'sf-icon-backend-development' },
    { title: 'Integration', color: 'hsl(160,70%,55%)', icon: 'sf-icon-integration' },
    { title: 'Testing', color: 'hsl(180,65%,60%)', icon: 'sf-icon-testing' },
    { title: 'Bug Fixing', color: 'hsl(190,65%,60%)', icon: 'sf-icon-bug-fixing' },
    { title: 'Deployment', color: 'hsl(210,70%,60%)', icon: 'sf-icon-deployment' },
    { title: 'User Training', color: 'hsl(220,70%,60%)', icon: 'sf-icon-user-training' },
    { title: 'Monitoring', color: 'hsl(240,70%,65%)', icon: 'sf-icon-monitoring' },
    { title: 'Feedback Collection', color: 'hsl(250,70%,65%)', icon: 'sf-icon-feedback' },
    { title: 'Iteration', color: 'hsl(260,70%,65%)', icon: 'sf-icon-iteration' },
    { title: 'Scalability Improvements', color: 'hsl(280,70%,60%)', icon: 'sf-icon-scalability-improvements' },
    { title: 'Security Audit', color: 'hsl(290,70%,60%)', icon: 'sf-icon-security-audit' },
    { title: 'Performance Tuning', color: 'hsl(300,70%,60%)', icon: 'sf-icon-performance-tuning' },
    { title: 'Documentation', color: 'hsl(320,60%,65%)', icon: 'sf-icon-documentation' },
    { title: 'Customer Support', color: 'hsl(330,60%,65%)', icon: 'sf-icon-customer-support' },
    { title: 'Feature Expansion', color: 'hsl(345,60%,60%)', icon: 'sf-icon-feature-expansion' },
    { title: 'Sales & Marketing', color: 'hsl(355,60%,60%)', icon: 'sf-icon-sales-marketing' },
    { title: 'Partnerships', color: 'hsl(5,60%,60%)', icon: 'sf-icon-partnership' },
    { title: 'End-of-Life Plan', color: 'hsl(15,60%,60%)', icon: 'sf-icon-end-plan' }
  ];

  ngOnInit(): void {
    this.buildDiagramNodesAndConnectors();
  }

  private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  private buildDiagramNodesAndConnectors() {
    // Center label node
    this.nodes.push({
      id: 'node0',
      offsetX: this.centerX + 30,
      offsetY: this.centerY,
      width: 150,
      height: 150,
      shape: { type: 'Basic', shape: 'Ellipse' },
      constraints: NodeConstraints.Default | NodeConstraints.Shadow,
      annotations: [{
        width: 100,
        content: this.lifecycleSteps[0].title,
        style: { color: '#FFFFFF', fontSize: 18, bold: true }
      }],
      style: {
        fill: this.lifecycleSteps[0].color,
        strokeColor: 'white',
        strokeWidth: 2,
      }
    });

    // Spiral nodes and connectors
    for (let i = 1; i < this.lifecycleSteps.length; i++) {
      const step = this.lifecycleSteps[i];
      const point = this.polarToCartesian(
        this.centerX,
        this.centerY,
        this.radius + (i * this.radiusStep / (2 * Math.PI)),
        this.angle + (i * this.angleStep)
      );
      this.nodes.push({
        id: `node${i}`,
        offsetX: point.x,
        offsetY: point.y,
        width: 85,
        height: 85,
        constraints: NodeConstraints.Default | NodeConstraints.Shadow | NodeConstraints.Tooltip,
        tooltip: { content: step.title, relativeMode: 'Object' },
        annotations: [{
          width: 50,
          height: 50,
          template: `<div class="${step.icon}" style="text-align: center;"></div>`
        }],
        shape: { type: 'Basic', shape: 'Ellipse' },
        style: {
          fill: step.color,
          strokeColor: '#FFFFFF',
          strokeWidth: 2,
        }
      });
      if (i !== 1) {
        this.connectors.push({
          id: `connector${i}`,
          sourceID: `node${i - 1}`,
          targetID: `node${i}`,
          type: 'Straight',
          style: {
            strokeColor: '#9CA3AF',
            strokeWidth: 2,
          },
          targetDecorator: {
            shape: 'Arrow',
            style: {
              fill: '#9CA3AF',
              strokeColor: '#9CA3AF'
            }
          }
        });
      }
    }
  }

  // On diagram render
  public created(): void {
    this.diagramCreated= true;
    this.diagram.fitToPage();
  }

  // on tab switching center the diagram
  public load(): void {
    setTimeout(()=>{
        if (this.diagramCreated){
            this.diagram.fitToPage();
        }
    })
  }
}