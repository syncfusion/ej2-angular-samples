import { buttonAppRoutes } from '../button/button.module';
import { chipsAppRoutes } from '../chips/chips.module';
import { formValidatorAppRoutes } from '../form-validator/form-validator.module';
import { listAppRoutes } from '../listview/listview.module';
import { gridRouteConfig } from '../grid/grid.module';
import { treegridRouteConfig } from '../treegrid/treegrid.module';
import { toolbarAppRoutes } from '../toolbar/toolbar.module';
import { inplaceeditorAppRoutes } from '../inplace-editor/inplace-editor.module';
import { accordionAppRoutes } from '../accordion/accordion.module';
import { splitterAppRoutes } from '../splitter/splitter.module';
import { numericAppRoutes } from '../numerictextbox/numerictextbox.module';
import { diagramAppRoutes } from '../diagram/diagram.module';
import { datePickerAppRoutes } from '../datepicker/datepicker.module';
import { dateTimePickerAppRoutes } from '../datetimepicker/datetimepicker.module';
import { dateRangePickerAppRoutes } from '../daterangepicker/daterangepicker.module';
import { calendarAppRoutes } from '../calendar/calendar.module';
import { chartAppRoutes } from '../chart/chart.module';
import { carouselAppRoutes } from '../carousel/carousel.module';
import { arcgaugeAppRoutes } from '../arc-gauge/arc-gauge.module';
import { circulargaugeAppRoutes } from '../circular-gauge/circular-gauge.module';
import { lineargaugeAppRoutes } from '../linear-gauge/linear-gauge.module';
import { rangeNavigatorAppRoutes } from '../range-navigator/range-navigator.module';
import { dialogAppRoutes } from '../dialog/dialog.module';
import { predefinedDialogsAppRoutes } from '../predefined-dialogs/predefined-dialogs.module';
import { dropdownlistAppRoutes } from '../drop-down-list/drop-down-list.module';
import { dropdowntreeAppRoutes } from '../drop-down-tree/drop-down-tree.module';
import { comboboxAppRoutes } from '../combo-box/combo-box.module';
import { autoCompleteAppRoutes } from '../auto-complete/auto-complete.module';
import { textboxesAppRoutes } from '../textboxes/textboxes.module';
import { textareasAppRoutes } from '../textarea/textarea.module';
import { tooltipAppRoutes } from '../tooltip/tooltip.module';
import { sidebarAppRoutes } from '../sidebar/sidebar.module';
import { barcodeAppRoutes } from '../barcode/barcode.module';
import { maskedTextBoxAppRoutes } from '../maskedtextbox/maskedtextbox.module';
import { timePickerAppRoutes } from '../timepicker/timepicker.module';
import { multiselectAppRoutes } from '../multi-select/multi-select.module';
import { rteAppRoutes } from '../rich-text-editor/rich-text-editor.module';
import { mdeAppRoutes } from '../markdown-editor/markdown-editor.module';
import { tabAppRoutes } from '../tab/tab.module';
import { contextMenuAppRoutes } from '../context-menu/context-menu.module';
import { menuAppRoutes } from '../menu/menu.module';
import { sliderAppRoutes } from '../range-slider/range-slider.module';
import { treeAppRoutes } from '../treeview/treeview.module';
import { uploaderAppRoutes } from '../uploader/uploader.module';
import { scheduleRouteConfig } from '../schedule/schedule.module';
import { cardAppRoutes } from '../card/card.module';
import { mapAppRoutes } from '../maps/maps.module';
import { badgeAppRoutes } from '../badge/badge.module';
import { toastAppRoutes } from '../toast/toast.module';
import { messageAppRoutes } from '../message/message.module';
import { avatarAppRoutes } from '../avatar/avatar.module';
import { treemapAppRoutes } from '../treemap/treemap.module';
import { heatmapAppRoutes } from '../heatmap-chart/heatmap-chart.module';
import { sparklineAppRoutes } from '../sparkline/sparkline.module';
import { smithchartAppRoutes } from '../smith-chart/smith-chart.module';
import { colorPickerAppRoutes } from '../color-picker/color-picker.module';
import { pivottableRouteConfig } from '../pivot-table/pivot-table.module';
import { documentEditorAppRoutes } from '../document-editor/document-editor.module';
import { pdfViewerAppRoutes } from '../pdfviewer/pdfviewer.module';
import { QueryBuilderAppRoutes } from '../query-builder/query-builder.module';
import { stockChartAppRoutes } from '../stock-chart/stock-chart.module';
import { GanttAppRoutes } from '../gantt/gantt.module';
import { fileManagerAppRoutes } from '../file-manager/file-manager.module';
import { dashboardlayoutAppRoutes } from '../dashboard-layout/dashboard-layout.module';
import { listBoxAppRoutes } from '../list-box/list-box.module';
import { spreadsheetAppRoutes } from '../spreadsheet/spreadsheet.module';
import { bulletChartAppRoutes } from '../bullet-chart/bullet-chart.module';
import { progressBarAppRoutes } from '../progress-bar/progress-bar.module';
import { kanbanRouteConfig } from '../kanban/kanban.module';
import { breadcrumbAppRoutes } from '../breadcrumb/breadcrumb.module';
import { signatureAppRoutes } from '../signature/signature.module';
import { appbarAppRoutes } from '../appbar/appbar.module';
import { ImageEditorAppRoutes } from '../image-editor/image-editor.module';
import { floatingActionButtonAppRoutes } from '../floating-action-button/floating-action-button.module';
import { speedDialAppRoutes } from '../speed-dial/speed-dial.module';
import { mentionAppRoutes } from '../mention/mention.module';
import { skeletonAppRoutes } from '../skeleton/skeleton.module';
import { ratingAppRoutes } from '../rating/rating.module';
import { otpInputAppRoutes } from '../otp-input/otp-input.module';
import { ribbonAppRoutes } from '../ribbon/ribbon.module';
import { stepperAppRoutes } from '../stepper/stepper.module';
import { threeDimensionChartAppRoutes } from '../three-dimension-chart/three-dimension-chart.module';
import { threeDimensionCircularChartAppRoutes } from '../three-dimension-circular-chart/three-dimension-circular-chart.module';
import { timelineAppRoutes } from '../timeline/timeline.module';
import { multicomboboxAppRoutes } from '../multicolumn-combobox/multicolumn-combobox.module';
import { aiassistviewAppRoutes } from '../ai-assistview/ai-assistview.module';
import { chatUIAppRoutes } from '../chat-ui/chat-ui.module';
import { speechToTextAppRoutes } from '../speech-to-text/speech-to-text.module';
import { smartPasteAppRoutes } from '../ai-smart-paste/smartpaste.module';
import { smartTextAreaAppRoutes } from '../ai-smart-textarea/smarttextarea.module';
import { AIGridAppRoutes } from '../ai-grid/aigrid.module';
import { AIGanttAppRoutes } from '../ai-gantt/aigantt.module';
import { AISpreadsheetAppRoutes } from '../ai-spreadsheet/aispreadsheet.module';
import { AIQueryBuilderAppRoutes } from '../ai-querybuilder/aiquerybuilder.module';
import { AIComboBoxAppRoutes } from '../ai-combo-box/aicombobox.module';
import { AIImageEditorAppRoutes } from '../ai-image-editor/aiimageeditor.module';
import { AIPivotTableAppRoutes } from '../ai-pivot-table/aipivottable.module';
import { AIMapsAppRoutes } from '../ai-maps/aimaps.module';
import { AISchedulerAppRoutes } from '../ai-schedule/aischedule.module';
import { AIDiagramAppRoutes } from '../ai-diagram/aidiagram.module';
import { AIDocumentEditorAppRoutes } from '../ai-document-editor/aidocumenteditor.module';
import { AIRichTextEditorAppRoutes } from '../ai-rich-text-editor/airichtexteditor.module';
import { blockEditorAppRoutes } from '../block-editor/block-editor.module';

