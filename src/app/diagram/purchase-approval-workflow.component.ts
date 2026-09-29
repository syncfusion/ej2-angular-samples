import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ConnectorConstraints,
  ConnectorModel,
  DiagramComponent,
  DiagramModule,
  DiagramTools,
  NodeConstraints,
  NodeModel,
  PortVisibility,
  ISelectionChangeEventArgs,
  UserHandleEventsArgs,
  UserHandleModel,
} from "@syncfusion/ej2-angular-diagrams";
import { SBActionDescriptionComponent } from "../common/adp.component";
import { SBDescriptionComponent } from "../common/dp.component";

type Stage = "draft" | "manager" | "purchase" | "completed" | "rejected";
type Status =
  "draft" | "waiting" | "active" | "approved" | "completed" | "rejected";
type NodeType = "request" | "manager" | "budget" | "purchase" | "result";
type ConnectorStatus = "default" | "active" | "completed" | "rejected";
type RejectionReason = "budget" | "manager" | undefined;

interface RequestData {
  item: string;
  requester: string;
  reason: string;
  quantity: number;
  unitPrice: number;
  budget: number;
}

interface NodeInfo {
  type: NodeType;
  title: string;
  status: Status;
  statusText: string;
  primaryLabel: string;
  primaryValue: string;
  secondaryLabel: string;
  secondaryValue: string;
  message: string;
}

interface NoteInfo {
  text: string;
  status: Status;
}

/** Purchase approval workflow sample. */
@Component({
  selector: "control-content",
  templateUrl: "purchase-approval-workflow.html",
  styleUrls: ["diagram-style.css"],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    DiagramModule,
    SBActionDescriptionComponent,
    SBDescriptionComponent,
  ],
})
export class PurchaseApprovalWorkflowDiagramComponent implements OnDestroy {
  @ViewChild("diagram") public diagram!: DiagramComponent;

  public request: RequestData = this.createDefaultRequest();
  public stage: Stage = "draft";
  public rejectionReason: RejectionReason;
  public inputsDisabled: boolean = false;
  public submitDisabled: boolean = false;
  public resetDisabled: boolean = true;
  public validationMessage: string = "";
  public workflowMessage: string =
    "Enter the request details, then submit it for manager approval.";

  public tool: DiagramTools = DiagramTools.SingleSelect | DiagramTools.ZoomPan;
  public snapSettings: object = { gridType: "Dots" };

  private runToken: number = 0;
  private pendingTimer: ReturnType<typeof setTimeout> | undefined;
  private actionLocked: boolean = false;
  private diagramReady: boolean = false;

  private readonly money: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  private readonly statusLabels: Record<Status, string> = {
    draft: "Draft",
    waiting: "Waiting",
    active: "Action required",
    approved: "Approved",
    completed: "Completed",
    rejected: "Rejected",
  };

  /**
   * Data displayed by the Angular templates.
   *
   * EJ2 passes each node or annotation to the ng-template. The template uses
   * only its ID to read the matching value from these maps. Because these maps
   * belong to this Angular component, normal Angular change detection updates
   * the already-rendered template whenever a map entry is replaced.
   */
  public nodeViewModels: Record<string, NodeInfo> = {};
  public annotationViewModels: Record<string, NoteInfo> = {};

  private readonly connectorIds: string[] = [
    "request-budget",
    "budget-manager",
    "manager-purchase",
    "purchase-result",
    "manager-result",
    "budget-result",
  ];

  /** User handles are initialized before the Diagram renders. */
  public selectedItems: { userHandles: UserHandleModel[] } = {
    userHandles: [
      {
        name: "approve",
        side: "Bottom",
        offset: 0.32,
        size: 36,
        margin: { bottom: 13 },
        visible: false,
        tooltip: { content: "Approve request" },
        disableConnectors: true,
      },
      {
        name: "reject",
        side: "Bottom",
        offset: 0.68,
        size: 36,
        margin: { bottom: 13 },
        visible: false,
        tooltip: { content: "Reject request" },
        disableConnectors: true,
      },
    ],
  };

