import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { AIAssistViewAllModule, AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel, ToolbarItemClickedEventArgs, ResponseToolbarSettingsModel, FooterToolbarSettingsModel, AttachmentSettingsModel, SpeechToTextSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { AIAssistView, AssistThinking } from '@syncfusion/ej2-interactive-chat';
import { defaultPromptResponseData, overviewSuggestions } from './promptResponseData';
import { Browser } from '@syncfusion/ej2-base';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { getAIResponse } from '../common/ai-service';

@Component({
  selector: 'control-content',
  imports: [AIAssistViewAllModule, ChartAllModule],
  standalone: true,
  templateUrl: 'ai-overview.html',
  styleUrls: ['ai-overview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AIAssistOverviewComponent {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
      sourceFiles.files = ['ai-overview.component.css'];
      AIAssistView.Inject(AssistThinking);
  }

  @ViewChild('overviewAIAssistView')
  public overviewAIAssistView: AIAssistViewComponent;

  @ViewChild('responseChartTemplate')
  public responseChartTemplate: any;

  // Chart props
  public width: string = Browser.isDevice ? '100%' : '75%';
  public title: string = 'Weather Data';
  public tooltip: Object = {
      enable: true,
      enableHighlight: true
  };
  public legend: Object = {
      visible: true
  };
  public marker1: Object = {
    visible: true,
    width: 7,
    height: 7
  };
  public marker2: Object = {
    visible: true,
    width: 7,
    height: 7,
    isFilled: true
  };
  public chartArea: Object = {
      border: {
          width: 0
      }
  };
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
      valueType: 'Category',
      majorGridLines: { width: 0 },
      minorGridLines: { width: 0 },
      majorTickLines: { width: 0 }
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
      minimum: 0,
      maximum: 100,
      interval: 20,
      lineStyle: { width: 0 },
      majorTickLines: { width: 0 },
      labelFormat: '{value}°F',
  };
  
  public axis: Object = [{
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    rowIndex: 0, opposedPosition: true,
    lineStyle: { width: 0 },
    minimum: 24, maximum: 36, interval: 2,
    name: 'yAxis',
    labelFormat: '{value}°C'
  }];

  public enableStreaming: boolean = true;
  public prompts: { [key: string]: string | string[] }[] = defaultPromptResponseData;
  public suggestions: string[] = overviewSuggestions;

  public toolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right', tooltip: 'Start new chat' }],
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
      if (args.item.iconCss === 'e-icons e-refresh') {
        this.overviewAIAssistView.prompts = [];
      }
    }
  };

  /**
   * Angular lifecycle hook - Register tools after view initialization
    */
  ngAfterViewInit(): void {
      this.registerTools();
      this.overviewAIAssistView.prompts = this.defaultPrompts;
  }

  private registerTools(): void {
    if (!this.overviewAIAssistView) return;

    // Register Chart Tool using Angular ChartComponent
    (this.overviewAIAssistView as any).registerToolUI({
      toolName: 'weather-chart',
      template: this.responseChartTemplate as any,
    });
  }

  public defaultPrompts: any = [
        {
            prompt: 'How does the weather vary throughout the week in Germany and Japan?',
            blocks: [
            {
                blockType: 'thinking',
                title: 'Thinking',
                collapsible: true,
                collapsed: true,
                isActive: false,
                stages: [
                    {
                            iconCss: 'e-icons e-search',
                            status: 'completed',
                            content: 'Searching for weather data from external sources and retrieving weekly forecasts for both Germany and Japan.',
                            editableContext: [
                                { name: 'Query Type', value: 'Weather Analysis', type: 'Variable' }
                            ]
                        }
                ]
            },
            {
                blockType: 'text',
                content: '**Weekly Weather Overview**<p>The chart below shows temperature variations across the week. The column series represents daily temperature highs, while the spline series reflects a smoother trend of average temperatures.</p>'
            },
            {
                blockType: 'tool',
                toolName: 'weather-chart',
                props: {
                    columnData: [
                        { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
                        { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
                        { x: 'Sat', y: 50 }
                    ],
                    splineData:  [
                        { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
                        { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
                        { x: 'Sat', y: 34 }
                    ]
                }
            },
            {
                blockType: 'text',
                content: '**Key Insights:** The bar values indicate a sharp temperature spike on Tuesday and Wednesday, suggesting very hot conditions mid-week. Meanwhile, the spline line shows a relatively stable average temperature trend throughout the week. This difference highlights short-term heat surges compared to overall steady climatic conditions.'
            }]
        }
    ];

  public footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Bottom',
    items: [
      { iconCss: 'e-icons e-assist-send', align: 'Right' },
      { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left', tooltip: 'Attach File' },
      { iconCss: 'e-icons e-assist-speech-to-text', align: 'Left' }
    ]
  };

  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
      { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
      { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' }
    ]
  };

  public enableAttachments: boolean = true;
  public attachmentSettings: AttachmentSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/angular/production/api/FileUploader/Remove'
  };

  public speechToTextSettings: SpeechToTextSettingsModel = { enable: true };

  private abortController?: AbortController;

  public promptRequest = async (args: PromptRequestEventArgs) => {
    this.abortController = new AbortController();
    let foundPrompt = (this.prompts || []).find((p) => (p as any).prompt === args.prompt);
    let responseHtml = foundPrompt
      ? ((foundPrompt as any).regeneratedResponses ? this.getRandomResponse((foundPrompt as any).regeneratedResponses) : (foundPrompt as any).response)
      : await getAIResponse(args as any, this.abortController);

    this.overviewAIAssistView.addPromptResponse(responseHtml);
    this.overviewAIAssistView.promptSuggestions = ((foundPrompt as any)?.suggestions || this.suggestions || []);
  };

  private getRandomResponse = (regeneratedResponses: any): string => {
    if (Array.isArray(regeneratedResponses)) {
      return regeneratedResponses[Math.floor(Math.random() * regeneratedResponses.length)];
    }
    return regeneratedResponses;
  };
}