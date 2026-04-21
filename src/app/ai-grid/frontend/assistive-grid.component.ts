import { Component, ViewChild, TemplateRef, Inject, ElementRef, Renderer2 } from '@angular/core';
import { GridAllModule, GridComponent, ToolbarService, SortService, FilterService, GroupService, PageService, FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { AIAssistViewComponent, AIAssistViewModule, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { purchaseDetails } from './datasource';
import {AIToastComponent} from '../../common/ai-toast.component'; 
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { fetchAI } from '../model/ai-input';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-assistive-grid',
  imports: [GridAllModule, ToastModule, AIToastComponent, AIAssistViewModule, DialogModule, CommonModule],
  providers: [ToolbarService, SortService, FilterService, GroupService, PageService],
  templateUrl: './assistive-grid.component.html',
  styleUrl: './assistive-grid.component.css',
  standalone: true
})
export class AssistiveGrid {
  constructor(@Inject('sourceFiles') private sourceFiles: any, private renderer: Renderer2) {
    this.sourceFiles.files = [
      'ai-assistive-grid.component.html',
      'assistive-grid.component.css',
    ];
  }
  @ViewChild('grid') grid!: GridComponent;
  @ViewChild('dialog') dialog!: DialogComponent;
  @ViewChild('assistView') assistView!: AIAssistViewComponent;

  public data = purchaseDetails;

  public pageSettings = { pageSize: 12 };

  public filterSettings: FilterSettingsModel = { type: 'Excel' };

  public toolbarOptions: any = [
    { text: 'AI Assist', tooltipText: 'AI Assist', prefixIcon: 'e-assistview-icon', id: 'ai-assist-btn', align: 'Right' }
  ];

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
      this.grid.sortSettings = { columns: [] };
      this.grid.filterSettings = { columns: [] };
      this.grid.groupSettings = { columns: [] };
      this.grid.pageSettings = { pageSize: 12, currentPage: 1 };
      this.grid.refresh();
    }
  }
  };

  public suggestions: string[] = [
    "Filter iPhone 15 Pro",
    "Sort Amount from lowest to highest",
    "Payment status completed",
    "Group status column",
    "Clear Filtering",
    "Clear Sorting",
    "Remove Grouping"
  ];

  private clickListener!: () => void;

  ngAfterViewInit(): void {
    // Listen for clicks on the entire document
    this.clickListener = this.renderer.listen('document', 'mousedown', (event: MouseEvent) => {
      if (!this.dialog?.visible) return;
      const dialogElement = document.getElementById('ai-assist-dialog');
      if (dialogElement && !dialogElement.contains(event.target as Node)) {
        const clickedOnToolbarBtn = (event.target as HTMLElement)?.closest('#ai-grid_toolbar_ai-assist-btn');
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
          const gridRect = this.grid.element.getBoundingClientRect();
          const toolbarRect = document.getElementById('ai-grid_toolbarItems')!.getBoundingClientRect();
          const targetRect = (args.originalEvent.target as HTMLElement).closest('.e-toolbar-item')!.getBoundingClientRect();
          const x = targetRect.left - gridRect.left - (parseInt(this.dialog.width.toString()));
          const y = (toolbarRect.top + toolbarRect.height) - gridRect.top;
          this.dialog.position = { X: x, Y: y };
          this.dialog.show();
      }
    }

  // AI Prompt Request
  onPromptRequest(args: PromptRequestEventArgs): void {
    this.assistView.scrollToBottom();
    const columns = (this.grid.columns as any[])
      .map((col: any) => col.field)
      .filter(field => field);
    fetchAI(args.prompt, this.grid, this.assistView, columns);
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
}