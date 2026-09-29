import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { AIAssistViewAllModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  selector: 'control-content',
  imports: [AIAssistViewAllModule],
  standalone: true,
  templateUrl: 'thinking.html',
  styleUrls: ['thinking.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AIAssistThinkingComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = [
      'thinking.component.css',
      'thinking.html'
    ];
  }
  @ViewChild('thinkingAIAssistView')
  public thinkingAIAssistView: AIAssistViewComponent;

  public promptSuggestions: string[] = [
    'Build a modern dashboard for my business',
    'Create a login page with validation',
    'Make a task management board'
  ];

  public promptRequest = (args: PromptRequestEventArgs) => {
    this.executeThinkingProcess();
  };

  private executeThinkingProcess(): void {
    // Step 1: Understanding the request
    setTimeout(() => {
      this.thinkingAIAssistView.addPromptResponse({
        blocks: [
          {
            blockType: 'thinking',
            title: 'Understanding your request',
            collapsible: true,
            collapsed: false,
            isActive: true,
            stages: [
              {
                id: 'step1',
                status: 'inprogress',
                content: 'Identified request as a business dashboard requirement.'
              }
            ]
          }
        ]
      }, false);

      // Step 2: Selecting UI components
      this.executeStep2();
    }, 1000);
  }

  private executeStep2(): void {
    setTimeout(() => {
      this.thinkingAIAssistView.addPromptResponse({
        blocks: [
          {
            blockType: 'thinking',
            title: 'Understanding your request',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
              {
                id: 'step1',
                status: 'completed',
                content: 'Identified request as a business dashboard requirement.'
              }
            ]
          },
          {
            blockType: 'thinking',
            title: 'Selecting UI components',
            collapsible: true,
            collapsed: false,
            isActive: true,
            stages: [
              {
                id: 'step2',
                status: 'inprogress',
                iconCss: 'e-icons e-check',
                content: 'Selected {0}, {1}, and {2} for dashboard layout.',
                editableContext: [
                  {
                    type: 'tool',
                    name: 'Charts',
                    value: 'Analytics visualization'
                  },
                  {
                    type: 'tool',
                    name: 'Grid',
                    value: 'Tabular data'
                  },
                  {
                    type: 'tool',
                    name: 'Cards',
                    value: 'KPI metrics'
                  }
                ]
              }
            ]
          }
        ]
      }, false);

      // Step 3: Designing layout structure
      this.executeStep3();
    }, 1000);
  }

  private executeStep3(): void {
    setTimeout(() => {
      this.thinkingAIAssistView.addPromptResponse({
        blocks: [
          {
            blockType: 'thinking',
            title: 'Understanding your request',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
              {
                id: 'step1',
                status: 'completed',
                content: 'Identified request as a business dashboard requirement.'
              }
            ]
          },
          {
            blockType: 'thinking',
            title: 'Selecting UI components',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
              {
                id: 'step2',
                status: 'completed',
                iconCss: 'e-icons e-check',
                content: 'Selected {0}, {1}, and {2} for dashboard layout.',
                editableContext: [
                  {
                    type: 'tool',
                    name: 'Charts',
                    value: 'Analytics visualization'
                  },
                  {
                    type: 'tool',
                    name: 'Grid',
                    value: 'Tabular data'
                  },
                  {
                    type: 'tool',
                    name: 'Cards',
                    value: 'KPI metrics'
                  }
                ]
              }
            ]
          },
          {
            blockType: 'thinking',
            title: 'Designing layout structure',
            collapsible: true,
            collapsed: false,
            isActive: true,
            stages: [
              {
                id: 'step3',
                status: 'inprogress',
                iconCss: 'e-icons e-check',
                content: 'Created responsive {0} layout structure.',
                editableContext: [
                  {
                    type: 'context',
                    name: '12-column',
                    value: '12-column grid'
                  }
                ]
              }
            ]
          }
        ]
      }, false);

      // Step 4: Finalizing output (FINAL RESPONSE)
      this.executeStep4();
    }, 1000);
  }

  private executeStep4(): void {
    setTimeout(() => {
      this.thinkingAIAssistView.addPromptResponse({
        blocks: [
          {
            blockType: 'thinking',
            title: 'Understanding your request',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
              {
                id: 'step1',
                status: 'completed',
                content: 'Identified request as a business dashboard requirement.'
              }
            ]
          },
          {
            blockType: 'thinking',
            title: 'Selecting UI components',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
              {
                id: 'step2',
                status: 'completed',
                iconCss: 'e-icons e-check',
                content: 'Selected {0}, {1}, and {2} for dashboard layout.',
                editableContext: [
                  {
                    type: 'tool',
                    name: 'Charts',
                    value: 'Analytics visualization'
                  },
                  {
                    type: 'tool',
                    name: 'Grid',
                    value: 'Tabular data'
                  },
                  {
                    type: 'tool',
                    name: 'Cards',
                    value: 'KPI metrics'
                  }
                ]
              }
            ]
          },
          {
            blockType: 'thinking',
            title: 'Designing layout structure',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
              {
                id: 'step3',
                status: 'completed',
                iconCss: 'e-icons e-check',
                content: 'Created responsive {0} layout structure.',
                editableContext: [
                  {
                    type: 'context',
                    name: '12-column',
                    value: '12-column grid'
                  }
                ]
              }
            ]
          },
          {
            blockType: 'thinking',
            title: 'Finalizing output',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
              {
                id: 'step4',
                status: 'completed',
                iconCss: 'e-icons e-check',
                content: 'Generated final dashboard structure successfully.'
              }
            ]
          }
        ],
        response:
          '<h2>Business Dashboard Structure</h2>' +
          '<p><strong>Generated successfully.</strong></p>' +
          '<div class="section">' +
          '<h3>Features Included:</h3>' +
          '<ul>' +
          '<li>Key performance indicator cards</li>' +
          '<li>Revenue and sales charts</li>' +
          '<li>Recent activity data grid</li>' +
          '<li>Responsive layout for all devices</li>' +
          '<li>Clean navigation structure</li>' +
          '</ul>' +
          '</div>' +
          '<div class="section">' +
          '<h3>Recommended Syncfusion Components:</h3>' +
          '<ul>' +
          '<li>Chart</li>' +
          '<li>Grid</li>' +
          '<li>Card</li>' +
          '<li>Sidebar</li>' +
          '<li>DropDownList</li>' +
          '</ul>' +
          '</div>'
      }, true);
    }, 1000);
  }
}