  /**
   * Diagram models used to create the workflow.
   * createNode also prepares the corresponding Angular template data before
   * the Diagram renders for the first time.
   */
  public nodes: NodeModel[] = [
    this.createNode("request", 100, 100, "request", "Equipment request"),
    this.createNode("manager", 100, 300, "manager", "Manager review"),
    this.createNode("budget", 300, 100, "budget", "Budget check"),
    this.createNode("purchase", 300, 300, "purchase", "Purchase order"),
    this.createNode("result", 510, 200, "result", "Request outcome"),
  ];

  public connectors: ConnectorModel[] = [
    this.createConnector(
      "request-budget",
      "request",
      "budget",
      "request-right",
      "budget-left",
    ),
    this.createConnector(
      "budget-manager",
      "budget",
      "manager",
      "budget-bottom",
      "manager-left",
    ),
    this.createConnector(
      "manager-purchase",
      "manager",
      "purchase",
      "manager-right",
      "purchase-left",
    ),
    this.createConnector("purchase-result", "purchase", "result"),
    this.createConnector(
      "manager-result",
      "manager",
      "result",
      "manager-bottom",
      "result-bottom",
    ),
    this.createConnector(
      "budget-result",
      "budget",
      "result",
      "budget-right",
      "result-left",
    ),
  ];

  public constructor(private readonly changeDetector: ChangeDetectorRef) {}

  public getNodeDefaults: (node: NodeModel) => NodeModel = (
    node: NodeModel,
  ): NodeModel => {
    node.constraints =
      NodeConstraints.Default &
      ~(NodeConstraints.Resize | NodeConstraints.Rotate | NodeConstraints.Drag);
    return node;
  };

  private createDefaultRequest(): RequestData {
    return {
      item: "Ergonomic monitors",
      requester: "Maya Chen",
      reason: "Replace outdated design-team displays",
      quantity: 6,
      unitPrice: 420,
      budget: 5000,
    };
  }

  /** Returns complete non-null content for the initial Angular template render. */
  private initialNodeDetails(
    type: NodeType,
  ): Pick<
    NodeInfo,
    | "primaryLabel"
    | "primaryValue"
    | "secondaryLabel"
    | "secondaryValue"
    | "message"
  > {
    const request: RequestData = this.createDefaultRequest();
    const amount: number = request.quantity * request.unitPrice;

    const details: Record<
      NodeType,
      Pick<
        NodeInfo,
        | "primaryLabel"
        | "primaryValue"
        | "secondaryLabel"
        | "secondaryValue"
        | "message"
      >
    > = {
      request: {
        primaryLabel: "Item",
        primaryValue: request.item,
        secondaryLabel: "Total",
        secondaryValue: this.money.format(amount),
        message: `${request.quantity} × ${this.money.format(request.unitPrice)}`,
      },
      manager: {
        primaryLabel: "Requested by",
        primaryValue: request.requester,
        secondaryLabel: "Amount",
        secondaryValue: this.money.format(amount),
        message: request.reason,
      },
      budget: {
        primaryLabel: "Available",
        primaryValue: this.money.format(request.budget),
        secondaryLabel: "Requested",
        secondaryValue: this.money.format(amount),
        message: "Within available budget",
      },
      purchase: {
        primaryLabel: "Quantity",
        primaryValue: String(request.quantity),
        secondaryLabel: "Order value",
        secondaryValue: this.money.format(amount),
        message: "Created after all approvals",
      },
      result: {
        primaryLabel: "Outcome",
        primaryValue: "Pending",
        secondaryLabel: "Status",
        secondaryValue: "Waiting",
        message: "Waiting for workflow completion",
      },
    };

    return details[type];
  }

  private createNodeInfo(type: NodeType, title: string): NodeInfo {
    const status: Status = type === "request" ? "draft" : "waiting";
    return {
      type,
      title,
      status,
      statusText: this.statusLabels[status],
      ...this.initialNodeDetails(type),
    };
  }