export let samplesList: any = [
    {
        'name': 'Smart Paste', 'category': 'Smart Components', 'type': 'preview', 'order': '01', 'path': 'ai-smart-paste', 'samples': smartPasteAppRoutes,  'ftName': 'ai-smart-paste'
    },
    {
        'name': 'Smart TextArea', 'category': 'Smart Components', 'type': 'preview', 'order': '01', 'path': 'ai-smart-textarea', 'samples': smartTextAreaAppRoutes,  'ftName': 'ai-smart-textarea'
    },
    {
        'name': 'Data Grid', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-grid', 'samples': AIGridAppRoutes
    },
    {
        'name': 'Diagram', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-diagram', 'samples': AIDiagramAppRoutes
    },
    {
        'name': 'Query Builder', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-querybuilder', 'samples': AIQueryBuilderAppRoutes
    },
    {
        'name': 'ComboBox', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-combo-box', 'samples': AIComboBoxAppRoutes
    },
    {
        'name': 'Rich Text Editor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-rich-text-editor', 'samples': AIRichTextEditorAppRoutes
    },
    {
        'name': 'Word Processor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-document-editor', 'samples': AIDocumentEditorAppRoutes
    },
    {
        'name': 'Spreadsheet', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-spreadsheet', 'samples': AISpreadsheetAppRoutes
    },
    {
        'name': 'Gantt Chart', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-gantt', 'samples': AIGanttAppRoutes
    },
    {
        'name': 'Image Editor', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-image-editor', 'samples': AIImageEditorAppRoutes
    },
    {
        'name': 'Pivot Table', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-pivot-table', 'samples': AIPivotTableAppRoutes
    },
    {
        'name': 'Scheduler', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-schedule', 'samples': AISchedulerAppRoutes
    },
    {
        'name': 'Maps', 'category': 'Smart AI Solutions', 'order': '01', 'path': 'ai-maps', 'samples': AIMapsAppRoutes
    },
    {
        'name': 'Data Grid', 'type':'update', 'category': 'Grids', 'order': '01', 'path': 'grid', 'samples': gridRouteConfig, 'ftName': 'datagrid'
    },
    {
        'name': 'AI AssistView', 'category': 'Interactive Chat', 'type': 'update', 'order': '06', 'path': 'ai-assistview', 'samples': aiassistviewAppRoutes, 'ftName': 'ai-assistview'
    },
    {
        'name': 'Block Editor','category': 'File Viewers & Editors', 'type': 'preview','order': '06', 'path': 'block-editor', 'samples': blockEditorAppRoutes, 'ftName': 'block-editor'
    },
    {
        'name': 'Chat UI','category': 'Interactive Chat', 'type': 'preview', 'order': '06', 'path': 'chat-ui', 'samples': chatUIAppRoutes, "ftName": "chat-ui"
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '01', 'type': 'update', 'path': 'pivot-table', 'samples': pivottableRouteConfig
    },
    {
        'name': 'Tree Grid', 'category': 'Grids', 'order': '01', 'path': 'treegrid', 'samples': treegridRouteConfig, 'type':'update'
    },
    {
        'name': 'Spreadsheet', 'category': 'Grids', 'order': '04', 'path': 'spreadsheet', 'samples': spreadsheetAppRoutes, 'ftName': 'spreadsheet'
    },
    {
        'name': 'Chart', 'category': 'Data visualization', 'order': '02', 'path': 'chart', 'samples': chartAppRoutes, 'type':'update'
    },
    {
        'name': '3D Chart', 'category': 'Data visualization', 'order': '02', 'path': 'three-dimension-chart', 'samples': threeDimensionChartAppRoutes
    },
    {
        'name': '3D Circular Chart', 'category': 'Data visualization', 'order': '02', 'path': 'three-dimension-circular-chart', 'samples': threeDimensionCircularChartAppRoutes
    },
    {
        'name': 'Stock Chart', 'category': 'Data visualization', 'order': '02', 'path': 'stock-chart', 'samples': stockChartAppRoutes, 'type':'update'
    },
    {
        'name': 'Arc Gauge', 'category': 'Data visualization', 'order': '02', 'path': 'arc-gauge', 'samples': arcgaugeAppRoutes
    },
    {
        'name': 'Circular Gauge', 'category': 'Data visualization', 'order': '02', 'path': 'circular-gauge', 'samples': circulargaugeAppRoutes
    },
    {
        'name': 'Diagram', 'category': 'Data visualization', 'order': '02', 'path': 'diagram', 'samples': diagramAppRoutes, 'type':'update'
    },
    {
        'name': 'HeatMap Chart', 'category': 'Data visualization', 'order': '02', 'path': 'heatmap-chart', 'samples': heatmapAppRoutes, 'ftName': 'heatmap'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data visualization', 'order': '02', 'path': 'linear-gauge', 'samples': lineargaugeAppRoutes
    },
    {
        'name': 'Maps', 'category': 'Data visualization', 'order': '02', 'path': 'maps', 'samples': mapAppRoutes
    },
    {
        'name': 'Range Navigator', 'category': 'Data visualization', 'order': '02', 'path': 'range-navigator', 'samples': rangeNavigatorAppRoutes
    },
    {
        'name': 'Smith Chart', 'category': 'Data visualization', 'order': '02', 'path': 'smith-chart', 'samples': smithchartAppRoutes
    },
    {
        'name': 'Barcode', 'category': 'Data visualization', 'order': '02', 'path': 'barcode', 'samples': barcodeAppRoutes
    },
    {
        'name': 'Sparkline Charts', 'category': 'Data visualization', 'order': '02', 'path': 'sparkline', 'samples': sparklineAppRoutes
    },
    {
        'name': 'TreeMap', 'category': 'Data visualization', 'order': '02', 'path': 'treemap', 'samples': treemapAppRoutes
    },
    {
        'name': 'Bullet Chart', 'category': 'Data visualization', 'order': '02', 'path': 'bullet-chart', 'samples': bulletChartAppRoutes
    },
    {
        'name': 'Kanban', 'category': 'Data visualization', 'order': '02', 'path': 'kanban', 'samples': kanbanRouteConfig,'ftName': 'kanban'
    },
    {
        'name': 'Form Validator', 'category': 'Forms', 'order': '03', 'path': 'form-validator', 'samples': formValidatorAppRoutes
    },
    {
        'name': "Query Builder", 'category': "Forms", 'order': '10', 'path': "query-builder", 'samples': QueryBuilderAppRoutes
    },
    {
        'name': "PDF Viewer", 'type':'update','category': "File Viewers & Editors", 'order': '11', 'path': "pdfviewer", 'samples': pdfViewerAppRoutes, 'ftName': "pdfviewer"
    },
    {
        'name': "Rich Text Editor", 'type':'update', 'category': "File Viewers & Editors", 'ftName': 'wysiwyg-rich-text-editor', 'order': '03', 'path': "rich-text-editor", 'samples': rteAppRoutes
    },
    {
        'name': "Markdown Editor", 'category': "File Viewers & Editors", 'ftName': 'wysiwyg-rich-text-editor', 'order': '03', 'path': "markdown-editor", 'samples': mdeAppRoutes
    },
    {
        'name': 'Word Processor', 'category': 'File Viewers & Editors', 'order': '03', 'path': 'document-editor', 'samples': documentEditorAppRoutes, 'ftName': 'document-editor', 'type': 'update'
    },
    {
        "name": "Image Editor", 'category': 'File Viewers & Editors', 'ftName': 'image-editor', 'order': '03', 'path': 'image-editor', 'samples': ImageEditorAppRoutes, 'type': 'update'
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '04', 'path': 'schedule', 'samples': scheduleRouteConfig, 'ftName': 'scheduler', 'type': 'update'
    },
    {
        'name': 'Gantt Chart', 'category': 'Calendars', 'order': '04', 'type':'update', 'path': 'gantt', 'samples': GanttAppRoutes, 'ftName': 'gantt'
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'order': '04', 'path': 'calendar', 'samples': calendarAppRoutes
    },
    {
        'name': 'DatePicker',  'category': 'Calendars', 'order': '04', 'path': 'datepicker', 'samples': datePickerAppRoutes
    },
    {
        'name': 'DateRangePicker', 'type':'update', 'category': 'Calendars', 'order': '04', 'path': 'daterangepicker', 'samples': dateRangePickerAppRoutes
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', 'order': '04', 'path': 'datetimepicker', 'samples': dateTimePickerAppRoutes
    },
    {
        'name': "TimePicker", 'category': 'Calendars', 'order': '04', 'path': "timepicker", 'samples': timePickerAppRoutes
    },
    {
        'name': 'Button', 'category': 'Buttons', 'order': '03', 'path': 'button', 'samples': buttonAppRoutes
    },
    {
        'name': 'Chips', 'category': 'Buttons', 'order': '03', 'path': 'chips', 'samples': chipsAppRoutes
    },
    {
        'name': "Floating Action Button", 'category': 'Buttons', 'order': '03', 'path': "floating-action-button", 'samples': floatingActionButtonAppRoutes,
    },
    {
        'name': "SpeedDial", 'category': 'Buttons', 'order': '03', 'path': "speed-dial", 'samples': speedDialAppRoutes,
    },
    {
        'name': "AutoComplete", 'type':'update', 'category': "Dropdowns",'ftName': "autocomplete",  'order': '05', 'path': "auto-complete", 'samples': autoCompleteAppRoutes
    },
    {
        'name': "ComboBox", 'type':'update', 'category': "Dropdowns", 'ftName': "combo-box",  'order': '05', 'path': "combo-box", 'samples': comboboxAppRoutes
    },
    {
        'name': "Dropdown List", 'type':'update', 'category': "Dropdowns",  'ftName': "dropdown-list", 'order': '05', 'path': "drop-down-list", 'samples': dropdownlistAppRoutes
    },
    {
        'name': "Dropdown Tree", 'category': "Dropdowns", 'ftName': "dropdown-tree", 'order': '05', 'path': "drop-down-tree", 'samples': dropdowntreeAppRoutes
    },
    {
        'name': "MultiSelect Dropdown", 'type':'update', 'category': "Dropdowns",  'ftName': "multiselect-dropdown", 'order': '05',  'path': "multi-select", 'samples': multiselectAppRoutes
    },
    {
        "name": "List Box", "category": "Dropdowns", "ftName": "list-box", 'order': '03', "path": "list-box", "samples": listBoxAppRoutes
    },
    {
        "name": "Mention",  "category": "Dropdowns", 'order': '03', "path": "mention", "samples": mentionAppRoutes
    },
    {
        "name": "MultiColumn Combobox", "category": "Dropdowns", "ftName": "multicolumn-comboboox", 'order': '03', "path": "multicolumn-combobox", "samples": multicomboboxAppRoutes
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'order': '06', 'path': 'accordion', 'samples': accordionAppRoutes, 'ftName': "accordion"
    },
    {
        'name': 'AppBar', 'category': 'Navigation', 'order': '06', 'path': 'appbar', 'samples': appbarAppRoutes, "ftName": "appbar"
    },
    {
        'name': 'Breadcrumb', 'category': 'Navigation', 'order': '06', 'path': 'breadcrumb', 'samples': breadcrumbAppRoutes, "ftName": "breadcrumb"
    },
    {
        'name': 'Carousel', 'category': 'Navigation', 'order': '06', 'path': 'carousel', 'samples': carouselAppRoutes, 'ftName': "carousel"
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'order': '06', 'path': 'context-menu', 'samples': contextMenuAppRoutes, 'ftName': "context-menu"
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'order': '06', 'path': 'menu', 'samples': menuAppRoutes, 'ftName': "menu-bar"
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'order': '06', 'path': 'sidebar', 'samples': sidebarAppRoutes
    },
    {
        'name': 'Tab', 'category': 'Navigation', 'order': '06', 'path': 'tab', 'samples': tabAppRoutes, 'ftName': "tabs"
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'order': '06', 'path': 'toolbar', 'samples': toolbarAppRoutes, 'ftName': "toolbar"
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'order': '06', 'path': 'treeview', 'samples': treeAppRoutes, 'ftName': "treeview"
    },
    {
        'name': 'File Manager', 'category': 'Navigation', 'order': '06', 'path': 'file-manager', 'samples': fileManagerAppRoutes
    },
    {
        'name': 'Ribbon', 'category': 'Navigation', 'order': '06', 'path': 'ribbon', 'samples': ribbonAppRoutes
    },
    {
        'name': 'Stepper', 'category': 'Navigation', 'order': '06', 'path': 'stepper', 'samples': stepperAppRoutes, "ftName": "stepper"
    },
    {
        'name': "Badge", 'category': 'Notifications', 'order': '07', 'path': "badge", 'samples': badgeAppRoutes
    },
    {
        'name': "Message", 'category': 'Notifications', 'order': '07', 'path': "message", 'samples': messageAppRoutes, 'ftName': "message"
    },
    {
        'name': "Toast", 'category': 'Notifications', 'order': '07', 'path': "toast", 'samples': toastAppRoutes, 'ftName': "toast"
    },
    {
        'name': "Progress Bar", 'category': 'Notifications', 'order': '07', 'path': "progress-bar", 'samples': progressBarAppRoutes, 'ftName': "progress-bar"
    },
    {
        'name': "Skeleton", 'category': 'Notifications',"ftName": "skeleton", 'order': '07', 'path': "skeleton", 'samples': skeletonAppRoutes
    },
    {
        'name': 'TextBox', 'category': 'Inputs', 'order': '08', 'path': 'textboxes', 'samples': textboxesAppRoutes, 'ftName': 'textbox'
    },
    {
        'name': 'TextArea', 'category': 'Inputs', 'order': '03', 'path': 'textarea', 'samples': textareasAppRoutes, 'ftName': 'textarea'
    },
    {
        'name': 'Input Mask', 'category': 'Inputs', 'order': '08', 'path': 'maskedtextbox', 'samples': maskedTextBoxAppRoutes, 'ftName': "maskedtextbox"
    },
    {
        'name': 'Numeric Textbox', 'category': 'Inputs', 'order': '08', 'path': 'numerictextbox', 'samples': numericAppRoutes, 'ftName': "numerictextbox"
    },
    {
        'name': "Color Picker", 'category': "Inputs", 'order': '08', 'path': "color-picker", 'samples': colorPickerAppRoutes, 'ftName': "color-picker"
    },
    {
        'name': "File Upload", 'category': "Inputs", 'order': '08', 'path': "uploader", 'samples': uploaderAppRoutes, 'ftName': 'file-upload'
    },
    {
        'name': "Range Slider", 'category': "Inputs", 'order': '08', 'path': "range-slider", 'samples': sliderAppRoutes
    },
    {
        'name': 'Signature', 'category': 'Inputs', 'order': '03', 'path': 'signature', 'samples': signatureAppRoutes, "ftName": "signature"
    },
    {
        'name': 'In-place Editor', 'category': 'Inputs', 'order': '03', 'path': 'inplace-editor', 'samples': inplaceeditorAppRoutes, 'ftName': 'inplaceeditor'
    },
    {
        'name': "Rating", 'category': 'Inputs',"ftName": "rating", 'order': '03', 'path': "rating", 'samples': ratingAppRoutes
    },
    {
        'name': "OTP Input", 'category': 'Inputs', "ftName": "otp-input", 'order': '03', 'path': "otp-input", 'samples': otpInputAppRoutes
    },
    {
        'name': 'Speech To Text', 'category': 'Inputs', 'order': '03', 'path': 'speech-to-text', 'samples': speechToTextAppRoutes, 'ftName': 'speech-to-text'
    },
    {
        'name': 'Avatar', 'category': 'Layout', 'order': '09', 'path': 'avatar', 'samples': avatarAppRoutes
    },
    {
        'name': 'Card', 'category': 'Layout', 'order': '09', 'path': 'card', 'samples': cardAppRoutes, 'ftName': "card"
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '09', 'path': 'dialog', 'samples': dialogAppRoutes, 'ftName': 'modal-dialog'
    },
    {
        'name': 'Predefined Dialogs', 'category': 'Layout', 'order': '09', 'path': 'predefined-dialogs', 'samples': predefinedDialogsAppRoutes
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '09', 'path': 'listview', 'samples': listAppRoutes
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '09', 'path': 'tooltip', 'samples': tooltipAppRoutes
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'order': '09', 'path': 'splitter', 'samples': splitterAppRoutes, 'ftName': 'splitter'
    },
    {
        'name': 'Dashboard Layout', 'category': 'Layout', 'order': '09', 'path': 'dashboard-layout', 'samples': dashboardlayoutAppRoutes, "ftName": "dashboard-layout"
    },
    {
        'name': 'Timeline', 'category': 'Layout', 'order': '10', 'path': 'timeline', 'samples': timelineAppRoutes, "ftName": "timeline"
    }
];
