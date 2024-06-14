import { Component, ViewChild, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { FileMenuSettingsModel, RibbonButtonSettingsModel, RibbonSplitButtonSettingsModel, RibbonComboBoxSettingsModel, RibbonDropDownSettingsModel, RibbonItemSize, RibbonCheckBoxSettingsModel, RibbonColorPickerSettingsModel, LauncherClickEventArgs, DisplayMode, FileMenuEventArgs, RibbonGroupButtonSettingsModel, RibbonGroupButtonSelection  } from '@syncfusion/ej2-ribbon';
import { MenuItemModel } from "@syncfusion/ej2-navigations";
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { SliderChangeEventArgs, SliderComponent, SliderAllModule } from '@syncfusion/ej2-angular-inputs';
import { ToastComponent, ToastAllModule } from '@syncfusion/ej2-angular-notifications';
import { RibbonComponent, RibbonAllModule } from '@syncfusion/ej2-angular-ribbon';
import { SelectEventArgs as SelectListEventArgs } from "@syncfusion/ej2-lists";
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';

@Component({
    selector: 'control-content',
    templateUrl: 'resize.html',
    styleUrls: ['resize.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RibbonAllModule, SliderAllModule, ToastAllModule, ListViewAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RibbonResizeComponent {
  @ViewChild('toast') toastObj: ToastComponent;
  @ViewChild('ribbon') ribbon: RibbonComponent;
  @ViewChild('slider') slider: SliderComponent; ;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['resize.component.css'];
  }

  public pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge Format" }, { text: "Keep Text Only" }];
  public findOptions: ItemModel[] = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced Find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
  public selectOptions: ItemModel[] = [{ text: "Select All" }, { text: "Select Objects" }];
  public dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
  public tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "Draw Table" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
  public shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
  public headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
  public footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
  public pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Insert Bottom of page" }, { text: "Format Page Number" }];
  public linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];

  public groupButtonMultiple: RibbonGroupButtonSettingsModel = {
    selection: RibbonGroupButtonSelection.Multiple,
    header: 'Format Styles',
    items: [
      { iconCss: 'e-icons e-bold', content: 'Bold', selected: true, click: () => { this.updateContent("Bold") } }, 
      {iconCss: 'e-icons e-italic', content: 'Italic', click: () => { this.updateContent("Italic") }}, 
      {iconCss: 'e-icons e-underline', content: 'Underline', click: () => { this.updateContent("Underline") }}, 
      {iconCss: 'e-icons e-strikethrough', content: 'Strikethrough', click: () => { this.updateContent("Strikethrough") }}, 
      {iconCss: 'e-icons e-change-case', content: 'Change Case', click: () => { this.updateContent("Change Case") }}]
  };
  public groupButtonSingle: RibbonGroupButtonSettingsModel = { 
    selection: RibbonGroupButtonSelection.Single,
    header: 'Alignment',
    items: [
      {iconCss: 'e-icons e-align-left', selected: true, click: () => { this.updateContent("Align Left") }},
      {iconCss: 'e-icons e-align-center', click: () => { this.updateContent("Align Center") }}, 
      {iconCss: 'e-icons e-align-right', click: () => { this.updateContent("Align Right") }}, 
      {iconCss: 'e-icons e-justify', click: () => { this.updateContent("Justify") }}
    ]
  }

  public decreaseIndent: RibbonButtonSettingsModel = { iconCss: "e-icons e-decrease-indent", content: 'Decrease Indent', clicked: () => { this.updateContent("Decrease Indent"); } };
  public increaseIndent: RibbonButtonSettingsModel = { iconCss: "e-icons e-increase-indent", content: 'Increase Indent', clicked: () => { this.updateContent("Increase Indent"); } };
  public paragraphBtn: RibbonButtonSettingsModel = { iconCss: "e-icons e-paragraph", content: 'Paragraph', clicked: () => { this.updateContent("Paragraph Mark"); } };
  public pasteSettings: RibbonSplitButtonSettingsModel = { iconCss: 'e-icons e-paste', items: this.pasteOptions, content: 'Paste', select: (args) => { this.updateContent("Paste -> " + args.item.text); }, click: () => { this.updateContent("Paste"); } };
  public findSettings: RibbonSplitButtonSettingsModel = { iconCss: "e-icons e-search", content: "Find", items: this.findOptions, select: (args) => { this.updateContent("Find -> " + args.item.text); }, click: () => { this.updateContent("Find"); } };
  public selectSettings: RibbonSplitButtonSettingsModel = { iconCss: "e-icons e-mouse-pointer", content: "Select", items: this.selectOptions, select: (args) => { this.updateContent("Select -> " + args.item.text); }, click: () => { this.updateContent("Select"); } };
  public dictateSettings: RibbonSplitButtonSettingsModel = { iconCss: "sf-icon-dictate", content: "Dictate", items: this.dictateOptions, select: (args) => { this.updateContent("Dictate -> " + args.item.text); }, click: () => { this.updateContent("Dictate"); } };
  public tableSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-table", content: "Table", items: this.tableOptions, select: (args) => { this.updateContent("Table -> " + args.item.text); } };
  public pictureSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-image", content: "Picture", target: '#resize-pictureList' };
  public shapeSettings: RibbonDropDownSettingsModel = { iconCss: "sf-icon-shapes", content: "Shapes", items: this.shapeOptions, select: (args) => { this.updateContent("Shapes -> " + args.item.text); } };
  public headerSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-header", content: "Header", items: this.headerOptions, select: (args) => { this.updateContent("Header -> " + args.item.text); } };
  public footerSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-footer", content: "Footer", items: this.footerOptions, select: (args) => { this.updateContent("Footer -> " + args.item.text); } };
  public pageSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-page-numbering", content: "Page Number", items: this.pageOptions, select: (args) => { this.updateContent("Page Number -> " + args.item.text); } };
  public linkSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-link", content: "Link", items: this.linkOptions, select: (args) => { this.updateContent("Link -> " + args.item.text); } };

  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut", clicked: () => { this.updateContent("Cut"); this.enablePaste(); } };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy", clicked: () => { this.updateContent("Copy"); this.enablePaste(); } };
  public formatButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: () => { this.updateContent("Format Painter"); } };
  public boldButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-bold", content: "Bold", isToggle: true, clicked: () => { this.updateContent("Bold"); } };
  public italicButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-italic", content: "Italic", isToggle: true, clicked: () => { this.updateContent("Italic"); } };
  public underlineButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-underline", content: "Underline", isToggle: true, clicked: () => { this.updateContent("Underline"); } };
  public strikethroughButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-strikethrough", content: "Strikethrough", isToggle: true, clicked: () => { this.updateContent("Strikethrough"); } };
  public changecaseButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-change-case", content: "Change Case", isToggle: true, clicked: () => { this.updateContent("Change Case"); } };
  public replaceButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-replace", content: "Replace", clicked: () => { this.updateContent("Replace"); } };
  public editorButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-editor", content: "Editor", clicked: () => { this.updateContent("Editor"); } };
  public reuseButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: () => { this.updateContent("Reuse Files"); } };
  public modelButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-3d-model", content: "3D Models", clicked: () => { this.updateContent("3D Models"); } };
  public smartButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-smart-art", content: "Smart Art", clicked: () => { this.updateContent("Smart Art"); } };
  public chartButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-chart", content: "Chart", clicked: () => { this.updateContent("Chart"); } };
  public screenshotButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-screenshot", content: "Screenshot", clicked: () => { this.updateContent("Screenshot"); } };
  public commentButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-comment-add", content: "New Comment", clicked: () => { this.updateContent("New Comment"); } };
  public readButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-read", content: "Read Mode", clicked: () => { this.updateContent("Read Mode"); } };
  public printButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-print", content: "Print Layout", clicked: () => { this.updateContent("Print Layout"); } };
  public zoominButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-zoom-in", content: "Zoom In", clicked: () => { this.updateContent("Zoom In"); } };
  public zoomoutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-zoom-out", content: "Zoom Out", clicked: () => { this.updateContent("Zoom Out"); } };
  public webButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-web-layout", content: "Web Layout", clicked: () => { this.updateContent("Web Layout"); } };
  public darkButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-mode", content: "Dark Mode", clicked: () => { this.updateContent("Dark Mode"); } };

  public fontSize: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26", "28", "36", "48", "72", "96"];
  public fontStyle: string[] = ["Algerian", "Arial", "Calibri", "Cambria", "Cambria Math", "Courier New", "Candara", "Georgia", "Impact", "Segoe Print", "Segoe Script", "Segoe UI", "Symbol", "Times New Roman", "Verdana", "Windings"];

  public fontstyleSettings: RibbonComboBoxSettingsModel = { dataSource: this.fontStyle, label: 'Font Style', index: 3, width: '115px', popupWidth: '150px', allowFiltering: true, change: (args) => { if (args.itemData) { this.updateContent("Font Style -> " + args.itemData.text); } } };
  public fontsizeSettings: RibbonComboBoxSettingsModel = { dataSource: this.fontSize, label: 'Font Size', index: 3, width: '65px', popupWidth: '85px', allowFiltering: true, change: (args) => { if (args.itemData) { this.updateContent("Font Size -> " + args.itemData.text); } } };

  public colorSettings: RibbonColorPickerSettingsModel = { value: '#123456', change: (args) => { this.updateContent(args.currentValue.hex + " color"); } };

  public ruler: RibbonCheckBoxSettingsModel = { label: "Ruler", checked: false, change: () => { this.updateContent("Ruler"); } };
  public grid: RibbonCheckBoxSettingsModel = { label: "Gridlines", checked: false, change: () => { this.updateContent("Gridlines"); } };
  public navigation: RibbonCheckBoxSettingsModel = { label: "Navigation Pane", checked: false, change: () => { this.updateContent("Navigation Pane"); } };

  public fileOptions: MenuItemModel[] = [{ text: "New", iconCss: "e-icons e-file-new", id: "new" },
  { text: "Open", iconCss: "e-icons e-folder-open", id: "Open" },
  { text: "Rename", iconCss: "e-icons e-rename", id: "rename" },
  {
    text: "Save as", iconCss: "e-icons e-save", id: "save",
    items: [
      { text: "Microsoft Word (.docx)", iconCss: "sf-icon-word", id: "newword" },
      { text: "Microsoft Word 97-2003(.doc)", iconCss: "sf-icon-word", id: "oldword" },
      { text: "Download as PDF", iconCss: "e-icons e-export-pdf", id: "pdf" }]
  }]

  public fileSettings: FileMenuSettingsModel = {
    menuItems: this.fileOptions,
    visible: true,
    select: (args: FileMenuEventArgs) => {
      if (args.item.id === "newword" || args.item.id === "oldword" || args.item.id === "pdf") {
        this.updateContent("File -> Save as -> " + args.item.text);
      }
      else {
        this.updateContent("File -> " + args.item.text);
      }
    }
  };

  public largeSize: RibbonItemSize = RibbonItemSize.Large;
  public smallSize: RibbonItemSize = RibbonItemSize.Small;

  public colorPickerDisplayMode: DisplayMode = DisplayMode.Simplified | DisplayMode.Classic;
  public Overflow: DisplayMode = DisplayMode.Overflow;

  public position = { X: 'Right' };
  public animation = { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } };

  public container = document.getElementById('ribbonContainer');
  public max = this.container?.offsetWidth
  public value = this.container?.offsetWidth;

  public pictureList: Object = [
    { text: 'This Device' },
    { text: 'Stock Images' },
    { text: 'Online Images' }];

  public listItem (args: SelectListEventArgs) {
    this.updateContent( "Pictures -> " + args.text)
  }

  public isPastebtnDisabled: boolean = true;
  
  public enablePaste() {
    if (!this.isPastebtnDisabled) { return; }
    this.ribbon.enableItem('resize-pastebtn');
    this.isPastebtnDisabled = false;
  }

  public onCreated() {
    var container = document.getElementById('ribbonContainer');
    if (container !== null) {
      this.slider.max = container.offsetWidth;
      this.slider.value = container.offsetWidth;
      this.slider.min = 350;
    }
  }

  public onChange(args: SliderChangeEventArgs) {
    var container = document.getElementById('ribbonContainer');
    if (container !== null) {
      container.style.width = args.value + 'px';
    }
    this.ribbon.refreshLayout();
  }

  @HostListener('window:resize')
  onResize() {
    var container = document.getElementById('ribbonContainer');
    if (container !== null) {
      container.style.width = '100%';
      this.slider.max = container.offsetWidth;
      this.slider.value = container.offsetWidth;
    }
    this.ribbon.refreshLayout();
  }

  public updateContent(args: string) {
    this.toastObj.show({ content: "Last clicked item is " + args });
  }

  public launchClick(args: LauncherClickEventArgs) {
    if (args.groupId == "clipboard") {
      this.updateContent("Clipboard Launcher Icon");
    }
    else if (args.groupId == "illustration") {
      this.updateContent("Illustration Launcher Icon");
    }
    else if (args.groupId == "header_footer") {
      this.updateContent("Header & Footer Launcher Icon");
    }
  }
}
