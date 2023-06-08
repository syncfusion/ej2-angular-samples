import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ribbon, FileMenuSettingsModel, RibbonButtonSettingsModel, RibbonSplitButtonSettingsModel, RibbonComboBoxSettingsModel, RibbonDropDownSettingsModel, RibbonItemSize, RibbonCheckBoxSettingsModel, RibbonColorPickerSettingsModel, LauncherClickEventArgs, DisplayMode, FileMenuEventArgs } from '@syncfusion/ej2-ribbon';
import { MenuItemModel } from "@syncfusion/ej2-navigations";
import { ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { SelectEventArgs as SelectListEventArgs } from "@syncfusion/ej2-lists";

@Component({
  selector: 'control-content',
  templateUrl: 'simplified.html',
  styleUrls: ['simplified.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RibbonSimplifiedComponent {
  @ViewChild('toast') toastObj: ToastComponent;
  @ViewChild('simplifiedRibbon') simplifiedRibbonObj: Ribbon;

  public pasteOptions: ItemModel[] = [{ text: "Keep Source Format" }, { text: "Merge format" }, { text: "Keep text only" }];
  public findOptions: ItemModel[] = [{ text: "Find", iconCss: "e-icons e-search" }, { text: "Advanced find", iconCss: "e-icons e-search" }, { text: "Go to", iconCss: "e-icons e-arrow-right" }];
  public selectOptions: ItemModel[] = [{ text: "Select All" }, { text: "Select Objects" }];
  public dictateOptions: ItemModel[] = [{ text: "Chinese" }, { text: "English" }, { text: "German" }, { text: "French" }];
  public tableOptions: ItemModel[] = [{ text: "Insert Table" }, { text: "This device" }, { text: "Convert Table" }, { text: "Excel SpreadSheet" }];
  public shapeOptions: ItemModel[] = [{ text: "Lines" }, { text: "Rectangles" }, { text: "Basic Arrows" }, { text: "Basic Shapes" }, { text: "FlowChart" }];
  public headerOptions: ItemModel[] = [{ text: "Insert Header" }, { text: "Edit Header" }, { text: "Remove Header" }];
  public footerOptions: ItemModel[] = [{ text: "Insert Footer" }, { text: "Edit Footer" }, { text: "Remove Footer" }];
  public pageOptions: ItemModel[] = [{ text: "Insert Top of page" }, { text: "Format Page Number" }, { text: "Format Page Number" }];
  public linkOptions: ItemModel[] = [{ text: "Insert Link", iconCss: "e-icons e-link" }, { text: "Recent Links", iconCss: "e-icons e-clock" }, { text: "Bookmarks", iconCss: "e-icons e-bookmark" }];

  public pasteSettings: RibbonSplitButtonSettingsModel = { iconCss: 'e-icons e-paste', items: this.pasteOptions, content: 'Paste', select: (args) => { this.updateContent("Paste -> " + args.item.text); }, click: () => { this.updateContent("Paste"); } };
  public findSettings: RibbonSplitButtonSettingsModel = { iconCss: "e-icons e-search", content: "Find", items: this.findOptions, select: (args) => { this.updateContent("Find -> " + args.item.text); }, click: () => { this.updateContent("Find"); } };
  public selectSettings: RibbonSplitButtonSettingsModel = { iconCss: "e-icons e-mouse-pointer", content: "Select", items: this.selectOptions, select: (args) => { this.updateContent("Select -> " + args.item.text); }, click: () => { this.updateContent("Select"); } };
  public dictateSettings: RibbonSplitButtonSettingsModel = { iconCss: "sf-icon-dictate", content: "Dictate", items: this.dictateOptions, select: (args) => { this.updateContent("Dictate -> " + args.item.text); }, click: () => { this.updateContent("Dictate"); } };
  public tableSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-table", content: "Table", items: this.tableOptions, select: (args) => { this.updateContent("Table -> " + args.item.text); } };
  public pictureSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-image", content: "Picture", target:'#simplified-pictureList' };
  public shapeSettings: RibbonDropDownSettingsModel = { iconCss: "sf-icon-shapes", content: "Shapes", items: this.shapeOptions, select: (args) => { this.updateContent("Shapes -> " + args.item.text); } };
  public headerSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-header", content: "Header", items: this.headerOptions, select: (args) => { this.updateContent("Header -> " + args.item.text); } };
  public footerSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-footer", content: "Footer", items: this.footerOptions, select: (args) => { this.updateContent("Footer -> " + args.item.text); } };
  public pageSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-page-numbering", content: "Page Number", items: this.pageOptions, select: (args) => { this.updateContent("Page Number -> " + args.item.text); } };
  public linkSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-link", content: "Link", items: this.linkOptions, select: (args) => { this.updateContent("Link -> " + args.item.text); } };

  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut", clicked: () => { this.updateContent("Cut"); this.enablePaste();} };
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

  public fontstyleSettings: RibbonComboBoxSettingsModel = { dataSource: this.fontStyle, index: 3, width: '150px', allowFiltering: true, change: (args) => { this.updateContent("Font Style -> " + args.itemData.text); } };
  public fontsizeSettings: RibbonComboBoxSettingsModel = { dataSource: this.fontSize, index: 3, width: '80px', allowFiltering: true, change: (args) => { this.updateContent("Font Size -> " + args.itemData.text); } };

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

  public Simplified: DisplayMode = DisplayMode.Simplified;
  public Overflow: DisplayMode = DisplayMode.Overflow;

  public position = { X: 'Right' };
  public animation = { show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } };

  public pictureList: Object = [
    { text: 'This device' },
    { text: 'Stock Images' },
    { text: 'Online Images' }];

  public listItem (args: SelectListEventArgs) {
    this.updateContent( "Pictures -> " + args.text)
  }

  public ispasteDisabled: boolean = true;
  
  public enablePaste() {
    if (!this.ispasteDisabled) { return; }
    this.simplifiedRibbonObj.enableItem('simplified-pastebtn');
    this.ispasteDisabled = false;
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
