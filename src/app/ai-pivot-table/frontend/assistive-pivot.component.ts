import { Component, ViewChild, TemplateRef, Inject, ElementRef, Renderer2 } from '@angular/core';
import { PivotViewModule, PivotViewComponent, CalculatedFieldService, ToolbarService, ConditionalFormattingService, FieldListService, NumberFormattingService, GroupingBarService, IDataOptions, ToolbarItems, DisplayOption } from '@syncfusion/ej2-angular-pivotview';
import { AIAssistViewComponent, AIAssistViewModule, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { pivotProductData } from './datasource';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import {AIToastComponent} from '../../common/ai-toast.component'; 
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { fetchAI } from '../model/ai-input';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-assistive-pivot',
  imports: [PivotViewModule, ToastModule, AIToastComponent, AIAssistViewModule, DialogModule, CommonModule],
  providers: [CalculatedFieldService, ToolbarService, ConditionalFormattingService, FieldListService, NumberFormattingService, GroupingBarService],
  templateUrl: './assistive-pivot.component.html',
  styleUrl: './assistive-pivot.component.css',
  standalone: true
})
export class AssistivePivot {
  constructor(@Inject('sourceFiles') private sourceFiles: any, private renderer: Renderer2) {
    this.sourceFiles.files = [
      'ai-assistive-pivot.component.html',
      'assistive-pivot.component.css',
    ];
  }
  @ViewChild('pivotview') pivotObj!: PivotViewComponent;
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('assistView') assistView!: AIAssistViewComponent;

  public data = pivotProductData;
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public toolbarOptions: ToolbarItems[];
  public displayOption: DisplayOption;

  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      { tooltip: 'Start New Chat', iconCss: 'e-icons e-rename', align: 'Right' },
      { tooltip: 'Clear', iconCss: 'e-icons e-refresh', align: 'Right' },
      { tooltip: 'Close', iconCss: 'e-icons e-icon-dlg-close', align: 'Right' }
    ],
    itemClicked: (args: any): void => {
    if (args.item.iconCss.includes('e-icon-dlg-close')) {
      this.dialog.hide();
    }
    if (args.item.iconCss.includes('e-rename')) {
      this.assistView.prompts = [];
    }
    if (args.item.iconCss.includes('e-refresh')) {
      this.assistView.prompts = [];
      this.pivotObj.setProperties({
        dataSourceSettings: this.dataSourceSettings,
        displayOption: { view: 'Both', primary: 'Table' }
      });
      this.pivotObj.refresh();
    }
  }
  };

  public suggestions: string[] = [
    "Sort Country field by descending",
    "Show only data from France and Germany",
    "Change the Sold field aggregation from sum to avg",
    "Clear filtering"
  ];

  private clickListener!: () => void;

  ngAfterViewInit(): void {
    // Listen for clicks on the entire document
    this.clickListener = this.renderer.listen('document', 'mousedown', (event: MouseEvent) => {
      if (!this.dialog?.visible) return;
      const dialogElement = document.getElementById('ai-assist-dialog');
      if (dialogElement && !dialogElement.contains(event.target as Node)) {
        const clickedOnToolbarBtn = (event.target as HTMLElement)?.closest('#ai-assist-btn');
        if (!clickedOnToolbarBtn) {
          this.dialog.hide();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Always clean up the listener to prevent memory leaks
    if (this.clickListener) {
      this.clickListener();
    }
  }

  // Toolbar click handler
  toolbarClick = (args: any) => {
      if (args.item.id === 'ai-assist-btn') {
          const gridRect = this.pivotObj.element.getBoundingClientRect();
          const toolbarRect = document.getElementById('ai-pivotpivot-toolbar')!.getBoundingClientRect();
          const targetRect = (args.originalEvent.target as HTMLElement).closest('.e-toolbar-item')!.getBoundingClientRect();
          const x = targetRect.left - (parseInt(this.dialog.width.toString()));
          const y = (toolbarRect.top + toolbarRect.height);
          this.dialog.position = { X: x, Y: y };
          this.dialog.show();
      }
    }

  // AI Prompt Request
  onPromptRequest(args: PromptRequestEventArgs): void {
    this.assistView.scrollToBottom();
    const dataSourceSettings = JSON.parse(this.pivotObj.getPersistData()).dataSourceSettings;
    fetchAI(args.prompt, this.pivotObj, this.assistView, dataSourceSettings);
  }

  // Response template function
  responseTemplate(props: any): string {
    return `
      <div class="response-item-content">
        <div class="response-header">
          <span class="e-icons e-assistview-icon"></span>
          ${props.response}
        </div>
      </div>
    `;
  }

  // Suggestion item click
  onSuggestionClick(text: string): void {
    this.assistView.executePrompt(text);
  }

  beforeToolbarRender(args: any): void {
    for (var i = 0; i < args.customToolbar.length; i++) {
      var prefixIcon = args.customToolbar[i].prefixIcon ? args.customToolbar[i].prefixIcon : '';
      if (prefixIcon.includes('e-toolbar-fieldlist')) {
        delete args.customToolbar[i].align;
      }
    }
  }
  
  ngOnInit(): void {
    this.displayOption = { view: 'Both', primary: 'Table' } as DisplayOption;
    this.gridSettings = {
      columnWidth: 140,
    } as GridSettings;

    this.toolbarOptions = ['FieldList', 'Grid', 'Chart', {text: 'AI Assist', tooltipText: 'AI Assist', prefixIcon: 'e-assistview-icon', id: 'ai-assist-btn', align: 'Right', click: this.toolbarClick.bind(this) }] as ToolbarItems[];

    this.dataSourceSettings = {
      enableSorting: true,
      allowLabelFilter: true,
      allowValueFilter: true,
      columns: [{name: 'Year'}, {name: 'Quarter'}],
      rows: [{ name: 'Country', expandAll: true}, {name: 'Product_Categories'}],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      dataSource: pivotProductData,
      expandAll: false,
      values: [{ name: 'Sold', caption: 'Units Sold' },
      { name: 'Amount', caption: 'Sold Amount' }],
      sortSettings: [{name: 'Year', order:"Ascending"}],
      filterSettings: [{name: 'Quarter', items: ['Q3'], type: 'Exclude'}],
      conditionalFormatSettings: [
          {
              measure: 'Amount',
              value1: 250000,
              conditions: 'LessThan',
              style: {
                  backgroundColor: '#FF005C',
                  color: 'white',
                  fontFamily: 'Tahoma',
                  fontSize: '12px'
              },
              applyGrandTotals: false
          },
          {
              value1: 10000,
              measure: 'Sold',
              conditions: 'GreaterThan',
              style: {
                  backgroundColor: '#35B65A',
                  color: 'white',
                  fontFamily: 'Tahoma',
                  fontSize: '12px'
              },
              applyGrandTotals: false
          }
      ],
      showSubTotals: false
    };
  }
}