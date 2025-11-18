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
    public nodes: NodeModel[] = [

        // Title Node
        {
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
        },
        // First level of the funnel.
        {
            // Unique identifier for the node.
            id: 'awareness',
            offsetX: 150,
            offsetY: 100,
            width: 560,
            height: 80,
            annotations: [{
                content: '10,000',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            // Trapezoidal shape defined by SVG path data.
            shape: { type: 'Path', data: 'M560 0H0L56.7194 80H503.281L560 0Z' },
            // Visual style for the node.
            style: { fill: this.LEVEL_COLORS.level1, strokeColor: 'transparent' },
            // Tooltip for showing conversion rates
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: this.getToolTemplate('sf-icon-ads-exposure', this.LEVEL_COLORS.level1, 'Ad Exposure', 100)
            },
            // Port for connecting label
            ports: [{ id: 'port', offset: { x: 0.9, y: 0.8 } }],
        },
        // Second level of the funnel.
        {
            id: 'interest',
            offsetX: 150,
            offsetY: 180,
            width: 446,
            height: 80,
            annotations: [{
                content: '6,500',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M503 80H57L113.648 160H446.352L503 80Z' },
            style: { fill: this.LEVEL_COLORS.level2, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: this.getToolTemplate('sf-icon-page-visits', this.LEVEL_COLORS.level2, 'Page Visits', 65, 65.00)
            },
            ports: [{ id: 'port', offset: { x: 0.89, y: 0.8 } }],
        },
        // Third level of the funnel.
        {
            id: 'consideration',
            offsetX: 150,
            offsetY: 260,
            width: 334,
            height: 80,
            annotations: [{
                content: '3,800',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M447 160H113L169.869 240H390.131L447 160Z' },
            style: { fill: this.LEVEL_COLORS.level3, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: this.getToolTemplate('sf-icon-sign-up', this.LEVEL_COLORS.level3, 'Sign Ups', 38, 58.46)
            },
            ports: [{ id: 'port', offset: { x: 0.85, y: 0.8 } }],
        },
        // Fourth level of the funnel.
        {
            id: 'intent',
            offsetX: 150,
            offsetY: 340,
            width: 220,
            height: 80,
            annotations: [{
                content: '2,000',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M170 240L226.801 320H333.199L390 240H170Z' },
            style: { fill: this.LEVEL_COLORS.level4, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: this.getToolTemplate('sf-icon-demo-request', this.LEVEL_COLORS.level4, 'Demo Requests', 20, 52.63)
            },
            ports: [{ id: 'port', offset: { x: 0.8, y: 0.8 } }],
        },
        // Fifth level of the funnel.
        {
            id: 'purchase',
            offsetX: 150,
            offsetY: 420,
            width: 106,
            height: 80,
            annotations: [{
                content: '1,200',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M333 320H227V400H333V320Z' },
            style: { fill: this.LEVEL_COLORS.level5, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: this.getToolTemplate('sf-icon-orders', this.LEVEL_COLORS.level5, 'Orders', 12, 60.00)
            },
            ports: [{ id: 'port', offset: { x: 0.9, y: 0.8 } }],
        },
        // Sixth and final level of the funnel.
        {
            id: 'retention',
            offsetX: 150,
            offsetY: 500,
            width: 106,
            height: 80,
            annotations: [{
                content: '800',
                style: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Segoe UI', bold: true }
            }],
            shape: { type: 'Path', data: 'M227 480H333V400H227V480Z' },
            style: { fill: this.LEVEL_COLORS.level6, strokeColor: 'transparent' },
            constraints: NodeConstraints.PointerEvents | NodeConstraints.Tooltip,
            tooltip: {
                relativeMode: 'Mouse',
                position: 'TopCenter',
                content: this.getToolTemplate('sf-icon-engagement', this.LEVEL_COLORS.level6, 'Subscribed Users', 8, 66.67)
            },
            ports: [{ id: 'port', offset: { x: 0.9, y: 0.8 } }],
        },
        // Labels
        {
            id: 'awareness_label', offsetX: 620, offsetY: 100, width: 60, height: 60,
            annotations: [
                { template: this.getIconTemplate('sf-icon-ads-exposure') },
                this.getStageLabel('Ad Exposure')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: this.LEVEL_COLORS.level1, strokeColor: this.LEVEL_COLORS.level1 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'interest_label', offsetX: 620, offsetY: 180, width: 60, height: 60,
            annotations: [
                { template: this.getIconTemplate('sf-icon-page-visits') },
                this.getStageLabel('Page Visits')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: this.LEVEL_COLORS.level2, strokeColor: this.LEVEL_COLORS.level2 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'consideration_label', offsetX: 620, offsetY: 260, width: 60, height: 60,
            annotations: [
                { template: this.getIconTemplate('sf-icon-sign-up') },
                this.getStageLabel('Sign Ups')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: this.LEVEL_COLORS.level3, strokeColor: this.LEVEL_COLORS.level3 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'intent_label', offsetX: 620, offsetY: 340, width: 60, height: 60,
            annotations: [
                { template: this.getIconTemplate('sf-icon-demo-request') },
                this.getStageLabel('Demo Requests')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: this.LEVEL_COLORS.level4, strokeColor: this.LEVEL_COLORS.level4 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'purchase_label', offsetX: 620, offsetY: 420, width: 60, height: 60,
            annotations: [
                { template: this.getIconTemplate('sf-icon-orders') },
                this.getStageLabel('Orders')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: this.LEVEL_COLORS.level5, strokeColor: this.LEVEL_COLORS.level5 },
            constraints: NodeConstraints.InConnect
        },
        {
            id: 'retention_label', offsetX: 620, offsetY: 500, width: 60, height: 60,
            annotations: [
                { template: this.getIconTemplate('sf-icon-engagement') },
                this.getStageLabel('Subscribed Users')
            ],
            shape: { type: 'Basic', shape: 'Ellipse' },
            style: { fill: this.LEVEL_COLORS.level6, strokeColor: this.LEVEL_COLORS.level6 },
            constraints: NodeConstraints.InConnect
        },
    ];
    // Connectors
    public connectors: ConnectorModel[] = [
        {
            sourceID: 'awareness', sourcePortID: 'port',
            targetID: 'awareness_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: this.LEVEL_COLORS.level1 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 124 } },
                { type: 'Straight', point: { x: 455, y: 98 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'interest', sourcePortID: 'port',
            targetID: 'interest_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: this.LEVEL_COLORS.level2 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 204 } },
                { type: 'Straight', point: { x: 455, y: 178 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'consideration', sourcePortID: 'port',
            targetID: 'consideration_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: this.LEVEL_COLORS.level3 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 284 } },
                { type: 'Straight', point: { x: 455, y: 258 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'intent', sourcePortID: 'port',
            targetID: 'intent_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: this.LEVEL_COLORS.level4 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 364 } },
                { type: 'Straight', point: { x: 455, y: 338 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'purchase', sourcePortID: 'port',
            targetID: 'purchase_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: this.LEVEL_COLORS.level5 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 444 } },
                { type: 'Straight', point: { x: 455, y: 418 } },
            ],
            constraints: ConnectorConstraints.None
        },
        {
            sourceID: 'retention', sourcePortID: 'port',
            targetID: 'retention_label',
            targetDecorator: { shape: 'None' },
            style: { strokeColor: this.LEVEL_COLORS.level6 },
            segments: [
                { type: 'Straight', point: { x: 430, y: 524 } },
                { type: 'Straight', point: { x: 455, y: 498 } },
            ],
            constraints: ConnectorConstraints.None
        },
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
