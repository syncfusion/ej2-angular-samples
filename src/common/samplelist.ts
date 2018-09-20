import { buttonAppRoutes } from '../button/button.module';
import { listAppRoutes } from '../list-view/list-view.module';
import { gridRouteConfig } from '../grid/grid.module';
import { toolbarAppRoutes } from '../toolbar/toolbar.module';
import { accordionAppRoutes } from '../accordion/accordion.module';
import { numericAppRoutes } from '../numerictextbox/numerictextbox.module';
import { diagramAppRoutes } from '../diagram/diagram.module';
import { datePickerAppRoutes } from '../date-picker/date-picker.module';
import { dateTimePickerAppRoutes } from '../date-time-picker/date-time-picker.module';
import { dateRangePickerAppRoutes } from '../date-range-picker/date-range-picker.module';
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
import { timePickerAppRoutes } from '../time-picker/time-picker.module';
import { multiselectAppRoutes } from '../multi-select/multi-select.module';
import { rteAppRoutes } from '../rte/rte.module';
import { tabAppRoutes } from '../tab/tab.module';
import { contextMenuAppRoutes } from '../context-menu/context-menu.module';
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

export let samplesList: any = [
    {
        'name': 'Data Grid', 'category': 'Grids', 'order': '01', 'path': 'grid', 'samples': gridRouteConfig, 'type': 'update','ftName': 'datagrid'
    },
    {
        'name': 'Chart', 'category': 'Datavisualization', 'order': '01', 'path': 'chart', 'samples': chartAppRoutes, "type": "update"
    },
    {
        'name': 'Diagram', 'category': 'Datavisualization', 'order': '01', 'path': 'diagram', 'samples': diagramAppRoutes, "type": "preview"
    },
    {
        'name': 'Maps', 'category': 'Datavisualization', 'order': '01', 'path': 'maps', 'samples': mapAppRoutes
    },
    {
        'name': 'TreeMap', 'category': 'Datavisualization', 'order': '02', 'path': 'treemap', 'samples': treemapAppRoutes
    },
    {
        'name': 'HeatMap', 'category': 'Datavisualization', 'order': '01', 'path': 'heatmap', 'samples': heatmapAppRoutes, 'type': 'update', 'ftName': 'heatmap'
    },
    {
        'name': 'Circular Gauge', 'category': 'Datavisualization', 'order': '01', 'path': 'circular-gauge', 'samples': circulargaugeAppRoutes, 'type': 'update'
    },
    {
        'name': 'Linear Gauge', 'category': 'Datavisualization', 'order': '01', 'path': 'linear-gauge', 'samples': lineargaugeAppRoutes
    },
    {
        'name': 'Range Navigator', 'category': 'Datavisualization', 'order': '01', 'path': 'range-navigator', 'samples': rangeNavigatorAppRoutes, "type": "preview"
    },
    {
        'name': 'Sparkline', 'category': 'Datavisualization', 'order': '02', 'path': 'sparkline', 'samples': sparklineAppRoutes
    },
    {
        'name': 'Smith Chart', 'category': 'Datavisualization', 'order': '01', 'path': 'smith-chart', 'samples': smithchartAppRoutes
    },
    {
        'name': 'Schedule', 'category': 'Calendar', 'order': '01', 'path': 'schedule', 'samples': scheduleRouteConfig, 'type': 'update', 'ftName': 'scheduler'
    },
    {
        'name': 'Calendar', 'category': 'Calendar', 'order': '03', 'path': 'calendar', 'samples': calendarAppRoutes
    },
    {
        "name": "AutoComplete", "category": "Editors", "ftName": "autocomplete", 'order': '03', "path": "auto-complete", "samples": autoCompleteAppRoutes
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '03', 'path': 'button', 'samples': buttonAppRoutes, "type": "update"
    },
    {
        "name": "ComboBox", "category": "Editors", "ftName": "combobox", 'order': '03', "path": "combo-box", "samples": comboboxAppRoutes
    },
    {
        'name': 'DocumentEditor', 'category': 'Editors', 'order': '03', 'path': 'document-editor', 'samples': documentEditorAppRoutes,'ftName': 'document-editor', 'type': 'preview'
    },
    {
        'name': 'DatePicker', 'category': 'Editors', 'order': '03', 'path': 'date-picker', 'samples': datePickerAppRoutes, "type": "update"
    },
    {
        'name': 'DateRangePicker', 'category': 'Editors', 'order': '03', 'path': 'date-range-picker', 'samples': dateRangePickerAppRoutes, "type": "update"
    },
    {
        'name': 'DateTimePicker', 'category': 'Editors', 'order': '03', 'path': 'date-time-picker', 'samples': dateTimePickerAppRoutes, "type": "update"
    },
    {
        "name": "DropDownList", "category": "Editors", "ftName": "dropdownlist", 'order': '03', "path": "drop-down-list", "samples": dropdownlistAppRoutes
    },
    {
        "name": "MultiSelect", "category": "Editors", "ftName": "multiselect", 'order': '03', "path": "multi-select", "samples": multiselectAppRoutes
    },
    {
        'name': 'MaskedTextBox', 'category': 'Editors', 'order': '03', 'path': 'maskedtextbox', 'samples': maskedTextBoxAppRoutes, "ftName" :"maskedtextbox"
    },
    {
        'name': 'Pivot Grid', 'category': 'Grids', 'order': '02', 'path': 'pivot-view', 'samples': pivotviewRouteConfig, "type": "preview"
    },
    {
        'name': 'NumericTextBox', 'category': 'Editors', 'order': '03', 'path': 'numerictextbox', 'samples': numericAppRoutes, "ftName": "numerictextbox"
    },
    {
        "name": "Slider", "category": "Editors", 'order': '03', "path": "slider", "samples": sliderAppRoutes, "type": "update"
    },
    {
        'name': 'TextBoxes', 'category': 'Editors', 'order': '03', 'path': 'textboxes', 'samples': textboxesAppRoutes
    },
    {
        "name": "TimePicker", "category": "Editors", 'order': '03', "path": "time-picker", "samples": timePickerAppRoutes, "type": "update"
    },
    {
        "name": "Uploader", "category": "Editors", 'order': '03', "path": "uploader", "samples": uploaderAppRoutes, "type": "update"
    },
    {
        "name": "Badge", "category": "Notifications", 'order': '05', "path": "badge", "samples": badgeAppRoutes, "type": "preview"
    },
    {
        "name": "Toast", "category": "Notifications", 'order': '05', "path": "toast", "samples": toastAppRoutes, "type": "preview", "ftName" :"toast"
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '04', 'path': 'listview', 'samples': listAppRoutes, "type": "update"
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '04', 'path': 'dialog', 'samples': dialogAppRoutes, "type": "update"
    },
    {
        "name": "RichTextEditor", "category": "Editors", "ftName": "rich-text-editor", 'order': '03', "path": "rte", "samples": rteAppRoutes, "type": "preview"
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '04', 'path': 'tooltip', 'samples': tooltipAppRoutes
    },
    {
        'name': 'Card', 'category': 'Layout', 'order': '05', 'path': 'card', 'samples': cardAppRoutes, "ftName" :"card"
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'order': '06', 'path': 'sidebar', 'samples': sidebarAppRoutes
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'order': '06', 'path': 'treeview', 'samples': treeAppRoutes, "type": "update", "ftName" :"tree-view",
    },
    {
        'name': 'Tab', 'category': 'Navigation', 'order': '06', 'path': 'tab', 'samples': tabAppRoutes, "ftName" :"tabs"
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'order': '06', 'path': 'toolbar', 'samples': toolbarAppRoutes, "ftName" :"toolbar"
    },
    {
        'name': 'ContextMenu', 'category': 'Navigation', 'order': '06', 'path': 'context-menu', 'samples': contextMenuAppRoutes, "ftName" :"context-menu"
    },
    {
        'name': 'Avatar', 'category': 'Layout', 'order': '05', 'path': 'avatar', 'samples': avatarAppRoutes, "type": "preview"
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'order': '06', 'path': 'accordion', 'samples': accordionAppRoutes, "ftName" :"accordion"
    },
    {
        "name": "ColorPicker", "category": "Editors", 'order': '03', "path": "color-picker", "samples": colorPickerAppRoutes, "ftName": "color-picker"
    }
];
