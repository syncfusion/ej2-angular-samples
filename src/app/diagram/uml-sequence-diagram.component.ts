import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import {
  DiagramComponent,
  DiagramModule
} from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram,
  UmlSequenceParticipant,
  UmlSequenceActivationBox,
  UmlSequenceMessageType,
  UmlSequenceFragmentType,
  SnapConstraints,
  DiagramTools,
  Connector,
  SnapSettingsModel,
  UndoRedo
} from '@syncfusion/ej2-diagrams';

import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

Diagram.Inject(UndoRedo);

/**
 * Sequence Diagram using diagram model
 */

@Component({
    selector: 'app-root',
    templateUrl: 'uml-sequence-diagram.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent]
})
export class UmlSequenceComponent implements OnInit {
  @ViewChild('diagram')
  public diagram: DiagramComponent;
  public tools = DiagramTools.ZoomPan;
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };

  public sequenceModel: any;

  constructor() {}

  ngOnInit(): void {
    // Define the sequence diagram model with participants, messages, and fragments
    this.sequenceModel = {
      // Space between each participant in the diagram
      spaceBetweenParticipants: 250,
      // List of participants in the sequence diagram
      participants: [
        {
          id: "User",
          content: "User",
          // Indicates that User is an actor
          isActor: true
        },
        {
          id: "Transaction",
          content: "Transaction",
          // Activation periods for the Transaction participant
          activationBoxes: [
            { id: "act1", startMessageID: 'msg1', endMessageID: 'msg4' }
          ]
        },
        {
          id: "FraudDetectionSystem",
          content: "Fraud Detection System",
          // Activation periods for the Fraud Detection System participant
          activationBoxes: [
            { id: "act2", startMessageID: 'msg2', endMessageID: 'msg3' },
            { id: "act3", startMessageID: 'msg5', endMessageID: 'msg6' }
          ]
        }
      ],
      // List of messages exchanged between participants
      messages: [
          { id: 'msg1', content: "Initiate Transaction", fromParticipantID: "User", toParticipantID: "Transaction", type: UmlSequenceMessageType.Synchronous },
          { id: 'msg2', content: "Send Transaction Data", fromParticipantID: "Transaction", toParticipantID: "FraudDetectionSystem", type: UmlSequenceMessageType.Synchronous },
          { id: 'msg3', content: "Validate Transaction", fromParticipantID: "FraudDetectionSystem", toParticipantID: "Transaction", type: UmlSequenceMessageType.Reply },
          { id: 'msg4', content: "Transaction Approved", fromParticipantID: "Transaction", toParticipantID: "User", type: UmlSequenceMessageType.Asynchronous },
          { id: 'msg5', content: "Flag Transaction", fromParticipantID: "Transaction", toParticipantID: "FraudDetectionSystem", type: UmlSequenceMessageType.Synchronous },
          { id: 'msg6', content: "Fraud Detected", fromParticipantID: "FraudDetectionSystem", toParticipantID: "User", type: UmlSequenceMessageType.Reply },
          { id: 'msg7', content: "Cancel Transaction", fromParticipantID: "User", toParticipantID: "Transaction", type: UmlSequenceMessageType.Synchronous },
          { id: 'msg8', content: "Complete Transaction", fromParticipantID: "User", toParticipantID: "Transaction", type: UmlSequenceMessageType.Synchronous }
      ],
      // Conditional fragments within the sequence
      fragments: [
          {
              id: 1,
              // Represents alternative fragment
              type: UmlSequenceFragmentType.Alternative,
              conditions: [
                  // Condition when fraud is detected
                  {
                      // Content of condition
                      content: "Fraud Detected",
                      // Messages part of this condition
                      messageIds: ['msg5', 'msg6', 'msg7']
                  },
                  {
                      content: "No Fraud Detected",
                      messageIds: ['msg8']
                  }
              ]
          }
      ]
    };
  }

  // Define default properties for connectors used in the diagram
public connectorDefaults(connector: Connector): void {
  const message = this.sequenceModel.messages.find(
    (msg: any) => msg.id === connector.id
  );

  if (message) {
    connector.targetDecorator.style = {
      fill: '#489ECC',
      strokeColor: '#489ECC'
    };
    connector.style = {
      strokeColor: '#489ECC',
      strokeWidth: 2
    };
  }
}


  // Default settings for nodes
  public nodeDefaults(node: any): void {
    // participant node
    if (node.data instanceof UmlSequenceParticipant) {
      if (!node.data.isActor) {
        node.annotations[0].style.color = 'white';
      }
    }
    // activation node
    else if (node.data instanceof UmlSequenceActivationBox) {
      node.style = { fill: 'orange', strokeColor: 'orange' };
    }
  }

  // Diagram created event
  public created(args: any): void {
    this.diagram.fitToPage();
  }
}
