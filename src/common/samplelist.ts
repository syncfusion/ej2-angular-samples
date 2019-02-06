import { buttonAppRoutes } from '../button/button.module';
import {formValidatorAppRoutes} from '../form-validator/form-validator.module';
import { listAppRoutes } from '../listview/listview.module';
import { gridRouteConfig } from '../grid/grid.module';
import { treegridRouteConfig } from '../treegrid/treegrid.module';
import { toolbarAppRoutes } from '../toolbar/toolbar.module';
import { accordionAppRoutes } from '../accordion/accordion.module';
import { numericAppRoutes } from '../numerictextbox/numerictextbox.module';
import { diagramAppRoutes } from '../diagram/diagram.module';
import { datePickerAppRoutes } from '../datepicker/datepicker.module';
import { dateTimePickerAppRoutes } from '../datetimepicker/datetimepicker.module';
import { dateRangePickerAppRoutes } from '../daterangepicker/daterangepicker.module';
import { calendarAppRoutes } from '../calendar/calendar.module';
import {  splitterAppRoutes } from '../splitter/splitter.module';
import { chartAppRoutes } from '../chart/chart.module';
import { circulargaugeAppRoutes } from '../circular-gauge/circular-gauge.module';
import { lineargaugeAppRoutes } from '../linear-gauge/linear-gauge.module';
import { rangeNavigatorAppRoutes } from '../rangenavigator/rangenavigator.module';
import { dialogAppRoutes } from '../dialog/dialog.module';
import { dropdownlistAppRoutes } from '../drop-down-list/drop-down-list.module';
import { comboboxAppRoutes } from '../combo-box/combo-box.module';
import { autoCompleteAppRoutes } from '../auto-complete/auto-complete.module';
import { textboxesAppRoutes } from '../textboxes/textboxes.module';
import { tooltipAppRoutes } from '../tooltip/tooltip.module';
import { sidebarAppRoutes } from '../sidebar/sidebar.module';
import { maskedTextBoxAppRoutes } from '../maskedtextbox/maskedtextbox.module';
import { timePickerAppRoutes } from '../timepicker/timepicker.module';
import { multiselectAppRoutes } from '../multi-select/multi-select.module';
import { rteAppRoutes } from '../rich-text-editor/rich-text-editor.module';
import { tabAppRoutes } from '../tab/tab.module';
import { contextMenuAppRoutes } from '../context-menu/context-menu.module';
import { menuAppRoutes } from '../menu/menu.module';
import { sliderAppRoutes } from '../slider/slider.module';
import { treeAppRoutes } from '../treeview/treeview.module';
import { uploaderAppRoutes } from '../uploader/uploader.module';
import { scheduleRouteConfig } from '../schedule/schedule.module';
import { cardAppRoutes } from '../card/card.module';
import { mapAppRoutes } from '../maps/maps.module';
import { badgeAppRoutes } from '../badge/badge.module';
import { toastAppRoutes } from '../toast/toast.module';
import { avatarAppRoutes } from '../avatar/avatar.module';
import { treemapAppRoutes } from '../treemap/treemap.module';
import { heatmapAppRoutes } from '../heatmap/heatmap.module';
import { sparklineAppRoutes } from '../sparkline/sparkline.module';
import { smithchartAppRoutes } from '../smith-chart/smith-chart.module';
import { colorPickerAppRoutes } from '../color-picker/color-picker.module';
import { pivotviewRouteConfig } from '../pivot-view/pivot-view.module';
import { documentEditorAppRoutes } from '../document-editor/document-editor.module';
import { chipsAppRoutes } from '../chips/chips.module';
import { stockChartAppRoutes } from '../stock-chart/stock-chart.module';
import { pdfViewerAppRoutes } from '../pdfviewer/pdfviewer.module';
import { inPlaceEditorAppRoutes } from '../inplace-editor/inplace-editor.module';
import { QueryBuilderAppRoutes } from '../query-builder/query-builder.module';

