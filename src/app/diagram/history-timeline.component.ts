import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
    NodeModel, ConnectorModel, Diagram, UserHandleModel, UserHandleEventsArgs, DiagramTools, 
    SelectorModel, SelectorConstraints, SnapConstraints, SnapSettingsModel, NodeConstraints, ConnectorConstraints,
    ISelectionChangeEventArgs, randomId, HtmlModel, DiagramConstraints, CommandManagerModel
} from '@syncfusion/ej2-diagrams';
import { DialogComponent, DialogModule, ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { TextBoxModule, TextBoxComponent, TextAreaComponent, TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon?: string;
    imageUrl?: string;
}

@Component({
    selector: 'control-content',
    templateUrl: 'history-timeline.html',
    styleUrls: ['history-timeline.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBDescriptionComponent, SBActionDescriptionComponent, DiagramModule, DialogModule,
        TextBoxModule, TextAreaModule, FormsModule],
})
export class HistoryTimelineDiagramComponent implements OnInit {
    @ViewChild('diagram', { static: true }) diagram!: DiagramComponent;
    @ViewChild('dialog', { static: false }) dialog?: DialogComponent;
    public target: string = '.control-section';
    @ViewChild('yearTextBox')
    yearTextBox: TextBoxComponent;
    @ViewChild('titleTextBox')
    titleTextBox: TextBoxComponent;
    @ViewChild('describeTextBox')
    describeTextBox: TextAreaComponent;
    @ViewChild('imageTextBox')
    imageTextBox: TextBoxComponent;
    @ViewChild('formElement')
    formElement!: ElementRef;
    public formValidator!: FormValidator;

    private timelineEvents: TimelineEvent[] = [
        { year: '1969', title: 'ARPANET', description: 'ARPANET, the precursor to the Internet, is created by the U.S. Department of Defense\'s Advanced Research Projects Agency (ARPA).', icon: 'sf-icon-arpanet' },
        { year: '1983', title: 'Birth of the Internet', description: 'ARPANET switches to TCP/IP, marking the official birth of the Internet.', icon: 'sf-icon-birth-internet' },
        { year: '1991', title: 'Internet Goes Public', description: 'The World Wide Web is released to the public, making the Internet accessible to a broader audience.', icon: 'sf-icon-internet-public' },
        { year: '1993', title: 'First Web Browser', description: 'The first web browser, Mosaic, is released, making it easier for people to access the World Wide Web.', icon: 'sf-icon-first-web-browser' },
        { year: '1995', title: 'Commercialization of the Internet', description: 'The U.S. government lifts restrictions on commercial use of the Internet, leading to the rise of commercial websites and e-commerce.', icon: 'sf-icon-commercialization' },
        { year: '1998', title: 'Google Founded', description: 'Google is founded by Larry Page and Sergey Brin, revolutionizing how people search for information online.', icon: 'sf-icon-google-found' },
        { year: '2004', title: 'Social Media Boom', description: 'Facebook is launched, marking the beginning of the social media era.', icon: 'sf-icon-social-media' },
        { year: '2005', title: 'YouTube Launched', description: 'YouTube is launched, becoming a major platform for sharing and viewing video content.', icon: 'sf-icon-youtube' },
        { year: '2007', title: 'iPhone Released', description: 'Apple releases the first iPhone, transforming mobile internet usage and leading to the proliferation of mobile apps.', icon: 'sf-icon-i-phone' },
        { year: '2010', title: 'Cloud Computing', description: 'Cloud computing becomes mainstream, allowing for more flexible and scalable internet services.', icon: 'sf-icon-cloud-computing' },
        { year: '2014', title: 'Internet of Things (IoT)', description: 'The Internet of Things (IoT) gains significant traction, connecting everyday devices to the internet.', icon: 'sf-icon-internet-of-things' },
        { year: '2020', title: 'Remote Work', description: 'The COVID-19 pandemic accelerates the adoption of remote work, online education, and digital communication.', icon: 'sf-icon-remote-work' },
        { year: '2021', title: '5G Rollout', description: 'The global rollout of 5G networks begins, promising significantly faster internet speeds and lower latency.', icon: 'sf-icon-5g-network' },
        { year: '2022', title: 'Metaverse Development', description: 'Major technology companies begin to invest heavily in the development of the metaverse, virtual and augmented reality spaces.', icon: 'sf-icon-metaverse' },
        { year: '2023', title: 'Quantum Internet', description: 'Continued research and development in quantum computing and quantum internet technology aim to revolutionize data security and processing speeds.', icon: 'sf-icon-quantum-internet' },
        { year: '2025', title: 'IoT Pervasiveness', description: 'The Internet of Things becomes more pervasive, with smart devices deeply integrated into daily life and industry.', icon: 'sf-icon-iot-pervasiveness' },
        { year: '2030', title: 'Autonomous Vehicles', description: 'The widespread adoption of autonomous vehicles becomes more common, relying heavily on the internet for communication, navigation, and updates.', icon: 'sf-icon-autonomous-vehicle' },
        { year: '2035', title: 'Advanced AI Integration', description: 'Advanced AI systems are fully integrated into internet services, offering more personalized and efficient user experiences.', icon: 'sf-icon-advance-ai' },
    ];

    private eventColors: string[] = ['#FEC200', '#43C94C', '#3D95F6', '#FF3343', '#CDDE1F', '#00897B', '#7F38CD', '#FF2667', '#00BCD7', '#F47B10', '#576ADE', '#91521B'];

    indexTable: string[] = [];
    // Represent current selected event index in index table
    editTimeLineIndex = -1;
    selectedNode: NodeModel;
    selectedUserHandle: string = '';
    startX = 100; startY = 100; nodeSpacing = 200; alternateOffset = 200; baseLine = 300;

    // ========== Diagram Bindings ==========
    public nodes: NodeModel[];
    public connectors: ConnectorModel[];
    public tool: DiagramTools = DiagramTools.ZoomPan | DiagramTools.SingleSelect;
    public constraints: DiagramConstraints = DiagramConstraints.Default &~ (DiagramConstraints.PanY |  DiagramConstraints.UndoRedo);
    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    private userHandles: UserHandleModel[] = [
        {
            name: 'New Event',
            pathData: 'M12.099998,0L19.799995,0 19.799995,12.1 32,12.1 32,19.799996 19.900002,19.799996 19.900002,31.999999 12.199997,31.999999 12.199997,19.900003 0,19.900003 0,12.199999 12.099998,12.199999z',
            offset: 0.5,
            side: 'Right',
            tooltip: { content: 'Add Event' },
        },
        {
            name: 'Edit Event',
            pathData: 'M20.638062,9.6380005L6.6380615,23.638 8.3620605,25.362 22.362061,11.362z M20.5,4.5L27.5,11.5 9,30 0,32 2,23z M27,0C29.760986,0 32,2.2389832 32,5 32,6.1259766 31.628052,7.1640015 31,8L29,10 22,3 24,1C24.83606,0.37197876,25.874023,0,27,0z',
            offset: 0.5,
            side: 'Bottom',
            tooltip: { content: 'Edit Event' },
        },
    ];
    public selectedItems: SelectorModel = {
        userHandles: this.userHandles,
        constraints: SelectorConstraints.None | SelectorConstraints.UserHandle | SelectorConstraints.ToolTip
    };
    public commandManager: CommandManagerModel = {
      commands: [
        {
          name: 'copy',
          canExecute: () => false
        },
        {
          name: 'paste',
          canExecute: () => false
        }
      ]
    };
    private diagramCreated: boolean = false;
    // ========== Diagram events ==========

    public selectionChange(args: ISelectionChangeEventArgs): void {
        if (args.state === 'Changed' && this.diagram.selectedItems.nodes!.length === 1) {
            this.selectedNode = this.diagram.selectedItems.nodes![0];
            // Fetch the eventIndex from node's info
            const nodeInfo: any = this.selectedNode.addInfo;
            if (nodeInfo && nodeInfo.eventIndex !== undefined) {
                this.editTimeLineIndex = nodeInfo.eventIndex;
                const isImmediateNext: boolean = this.checkImmediateEventYear(this.editTimeLineIndex);
                this.diagram.selectedItems.userHandles![0].visible = !isImmediateNext;
                this.diagram.selectedItems.userHandles![1].visible = true;
            } else {
                this.editTimeLineIndex = -1;
                this.diagram.selectedItems.userHandles![0].visible = false;
                this.diagram.selectedItems.userHandles![1].visible = false;
            }
            this.diagram.dataBind();
        }
    };

    public onUserHandleMouseDown(args: UserHandleEventsArgs): void {
        this.formValidator.reset();
        if (args.element.name === 'New Event') {
            this.dialog.header = this.selectedUserHandle = 'New Event';
            this.yearTextBox.value = '';
            this.titleTextBox.value = '';
            this.describeTextBox.value = '';
            this.imageTextBox.value = '';
        } else if (args.element.name === 'Edit Event') {
            this.dialog.header = this.selectedUserHandle = 'Edit Event';
            const timeLine: TimelineEvent = this.timelineEvents[this.editTimeLineIndex];
            this.yearTextBox.value = timeLine.year;
            this.titleTextBox.value = timeLine.title;
            this.describeTextBox.value = timeLine.description;
            this.imageTextBox.value = timeLine.imageUrl ? timeLine.imageUrl : '';
        }
        this.dialog.show();
    };

    public click(args: any): void {
        if ((args.element instanceof Diagram) && this.diagram.selectedItems.nodes?.length > 0) {
            this.diagram.clearSelection();
        }
    };

    public load(): void {
        setTimeout(()=>{
            if (this.diagramCreated){
                this.diagram.fitToPage({ mode: 'Height' });
            }
        },10)
    };

    public created(): void {
        this.diagramCreated = true;
        this.diagram.fitToPage({ mode: 'Height' });
    };

    // ========== Dialog Form Bindings ==========

    public dialogButtons: ButtonPropsModel[] = [
        { buttonModel: { content: 'Submit', isPrimary: true }, click: () => this.onSubmitClicked() },
        { buttonModel: { content: 'Cancel' }, click: () => this.dialog?.hide() }
    ];
    // Form data model

    public formData = {
        yearInput: '',
        titleInput: '',
        descriptionInput: '',
        imageUrl: ''
    };

    // Dialog Submit Button Clicked
    private onSubmitClicked() {
        // Validate Dialog form
        if (!this.formValidator.validate()) {
            return;
        }
        const year: string = this.yearTextBox.value;
        const title: string = this.titleTextBox.value;
        const description: string = this.describeTextBox.value;
        const imageUrl: string = this.imageTextBox.value;
        const icon: string = 'sf-icon-internet-public';
        const timeLine: TimelineEvent = { year, title, description, icon: icon, imageUrl: imageUrl };

        if (this.selectedUserHandle === 'New Event') {
            // Insert new event after the selected node
            const insertIndex: number = this.editTimeLineIndex + 1;
            // Insert the new event in Event collection
            this.timelineEvents.splice(insertIndex, 0, timeLine);
            // Add the new event node after selected node
            this.addNewTimelineEvent(insertIndex, timeLine);
            // Update positions of all nodes after insertion point
            this.updateNodePositions(insertIndex + 1);
        }
        else if (this.selectedUserHandle === 'Edit Event') {
            timeLine.icon = this.timelineEvents[this.editTimeLineIndex].icon;
            // Update the timeline event data
            this.timelineEvents[this.editTimeLineIndex] = timeLine;
            // Edit the selected event node
            this.editTimelineNode(this.editTimeLineIndex, timeLine);
        }
        const isImmediateNext: boolean = this.checkImmediateEventYear(this.editTimeLineIndex);
        this.diagram.selectedItems.userHandles![0].visible = !isImmediateNext;
        // Refresh the diagram to show updated changes
        this.diagram.dataBind();
        this.dialog.hide();
    }

    ngOnInit() {
        this.createTimelineNodes();
        this.createTimelineConnectors();
    }
    ngAfterViewInit() {
        if (this.formElement) {
            // Exact same validation rules as your original TypeScript code
            const options: FormValidatorModel = {
                rules: {
                    yearInput: {
                        required: true,
                        digits: true,
                        min: 0,
                        maxLength: 4,
                        custom: [this.checkYearValidity.bind(this), 'Year must be within valid range compared to adjacent events']
                    },
                    titleInput: { required: true },
                    descriptionInput: { required: true }
                }
            };

            this.formValidator = new FormValidator(this.formElement.nativeElement, options);
        }
    }

    private createTimelineNodes(): void {
        const diagramNodes: NodeModel[] = []
        // Create main timeline line
        const timelineLine: NodeModel = {
            id: 'timeline_line',
            offsetX: (this.timelineEvents.length * this.nodeSpacing) / 2,
            offsetY: this.baseLine,
            width: (this.timelineEvents.length) * this.nodeSpacing,
            height: 10,
            constraints: NodeConstraints.None,
            shape: {
                type: 'HTML',
                content: `
    <div style="display: flex; width: 100%; height: 100%;">
      ${this.timelineEvents.map((_event, index) => {
                    const colorIndex = index % this.eventColors.length;
                    const nodeColor = this.eventColors[colorIndex];
                    return `<div style="flex: 1; background-color: ${nodeColor}; height: 100%;"></div>`;
                }).join('')}
    </div>
  `,
            },
        };
        diagramNodes.push(timelineLine);

        this.timelineEvents.forEach((event, index) => {
            const colorIndex: number = index % this.eventColors.length;
            const nodeColor: string = this.eventColors[colorIndex];

            const isOdd: boolean = (index + 1) % 2 !== 0;
            const x: number = this.startX + (index * this.nodeSpacing);
            const y: number = isOdd ? this.startY : this.baseLine + this.alternateOffset;

            // Timeline Event Node
            const timelineNode: NodeModel = {
                id: `timeline_${index}`,
                offsetX: x,
                offsetY: y,
                width: 130,
                height: 100,
                constraints: (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly) & ~NodeConstraints.Select,
                tooltip: {
                    content: `${event.year}: ${event.description}`,
                    position: isOdd ? 'TopCenter' : 'BottomCenter',
                    relativeMode: 'Object',
                    animation: { open: { delay: 1000 } }
                },
                style: { fill: 'none' },
                shape: {
                    type: 'HTML',
                    content: this.getEventNodeTemplate(nodeColor, event)
                }
            };

            //Timeline Year Marker Node
            const yearMarker: NodeModel = {
                id: `marker_${index}`,
                offsetX: x,
                offsetY: this.baseLine,
                width: 150,
                height: 50,
                constraints: (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~(NodeConstraints.Drag),
                addInfo: { eventIndex: index }, // Store the event index for reference
                shape: {
                    type: 'HTML',
                    content: this.getYearNodeTemplate(event.year)
                }
            };

            diagramNodes.push(timelineNode, yearMarker);
            // Push node to index table to maintain event order
            this.indexTable.push(index.toString());
        });
        this.nodes = diagramNodes;
    }

    private createTimelineConnectors(): void {
        const diagramConnectors: ConnectorModel[] = [];
        this.timelineEvents.forEach((_event, index) => {
            const colorIndex: number = index % this.eventColors.length;
            const strokeColor: string = this.eventColors[colorIndex];
            const connector: ConnectorModel = {
                id: `connector_${index}`,
                sourceID: `timeline_${index}`,
                targetID: `marker_${index}`,
                constraints: ConnectorConstraints.None,
                style: {
                    strokeColor: strokeColor,
                    strokeWidth: 2
                },
                type: 'Straight',
                targetDecorator: {
                    shape: 'None'
                },
                sourceDecorator: {
                    shape: 'None'
                },
            };

            diagramConnectors.push(connector);
        });
        this.connectors = diagramConnectors;
    }

    // Function to Edit current selected event node
    private editTimelineNode(editTimeLineIndex: number, timeLine: TimelineEvent): void {
        // Update the timeline node content
        const timelineNode: NodeModel = this.diagram.getObject(`timeline_${this.indexTable[editTimeLineIndex]}`) as NodeModel;
        if (timelineNode) {
            const colorIndex: number = editTimeLineIndex % this.eventColors.length;
            const nodeColor: string = this.eventColors[colorIndex];

            (timelineNode.shape as HtmlModel).content = this.getEventNodeTemplate(nodeColor, timeLine);

            // Update tooltip
            if (timelineNode.tooltip) {
                timelineNode.tooltip.content = `${timeLine.year}: ${timeLine.description}`;
            }
        }

        // Update the year marker content
        const markerNode: NodeModel = this.diagram.getObject(`marker_${this.indexTable[editTimeLineIndex]}`) as NodeModel;
        if (markerNode) {
            (markerNode.shape as HtmlModel).content = this.getYearNodeTemplate(timeLine.year);
        }
    }

    // Function to update node positions after inserting a new event
    private updateNodePositions(fromIndex: number): void {
        // Update positions for all nodes from the insertion point onwards
        for (let i: number = fromIndex; i < this.indexTable.length; i++) {
            const isOdd: boolean = (i + 1) % 2 !== 0;
            const x: number = this.startX + (i * this.nodeSpacing);
            const y: number = isOdd ? this.startY : this.baseLine + this.alternateOffset;
            const colorIndex: number = i % this.eventColors.length;
            const nodeColor: string = this.eventColors[colorIndex];
            // Update timeline node position
            const timelineNode: NodeModel = this.diagram.getObject(`timeline_${this.indexTable[i]}`) as NodeModel;
            if (timelineNode) {
                timelineNode.offsetX = x;
                timelineNode.offsetY = y;
                // Updating time line node color to match time line event segment color
                (timelineNode.shape as HtmlModel).content = this.getEventNodeTemplate(nodeColor, this.timelineEvents[i]);
                timelineNode.tooltip!.position = isOdd ? 'TopCenter' : 'BottomCenter';
            }

            // Update marker node position
            const markerNode: NodeModel = this.diagram.getObject(`marker_${this.indexTable[i]}`) as NodeModel;
            if (markerNode) {
                markerNode.offsetX = x;
                (markerNode.addInfo as any).eventIndex = i;
            }

            // Update connector color
            const connector: ConnectorModel = this.diagram.getObject(`connector_${this.indexTable[i]}`) as ConnectorModel;
            if (connector) {
                connector.style!.strokeColor = nodeColor;
            }
        }

        // Update timeline line width
        const timelineLine: NodeModel = this.diagram.getObject('timeline_line') as NodeModel;
        if (timelineLine) {
            timelineLine.offsetX = (this.timelineEvents.length * this.nodeSpacing) / 2;
            timelineLine.width = (this.timelineEvents.length) * this.nodeSpacing;

            // Update timeline line content with new colors
            (timelineLine.shape as HtmlModel).content = `
    <div style="display: flex; width: 100%; height: 100%;">
      ${this.timelineEvents.map((_event, index) => {
                const colorIndex = index % this.eventColors.length;
                const nodeColor = this.eventColors[colorIndex];
                return `<div style="flex: 1; background-color: ${nodeColor}; height: 100%;"></div>`;
            }).join('')}
    </div>
  `;
        }
    }

    // Function to add a new timeline event node
    private addNewTimelineEvent(insertIndex: number, newEvent: TimelineEvent): void {
        const colorIndex: number = insertIndex % this.eventColors.length;
        const nodeColor: string = this.eventColors[colorIndex];
        const isOdd: boolean = (insertIndex + 1) % 2 !== 0;
        const x: number = this.startX + (insertIndex * this.nodeSpacing);
        const y: number = isOdd ? this.startY : this.baseLine + this.alternateOffset;
        const id: string = randomId();
        // Create new timeline node
        const timelineNode: NodeModel = {
            id: `timeline_${id}`,
            offsetX: x,
            offsetY: y,
            width: 130,
            height: 100,
            constraints: (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly) & ~NodeConstraints.Select,
            style: { fill: 'none' },
            tooltip: {
                content: `${newEvent.year}: ${newEvent.description}`,
                position: isOdd ? 'TopCenter' : 'BottomCenter',
                relativeMode: 'Object',
                animation: { open: { delay: 1000 } }
            },
            shape: {
                type: 'HTML',
                content: this.getEventNodeTemplate(nodeColor, newEvent),
            }
        };

        // Create new year marker node
        const yearMarker: NodeModel = {
            id: `marker_${id}`,
            offsetX: x,
            offsetY: this.baseLine,
            width: 170,
            height: 50,
            constraints: (NodeConstraints.Default | NodeConstraints.ReadOnly) & ~(NodeConstraints.Drag),
            addInfo: { eventIndex: insertIndex },
            shape: {
                type: 'HTML',
                content: this.getYearNodeTemplate(newEvent.year)
            }
        };

        // Create new connector
        const connector: ConnectorModel = {
            id: `connector_${id}`,
            sourceID: `timeline_${id}`,
            targetID: `marker_${id}`,
            constraints: ConnectorConstraints.None,
            style: {
                strokeColor: nodeColor,
                strokeWidth: 2
            },
            type: 'Straight',
            targetDecorator: { shape: 'None' },
            sourceDecorator: { shape: 'None' },
        };

        // Push node to index table to maintain event order
        this.indexTable.splice(insertIndex, 0, id);
        // Add new nodes and connector to diagram
        this.diagram.add(timelineNode);
        this.diagram.add(yearMarker);
        this.diagram.add(connector);
    }

    // functions to return HTML Templates
    private getEventNodeTemplate(nodeColor: string, event: TimelineEvent) {
        if (event.imageUrl) {
            return `<div style="width: 100%; height: 100%; background-color: ${nodeColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 5px; padding: 5px; box-sizing: border-box;">
                  <div style="margin-bottom: 4px;">
                      <img src="${event.imageUrl}" alt="Event Image" style="max-width: 100%; max-height: 60px; border-radius: 3px;" />
                  </div>
                  <div style="font-size: 12px; color: #333; text-align: center; line-height: 1.2;">
                      <strong>${event.title}</strong>
                  </div>
              </div>`
        }
        else {
            return `<div style="width: 100%; height: 100%; background-color: ${nodeColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 5px; padding: 5px; box-sizing: border-box;">
                  <div class="${event.icon}" style="margin-bottom: 4px;"></div>
                  <div style="font-size: 12px; color: #333; text-align: center; line-height: 1.2;">
                      <strong>${event.title}</strong>
                  </div>
              </div>`
        }
    }
    private getYearNodeTemplate(year: string) {
        return `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <div style="width: 50px; height: 50px; background-color: #333333; color: white; border-radius: 50%; font-size: 12px; display: flex; align-items: center; justify-content: center;">
              ${year}
            </div>
          </div>`
    }

    // Check whether next year is immediate year
    private checkImmediateEventYear(currentYear: number): boolean {
        // Ensure no Immediate next year event before adding new event
        const nextYearIndex = currentYear + 1;
        const hasNextEvent = nextYearIndex < this.timelineEvents.length;
        // Toggle off the new event handle for immediate next year event
        const isImmediateNext = hasNextEvent &&
            Number(this.timelineEvents[nextYearIndex].year) - Number(this.timelineEvents[this.editTimeLineIndex].year) === 1;
        return isImmediateNext;
    }

    private checkYearValidity(args: { [key: string]: string }): boolean {
        const previousYearIndex: number = this.selectedUserHandle === 'Edit Event' ? this.editTimeLineIndex - 1 : this.editTimeLineIndex;
        const currentYear: number = Number(args.value);
        // Validate the current year against the previous event's year, if applicable
        const hasPreviousEvent = previousYearIndex >= 0;
        if (hasPreviousEvent && Number(this.timelineEvents[previousYearIndex].year) >= currentYear) {
            return false;
        }
        // Validate the current year against the next event's year, if applicable
        const nextYearIndex = this.editTimeLineIndex + 1;
        const hasNextEvent = nextYearIndex < this.timelineEvents.length;
        if (hasNextEvent && Number(this.timelineEvents[nextYearIndex].year) <= currentYear) {
            return false;
        }
        return true;
    }
}