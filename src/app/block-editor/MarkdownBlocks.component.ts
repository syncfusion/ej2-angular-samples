import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import TurndownService from "turndown";
import { ButtonComponent, ButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import {
  SidebarModule,
  TreeViewModule,
  BreadcrumbModule,
  ToolbarAllModule
} from '@syncfusion/ej2-angular-navigations';
import {
  BlockEditorModule,
  BlockEditorComponent,
} from '@syncfusion/ej2-angular-blockeditor';
import {
  SidebarComponent,
  TreeViewComponent,
} from '@syncfusion/ej2-angular-navigations';
import {
  ItemModel,
  NodeSelectEventArgs,
} from '@syncfusion/ej2-angular-navigations';
import { BlockModel, CommandName, CommandItemModel, BlockType, ContentType } from '@syncfusion/ej2-angular-blockeditor';


@Component({
  imports: [SidebarModule, TreeViewModule, BlockEditorModule, BreadcrumbModule, ToolbarAllModule, ButtonAllModule],
  standalone: true,
  selector: 'app-root',  // Match your route selector
  styleUrls: ['MarkdownBlocks.component.css'],
  templateUrl: 'MarkdownBlocks.html',
})
export class MarkdownBlocksEditor implements OnInit, AfterViewInit {
  @ViewChild('sidebarTreeviewInstance') public sidebarTreeviewInstance?: SidebarComponent;
  @ViewChild('treeviewInstance') public treeviewInstance?: TreeViewComponent;
  @ViewChild('blockEditorInstance') public blockEditorInstance?: BlockEditorComponent;
  @ViewChild('closeBtn', { static: false }) public closeBtn?: ButtonComponent;
  @ViewChild('download') public downloadbtn?: ButtonComponent;

  public width: string = '220px';
  public enableDock: boolean = true;
  public dockSize: string = '33px';
  public mediaQuery: string = '(min-width: 600px)';
  public target: string = '.blockeditor-marked';
  public markdownContent: string = '';
  public turndownService = new TurndownService();
  public sidebarHeaderText: string = 'Markdown Templates';
  public breadcrumbItems: ItemModel[] = [{ text: 'Team' }];
  public editorBlocks: BlockModel[] = [];

  public data: any[] = [
    {
      id: 'Team_Sessions',
      name: 'Team Sessions',
      mdFile: 'assets/block-editor/mdfiles/Team Sessions.md',
      selected: true,
      expanded: true,
      children: [
        { id: '1', name: 'Meeting minutes.md', mdFile: 'assets/block-editor/mdfiles/Meeting minutes.md' },
        { id: '2', name: 'Brain storming.md', mdFile: 'assets/block-editor/mdfiles/Brain storming.md' },
        { id: '3', name: 'Retrospective.md', mdFile: 'assets/block-editor/mdfiles/Retrospective.md' },
      ]
    }
];

  constructor(public http: HttpClient) { }

  public field = {
    dataSource: this.data,
    id: 'id',
    text: 'name',
    child: 'children'
  };

  ngOnInit() {
    this.onClose();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadContent('assets/block-editor/mdfiles/Team Sessions.md');
      this.breadcrumbItems = [{ text: 'Team' }, { text: 'Team Sessions' }];
    }, 100);
  }

  public loadContent(mdFile: string) {
    this.http.get(mdFile, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.markdownContent = MarkdownConverter.toHtml(data) as any;
          if (this.blockEditorInstance && this.markdownContent) {
            try {
              const nodeDatas = this.blockEditorInstance.parseHtmlToBlocks(this.markdownContent);
              this.editorBlocks = nodeDatas;
              this.blockEditorInstance.renderBlocksFromJson(nodeDatas, true);
            } catch (parseErr) {
              this.renderFallbackBlocks(`Parsed content from ${mdFile} failed.`);
            }
          }
        },
        error: (err) => {
          this.renderFallbackBlocks(`Error loading ${mdFile}. Ensure file exists in /assets/.`);
        }
      });
  }
  public commandMenu = {
    popupWidth: '298px',
    popupHeight: '400px',
    commands: [
      {
        id: 'bullet-list-command',
        type: 'BulletList',
        groupBy: 'General',
        label: 'Bullet List',
        tooltip: 'Create a bullet list',
        iconCss: 'e-icons e-list-unordered',
        shortcut: `Ctrl+Shift+8`
      },
      {
        id: 'numbered-list-command',
        type: 'NumberedList',
        groupBy: 'General',
        label: 'Numbered List',
        tooltip: 'Create a numbered list',
        iconCss: 'e-icons e-list-ordered',
        shortcut: `Ctrl+Shift+9`
      },
      {
        id: 'divider-command',
        type: 'Divider',
        groupBy: 'General',
        label: 'Divider',
        tooltip: 'Add a horizontal line',
        iconCss: 'e-icons e-be-divider',
        shortcut: `Ctrl+Shift+-`
      },
      {
        id: 'code-command',
        type: 'Code',
        groupBy: 'Insert',
        label: 'Code',
        tooltip: 'Insert a code block',
        iconCss: 'e-icons e-insert-code',
        shortcut: `Ctrl+Alt+k`
      },
      {
        id: 'table-command',
        type: 'Table',
        groupBy: 'Insert',
        label: 'Table',
        tooltip: 'Insert a table block',
        iconCss: 'e-icons e-table-2',
        shortcut: `Ctrl+Alt+T`
      },
      {
        id: 'paragraph-command',
        type: 'Paragraph',
        groupBy: 'Text Styles',
        label: 'Paragraph',
        tooltip: 'Add a paragraph',
        iconCss: 'e-icons e-be-paragraph',
        shortcut: `Ctrl+Alt+P`
      },
      {
        id: 'heading1-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 1',
        tooltip: 'Page title or main heading',
        iconCss: 'e-icons e-be-h1',
        shortcut: `Ctrl+Alt+1`
      },
      {
        id: 'heading2-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 2',
        tooltip: 'Section heading',
        iconCss: 'e-icons e-be-h2',
        shortcut: `Ctrl+Alt+2`

      },
      {
        id: 'heading3-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 3',
        tooltip: 'Subsection heading',
        iconCss: 'e-icons e-be-h3',
        shortcut: `Ctrl+Alt+3`
      },
      {
        id: 'heading4-command',
        type: 'Heading',
        groupBy: 'Text Styles',
        label: 'Heading 4',
        tooltip: 'Smaller heading for nested content',
        iconCss: 'e-icons e-be-h4',
        shortcut: `Ctrl+Alt+4`
      },
      {
        id: 'quote-command',
        type: 'Quote',
        groupBy: 'Text Styles',
        label: 'Quote',
        tooltip: 'Insert a quote block',
        iconCss: 'e-icons e-blockquote',
        shortcut: `Ctrl+Alt+Q`
      }
    ],
  }

  public customToolbarItems: string[] = [ 'Bold', 'Italic', 'Underline', 'Strikethrough' ];

  public inlineToolbar = {
    width: '180px',
    enable: true,
    items: this.customToolbarItems,
    enableTooltip: true
  }

  public renderFallbackBlocks(message: string) {
    this.editorBlocks = [{
      id: 'fallback-block',
      blockType: 'Paragraph',
      content: [{ id: 'fallback-t', contentType: 'Text', content: message }],
      properties: { placeholder: 'Fallback content' },
      indent: 0,
    }];
  }

  public onOpen() {
    (this.treeviewInstance).expandAll();
    if (this.closeBtn?.element) {
      this.closeBtn.element.style.left = '207px';
      this.closeBtn.element.classList.remove('expand-mode');
    }
    if (this.treeviewInstance) {
      (this.treeviewInstance).expandAll();
      this.treeviewInstance.element.style.display = "block";
    }
  }

  public onClose() {
    if (this.closeBtn?.element) {
      this.closeBtn.element.style.left = '18px';
      this.closeBtn.element.classList.add('expand-mode');
    }
    if (this.treeviewInstance) {
      this.treeviewInstance.element.style.display = "none";
    }
  }

  public openClick() {
    this.sidebarTreeviewInstance?.toggle();
  }

  public formatBreadcrumbText(name: string): string {
    return name?.endsWith('.md') ? name.replace(/\.md$/i, '') : name;
  }

  public downloadMarkdown(): void {
    if (!this.blockEditorInstance) {
      return;
    }

    // Get current editor content as HTML from the BlockEditor
    let htmlContent = '';
    try {
      // Ensure your BlockEditor version exposes this API
      htmlContent = this.blockEditorInstance.getDataAsHtml();
    } catch (e) {
      return;
    }

    // Convert HTML => Markdown
    const markdownContent = this.turndownService.turndown(htmlContent || '');

    // Derive filename from the last breadcrumb item, fallback to document.md
    let fileName = 'document.md';
    const lastCrumb = this.breadcrumbItems?.[this.breadcrumbItems.length - 1]?.text;
    if (lastCrumb) {
      // Basic sanitization for filename
      const safe = lastCrumb.replace(/[\\/:*?"<>|]+/g, '').trim() || 'document';
      fileName = `${safe}.md`;
    }

    // Trigger download via Blob + temporary anchor
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    try {
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
    } finally {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  public onNodeSelected(args: NodeSelectEventArgs): void {
    const selectedId = args.nodeData.id as string;
    if (selectedId === 'Team_Sessions') {
      this.breadcrumbItems = [{ text: 'Team' }, { text: 'Team Sessions' }];
      // Load the parent's Markdown file
      this.loadContent('assets/block-editor/mdfiles/Team Sessions.md');
      return;
    }
    const findNodeById = (nodes: any[], id: string): any | undefined => {
      for (const n of nodes) {
        if (n.id === id) return n;
        if (n.children?.length) {
          const found = findNodeById(n.children, id);
          if (found) return found;
        }
      }
      return undefined;
    };

    const selectedNode = findNodeById(this.data, selectedId);

    if (selectedNode?.mdFile) {
      this.loadContent(selectedNode.mdFile);
      const isUnderGuideline = !!args.nodeData.parentID && args.nodeData.parentID === 'Team_Sessions';
      if (isUnderGuideline) {
        this.breadcrumbItems = [
          { text: 'Team' },
          { text: 'Team Sessions' },
          { text: this.formatBreadcrumbText(selectedNode.name) }
        ];
      } else {
        this.breadcrumbItems = [
          { text: 'Team' },
          { text: this.formatBreadcrumbText(selectedNode.name) }
        ];
      }
    }
  }

}