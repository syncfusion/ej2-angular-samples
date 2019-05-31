import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  DiagramComponent, FlowShapeModel, ConnectorModel, DataBinding, SelectorModel,
  IElement, randomId, cloneObject, UserHandleModel, SelectorConstraints, ToolBase,
  MouseEventArgs, NodeModel, MindMap, HierarchicalTree, MoveTool, Node, SnapSettingsModel,
  SnapConstraints, Diagram
} from '@syncfusion/ej2-angular-diagrams';
Diagram.Inject(DataBinding, MindMap, HierarchicalTree);

/**
 * Sample for UserHandle
 */
@Component({
  selector: 'control-content',
  templateUrl: 'quick-commands.html',
  styleUrls: ['diagram-style.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserHandlediagramComponent {
  @ViewChild('diagram') public diagram: DiagramComponent;
  public terminator: FlowShapeModel = { type: 'Flow', shape: 'Terminator' };
  public process: FlowShapeModel = { type: 'Flow', shape: 'Process' };
  public decision: FlowShapeModel = { type: 'Flow', shape: 'Decision' };
  public card: FlowShapeModel = { type: 'Flow', shape: 'Card' };

  public create(args: Object): void {
    this.diagram.fitToPage();
    this.diagram.dataBind();
    this.diagram.select([this.diagram.nodes[0]]);
  }
  //Defines the user handle collection for nodes in diagram
  public handles: UserHandleModel[] = [
    {
      name: 'clone',
      pathData:
        'M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3,' +
        '0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z ' +
        'M68.5,72.5h-30V34.4h30V72.5z',
      visible: true,
      offset: 0,
      side: 'Bottom',
      margin: { top: 0, bottom: 0, left: 0, right: 0 }
    }
  ];
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };
  public selectedItems: SelectorModel = {
    constraints: SelectorConstraints.UserHandle,
    userHandles: this.handles
  };
  public getNodeDefaults(node: Node): NodeModel {
    let obj: NodeModel = {
      style: { fill: '#578CA9', strokeColor: 'none' },
      annotations: [{ style: { color: 'white' } }]
    };
    return obj;
  }

  ngOnInit(): void {
    document.getElementById('alignment').onclick = this.documentClick.bind(this);
    document.getElementById('pattern').onclick = this.documentPatternClick.bind(this);
  }

  private documentClick(args: MouseEvent): void {
    let target: HTMLElement = args.target as HTMLElement;
    if (target.className === 'image-pattern-style') {
      switch (target.id) {
        case 'left':
          this.diagram.selectedItems.userHandles[0].offset = 0;
          this.diagram.selectedItems.userHandles[0].side = 'Bottom';
          break;
        case 'right':
          this.diagram.selectedItems.userHandles[0].offset = 1;
          this.diagram.selectedItems.userHandles[0].side = 'Bottom';
          break;
        case 'topr':
          this.diagram.selectedItems.userHandles[0].offset = 0;
          this.diagram.selectedItems.userHandles[0].side = 'Right';
          break;
      }
      // custom code start
      target.classList.add('e-selected-style');
      // custom code end
    }
    this.diagram.dataBind();
  }
  private documentPatternClick(args: MouseEvent): void {
    let target: HTMLElement = args.target as HTMLElement;
    if (target.className === 'image-pattern-style') {
      switch (target.id) {
        case 'pattern1':
          this.diagram.selectedItems.userHandles[0].backgroundColor = '#1E90FF';
          break;
        case 'pattern2':
          this.diagram.selectedItems.userHandles[0].backgroundColor = '#3CB371';
          break;
        case 'pattern3':
          this.diagram.selectedItems.userHandles[0].backgroundColor = '#FF6347';
          break;
      }
      this.diagram.selectedItems.userHandles[0].pathColor = 'white';
      // custom code start
      target.classList.add('e-selected-style');
      // custom code end
    }
    this.diagram.dataBind();
  }
  public getCustomTool: Function = this.getTool.bind(this);
  public getTool(action: string): ToolBase {
    let tool: ToolBase;
    if (action === 'clone') {
      let cloneTool: CloneTool = new CloneTool(this.diagram.commandHandler);
      cloneTool.diagram = this.diagram;
      return cloneTool;
    }
    return tool;
  }
}

//Defines the clone tool used to copy Node/Connector
class CloneTool extends MoveTool {
  public diagram: Diagram = null;
  public mouseDown(args: MouseEventArgs): void {
    let newObject: NodeModel | ConnectorModel;
    if (this.diagram.selectedItems.nodes.length > 0) {
      newObject = cloneObject(this.diagram.selectedItems.nodes[0]) as NodeModel;
    } else {
      newObject = cloneObject(
        this.diagram.selectedItems.connectors[0]
      ) as ConnectorModel;
    }
    newObject.id += randomId();
    this.diagram.paste([newObject]);
    args.source = this.diagram.nodes[this.diagram.nodes.length - 1] as IElement;
    args.sourceWrapper = args.source.wrapper;
    super.mouseDown(args);
    this.inAction = true;
  }
}