export let samplesList: any = [
    {
        'name': 'Data Grid', 'category': 'Grids', 'order': '01', 'path': 'grid', 'samples': gridRouteConfig, 'type': 'update','ftName': 'datagrid'
    },
	{
        'name': 'TreeGrid', 'category': 'Grids', 'order': '03', 'path': 'treegrid', 'samples': treegridRouteConfig, 'type': 'preview'
    },
    {
        'name': 'Chart', 'category': 'Datavisualization', 'order': '01', 'path': 'chart', 'samples': chartAppRoutes, "type": "update"
    },
    {
        'name': 'Stock Chart', 'category': 'Datavisualization', 'order': '01', 'path': 'stock-chart', 'samples': stockChartAppRoutes, 'type': 'preview'
    },
    {
        'name': 'Circular Gauge', 'category': 'Datavisualization', 'order': '01', 'path': 'circular-gauge', 'samples': circulargaugeAppRoutes,  "type": "update", 'ftName': 'circulargauge'
    },
    {
        'name': 'Linear Gauge', 'category': 'Datavisualization', 'order': '01', 'path': 'linear-gauge', 'samples': lineargaugeAppRoutes, 'ftName': 'lineargauge'
    },
    {
        'name': 'Diagram', 'category': 'Datavisualization', 'order': '01', 'path': 'diagram', 'samples': diagramAppRoutes, "type": "update"
    },
    {
        'name': 'Heatmap chart', 'category': 'Datavisualization', 'order': '01', 'path': 'heatmap', 'samples': heatmapAppRoutes, 'type': 'update', 'ftName': 'heatmap-chart'
    },
    {
        'name': 'Maps', 'category': 'Datavisualization', 'order': '01', 'path': 'maps', 'type': 'update', 'samples': mapAppRoutes, 'ftName': 'maps'
    },
    {
        'name': 'Range Selector', 'category': 'Datavisualization', 'order': '01', 'path': 'rangenavigator', 'samples': rangeNavigatorAppRoutes
    },
    {
        'name': 'Smith Chart', 'category': 'Datavisualization', 'order': '01', 'path': 'smith-chart', 'samples': smithchartAppRoutes, 'ftName': 'smithchart'
    },
    {
        'name': 'Sparkline Charts', 'category': 'Datavisualization', 'order': '02', 'path': 'sparkline', 'type': 'update', 'samples': sparklineAppRoutes, 'ftName': 'sparkline'
    },
    {
        'name': 'TreeMap', 'category': 'Datavisualization', 'order': '02', 'path': 'treemap', 'type': 'update', 'samples': treemapAppRoutes, 'ftName': 'treemap'
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'order': '01', 'path': 'splitter', 'samples': splitterAppRoutes, 'type': 'preview', 'ftName': 'splitter'
    },
    {
        'name': 'Scheduler', 'category': 'Calendars', 'order': '01', 'path': 'schedule', 'samples': scheduleRouteConfig, 'type': 'update', 'ftName': 'scheduler'
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'order': '03', 'path': 'calendar', 'samples': calendarAppRoutes, 'type': 'update'
    },
    {
        "name": "AutoComplete", "category": "Dropdowns", "ftName": "autocomplete", 'order': '03', "path": "auto-complete", "samples": autoCompleteAppRoutes
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '03', 'path': 'button', 'samples': buttonAppRoutes
    },
    {
        'name': 'Chips', 'category': 'Editors', 'order': '03', 'path': 'chips', 'samples': chipsAppRoutes, 'type': 'preview'
    },
    {
        "name": "ComboBox", "category": "Dropdowns", "ftName": "combo-box", 'order': '03', "path": "combo-box", "samples": comboboxAppRoutes
    },
    {
         'name': 'DocumentEditor', 'category': 'Editors', 'order': '03', 'path': 'document-editor', 'samples': documentEditorAppRoutes,'ftName': 'document-editor', 'type': 'update'
    },
    {
        'name': 'DatePicker', 'category': 'Calendars', 'order': '03', 'path': 'datepicker', 'samples': datePickerAppRoutes
    },
    {
        'name': 'DateRangePicker', 'category': 'Calendars', 'order': '03', 'path': 'daterangepicker', 'samples': dateRangePickerAppRoutes
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', 'order': '03', 'path': 'datetimepicker', 'samples': dateTimePickerAppRoutes
    },
    {
        "name": "Dropdown List", "category": "Dropdowns", "ftName": "dropdown-list", 'order': '03', "path": "drop-down-list", "samples": dropdownlistAppRoutes
    },
    {
        'name': 'Form Validation', 'category': 'Inputs', 'order': '03', 'path': 'form-validator', 'samples': formValidatorAppRoutes
    },
    {
        "name": "MultiSelect Dropdown", "category": "Dropdowns", "ftName": "multiselect-dropdown", 'order': '03', "path": "multi-select", "samples": multiselectAppRoutes
    },
    {
        'name': 'Input Mask', 'category': 'Inputs', 'order': '03', 'path': 'maskedtextbox', 'samples': maskedTextBoxAppRoutes, "ftName" :"maskedtextbox"
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '02', 'path': 'pivot-view', 'ftName': 'pivot-grid', 'samples': pivotviewRouteConfig,'type' : 'update'
    },
    {
        'name': 'Numeric Textbox', 'category': 'Inputs', 'order': '03', 'path': 'numerictextbox', 'samples': numericAppRoutes, "ftName": "numerictextbox"
    },
    {
        "name": "Range Slider", "category": "Inputs", 'order': '03', "path": "slider", "samples": sliderAppRoutes, "ftName" :"slider"
    },
    {
        'name': 'TextBox', 'category': 'Inputs', 'order': '03', 'path': 'textboxes', 'samples': textboxesAppRoutes, 'ftName': 'textbox'
    },
    {
        "name": "TimePicker", "category": "Calendars", 'order': '03', "path": "timepicker", "samples": timePickerAppRoutes
    },
    {
        "name": "File Upload", "category": "Inputs", 'order': '03', "path": "uploader", "samples": uploaderAppRoutes, "type": "update", 'ftName': 'file-upload'
    },
    {
        "name": "Badge", "category": "Notifications", 'order': '05', "path": "badge", "samples": badgeAppRoutes, "ftName" :"badge"
    },
    {
        "name": "Toast", "category": "Notifications", 'order': '05', "path": "toast", "samples": toastAppRoutes, "ftName" :"toast"
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '04', 'path': 'listview', 'samples': listAppRoutes, "ftName" :"listview"
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '04', 'path': 'dialog', 'samples': dialogAppRoutes, 'ftName': 'modal-dialog', "type": "update"
    },
    {
        "name": "Rich Text Editor", "category": "Editors", 'ftName': 'wysiwyg-rich-text-editor', 'order': '03', "path": "rich-text-editor", "samples": rteAppRoutes, "type": "update"
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '04', 'path': 'tooltip', 'samples': tooltipAppRoutes, "ftName" :"tooltip"
    },
    {
        'name': 'Card', 'category': 'Layout', 'order': '05', 'path': 'card', 'samples': cardAppRoutes, "ftName" :"card"
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'order': '06', 'path': 'sidebar', 'samples': sidebarAppRoutes
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'order': '06', 'path': 'treeview', 'samples': treeAppRoutes, "ftName" :"treeview"
    },
    {
        'name': 'Tabs', 'category': 'Navigation', 'order': '06', 'path': 'tab', 'samples': tabAppRoutes, "ftName" :"tabs", "type": "update"
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'order': '06', 'path': 'toolbar', 'samples': toolbarAppRoutes, "ftName" :"toolbar"
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'order': '06', 'path': 'context-menu', 'samples': contextMenuAppRoutes, "ftName": "context-menu"
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'order': '06', 'path': 'menu', 'samples': menuAppRoutes, "ftName": "menu", "type": "update"
    },
    {
        'name': 'Avatar', 'category': 'Layout', 'order': '05', 'path': 'avatar', 'samples': avatarAppRoutes, "ftName" :"avatar"
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'order': '06', 'path': 'accordion', 'samples': accordionAppRoutes, "ftName" :"accordion"
    },
    {
        "name": "Color Picker", "category": "Inputs", 'order': '03', "path": "color-picker", "samples": colorPickerAppRoutes
    },
    {
        "name": "PDF Viewer", "category": "Viewer", 'order': '07', "path": "pdfviewer", "samples": pdfViewerAppRoutes, "ftName": "pdfviewer", "type": "preview"
    },
    {
        'name': 'In-place Editor', 'category': 'Forms', 'order': '08', 'path': 'inplace-editor', 'samples': inPlaceEditorAppRoutes, "ftName" :"inplace-editor", "type": "preview"
    },
    {
        "name": "Query Builder", "category": "Forms", 'order': '08', "path": "query-builder", "samples": QueryBuilderAppRoutes, "ftName": "query-builder", "type": "preview"
    }
];
