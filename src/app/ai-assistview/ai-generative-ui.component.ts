import { Component, ViewChild, ViewEncapsulation, Inject, AfterViewInit } from '@angular/core';
import {
  AIAssistViewModule,
  AIAssistViewComponent,
  PromptRequestEventArgs,
  ToolbarItemClickedEventArgs,
  ToolbarSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';
import { CommonModule } from '@angular/common';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { Browser } from '@syncfusion/ej2-base';
import { generativeSuggestions, promptsData, toolSystemPrompt } from './promptResponseData';
import { getAIResponse } from '../common/ai-service';

/**
 * Generative UI Component
 */
@Component({
  selector: 'control-content',
  templateUrl: 'ai-generative-ui.html',
  styleUrls: ['ai-generative-ui.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [AIAssistViewModule, GridModule, ChartAllModule, CommonModule]
})
export class AIAssistGenerativeUIComponent implements AfterViewInit {
  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['ai-generative-ui.component.css'];
  }

  @ViewChild('generativeAIAssistView')
  public generativeAIAssistView: AIAssistViewComponent;

  @ViewChild('responseChartTemplate')
  public responseChartTemplate: any;

  @ViewChild('responseGridTemplate')
  public responseGridTemplate: any;

  @ViewChild('responseCardTemplate')
  public responseCardTemplate: any;

  // Configuration Properties
  public currentChartConfig: any = {};
  public currentGridConfig: any = {};
  public promptSuggestionsHeader: string = 'Suggested Prompts';
  public enableStreaming: boolean = true;
  public showClearButton: boolean = true;
  public promptSuggestions: string[] = generativeSuggestions;
  public prompts: any = [];

  // Chart Props

  public primaryXAxis: Object = {
      valueType: 'Category',
      title: this.currentChartConfig.xAxisTitle || this.currentChartConfig.xField,
      labelIntersectAction: 'Rotate45',
  };

  public primaryYAxis: Object = {
      title: this.currentChartConfig.yAxisTitle || this.currentChartConfig.yField,
  };

  public legend: Object = {
      visible: this.currentChartConfig.enableLegend !== false
  };

  public tooltip: Object = {
    enable: this.currentChartConfig.enableTooltip !== false,
  };
  public marker1: Object = {
    visible: true,
  };

  // Grid props

  public pageOptions: Object = {
    pageSize: 8,
  };

  public assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
      if (args.item.iconCss === 'e-icons e-refresh') {
        this.generativeAIAssistView.prompts = [];
        this.generativeAIAssistView.promptSuggestions = this.promptSuggestions;
      }
    }
  };

  /**
   * Angular lifecycle hook - Register tools after view initialization
   */
  ngAfterViewInit(): void {
      this.registerTools();
      this.generativeAIAssistView.prompts = promptsData;
  }

  private processChartConfig(args: any): any {
    const chartConfig = {
      dataSource: args.dataSource || args.data || [],
      xField: args.xField || args.xName,
      yField: args.yField || args.yName,
      chartType: args.chartType || args.type || 'Line',
      title: args.title || '',
      xAxisTitle: args.xAxisTitle,
      yAxisTitle: args.yAxisTitle,
      enableTooltip: args.enableTooltip,
      enableLegend: args.enableLegend
    };

    if (chartConfig.chartType === 'Pie' || chartConfig.chartType === 'Doughnut') {
      chartConfig.chartType = 'Line';
    }

    this.currentChartConfig = chartConfig;
  }

  private processGridConfig(args: any): void {
    const data = args.data || [];
    const gridConfig = {
      data: data,
      columns: args.columns || 
        (data.length ? Object.keys(data[0]).map((field: string) => {
          return {
            field: field,
            headerText: field,
            width: 150
          };
        }) : [])
    };

    this.currentGridConfig = gridConfig;
  }

  /**
   * Register custom tools for rendering in AI responses using Angular Components
   */
  private registerTools(): void {
    if (!this.generativeAIAssistView) return;

    // Register Weather Card Tool
    (this.generativeAIAssistView as any).registerToolUI({
      toolName: 'weather-card',
      template: this.responseCardTemplate as any,
    });

    // Register Chart Tool using Angular ChartComponent
    (this.generativeAIAssistView as any).registerToolUI({
      toolName: 'chart-tool',
      template: this.responseChartTemplate as any,
      handler: (container: any, args: any) => {
        this.processChartConfig(args);
      }
    });

    // Register Grid Tool using Angular GridComponent
    (this.generativeAIAssistView as any).registerToolUI({
      toolName: 'grid-tool',
      template: this.responseGridTemplate as any,
      handler: (container: any, args: any) => {
        this.processGridConfig(args);
      }
    });
  }

  public onPromptRequest = async (args: PromptRequestEventArgs) => {
    try {
      const aiArgs = {
        prompt: args.prompt,
        systemPrompt: toolSystemPrompt
      };
      const reply = await getAIResponse(aiArgs);
      const jsonText = reply.response || '{}';
      const aiData = JSON.parse(jsonText);

      this.generativeAIAssistView.addPromptResponse({ 
        blocks: aiData.blocks || [{ blockType: 'text', content: "We could not reach the AI service; please try again later." }] 
      });
    } catch (error) {
      this.generativeAIAssistView.addPromptResponse("We could not reach the AI service; please try again later.");
    }
  };
}
