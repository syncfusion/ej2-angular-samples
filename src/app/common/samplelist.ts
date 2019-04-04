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
import { circulargaugeAppRoutes } from '../circular-gauge/circular-gauge.module';
import { lineargaugeAppRoutes } from '../linear-gauge/linear-gauge.module';
import { rangeNavigatorAppRoutes } from '../range-navigator/range-navigator.module';
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
import { pdfViewerAppRoutes } from '../pdfviewer/pdfviewer.module';
import { QueryBuilderAppRoutes } from '../query-builder/query-builder.module';
import { stockChartAppRoutes } from '../stock-chart/stock-chart.module';
import { GanttAppRoutes } from '../gantt/gantt.module';
import { fileManagerAppRoutes } from '../file-manager/file-manager.module';
import { dashboardlayoutAppRoutes } from '../dashboard-layout/dashboard-layout.module';
import { listBoxAppRoutes } from '../list-box/list-box.module';

export let samplesList: any = [
    {
        'name': 'Data Grid', 'category': 'Grids', 'order': '01', 'path': 'grid', 'samples': gridRouteConfig, 'ftName': 'datagrid'
    },
    {
        'name': 'TreeGrid', 'category': 'Grids', 'order': '01', 'path': 'treegrid', 'samples': treegridRouteConfig, 'type': 'preview'
    },
    {
        'name': 'Chart', 'category': 'Data visualization', 'order': '02', 'path': 'chart', 'samples': chartAppRoutes, 'type': 'update'
    },
    {
        'name': 'Circular Gauge', 'category': 'Data visualization', 'order': '02', 'path': 'circular-gauge', 'samples': circulargaugeAppRoutes, 'type': 'update'
    },
    {
        'name': 'Linear Gauge', 'category': 'Data visualization', 'order': '02', 'path': 'linear-gauge', 'samples': lineargaugeAppRoutes
    },
    {
        'name': 'Diagram', 'category': 'Data visualization', 'order': '02', 'path': 'diagram', 'samples': diagramAppRoutes, 'type': "preview"
    },
    {
        'name': 'Stock Chart', 'category': 'Data visualization', 'order': '02', 'path': 'stock-chart', 'samples': stockChartAppRoutes, 'type': 'update'
    },
    {
        'name': 'Maps', 'category': 'Data visualization', 'type': 'update', 'order': '02', 'path': 'maps', 'samples': mapAppRoutes
    },
    {
        'name': 'Range Selector', 'category': 'Data visualization', 'order': '02', 'path': 'range-navigator', 'samples': rangeNavigatorAppRoutes
    },
    {
        'name': 'Sparkline Charts', 'category': 'Data visualization', 'order': '02', 'path': 'sparkline', 'samples': sparklineAppRoutes, 'type': 'update'
    },
    {
        'name': 'Smith Chart', 'category': 'Data visualization', 'order': '02', 'path': 'smith-chart', 'samples': smithchartAppRoutes
    },
    {
        'name': 'TreeMap', 'category': 'Data visualization', 'type': 'update', 'order': '02', 'path': 'treemap', 'samples': treemapAppRoutes
    },
    {
        'name': 'Heatmap Chart', 'category': 'Data visualization', 'order': '02', 'path': 'heatmap', 'samples': heatmapAppRoutes, 'type': 'update', 'ftName': 'heatmap'
    },
    {
        'name': 'Schedule', 'category': 'Calendars', 'order': '04', 'path': 'schedule', 'samples': scheduleRouteConfig, 'type': 'update', 'ftName': 'scheduler'
    },
    {
        'name': 'Gantt', 'category': 'Calendars', 'order': '04', 'path': 'gantt', 'samples': GanttAppRoutes, 'type': 'preview', 'ftName': 'gantt', 'hideOnDevice': true
    },
    {
        'name': 'Calendar', 'category': 'Calendars', 'order': '04', 'path': 'calendar', 'samples': calendarAppRoutes, 'type': 'update'
    },
    {
        'name': "AutoComplete", 'category': "Dropdowns", 'ftName': "autocomplete", 'order': '05', 'path': "auto-complete", 'samples': autoCompleteAppRoutes
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '03', 'path': 'button', 'samples': buttonAppRoutes
    },
    {
        'name': 'Chips', 'category': 'Editors', 'order': '03', 'path': 'chips', 'samples': chipsAppRoutes
    },
    {
        'name': "ComboBox", 'category': "Dropdowns", 'ftName': "combo-box", 'order': '05', 'path': "combo-box", 'samples': comboboxAppRoutes
    },
    {
        'name': 'DocumentEditor', 'category': 'Editors', 'order': '03', 'path': 'document-editor', 'samples': documentEditorAppRoutes, 'hideOnDevice': true, 'ftName': 'document-editor', 'type': 'update'
    },
    {
        'name': 'DatePicker', 'category': 'Calendars', 'order': '04', 'path': 'datepicker', 'samples': datePickerAppRoutes, 'type': 'update'
    },
    {
        'name': 'DateRangePicker', 'category': 'Calendars', 'order': '04', 'path': 'daterangepicker', 'samples': dateRangePickerAppRoutes, 'type': 'update'
    },
    {
        'name': 'DateTimePicker', 'category': 'Calendars', 'order': '04', 'path': 'datetimepicker', 'samples': dateTimePickerAppRoutes
    },
    {
        'name': "Dropdown List", 'category': "Dropdowns", 'ftName': "dropdown-list", 'order': '05', 'path': "drop-down-list", 'samples': dropdownlistAppRoutes
    },
    {
        'name': 'Form Validator', 'category': 'Editors', 'order': '03', 'path': 'form-validator', 'samples': formValidatorAppRoutes
    },
    {
        'name': "MultiSelect Dropdown", 'category': "Dropdowns", 'ftName': "multiselect-dropdown", 'order': '05', 'path': "multi-select", 'samples': multiselectAppRoutes
    },
    {
        'name': 'Input Mask', 'category': 'Inputs', 'order': '08', 'path': 'maskedtextbox', 'samples': maskedTextBoxAppRoutes, 'ftName': "maskedtextbox"
    },
    {
        'name': 'Pivot Table', 'category': 'Grids', 'order': '01', 'path': 'pivot-view', 'samples': pivotviewRouteConfig, 'type': 'update'
    },
    {
        'name': 'Numeric Textbox', 'category': 'Inputs', 'order': '08', 'path': 'numerictextbox', 'samples': numericAppRoutes, 'ftName': "numerictextbox"
    },
    {
        'name': "Range Slider", 'category': "Inputs", 'order': '08', 'path': "slider", 'samples': sliderAppRoutes, 'type': 'update'
    },
    {
        'name': 'TextBox', 'category': 'Inputs', 'order': '08', 'path': 'textboxes', 'samples': textboxesAppRoutes, 'type': 'update', 'ftName': 'textbox'
    },
    {
        'name': "TimePicker", 'category': 'Calendars', 'order': '04', 'path': "timepicker", 'samples': timePickerAppRoutes
    },
    {
        'name': "File Upload", 'category': "Inputs", 'order': '08', 'path': "uploader", 'samples': uploaderAppRoutes, 'ftName': 'file-upload'
    },
    {
        'name': "Badge", 'category': 'Notifications', 'order': '07', 'path': "badge", 'samples': badgeAppRoutes
    },
    {
        'name': "Toast", 'category': 'Notifications', 'order': '07', 'path': "toast", 'samples': toastAppRoutes, 'ftName': "toast"
    },
    {
        'name': 'Avatar', 'category': 'Layout', 'order': '09', 'path': 'avatar', 'samples': avatarAppRoutes
    },
    {
        'name': 'Card', 'category': 'Layout', 'order': '09', 'path': 'card', 'samples': cardAppRoutes, 'ftName': "card"
    },
    {
        'name': 'Dashboard Layout', 'category': 'Layout', 'order': '09', 'path': 'dashboard-layout', 'samples': dashboardlayoutAppRoutes, 'type': 'preview', "ftName": "dashboard-layout"
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '09', 'path': 'dialog', 'samples': dialogAppRoutes, 'ftName': 'modal-dialog'
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '09', 'path': 'listview', 'samples': listAppRoutes
    },
    {
        'name': 'Splitter', 'category': 'Layout', 'order': '09', 'path': 'splitter', 'samples': splitterAppRoutes, 'type': 'update', 'ftName': 'splitter'
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '09', 'path': 'tooltip', 'samples': tooltipAppRoutes
    },
    {
        'name': "Rich Text Editor", 'category': "Editors", 'ftName': 'wysiwyg-rich-text-editor', 'order': '03', 'path': "rich-text-editor", 'samples': rteAppRoutes, 'type': 'update'
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'order': '06', 'path': 'accordion', 'samples': accordionAppRoutes, 'ftName': "accordion"
    },
    {
        'name': 'Context Menu', 'category': 'Navigation', 'order': '06', 'path': 'context-menu', 'samples': contextMenuAppRoutes, 'ftName': "context-menu"
    },
    {
        'name': 'File Manager', 'category': 'Navigation', 'order': '06', 'path': 'file-manager', 'samples': fileManagerAppRoutes, 'type': 'preview',
    },
    {
        'name': 'Menu Bar', 'category': 'Navigation', 'order': '06', 'path': 'menu', 'samples': menuAppRoutes, 'ftName': "menu-bar"
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'order': '06', 'path': 'sidebar', 'samples': sidebarAppRoutes, 'type': 'update'
    },
    {
        'name': 'Tab', 'category': 'Navigation', 'order': '06', 'path': 'tab', 'samples': tabAppRoutes, 'ftName': "tabs"
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'order': '06', 'path': 'toolbar', 'samples': toolbarAppRoutes, 'ftName': "toolbar"
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'order': '06', 'path': 'treeview', 'samples': treeAppRoutes, 'ftName': "treeview", 'type': 'update'
    },
    {
        'name': "Color Picker", 'category': "Inputs", 'order': '08', 'path': "color-picker", 'samples': colorPickerAppRoutes, 'ftName': "color-picker"
    },
    {
        'name': "PdfViewer", 'category': "Viewer", 'order': '11', 'path': "pdfviewer", 'samples': pdfViewerAppRoutes, 'ftName': "pdfviewer", 'type': 'update'
    },
    {
        'name': 'In-place Editor', 'category': 'Editors', 'order': '03', 'path': 'inplace-editor', 'samples': inplaceeditorAppRoutes, 'ftName': 'inplaceeditor'
    },
    {
        'name': "Query Builder", 'category': "Forms", 'order': '10', 'path': "query-builder", 'samples': QueryBuilderAppRoutes
    },
    {
        "name": "List Box", "category": "Dropdowns", "ftName": "list-box", 'order': '03', "path": "list-box", "samples": listBoxAppRoutes, 'type': 'preview'
    }
];