  /**
   * Returns the display model for a node template.
   *
   * HTML usage: nodeView(data.id)
   * The fallback keeps the template safe while the Diagram is being created.
   */
  public nodeView(id: string | undefined): NodeInfo {
    if (id && this.nodeViewModels[id]) {
      return this.nodeViewModels[id];
    }

    return {
      type: "request",
      title: "",
      status: "waiting",
      statusText: "Waiting",
      primaryLabel: "",
      primaryValue: "",
      secondaryLabel: "",
      secondaryValue: "",
      message: "",
    };
  }

  /**
   * Returns the display model for a status annotation template.
   *
   * HTML usage: annotationView(data.id)
   */
  public annotationView(annotationId: string | undefined): NoteInfo {
    if (annotationId && this.annotationViewModels[annotationId]) {
      return this.annotationViewModels[annotationId];
    }

    return { text: "Waiting", status: "waiting" };
  }

  private createNode(
    id: string,
    x: number,
    y: number,
    type: NodeType,
    title: string,
  ): NodeModel {
    const status: Status = type === "request" ? "draft" : "waiting";
    const info: NodeInfo = this.createNodeInfo(type, title);
    const noteInfo: NoteInfo = {
      text: this.statusLabels[status],
      status,
    };

    this.nodeViewModels[id] = { ...info };
    this.annotationViewModels[`${id}-status`] = { ...noteInfo };

    return {
      id,
      offsetX: x,
      offsetY: y,
      width: 160,
      height: type === "result" ? 140 : 135,
      shape: { type: "HTML" },
      style: { fill: "transparent", strokeColor: "transparent" },
      addInfo: { ...info },
      ports: [
        {
          id: `${id}-left`,
          offset: { x: 0, y: 0.5 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: `${id}-right`,
          offset: { x: 1, y: 0.5 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: `${id}-top`,
          offset: { x: 0.5, y: 0 },
          visibility: PortVisibility.Hidden,
        },
        {
          id: `${id}-bottom`,
          offset: { x: 0.5, y: 1 },
          visibility: PortVisibility.Hidden,
        },
      ],
      annotations: [
        {
          id: `${id}-status`,
          annotationType: "Template",
          content: "",
          offset: { x: 0.5, y: -0.11 },
          width: 85,
          height: 26,
          addInfo: { ...noteInfo },
        },
      ],
    };
  }

  private createConnector(
    id: string,
    sourceID: string,
    targetID: string,
    sourcePortID: string = `${sourceID}-right`,
    targetPortID: string = `${targetID}-left`,
  ): ConnectorModel {
    return {
      id,
      sourceID,
      targetID,
      sourcePortID,
      targetPortID,
      type: "Orthogonal",
      cornerRadius: 12,
      constraints: ConnectorConstraints.Default & ~ConnectorConstraints.Select,
      style: { strokeColor: "#94a3b8", strokeWidth: 1.6 },
      targetDecorator: {
        shape: "Arrow",
        width: 9,
        height: 9,
        style: { fill: "#94a3b8", strokeColor: "#94a3b8" },
      },
    };
  }

  public created(): void {
    this.diagramReady = true;
    this.diagram.zoomTo({ zoomFactor: 0.45 });
    this.diagram.fitToPage();
    this.refreshAllContent();
    this.diagram.select([this.getNode("request")]);
    this.updateManagerHandles();

    window.setTimeout((): void => {
      if (this.diagramReady) {
        this.detectTemplateChanges();
      }
    }, 0);
  }

  public selectionChange(_args?: ISelectionChangeEventArgs): void {
    window.setTimeout((): void => this.updateManagerHandles(), 0);
  }

  public onUserHandleMouseDown(args: UserHandleEventsArgs): void {
    this.handleManagerDecision(
      args.element && args.element.name ? args.element.name : "",
    );
  }

  private getNode(id: string): NodeModel {
    return this.diagram.getObject(id) as NodeModel;
  }

  /**
   * Applies display changes to one node.
   *
   * A new map and a new node object are created instead of changing the old
   * object in place. This makes the state change clear to Angular and allows
   * the node ng-template to update through Angular change detection.
   *
   * detectChanges is false when several nodes are updated together. The caller
   * can then run one change-detection pass after all updates are complete.
   */
  private setNode(
    id: string,
    changes: Partial<NodeInfo>,
    detectChanges: boolean = true,
  ): void {
    const currentNodeView: NodeInfo | undefined = this.nodeViewModels[id];
    if (!currentNodeView) {
      return;
    }

    const defaults: NodeInfo = this.createNodeInfo(
      currentNodeView.type,
      currentNodeView.title,
    );
    const updatedNodeView: NodeInfo = {
      ...defaults,
      ...currentNodeView,
      ...changes,
    };
    const record: Record<string, unknown> =
      updatedNodeView as unknown as Record<string, unknown>;

    Object.keys(record).forEach((key: string): void => {
      if (record[key] === null || record[key] === undefined) {
        record[key] = "";
      }
    });

    this.nodeViewModels = {
      ...this.nodeViewModels,
      [id]: updatedNodeView,
    };

    // Keep addInfo synchronized only as metadata. The template does not bind to it.
    if (this.diagramReady) {
      const node: NodeModel = this.getNode(id);
      if (node) {
        node.addInfo = { ...updatedNodeView };
      }
    }

    if (detectChanges) {
      this.detectTemplateChanges();
    }
  }

  /**
   * Updates the status shown in both the node card and its status annotation.
   * Both Angular view models are changed first, followed by one change-detection
   * pass so the two visual elements update together.
   */
  private setStatus(
    id: string,
    status: Status,
    text: string = this.statusLabels[status],
  ): void {
    const displayedStatusText: string = text || this.statusLabels[status];

    this.setNode(id, { status, statusText: displayedStatusText }, false);

    const annotationId: string = `${id}-status`;
    const updatedAnnotationView: NoteInfo = {
      text: displayedStatusText,
      status,
    };

    this.annotationViewModels = {
      ...this.annotationViewModels,
      [annotationId]: updatedAnnotationView,
    };

    // Keep annotation addInfo synchronized only as metadata.
    if (this.diagramReady) {
      const node: NodeModel = this.getNode(id);
      const note = node.annotations?.find(
        (annotation) => annotation.id === annotationId,
      );
      if (note) {
        note.addInfo = { ...updatedAnnotationView };
      }
    }

    this.detectTemplateChanges();
  }

  /**
   * Requests an immediate Angular view update for Diagram ng-template content.
   * This is Angular framework change detection. It does not rebuild Diagram
   * nodes and does not assign HTML strings.
   */
  private detectTemplateChanges(): void {
    if (!this.diagramReady) {
      return;
    }
    this.changeDetector.detectChanges();
  }

  private setConnector(id: string, status: ConnectorStatus): void {
    const connector: ConnectorModel = this.diagram.getObject(
      id,
    ) as ConnectorModel;
    const color: string =
      status === "active"
        ? "#4f46e5"
        : status === "completed"
          ? "#059669"
          : status === "rejected"
            ? "#dc2626"
            : "#94a3b8";

    connector.style = {
      strokeColor: color,
      strokeWidth: status === "default" ? 1.6 : 2.2,
    };

    if (connector.targetDecorator && connector.targetDecorator.style) {
      connector.targetDecorator.style.fill = color;
      connector.targetDecorator.style.strokeColor = color;
    }

    // Connector rendering is EJ2-owned, so dataBind is still appropriate here.
    this.diagram.dataBind();
  }

  private total(): number {
    const quantity: number = Number.isFinite(this.request.quantity)
      ? this.request.quantity
      : 0;
    const unitPrice: number = Number.isFinite(this.request.unitPrice)
      ? this.request.unitPrice
      : 0;
    return quantity * unitPrice;
  }

  /**
   * Recalculates the text shown in every workflow card from the current form
   * values and workflow state. Individual updates skip change detection so one
   * final pass refreshes all Angular templates together.
   */
  private refreshAllContent(): void {
    if (!this.diagramReady) {
      return;
    }
    const amount: number = this.total();

    this.setNode(
      "request",
      {
        primaryLabel: "Item",
        primaryValue: this.request.item || "Not entered",
        secondaryLabel: "Total",
        secondaryValue: this.money.format(amount),
        message: `${this.request.quantity || 0} × ${this.money.format(this.request.unitPrice || 0)}`,
      },
      false,
    );

    this.setNode(
      "manager",
      {
        primaryLabel: "Requested by",
        primaryValue: this.request.requester || "Not entered",
        secondaryLabel: "Amount",
        secondaryValue: this.money.format(amount),
        message: this.request.reason || "No business reason provided",
      },
      false,
    );

    this.setNode(
      "budget",
      {
        primaryLabel: "Available",
        primaryValue: this.money.format(this.request.budget),
        secondaryLabel: "Requested",
        secondaryValue: this.money.format(amount),
        message:
          amount <= this.request.budget
            ? "Within available budget"
            : "Budget limit exceeded",
      },
      false,
    );

    this.setNode(
      "purchase",
      {
        primaryLabel: "Quantity",
        primaryValue: String(this.request.quantity || 0),
        secondaryLabel: "Order value",
        secondaryValue: this.money.format(amount),
        message: "Created after all approvals",
      },
      false,
    );

    this.setNode(
      "result",
      {
        primaryLabel: "Outcome",
        primaryValue:
          this.stage === "completed"
            ? "Purchase successful"
            : this.stage === "rejected"
              ? "Purchase rejected"
              : "Pending",
        secondaryLabel: "Status",
        secondaryValue:
          this.stage === "completed"
            ? "Completed"
            : this.stage === "rejected"
              ? "Rejected"
              : "Waiting",
        message:
          this.stage === "completed"
            ? `${this.request.quantity} items approved for ${this.money.format(amount)}`
            : this.rejectionReason === "budget"
              ? "The request exceeds the available budget"
              : this.rejectionReason === "manager"
                ? "The request was declined by the manager"
                : "Waiting for workflow completion",
      },
      false,
    );

    this.detectTemplateChanges();
  }

  public updateTextField(
    field: "item" | "requester" | "reason",
    event: Event,
  ): void {
    this.request[field] = (
      event.target as HTMLInputElement | HTMLTextAreaElement
    ).value;
    this.validationMessage = "";
    this.refreshAllContent();
  }

  public updateNumberField(
    field: "quantity" | "unitPrice",
    event: Event,
  ): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.request[field] = value === "" ? Number.NaN : Number(value);
    this.validationMessage = "";
    this.refreshAllContent();
  }

  private validateRequest(): string[] {
    const errors: string[] = [];
    if (!this.request.item.trim()) {
      errors.push("Enter an equipment name.");
    }
    if (!this.request.requester.trim()) {
      errors.push("Enter a requester name.");
    }
    if (!this.request.reason.trim()) {
      errors.push("Enter a business reason.");
    }
    if (!Number.isFinite(this.request.quantity) || this.request.quantity < 1) {
      errors.push("Quantity must be at least 1.");
    }
    if (
      !Number.isFinite(this.request.unitPrice) ||
      this.request.unitPrice <= 0
    ) {
      errors.push("Unit price must be greater than 0.");
    }
    return errors;
  }

  private clearPendingWork(): void {
    this.runToken++;
    if (this.pendingTimer !== undefined) {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = undefined;
    }
    this.actionLocked = false;
  }

  private delay(ms: number, token: number): Promise<boolean> {
    return new Promise<boolean>((resolve: (value: boolean) => void): void => {
      this.pendingTimer = setTimeout((): void => {
        this.pendingTimer = undefined;
        resolve(token === this.runToken);
      }, ms);
    });
  }

  private updateManagerHandles(): void {
    if (!this.diagram || !this.diagram.selectedItems) {
      return;
    }
    const selected: NodeModel | undefined = this.diagram.selectedItems.nodes
      ? this.diagram.selectedItems.nodes[0]
      : undefined;
    const show: boolean = Boolean(
      selected &&
      selected.id === "manager" &&
      this.stage === "manager" &&
      !this.actionLocked,
    );

    (this.diagram.selectedItems.userHandles || []).forEach(
      (handle: UserHandleModel): void => {
        handle.visible = show;
      },
    );
    this.diagram.dataBind();
  }

  public async submitRequest(): Promise<void> {
    if (!this.diagramReady) {
      this.workflowMessage =
        "The workflow diagram is still loading. Please try again.";
      return;
    }

    const errors: string[] = this.validateRequest();
    this.validationMessage = errors.join(" ");
    if (errors.length) {
      return;
    }

    this.clearPendingWork();
    this.inputsDisabled = true;
    this.submitDisabled = true;
    this.resetDisabled = false;
    this.setStatus("request", "approved", "Submitted");
    this.setConnector("request-budget", "active");
    this.setStatus("budget", "active", "Checking budget");
    this.workflowMessage =
      "Checking the available budget before requesting manager approval…";

    const token: number = ++this.runToken;
    if (!(await this.delay(700, token))) {
      return;
    }

    if (this.total() > this.request.budget) {
      this.stage = "rejected";
      this.rejectionReason = "budget";
      this.setStatus("budget", "rejected", "Insufficient budget");
      this.setConnector("request-budget", "rejected");
      this.setConnector("budget-result", "rejected");
      this.setStatus("result", "rejected");
      this.refreshAllContent();
      this.diagram.select([this.getNode("result")]);
      this.workflowMessage =
        "Request rejected because the purchase exceeds the available budget.";
      return;
    }

    this.stage = "manager";
    this.setStatus("budget", "approved", "Budget approved");
    this.setConnector("request-budget", "completed");
    this.setConnector("budget-manager", "active");
    this.setStatus("manager", "active", "Decision required");
    this.diagram.select([this.getNode("manager")]);
    this.updateManagerHandles();
    this.workflowMessage =
      "Budget approved. Manager decision required. Use Approve or Reject below the Manager Review node.";
  }

  private handleManagerDecision(action: string): void {
    if (this.stage !== "manager" || this.actionLocked) {
      return;
    }
    this.actionLocked = true;
    this.updateManagerHandles();
    if (action === "approve") {
      void this.approveRequest();
    } else if (action === "reject") {
      this.rejectRequest();
    }
  }

  private async approveRequest(): Promise<void> {
    const token: number = ++this.runToken;
    this.setStatus("manager", "approved");
    this.setConnector("budget-manager", "completed");
    this.setConnector("manager-purchase", "active");
    this.stage = "purchase";
    this.setStatus("purchase", "active", "Creating order");
    this.workflowMessage = "Budget approved. Creating the purchase order…";

    if (!(await this.delay(800, token))) {
      return;
    }

    this.setStatus("purchase", "completed", "Order created");
    this.setConnector("manager-purchase", "completed");
    this.setConnector("purchase-result", "completed");
    this.stage = "completed";
    this.setStatus("result", "completed", "Successful");
    this.refreshAllContent();
    this.diagram.select([this.getNode("result")]);
    this.workflowMessage =
      "Purchase approved and the order was created successfully.";
    this.actionLocked = false;
  }

  private rejectRequest(): void {
    this.clearPendingWork();
    this.stage = "rejected";
    this.rejectionReason = "manager";
    this.setStatus("manager", "rejected", "Declined");
    this.setConnector("budget-manager", "completed");
    this.setConnector("manager-result", "rejected");
    this.setStatus("result", "rejected");
    this.refreshAllContent();
    this.diagram.select([this.getNode("result")]);
    this.workflowMessage =
      "The manager declined the request. No purchase order was created.";
  }

  public resetWorkflow(): void {
    this.clearPendingWork();
    this.stage = "draft";
    this.rejectionReason = undefined;
    this.inputsDisabled = false;
    this.submitDisabled = false;
    this.resetDisabled = true;
    this.validationMessage = "";
    this.workflowMessage =
      "Enter the request details, then submit it for manager approval.";

    if (!this.diagramReady) {
      return;
    }

    ["request", "manager", "budget", "purchase", "result"].forEach(
      (id: string): void => {
        this.setStatus(id, id === "request" ? "draft" : "waiting");
      },
    );
    this.connectorIds.forEach((id: string): void =>
      this.setConnector(id, "default"),
    );
    this.refreshAllContent();
    this.diagram.select([this.getNode("request")]);
    this.updateManagerHandles();
  }

  public ngOnDestroy(): void {
    this.diagramReady = false;
    this.clearPendingWork();
  }
}
