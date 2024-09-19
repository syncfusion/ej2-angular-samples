import { Component, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { Ribbon, FileMenuSettingsModel, RibbonButtonSettingsModel, RibbonSplitButtonSettingsModel, RibbonDropDownSettingsModel, RibbonItemSize, RibbonCheckBoxSettingsModel, LauncherClickEventArgs, DisplayMode, FileMenuEventArgs, RibbonGallerySettingsModel, GallerySelectEventArgs } from '@syncfusion/ej2-ribbon';
import { MenuItemModel } from "@syncfusion/ej2-navigations";
import { SelectEventArgs as SelectListEventArgs } from "@syncfusion/ej2-lists";
import { ToastComponent, ToastAllModule } from '@syncfusion/ej2-angular-notifications';
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { RibbonAllModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
    selector: 'control-content',
    templateUrl: 'gallery.html',
    styleUrls: ['gallery.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [RibbonAllModule, ToastAllModule, ListViewAllModule, SBActionDescriptionComponent, SBDescriptionComponent]
})
export class RibbonGalleryComponent {
  @ViewChild('toast') toastObj: ToastComponent;
  @ViewChild('galleryRibbon')
  public ribbonObj: Ribbon;

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['gallery.component.css'];
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

  public pasteSettings: RibbonSplitButtonSettingsModel = { iconCss: 'e-icons e-paste', items: this.pasteOptions, content: 'Paste', select: (args) => { this.updateContent("Paste -> " + args.item.text); }, click: () => { this.updateContent("Paste"); } };
  public tableSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-table", content: "Table", items: this.tableOptions, select: (args) => { this.updateContent("Table -> " + args.item.text); } };
  public pictureSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-image", content: "Picture", target:'#gallery-pictureList' };
  public shapeSettings: RibbonDropDownSettingsModel = { iconCss: "sf-icon-shapes", content: "Shapes", items: this.shapeOptions, select: (args) => { this.updateContent("Shapes -> " + args.item.text); } };
  public headerSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-header", content: "Header", items: this.headerOptions, select: (args) => { this.updateContent("Header -> " + args.item.text); } };
  public footerSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-footer", content: "Footer", items: this.footerOptions, select: (args) => { this.updateContent("Footer -> " + args.item.text); } };
  public pageSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-page-numbering", content: "Page Number", items: this.pageOptions, select: (args) => { this.updateContent("Page Number -> " + args.item.text); } };
  public linkSettings: RibbonDropDownSettingsModel = { iconCss: "e-icons e-link", content: "Link", items: this.linkOptions, select: (args) => { this.updateContent("Link -> " + args.item.text); } };
  public dictateSettings: RibbonSplitButtonSettingsModel = { iconCss: "sf-icon-dictate", content: "Dictate", items: this.dictateOptions, select: (args) => { this.updateContent("Dictate -> " + args.item.text); }, click: () => { this.updateContent("Dictate"); } };

  public gallerySettings: RibbonGallerySettingsModel = {
      select: (args: GallerySelectEventArgs) => {
        this.updateContent("Gallery -> " + args.currentItem.content);
      },
      popupWidth: '544px',
      itemCount: 3,
      groups: [{
        itemWidth: '100',
        itemHeight: '40',
        header: 'Title and Headings',
        items: [
            {
                content: 'Heading 1',
                cssClass: 'heading_1'
            },
            {
                content: 'Heading 2',
                cssClass: 'heading_2'
            }, {
                content: 'Heading 3',
                cssClass: 'heading_3'
            }, {
                content: 'Heading 4',
                cssClass: 'heading_4'
            }, {
                content: 'Title',
                cssClass: 'title'
            }, {
                content: 'Total',
                cssClass: 'total'
            }
        ]
      }, {
          itemWidth: '100',
          itemHeight: '40',
          header: 'Data and Model',
          items: [
              {
                  content: 'Calculation',
                  cssClass: 'calculation'
              },
              {
                  content: 'Check Cell',
                  cssClass: 'check-cell'
              }, {
                  content: 'Hyperlink',
                  cssClass: 'hyperlink'
              }, {
                  content: 'Input',
                  cssClass: 'input'
              }, {
                  content: 'Linked Cell',
                  cssClass: 'linked-cell'
              }, {
                  content: 'Note',
                  cssClass: 'note'
              }
          ]
      }, {
          itemWidth: '100',
          itemHeight: '40',
          header: 'Good, Bad and Neutral',
          items: [{
                  content: 'Normal',
                  cssClass: 'normal'
              }, {
                  content: 'Bad',
                  cssClass: 'bad'
              }, {
                  content: 'Good',
                  cssClass: 'good'
              }, {
                  content: 'Neutral',
                  cssClass: 'neutral'
              }
          ]
      }]
  };

  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut", clicked: () => { this.updateContent("Cut"); this.enablePaste(); } };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy", clicked: () => { this.updateContent("Copy"); this.enablePaste(); } };
  public formatButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-format-painter", content: "Format Painter", clicked: () => { this.updateContent("Format Painter"); } };
  public boldButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-bold", content: "Bold", isToggle: true, clicked: () => { this.updateContent("Bold"); } };
  public italicButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-italic", content: "Italic", isToggle: true, clicked: () => { this.updateContent("Italic"); } };
  public underlineButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-underline", content: "Underline", isToggle: true, clicked: () => { this.updateContent("Underline"); } };
  public strikethroughButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-strikethrough", content: "Strikethrough", isToggle: true, clicked: () => { this.updateContent("Strikethrough"); } };
  public changecaseButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-change-case", content: "Change Case", isToggle: true, clicked: () => { this.updateContent("Change Case"); } };
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
  public editorButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-editor", content: "Editor", clicked: () => { this.updateContent("Editor"); } };
  public reuseButton: RibbonButtonSettingsModel = { iconCss: "sf-icon-reuse", content: "Reuse Files", clicked: () => { this.updateContent("Reuse Files"); } };

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

  public pasteDisabled: boolean = true;
  
  public enablePaste() {
    if (!this.pasteDisabled) { return; }
    this.ribbonObj.enableItem('pastebtn');
    this.pasteDisabled = false;
  }

  public pictureList: Object = [
    { text: 'This Device' },
    { text: 'Stock Images' },
    { text: 'Online Images' }];

  public listItem (args: SelectListEventArgs) {
    this.updateContent( "Pictures -> " + args.text)
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