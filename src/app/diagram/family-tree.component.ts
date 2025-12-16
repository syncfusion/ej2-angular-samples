import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    DiagramComponent, DiagramTools, NodeModel, Connector, ConnectorModel,
    LayoutModel, DataSourceModel, SnapSettingsModel, SnapConstraints,
    IMouseEventArgs, DiagramModule, DataBindingService, ComplexHierarchicalTreeService
} from '@syncfusion/ej2-angular-diagrams';
import { familyTreeData } from './diagram-data';
import { DataManager } from '@syncfusion/ej2-data';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Family Tree Diagram using Complex Hierarchical Layout
 */

type Person = {
    Id: string;
    Name?: string;
    FirstName?: string;
    Tenure?: string;
    Description?: string;
    Type?: string;
    Parents?: string[];
    ImageUrl?: string;
};

interface NodeUIState {
    isOpen?: boolean;
    isDimmed?: boolean;
}

@Component({
    selector: 'control-content',
    templateUrl: 'family-tree.html',
    styleUrls: ['family-tree.component.css'],
    providers: [ComplexHierarchicalTreeService, DataBindingService],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DiagramModule, SBActionDescriptionComponent, SBDescriptionComponent],
})
export class FamilyTreeDiagramsComponent {
    @ViewChild('diagram') public diagram!: DiagramComponent;
    // Configure snap settings for the diagram.
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    // Configure tool
    public tool: DiagramTools = DiagramTools.ZoomPan;

    private readonly NODE_WIDTH = 140;
    private readonly NODE_HEIGHT = 180;
    private readonly HOVER_WIDTH = 320;
    private readonly ORIGINAL_SIZE = new Map<string, { width: number; height: number }>();
    private readonly CONNECTOR_COLORS = {
        baseConnector: '#85736E',
        highlightedConnector: '#723523',
    };

    // Visual state for node
    public nodeState = new Map<string, NodeUIState>();

    private readonly DATA_SOURCE = familyTreeData as Person[];

    public layout: LayoutModel = {
        type: 'ComplexHierarchicalTree',
        orientation: 'TopToBottom',
        horizontalAlignment: 'Center',
        verticalAlignment: 'Top',
        horizontalSpacing: 150,
        verticalSpacing: 50
    };

    public dataSourceSettings: DataSourceModel = {
        id: 'Id',
        parentId: 'Parents',
        dataSource: new DataManager(this.DATA_SOURCE),
        doBinding: (node: NodeModel, raw: Person) => {
            node.id = String(raw.Id);
            node.data = raw;

            // Invisible junction nodes for parent unions
            if (raw.Type === 'Union') {
                node.width = 0;
                node.height = 0;
                node.shape = { type: 'Basic', shape: 'Rectangle' };
                node.style = { fill: 'transparent', strokeColor: 'transparent' };
                node.visible = false;
            } else {
                raw.ImageUrl = `assets/diagram/Images/family-tree/${raw.Name}.png`;
                node.shape = { type: 'HTML' }; // HTML node; content provided by setNodeTemplate
                node.width = this.NODE_WIDTH;
                node.height = this.NODE_HEIGHT;
            }
        }
    };

    public getConnectorDefaults = (connector: ConnectorModel) => {
        connector.type = 'Orthogonal';
        connector.style = { strokeColor: this.CONNECTOR_COLORS.baseConnector, strokeWidth: 2 };
        connector.targetDecorator = { shape: 'None' };
        connector.cornerRadius = 5;
        return connector;
    };

    /* ===================== Relations building ===================== */
    private buildRelations(data: Person[]) {
        const unions = data.filter((d) => d.Type === 'Union');
        const spouseOf = new Map<string, string>();
        const unionOf = new Map<string, [string, string]>();
        const parentsByChild = new Map<string, string[]>();
        const childrenByParent = new Map<string, Set<string>>();

        unions.forEach((u: Person) => {
            const [a, b] = (u.Parents ?? []) as [string, string];
            if (!a || !b) return;
            unionOf.set(u.Id, [a, b]);
            spouseOf.set(a, b);
            spouseOf.set(b, a);
        });

        data.forEach((n: Person) => {
            if (Array.isArray(n.Parents)) {
                parentsByChild.set(n.Id, n.Parents.slice());
                n.Parents.forEach((ref: string) => {
                    const pr = unionOf.get(ref);
                    if (!pr) return;
                    const [pa, pb] = pr;
                    if (!childrenByParent.has(pa)) childrenByParent.set(pa, new Set());
                    if (!childrenByParent.has(pb)) childrenByParent.set(pb, new Set());
                    childrenByParent.get(pa)!.add(n.Id);
                    childrenByParent.get(pb)!.add(n.Id);
                });
            }
        });

        return { spouseOf, unionOf, parentsByChild, childrenByParent };
    };

    private RELATIONS = this.buildRelations(this.DATA_SOURCE);

    private relatedSet(personId: string) {
        const people = new Set<string>([personId]);
        const spouse = this.RELATIONS.spouseOf.get(personId);
        if (spouse) people.add(spouse);

        // parents via unions
        const parentUnions = new Set(this.RELATIONS.parentsByChild.get(personId) ?? []);
        parentUnions.forEach((u) => (this.RELATIONS.unionOf.get(u) ?? []).forEach((p) => people.add(p)));

        // children
        const kids = this.RELATIONS.childrenByParent.get(personId);
        if (kids) kids.forEach((k) => people.add(k));

        // unions tying hovered/spouse to children
        const unions = new Set<string>(parentUnions);
        const spouseOrSelf = new Set([personId, ...(spouse ? [spouse] : [])]);
        (kids ?? new Set<string>()).forEach((childId) => {
            const parents = this.RELATIONS.parentsByChild.get(childId) ?? [];
            parents.forEach((u) => {
                const pair = this.RELATIONS.unionOf.get(u);
                if (pair && (spouseOrSelf.has(pair[0]) || spouseOrSelf.has(pair[1]))) {
                    unions.add(u);
                }
            });
        });

        const nodeSet = new Set<string>(people);
        unions.forEach((u) => nodeSet.add(u));
        return { people, nodeSet };
    };

