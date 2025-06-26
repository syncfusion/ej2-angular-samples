import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  DiagramComponent,
  NodeModel,
  ConnectorModel,
  UserHandleModel,
  NodeConstraints,
  DiagramTools,
  Diagram,
  BpmnDiagrams,
  UndoRedo,
  DiagramModule,
  ScrollSettingsModel,
  SymbolPaletteComponent,
  SymbolInfo,
  SymbolPaletteModule,
  SymbolPalette,
} from '@syncfusion/ej2-angular-diagrams';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ToolbarComponent, ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { SBDescriptionComponent } from '../common/dp.component';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { TooltipComponent, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';

Diagram.Inject(UndoRedo, BpmnDiagrams);
SymbolPalette.Inject(BpmnDiagrams);

@Component({
  selector: 'control-content',
  templateUrl: 'workflow-editor.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  // Importing necessary components
  imports: [SBActionDescriptionComponent, ToolbarModule, TooltipModule, SwitchModule, DiagramModule, SBDescriptionComponent, SymbolPaletteModule]
})
export class WorkFlowDiagramComponent implements AfterViewInit {
  @ViewChild('diagram')
  public diagram!: DiagramComponent;
  @ViewChild('Diagramtoolbar')
  public toolbar!: ToolbarComponent;
  @ViewChild('symbolPalette')
  public symbolPalette!: SymbolPaletteComponent;
  @ViewChild('toggleSwitch')
  public toggleSwitch!: SwitchComponent;
  @ViewChild('switchTooltip')
  public switchTooltip!: TooltipComponent;
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('tooltip', { static: false }) tooltip!: TooltipComponent;
  @ViewChild('editLabel') editLabel!: ElementRef<HTMLElement>;
  constructor() {
  }

  isEditMode: boolean = false;
  ngAfterViewInit(): void {
    this.applyModeState(this.isEditMode);
    this.tooltipContent = this.isEditMode ? 'Disable Editing' : 'Enable Editing';
  }
  public tools: DiagramTools = DiagramTools.ZoomPan;
  public scrollSettings: ScrollSettingsModel = {
    scrollLimit: "Infinity", canAutoScroll: true
  };
  public flowTimeOut1: any;
  public flowTimeOut2: any;
  public isPaused: boolean = false;
  public animationIntervals: any[] = [];
  public connectorBeforeAnimationColor: string = '#B0B0B0';
  public connectorDuringAnimationColor: string = "#FF7F50";
  public connectorAfterAnimationColor: string = "green";
  public connectorAnnotationColor: string = "#32CD32";
  public nodeStrokeBeforeAnimationColor: string = "black";
  public nodeStrokeAfterAnimationColor: string = "green";
  public tooltipContent: string = 'Enable Editing';
  public nodes: NodeModel[] = [
    {
      id: "start",
      offsetX: 100,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Event",
        event: { event: "Start", trigger: "None" },
      },
      annotations: [{ content: "Start" }],
    },
    {
      id: "liquidInput",
      offsetX: 300,
      offsetY: 280,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Liquid Input" }],
    },
    {
      id: "dryInput",
      offsetX: 300,
      offsetY: 480,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Dry Input" }],
    },
    {
      id: "condensed",
      offsetX: 500,
      offsetY: 180,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Condensed" }],
    },
    {
      id: "cream",
      offsetX: 500,
      offsetY: 260,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Cream" }],
    },
    {
      id: "caneSugar",
      offsetX: 500,
      offsetY: 340,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Cane Sugar" }],
    },
    {
      id: "water",
      offsetX: 500,
      offsetY: 420,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Water" }],
    },
    {
      id: "ingredients",
      offsetX: 500,
      offsetY: 500,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Ingredients" }],
    },
    {
      id: "flavour",
      offsetX: 500,
      offsetY: 580,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Flavour" }],
    },
    {
      id: "fruitsAndNuts",
      offsetX: 500,
      offsetY: 660,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Fruits and Nuts" }],
    },
    {
      id: "blending",
      offsetX: 700,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Blending" }],
    },
    {
      id: "coolingAging",
      offsetX: 840,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Cooling/Aging" }],
    },
    {
      id: "packaging",
      offsetX: 980,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Packaging" }],
    },
    {
      id: "storageDistribution",
      width: 140,
      offsetX: 1130,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Activity",
        activity: { activity: "Task" },
      },
      annotations: [{ content: "Storage/Distribution" }],
    },
    {
      id: "end",
      offsetX: 1260,
      offsetY: 380,
      shape: {
        type: "Bpmn",
        shape: "Event",
        event: { event: "End", trigger: "None" },
      },
      annotations: [{ content: "End" }],
    },
  ];

  public connectors: ConnectorModel[] = [
    { id: "c1", sourceID: "start", targetID: "liquidInput" },
    { id: "c2", sourceID: "start", targetID: "dryInput" },
    { id: "c3", sourceID: "liquidInput", targetID: "condensed" },
    { id: "c4", sourceID: "liquidInput", targetID: "cream" },
    { id: "c5", sourceID: "liquidInput", targetID: "caneSugar" },
    { id: "c6", sourceID: "liquidInput", targetID: "water" },
    { id: "c7", sourceID: "liquidInput", targetID: "ingredients" },
    {
      id: "c8",
      sourceID: "dryInput",
      targetID: "flavour",
    },
    {
      id: "c9",
      sourceID: "dryInput",
      targetID: "fruitsAndNuts",
    },
    { id: "c10", sourceID: "condensed", targetID: "blending" },
    { id: "c11", sourceID: "cream", targetID: "blending" },
    { id: "c12", sourceID: "caneSugar", targetID: "blending" },
    { id: "c13", sourceID: "water", targetID: "blending" },
    { id: "c14", sourceID: "ingredients", targetID: "blending" },
    { id: "c15", sourceID: "flavour", targetID: "blending" },
    { id: "c16", sourceID: "fruitsAndNuts", targetID: "blending" },
    { id: "c17", sourceID: "blending", targetID: "coolingAging" },
    { id: "c18", sourceID: "coolingAging", targetID: "packaging" },
    { id: "c19", sourceID: "packaging", targetID: "storageDistribution" },
    { id: "c20", sourceID: "storageDistribution", targetID: "end" },
  ];

  // Node defaults
  public getNodeDefaults(node: NodeModel): NodeModel {
    // restrict rotation and hide thumbs
    node.constraints =
      (NodeConstraints.Default & ~NodeConstraints.Rotate) |
      NodeConstraints.HideThumbs;
    // Set default width and height
    const dimensions: any = {
      Event: { width: 60, height: 60 },
      Gateway: { width: 90, height: 70 },
      Activity: { width: 90, height: 50 },
    };

    const shapeType = (node.shape as any).shape;
    if (!node.width) node.width = dimensions[shapeType].width;
    if (!node.height) node.height = dimensions[shapeType].height;
    return node;
  }

  public getConnectorDefaults: Function = this.connectorDefaults.bind(this);

  // Connector defaults
  public connectorDefaults(connector: ConnectorModel): ConnectorModel {
    // Configure the connector with a straight type
    connector.type = "Straight";

    // connector initial color style, before animation
    connector.style.strokeColor =
      connector.targetDecorator.style.strokeColor =
      connector.targetDecorator.style.fill =
      this.connectorBeforeAnimationColor;

    // connector annotation, that will be animated during the workflow animation
    connector.annotations = [
      {
        content: "",
        height: 16,
        width: 16,
        offset: 0,
        style: { fill: "transparent", fontSize: 24 },
      },
    ];
    return connector;
  }

  // User handles
  public selectedItems = {
    userHandles: [
      {
        name: 'delete',
        pathData:
          'M0.97,3.04 L12.78,3.04 L12.78,12.21 C12.78,12.64,12.59,13,12.2,13.3 C11.82,13.6,11.35,13.75,10.8,13.75 L2.95,13.75 C2.4,13.75,1.93,13.6,1.55,13.3 C1.16,13,0.97,12.64,0.97,12.21 Z M4.43,0 L9.32,0 L10.34,0.75 L13.75,0.75 L13.75,2.29 L0,2.29 L0,0.75 L3.41,0.75 Z',
        tooltip: { content: 'Delete Node' },
        side: 'Bottom',
        offset: 0.5,
        margin: { bottom: 5 },
        disableConnectors: true,
      },
      {
        name: 'drawConnector',
        pathData:
          'M6.09,0 L13.75,6.88 L6.09,13.75 L6.09,9.64 L0,9.64 L0,4.11 L6.09,4.11 Z',
        tooltip: { content: 'Draw Connector' },
        side: 'Right',
        offset: 0.5,
        margin: { right: 5 },
        disableConnectors: true,
      },
      {
        name: 'stopAnimation',
        pathData: 'M4.75,0.75 L9.25,0.75 L9.25,9.25 L4.75,9.25 Z',
        tooltip: { content: 'Enable Animation' },
        disableNodes: true,
      },
    ] as UserHandleModel[],
  };

  public onCreated(): void {
    this.diagram.fitToPage();
  }

  // Dynamically updates the stopAnimation user handle icon and tooltip based on the selected connector's state
  public onSelectionChange(args: any): void {
    if (args.state !== "Changed") return;
    const connector = this.diagram.selectedItems.connectors[0];
    let handle = null;
    for (let i = 0; i < this.diagram.selectedItems.userHandles.length; i++) {
      if (this.diagram.selectedItems.userHandles[i].name === "stopAnimation") {
        handle = this.diagram.selectedItems.userHandles[i];
        break;
      }
    }
    if (connector && handle) {
      const isStopped =
        (connector.addInfo as any) && (connector.addInfo as any).stopAnimation === true;

      handle.pathData = isStopped
        ? "M2,0 L10,8 L2,16 L2,0 Z" // Play icon (start animation)
        : "M5.25,1.25 L8.75,1.25 L8.75,8.75 L5.25,8.75 Z"; // Stop icon

      handle.tooltip.content = isStopped
        ? "Enable Animation"
        : "Disable Animation";

      handle.visible = true;
    } else if (handle) {
      handle.visible = false;
    }
  }

  // User handle functionality
  public onUserHandleMouseDown(args: any): void {
    const handleName = args.element.name;

    switch (handleName) {
      case 'delete':
        this.diagram.remove(this.diagram.selectedItems.nodes[0]);
        break;

      case 'drawConnector':
        const sourceNode = this.diagram.selectedItems.nodes[0];
        if (!sourceNode) return;
        this.diagram.drawingObject = { type: 'Straight', sourceID: sourceNode.id };
        this.diagram.tool = DiagramTools.DrawOnce;
        break;

      case 'stopAnimation':
        const connector = this.diagram.selectedItems.connectors[0];
        if (connector) {
          if (!connector.addInfo) (connector.addInfo as any) = {};
          (connector.addInfo as any).stopAnimation = !(connector.addInfo as any).stopAnimation;

          // Update path and tooltip
          const handle = this.diagram.selectedItems.userHandles.find((h: any) => h.name === 'stopAnimation');
          if (handle) {
            const isStopped = (connector.addInfo as any).stopAnimation;

            handle.pathData = isStopped
              ? 'M2,0 L10,8 L2,16 L2,0 Z'  // Play icon
              : 'M4.75,0.75 L9.25,0.75 L9.25,9.25 L4.75,9.25 Z';  // Stop icon

            handle.tooltip.content = isStopped ? 'Enable Animation' : 'Disable Animation';
          }
        }
        break;
    }
  }

  // Workflow animation
  public startWorkflow() {
    // PAUSE state if running
    if (!this.isPaused && this.animationIntervals.length) {
      this.isPaused = true;
      this.updateExecuteButton("Resume");
      this.clearAnimationIntervals();
      return;
    }

    // RESUME state if paused
    if (this.isPaused) {
      this.isPaused = false;
      this.updateExecuteButton("Pause");
      this.resumeWorkflow();
      return;
    }

    // EXECUTE state to start from start
    this.isPaused = false;
    this.resetWorkflow();
    this.updateExecuteButton("Pause");

    // find the "start" nodes in the diagram, as animation only works from "start" nodes
    const startNodes = this.diagram.nodes.filter((node: any) => {
      return (
        node.shape &&
        node.shape.type === "Bpmn" &&
        node.shape.shape === "Event" &&
        node.shape.event.event === "Start"
      );
    });

    if (startNodes.length === 0) {
      console.error("No start nodes found.");
      return;
    }

    startNodes.forEach((startNode: any) => {
      this.animateNode(startNode.id);
    });
  }

  // Resume Workflow animation from the last paused state
  public resumeWorkflow() {
    this.diagram.connectors.forEach((connector: any) => {
      // Retrieve the last annotation of the connector
      const lastAnn = connector.annotations[connector.annotations.length - 1];
      // Check if the annotation offset is within the animation range
      if (lastAnn && lastAnn.offset > 0 && lastAnn.offset < 0.9) {
        // Restore the annotations that need to be visible
        lastAnn.content = "●";
        if (lastAnn.style) lastAnn.style.color = this.connectorAnnotationColor;

        // Get the source node of the connector and check if it s a start event node
        const sourceNode = this.diagram.getObject(connector.sourceID);
        const isStartNode =
          sourceNode &&
          (sourceNode as any).shape &&
          (sourceNode as any).shape.type === "Bpmn" &&
          (sourceNode as any).shape.shape === "Event" &&
          (sourceNode as any).shape.event &&
          (sourceNode as any).shape.event.event === "Start";

        // If the source node is a start node or already completed node, continue the animation
        if (
          isStartNode ||
          (sourceNode && (sourceNode as any).style.strokeColor === this.nodeStrokeAfterAnimationColor)
        ) {
          // Animate the connector and the target node
          this.animateConnector(connector, (targetId: string) => {
            const targetNode = this.diagram.getObject(targetId);
            if (targetNode) {
              this.createLoadingAnimation(targetNode);
              setTimeout(() => {
                this.completeNodeAnimation(targetNode);
                this.animateNode(targetId);
              }, 1000);
            }
          });
        }
      }
    });
  }

  // Function to animate a node and its connected nodes
  public animateNode(nodeId: string): void {
    // Filter connectors originating from the node
    const currentConnectors = this.diagram.connectors.filter((conn: any) => conn.sourceID === nodeId);
    currentConnectors.forEach((connector: any) => {
      // Check if additional info contains "stopAnimation"
      if (!(connector.addInfo && connector.addInfo.stopAnimation === true)) {
        this.animateConnector(connector, (targetNodeId: string) => {
          const targetNode = this.diagram.getObject(targetNodeId);
          // Start loading animation for the target node
          if (targetNode) {
            this.createLoadingAnimation(targetNode);
            // Hide all loading indicators
            this.flowTimeOut1 = setTimeout(() => {
              document.querySelectorAll(".Diagram-loading-indicator").forEach((el: any) => el.style.display = "none");
              document.querySelectorAll(".Diagramtick").forEach((el: any) => el.style.display = "block");
              (targetNode as any).style.strokeColor = this.nodeStrokeAfterAnimationColor;
              this.diagram.dataBind();
              // Check if the target node is a BPMN "End" event node
              if ((targetNode as any).shape && (targetNode as any).shape.type === "Bpmn" && (targetNode as any).shape.shape === "Event" && (targetNode as any).shape.event && (targetNode as any).shape.event.event === "End") {
                // Reset toolbar for new execution
                this.updateExecuteButton("Execute");
                this.animationIntervals.length = 0;
              } else {
                // Recursively animate connected nodes
                this.animateNode(targetNodeId);
              }
            }, 1000);
          }
        });
      }
    });
  }

  // Function to animate a connector and execute a callback upon completion
  public animateConnector(connector: any, callback: Function): void {
    const lastAnn = connector.annotations[connector.annotations.length - 1];
    lastAnn.offset = lastAnn.offset || 0.02; // Initialize or set the offset
    lastAnn.content = "●"; // Set visual marker, to show the flow
    lastAnn.style.color = this.connectorAnnotationColor; // Set annotation marker color
    this.diagram.dataBind();
    // Start interval to animate the connector
    const flowInterval = setInterval(() => {
      if (this.isPaused) {
        return; // Pause animation if the workflow is paused
      }
      // Continue animation if the offset hasn't reached the end
      if (lastAnn.offset < 0.9) {
        lastAnn.offset += 0.025;
        connector.style.strokeColor = connector.targetDecorator.style.strokeColor = connector.targetDecorator.style.fill = this.connectorDuringAnimationColor; // Change color during animation
        this.diagram.dataBind();
      } else {
        // Animation complete, clean up and execute the callback
        clearInterval(flowInterval);
        lastAnn.style.color = "transparent";
        connector.style.strokeColor = connector.targetDecorator.style.strokeColor = connector.targetDecorator.style.fill = this.connectorAfterAnimationColor; // Set after animation color for connector
        this.diagram.dataBind();
        callback(connector.targetID); // Execute callback with target node ID
      }
    }, 120); // Interval of 120ms for the animation steps

    // Add the interval to the list of active animations
    this.animationIntervals.push(flowInterval);
  }

  // Function to create and add a loading animation annotation to a node
  public createLoadingAnimation(targetNode: any): void {
    if (!targetNode || !targetNode.annotations) {
      return;
    }
    // HTML template for the loading animation and a hidden tick indicator
    const htmlTemplate = '<div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; margin-left: -3px; margin-top: -3px;"><div class="Diagram-loading-indicator"></div><div class="Diagramtick" style="display: none;"><i class="e-icons e-check"></i></div></div>';
    // adding annotation with the template to the node
    const annotation: any = {
      template: htmlTemplate,
      offset: { x: 0, y: 0 },
      verticalAlignment: "Top",
      horizontalAlignment: "Left",
      style: { fill: "transparent" }
    };
    this.diagram.addLabels(targetNode, [annotation]);
  }

  // Function to show complete status for the given node
  public completeNodeAnimation(node: any): void {
    // Hide all loading indicators
    document.querySelectorAll(".Diagram-loading-indicator").forEach((el: any) => el.style.display = "none");
    // Display all tick elements as visible
    document.querySelectorAll(".Diagramtick").forEach((el: any) => el.style.display = "block");
    // Update the stroke color for the node to indicate completion
    if (node.style) {
      node.style.strokeColor = this.nodeStrokeAfterAnimationColor;
    }
    // Update the diagram to reflect changes
    this.diagram.dataBind();
  }

  public resetWorkflow(): void {
    // Set pause state to false
    this.isPaused = false;
    // clear any existing timeouts
    clearTimeout(this.flowTimeOut1);
    clearTimeout(this.flowTimeOut2);
    // Clear any running animation intervals
    this.clearAnimationIntervals();
    // Remove all custom animations and tick indicators
    document.querySelectorAll(".Diagram-loading-indicator, .Diagramtick").forEach((el: any) => el.remove());
    // Restore all nodes to their default styles
    this.diagram.nodes.forEach((node: any) => {
      if (node.style) node.style.strokeColor = this.nodeStrokeBeforeAnimationColor;
    });
    // Restore all connectors to their default styles
    this.diagram.connectors.forEach((connector: any) => {
      connector.style.strokeColor = connector.targetDecorator.style.strokeColor = connector.targetDecorator.style.fill = this.connectorBeforeAnimationColor;
      // Reset connector annotations to initial state
      connector.annotations.forEach((ann: any) => {
        ann.offset = 0;
        ann.content = "";
        ann.style.color = this.connectorAnnotationColor;
      });
    });
    this.diagram.dataBind();
  }

  // Function to clear all active animation intervals
  public clearAnimationIntervals() {
    // Stop all timers stored in animationIntervals
    this.animationIntervals.forEach(clearInterval);
    // Reset the array to remove all interval references
    this.animationIntervals.length = 0;
  }

  // Hidden file input for opening json files
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const json = JSON.parse(e.target!.result as string);
        this.diagram.loadDiagram(json);
        this.updateExecuteButton('Execute');
        this.clearAnimationIntervals();
        this.diagram.tool = DiagramTools.ZoomPan;
      } catch (err) {
        console.error('Invalid JSON file', err);
      } finally {
        input.value = ''; // Clear file input
      }
       this.diagram.fitToPage();
    };
    reader.readAsText(file);
  }

  // Update the execute button's text and tooltip based on the workflow state
  public updateExecuteButton(state: 'Execute' | 'Pause' | 'Resume'): void {
    const btn = this.toolbar.items[4];
    const states = {
      Pause: {
        id: "Pause",
        text: "Pause",
        tooltipText: "Pause Workflow",
        prefixIcon: "e-icons e-pause",
      },
      Resume: {
        id: "Resume",
        text: "Resume",
        tooltipText: "Resume Workflow",
        prefixIcon: "e-icons e-play",
      },
      Execute: {
        id: "Execute",
        text: "Execute",
        tooltipText: "Start Workflow",
        prefixIcon: "e-icons e-play",
      },
    };
    Object.assign(btn, states[state] || states.Execute);
  }

  public onToolbarClick(args: any): void {
    const diagram = this.diagram;

    switch (args.item.id) {
      case 'New':
        this.updateExecuteButton('Execute');
        this.clearAnimationIntervals();
        diagram.clear();
        break;
      case 'Open':
        this.fileInput.nativeElement.click();
        break;
      case 'Save':
        this.saveDiagram();
        break;
      case 'Execute':
      case 'Pause':
      case 'Resume':
        diagram.clearSelection();
        this.startWorkflow();
        break;
      case 'Reset':
        this.resetWorkflow();
        this.updateExecuteButton('Execute');
        break;
      case 'Delete':
        diagram.remove();
        break;
      case 'Select':
        diagram.tool = DiagramTools.MultipleSelect;
        break;
      case 'Pan':
        diagram.tool = DiagramTools.ZoomPan;
        break;
    }
  }

  // save the current diagram in json format
  public saveDiagram(): void {
    const jsonData = this.diagram.saveDiagram();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Diagram.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // SYMBOL PALETTE
  public palettes = [
    {
      id: 'BPMN',
      expanded: true,
      symbols: [
        {
          id: 'Start',
          shape: { type: 'Bpmn', shape: 'Event' },
          annotations: [{ content: 'Start' }],
          tooltip: { content: 'Start', relativeMode: 'Object' },
          constraints: NodeConstraints.Default | NodeConstraints.Tooltip
        },
        {
          id: 'Decision',
          shape: { type: 'Bpmn', shape: 'Gateway' },
          annotations: [{ content: 'Decision' }],
          tooltip: { content: 'Decision', relativeMode: 'Object' },
          constraints: NodeConstraints.Default | NodeConstraints.Tooltip
        },
        {
          id: 'Task',
          shape: { type: 'Bpmn', shape: 'Activity' },
          annotations: [{ content: 'Task' }],
          tooltip: { content: 'Task', relativeMode: 'Object' },
          constraints: NodeConstraints.Default | NodeConstraints.Tooltip
        },
        {
          id: 'End',
          shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'None' } },
          annotations: [{ content: 'End' }],
          tooltip: { content: 'End', relativeMode: 'Object' },
          constraints: NodeConstraints.Default | NodeConstraints.Tooltip
        }
      ],
      iconCss: ''
    }
  ];

  public getSymbolInfo(symbol: NodeModel): SymbolInfo {
    return { fit: true };
  }
  public onPaletteExpanding(args: any) {
    args.cancel = true;
  }

  // function to enable or disable tool bar buttons based on editing mode
  public applyModeState(isEditMode: boolean): void {
    const buttonsToToggle = ['Select', 'Delete', 'Save'];
    if (this.toolbar) {
      this.toolbar.items.forEach((item) => {
        if (buttonsToToggle.includes(item.id)) {
          item.disabled = !isEditMode;
        }
      });

      // Hide last separator in toolbar if palette is hidden
      const lastSepIndex = this.toolbar.items.findIndex((item, idx) => item.type === 'Separator' && idx > 7);
      if (lastSepIndex !== -1) {
        this.toolbar.items[lastSepIndex].visible = isEditMode;
      }

      // Show/hide stencil palette
      const paletteEl = document.getElementById("symbolPalette");
      if (paletteEl) {
        paletteEl.style.display = isEditMode ? 'flex' : 'none';
      }
      this.diagram.tool = isEditMode ? DiagramTools.MultipleSelect : DiagramTools.ZoomPan;
    }
  }
  public onToggleChange(args: any): void {
    this.isEditMode = args.checked;
    this.applyModeState(this.isEditMode);
    this.tooltipContent = this.isEditMode ? 'Disable Editing' : 'Enable Editing';
  }


}