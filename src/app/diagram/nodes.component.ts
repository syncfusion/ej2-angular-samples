import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DiagramComponent, NodeModel, ConnectorModel, NodeConstraints,ConnectorConstraints, BasicShapeModel, SnapSettingsModel, SnapConstraints, GradientType, GradientModel, LinearGradientModel, RadialGradientModel, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Nodes Component
 */

@Component({
    selector: 'control-content',
    templateUrl: 'nodes.html',
    styleUrls: ['diagram-style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, CheckBoxModule, SBDescriptionComponent]
})

export class NodeDiagramComponent {
  @ViewChild('diagram') public diagram: DiagramComponent;
  // Default shape type configuration
  public shapeType: BasicShapeModel = { type: 'Basic', shape: 'Ellipse' };
  // Default node configuration
  public nodeDefaults(obj: NodeModel): NodeModel {
    obj.style = { fill: '#37909A', strokeColor: '#024249' };
    obj.annotations[0].margin = { left: 10, right: 10 };
    obj.annotations[0].style = { color: 'white', fill: 'none', strokeColor: 'none' };
    return obj;
  }
  // Default connector configuration
  public connectorDefaults(obj: ConnectorModel): void {
    obj.targetDecorator.style = { fill: '#024249', strokeColor: '#024249' };
    obj.style = { strokeColor: '#024249', strokeWidth: 2 };
  }
  // Snap settings configuration
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  // Initialization logic when the component is initialized
  ngOnInit(): void {
    document.getElementById('appearance').onclick = this.documentClick.bind(this);
  }
   // Handler for aspect ratio change checkbox
  public onChangeAspectRatio(args: CheckBoxChangeEventArgs): void {
    for (let i: number = 0; i < this.diagram.nodes.length; i++) {
      let node: NodeModel = this.diagram.nodes[i];
      let isShadowEnabled: number = node.constraints & NodeConstraints.Shadow;
      if (args.checked) {
        node.constraints =
          NodeConstraints.AspectRatio | NodeConstraints.Default;
      } else {
        node.constraints =
          NodeConstraints.Default & ~NodeConstraints.AspectRatio;
      }
      if (isShadowEnabled) {
        node.constraints |= NodeConstraints.Shadow;
      }
      this.diagram.dataBind();
    }
  }

  public created(): void {
    this.diagram.fitToPage();
  }
  // Handler for lock checkbox
  public onChangeLock(args: CheckBoxChangeEventArgs): void {
    for (let i: number = 0; i < this.diagram.nodes.length; i++) {
      let node: NodeModel = this.diagram.nodes[i];
      let isShadowEnabled: number = node.constraints & NodeConstraints.Shadow;
      if (args.checked) {
        node.constraints &= ~(NodeConstraints.Resize | NodeConstraints.Delete | NodeConstraints.Rotate | NodeConstraints.Drag);
        node.constraints |= NodeConstraints.ReadOnly;
      } else {
        node.constraints = NodeConstraints.Default;
      }
      if (isShadowEnabled) {
        node.constraints |= NodeConstraints.Shadow;
      }
      this.diagram.dataBind();
    }
    for (let j: number = 0; j < this.diagram.connectors.length; j++) {
      let connector: ConnectorModel = this.diagram.connectors[j];
    
      if (args.checked) {
        connector.constraints &= ~(ConnectorConstraints.DragSourceEnd | ConnectorConstraints.DragTargetEnd | ConnectorConstraints.Drag | ConnectorConstraints.Delete);
        connector.constraints |= ConnectorConstraints.ReadOnly;
    } else {
        connector.constraints = ConnectorConstraints.Default;
    }
      }

      this.diagram.dataBind();
  }
  // Handler for document click event
  private documentClick(args: MouseEvent): void {
    let node: NodeModel;
    let target: HTMLElement = args.target as HTMLElement;
    // custom code start
    let selectedElement: HTMLCollectionOf<Element> = document.getElementsByClassName('e-selected-style') as HTMLCollectionOf<Element>;
    if (selectedElement.length) {
      selectedElement[0].classList.remove('e-selected-style');
    }
    // custom code end
    if (target.className === 'image-pattern-style') {
      for (let i: number = 0; i < this.diagram.nodes.length; i++) {
        node = this.diagram.nodes[i];
        switch (target.id) {
          case 'preview0':
            this.applyNodeStyle(node, 0, undefined, ~NodeConstraints.Shadow, undefined);
            break;
          case 'preview1':
            this.applyNodeStyle(node, 2, undefined, ~NodeConstraints.Shadow, undefined);
            break;
          case 'preview2':
            this.applyNodeStyle(node, 2, '5,5', ~NodeConstraints.Shadow, undefined);
            break;
          case 'preview3':
            this.applyNodeStyle(node, 2, '5,5', ~NodeConstraints.Shadow, 'Radial');
            break;
          case 'preview4':
            this.applyNodeStyle(node, 2, '5,5', NodeConstraints.Shadow, undefined);
            break;
        }
        // custom code start
        target.classList.add('e-selected-style');
        // custom code end
      }
    }
  }
  // Method to apply node style based on parameters
  private applyNodeStyle(node: NodeModel, width: number, dashArray: string, con: NodeConstraints, type: GradientType): void {
    node.style.fill = '#37909A';
    node.style.strokeWidth = width;
    node.style.strokeColor = '#024249';
    node.style.strokeDashArray = dashArray;

    if (type === undefined) {
      node.style.gradient.type = 'None';
    } else {
      let gradient: GradientModel | LinearGradientModel | RadialGradientModel;
      gradient = {
        cx: 50, cy: 50, fx: 50, fy: 50,
        stops: [
          { color: '#00555b', offset: 0 },
          { color: '#37909A', offset: 90 }
        ],
        type: 'Radial'
      };
      node.style.gradient = gradient;
    }
    if (con & NodeConstraints.Shadow) {
      node.shadow = { angle: 45, distance: 15, opacity: 0.3, color: 'grey' };
      node.constraints |= con;
    } else{
        node.constraints &= con;
    }
    this.diagram.dataBind();

  }
}
