import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
    DiagramComponent, DiagramModule, NodeModel, NodeConstraints,
    SnapConstraints, SnapSettingsModel, ConnectorModel,
    ShapeAnnotationModel, ConnectorConstraints
} from '@syncfusion/ej2-angular-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
/**
 * Funnel Diagram
 */

@Component({
    selector: 'control-content',
    templateUrl: 'funnel-diagrams.html',
    styleUrls: ['funnel-diagrams.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class FunnelDiagramsComponent {
    @ViewChild('diagram')
    public diagram: DiagramComponent;
    // Configure snap settings for the diagram.
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    private LEVEL_COLORS = {
        level1: '#C2272D',
        level2: '#F16C0D',
        level3: '#FFC107',
        level4: '#4CB443',
        level5: '#008AE0',
        level6: '#8715BC',
    };

    // Title node factory
    private createTitleNode(): NodeModel {
        return {
            id: 'title',
            offsetX: 150, offsetY: -40,
            width: 250, height: 50,
            annotations: [
                {
                    content: 'Marketing Funnel', offset: { x: 0.5, y: 0.2 },
                    style: { color: '#111827', fontSize: 24, fontFamily: 'Segoe UI' }
                },
                {
                    content: 'Measuring Campaign Effectiveness', offset: { x: 0.5, y: 0.7 },
                    style: { color: '#6B7280', fontSize: 16, fontFamily: 'Segoe UI', }
                }
            ],
            constraints: NodeConstraints.None,
            style: { strokeColor: 'transparent' }
        } as NodeModel;
    }

    // Stage node factory
    private createNode(
        id: string, width: number, height: number, fill: string,
        offsetX: number, offsetY: number, pathData: string, valueText: string,
        iconClass: string, description: string, cumulativeRate: number,
        conversionRate?: number, portX: number = 0.9
    ): NodeModel {
        return {
            id,
            offsetX,
            offsetY,
            width,
            height,
            annotations: [{
                content: valueText,
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: pathData },
            style: { fill: fill, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip | NodeConstraints.ReadOnly,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: this.getToolTemplate(iconClass, fill, description, cumulativeRate, conversionRate)
            },
            ports: [{ id: 'port', offset: { x: portX, y: 0.8 } }],
        } as NodeModel;
    }

    // Label node factory
    private createLabelNode(
        id: string, width: number, height: number, fill: string,
        offsetX: number, offsetY: number, iconClass: string, description: string
    ): NodeModel {
        return {
            id,
            offsetX, offsetY,
            width, height,
            annotations: [
                { template: this.getIconTemplate(iconClass) },
                this.getStageLabel(description)
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: fill, strokeColor: fill },
            constraints: NodeConstraints.InConnect
        } as NodeModel;
    }

    // Connector factory
    private createConnector(
        sourceID: string, targetID: string, strokeColor: string,
        p1x: number, p1y: number, p2x: number, p2y: number,
        sourcePortID: string = 'port'
    ): ConnectorModel {
        return {
            sourceID,
            sourcePortID,
            targetID,
            targetDecorator: { shape: 'None' },
            style: { strokeColor: strokeColor },
            segments: [
                { type: 'Straight', point: { x: p1x, y: p1y } },
                { type: 'Straight', point: { x: p2x, y: p2y } },
            ],
            constraints: ConnectorConstraints.None
        } as ConnectorModel;
    }

    public nodes: NodeModel[] = [
        // Title Node
        this.createTitleNode(),
        // First level of the funnel.
        this.createNode(
            'awareness', 560, 80, this.LEVEL_COLORS.level1, 150, 100,
            'M560 0H0L56.7194 80H503.281L560 0Z', '10,000',
            'sf-icon-ads-exposure', 'Ad Exposure', 100, undefined, 0.9
        ),
        // Second level of the funnel.
        this.createNode(
            'interest', 446, 80, this.LEVEL_COLORS.level2, 150, 180,
            'M503 80H57L113.648 160H446.352L503 80Z', '6,500',
            'sf-icon-page-visits', 'Page Visits', 65, 65.00, 0.89
        ),
        // Third level of the funnel.
        this.createNode(
            'consideration', 334, 80, this.LEVEL_COLORS.level3, 150, 260,
            'M447 160H113L169.869 240H390.131L447 160Z', '3,800',
            'sf-icon-sign-up', 'Sign Ups', 38, 58.46, 0.85
        ),
        // Fourth level of the funnel.
        this.createNode(
            'intent', 220, 80, this.LEVEL_COLORS.level4, 150, 340,
            'M170 240L226.801 320H333.199L390 240H170Z', '2,000',
            'sf-icon-demo-request', 'Demo Requests', 20, 52.63, 0.8
        ),
        // Fifth level of the funnel.
        this.createNode(
            'purchase', 106, 80, this.LEVEL_COLORS.level5, 150, 420,
            'M333 320H227V400H333V320Z', '1,200',
            'sf-icon-orders', 'Orders', 12, 60.00, 0.9
        ),
        // Sixth and final level of the funnel.
        this.createNode(
            'retention', 106, 80, this.LEVEL_COLORS.level6, 150, 500,
            'M227 480H333V400H227V480Z', '800',
            'sf-icon-engagement', 'Subscribed Users', 8, 66.67, 0.9
        ),
        // Labels
        this.createLabelNode('awareness_label', 60, 60, this.LEVEL_COLORS.level1, 620, 100, 'sf-icon-ads-exposure', 'Ad Exposure'),
        this.createLabelNode('interest_label', 60, 60, this.LEVEL_COLORS.level2, 620, 180, 'sf-icon-page-visits', 'Page Visits'),
        this.createLabelNode('consideration_label', 60, 60, this.LEVEL_COLORS.level3, 620, 260, 'sf-icon-sign-up', 'Sign Ups'),
        this.createLabelNode('intent_label', 60, 60, this.LEVEL_COLORS.level4, 620, 340, 'sf-icon-demo-request', 'Demo Requests'),
        this.createLabelNode('purchase_label', 60, 60, this.LEVEL_COLORS.level5, 620, 420, 'sf-icon-orders', 'Orders'),
        this.createLabelNode('retention_label', 60, 60, this.LEVEL_COLORS.level6, 620, 500, 'sf-icon-engagement', 'Subscribed Users'),
    ];

    // Connectors
    public connectors: ConnectorModel[] = [
        this.createConnector('awareness', 'awareness_label', this.LEVEL_COLORS.level1, 430, 124, 455, 98),
        this.createConnector('interest', 'interest_label', this.LEVEL_COLORS.level2, 430, 204, 455, 178),
        this.createConnector('consideration', 'consideration_label', this.LEVEL_COLORS.level3, 430, 284, 455, 258),
        this.createConnector('intent', 'intent_label', this.LEVEL_COLORS.level4, 430, 364, 455, 338),
        this.createConnector('purchase', 'purchase_label', this.LEVEL_COLORS.level5, 430, 444, 455, 418),
        this.createConnector('retention', 'retention_label', this.LEVEL_COLORS.level6, 430, 524, 455, 498),
    ];

    private diagramCreated: boolean = false;
    public created(): void {
        this.diagramCreated = true;
        this.diagram.fitToPage();
    }
    public load(): void {
        if (this.diagramCreated) {
            setTimeout(() => this.diagram.fitToPage(), 100);
        }
    }

    // Tooltip Template
    private getToolTemplate(iconClass: string, iconFill: string, description: string, cumulativeRate: number, conversionRate?: number): string {
        return ` 
<div style="border-radius: 8px; max-width: 240px; min-width: 180px; padding: 12px; font-family: 'Segoe UI', Arial, sans-serif; font-size: 14px;">
<!-- Container for icon and description -->
<div style="display: flex; align-items: center; padding: 5px 0px;">
    <div class="${iconClass} annotation-icon" style="display: flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; background: ${iconFill}; color: #FFFFFF; border-radius: 50%; margin-right: 10px;"></div>
    <div style="font-weight: 600; font-size: 16px;">
        ${description}
    </div>
</div>
<hr style="margin: 3px; border-top: 1px solid #9CA3AF;">

<div style="display: grid; row-gap: 8px;">
    ${conversionRate !== undefined ? `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 500; opacity:0.7;">Conversion</span>
            <span style="font-weight: 600;">${conversionRate}%</span>
        </div>
    ` : ''}

    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 500; opacity:0.7;">Cumulative</span>
        <span style="font-weight: 600;">${cumulativeRate}%</span>
    </div>
</div>
</div>
`;
    }

    // Title Icon Annotation Template
    private getIconTemplate(iconClass: string) {
        return `<div class="${iconClass}" style="width: 60px; height: 60px;display: flex; align-items: center;
            justify-content: center; font-size: 34px; color: #FFFFFF; !important;">
            </div>`;
    }

    // Annotation
    private getStageLabel(content: string): ShapeAnnotationModel {
        return {
            content: content,
            offset: { x: 0, y: 0.5 },
            horizontalAlignment: 'Right',
            verticalAlignment: 'Bottom',
            margin: { right: 6, bottom: 4 },
            style: { fontSize: 16, textWrapping: 'NoWrap', fontFamily: 'Segoe UI' }
        };
    }
}