    /* ===================== Node HTML builder ===================== */

    // Builds the full HTML for the node based on data and state
    private getUpdatedTemplate(data: Person, UI: NodeUIState): string {
        const isOpen = !!UI.isOpen;
        const isDim = !!UI.isDimmed;

        const containerCls = [
            'person-node-container',
            isOpen ? 'is-open' : '',
            isDim ? 'is-dim' : ''
        ].filter(Boolean).join(' ');

        const name = data.Name ?? '';
        const first = data.FirstName ?? '';
        const tenure = data.Tenure ?? '';
        const desc = data.Description ?? '';

        return `
<div class="${containerCls}">
  <div class="person-card">
    <!-- Avatar -->
    <div class="person-image-circle">
      ${data.ImageUrl ? `<img src="${data.ImageUrl}" class="person-image" alt="${name}" />` : ''}
    </div>

    <!-- Header: name + tenure -->
    <div class="person-header">
      <div class="person-full-name">${name}</div>
      <div class="person-first-name">${first}</div>
      <div class="person-tenure">${tenure}</div>
    </div>

    <!-- Bio -->
    <div class="person-bio">${desc}</div>
  </div>
</div>`;
    };

    // HTML node template
    public setNodeTemplate = (node: any) => {
        const data = node.data as Person;
        if (data?.Type === 'Union') return;
        node.shape.content = this.getUpdatedTemplate(data, this.nodeState.get(data.Id) ?? {});
    };

    // Rebuild HTML content for a specific node
    private renderNode(id: string) {
        const node = this.diagram.getObject(id) as NodeModel | null;
        if (!node || (node.data as Person)?.Type === 'Union') return;
        const data = node.data as Person;
        const UI = this.nodeState.get(id) ?? {};
        node.shape = { type: 'HTML', content: this.getUpdatedTemplate(data, UI) };
    };

    /* ===================== Hover/events ===================== */
    public onMouseEnter = (args: IMouseEventArgs) => {
        const node: NodeModel = args?.actualObject as any;
        if (!node || node instanceof Connector || (node?.data as Person).Type === 'Union') return;
        this.focusHover(node.id as string);
    };

    public onMouseLeave = () => this.clearHover();
    public onDataLoaded = () => setTimeout(() => this.diagram.fitToPage());

    /* ===================== State-driven visuals by re-templating ===================== */
    private hoveredId: string | null = null;

    private focusHover(id: string) {
        const { people, nodeSet } = this.relatedSet(id);

        if (this.hoveredId && this.hoveredId !== id) this.restoreNodeSize(this.hoveredId);

        // Compute UI state for all person nodes
        this.diagram.nodes.forEach((node) => {
            if ((node as any)?.data?.Type === 'Union') return;
            const nodeId = node.id as string;
            const isDimmed = nodeId !== id && !people.has(nodeId);
            const isOpen = nodeId === id;
            this.nodeState.set(nodeId, { isDimmed, isOpen });
            this.renderNode(nodeId); // rebuild HTML with classes baked in
        });

        this.expandNodeWidth(id);
        this.paintConnectors(nodeSet);

        this.hoveredId = id;
        this.diagram.dataBind();
    };

    private clearHover() {
        if (this.hoveredId) {
            this.restoreNodeSize(this.hoveredId);
            this.hoveredId = null;
        }

        // Reset state and rebuild HTML for all nodes
        this.diagram.nodes.forEach((node) => {
            if ((node as any)?.data?.Type === 'Union') return;
            const nodeId = node.id as string;
            this.nodeState.set(nodeId, { isOpen: false, isDimmed: false});
            this.renderNode(nodeId);
        });

        // Reset connectors
        this.diagram.connectors.forEach((connector: ConnectorModel) => {
            connector.style = {
                strokeColor: this.CONNECTOR_COLORS.baseConnector,
                strokeWidth: 2,
                opacity: 1
            };
        });

        this.diagram.dataBind();
    };

    /* ===================== Node sizing ===================== */
    private expandNodeWidth(id: string) {
        const node = this.diagram.getObject(id) as NodeModel;
        if (!node) return;
        const isUnion = (node.data as Person).Type === 'Union';
        if (isUnion) return;

        if (!this.ORIGINAL_SIZE.has(id)) {
            this.ORIGINAL_SIZE.set(id, { width: node.width, height: node.height });
        }
        node.width = this.HOVER_WIDTH;
    };

    private restoreNodeSize(id: string) {
        const node = this.diagram.getObject(id) as NodeModel | null;
        if (!node) return;
        const orig = this.ORIGINAL_SIZE.get(id);
        if (orig) {
            node.width = orig.width;
            node.height = orig.height;
        }
    };

    /* ===================== Connectors paint ===================== */
    private paintConnectors(nodeSet: Set<string>) {
        this.diagram.connectors.forEach((connector: ConnectorModel) => {
            const sourceConn: string = connector.sourceID;
            const targetConn: string = connector.targetID;
            const hasRelations =
                !!(sourceConn && targetConn && nodeSet.has(sourceConn) && nodeSet.has(targetConn));

            connector.style = {
                strokeColor: hasRelations ? this.CONNECTOR_COLORS.highlightedConnector : this.CONNECTOR_COLORS.baseConnector,
                opacity: hasRelations ? 1 : 0.2
            };
        });
    };
}