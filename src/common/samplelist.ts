import { buttonAppRoutes } from '../button/button.module';
import { listAppRoutes } from '../listview/listview.module';
import { gridRouteConfig } from '../grid/grid.module';
import { toolbarAppRoutes } from '../toolbar/toolbar.module';
import { accordionAppRoutes } from '../accordion/accordion.module';
import { numericAppRoutes } from '../numerictextbox/numerictextbox.module';
import { datePickerAppRoutes } from '../datepicker/datepicker.module';
import { dateTimePickerAppRoutes } from '../datetimepicker/datetimepicker.module';
import { dateRangePickerAppRoutes } from '../daterangepicker/daterangepicker.module';
import { calendarAppRoutes } from '../calendar/calendar.module';
import { chartAppRoutes } from '../chart/chart.module';
import { circulargaugeAppRoutes } from '../circulargauge/circulargauge.module';
import { lineargaugeAppRoutes } from '../lineargauge/lineargauge.module';
import { dialogAppRoutes } from '../dialog/dialog.module';
import { dropdownlistAppRoutes } from '../dropdownlist/dropdownlist.module';
import { comboboxAppRoutes } from '../combobox/combobox.module';
import { autoCompleteAppRoutes } from '../autocomplete/autocomplete.module';
import { textboxesAppRoutes } from '../textboxes/textboxes.module';
import { tooltipAppRoutes } from '../tooltip/tooltip.module';
import { sidebarAppRoutes } from '../sidebar/sidebar.module';
import { maskedTextBoxAppRoutes } from '../maskedtextbox/maskedtextbox.module';
import { timePickerAppRoutes } from '../timepicker/timepicker.module';
import { multiselectAppRoutes } from '../multiselect/multiselect.module';
import { tabAppRoutes } from '../tab/tab.module';
import { contextMenuAppRoutes } from '../contextmenu/contextmenu.module';
import { sliderAppRoutes } from '../slider/slider.module';
import { treeAppRoutes } from '../treeview/treeview.module';
import { uploaderAppRoutes } from '../uploader/uploader.module';
import { scheduleRouteConfig } from '../schedule/schedule.module';
import { cardAppRoutes } from '../card/card.module';
import{ mapAppRoutes } from '../maps/maps.module';

export let samplesList: any = [
    {
        'name': 'Chart', 'category': 'Datavisualization', 'order': '01', 'path': 'chart', 'samples': chartAppRoutes, "type": "update"
    },
    {
        'name': 'Maps', 'category': 'Datavisualization', 'order': '01', 'path': 'maps', 'samples': mapAppRoutes, 'type': 'preview'
    },
    {
        'name': 'Circular Gauge', 'category': 'Datavisualization', 'order': '01', 'path': 'circulargauge', 'samples': circulargaugeAppRoutes
    },
    {
        'name': 'Linear Gauge', 'category': 'Datavisualization', 'order': '01', 'path': 'lineargauge', 'samples': lineargaugeAppRoutes
    },
    {
        'name': 'Grid', 'category': 'Grids', 'order': '02', 'path': 'grid', 'samples': gridRouteConfig, 'type': 'update'
    },
    {
        'name': 'Schedule', 'category': 'Calendar', 'order': '01', 'path': 'schedule', 'samples': scheduleRouteConfig, 'type': 'preview'
    },
    {
        'name': 'Calendar', 'category': 'Calendar', 'order': '03', 'path': 'calendar', 'samples': calendarAppRoutes
    },
    {
        "name": "AutoComplete", "category": "Editors", 'order': '03', "path": "autocomplete", "samples": autoCompleteAppRoutes, "type": "update"
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '03', 'path': 'button', 'samples': buttonAppRoutes, "type": "update"
    },
    {
        "name": "ComboBox", "category": "Editors", 'order': '03', "path": "combobox", "samples": comboboxAppRoutes, "type": "update"
    },
    {
        'name': 'DatePicker', 'category': 'Editors', 'order': '03', 'path': 'datepicker', 'samples': datePickerAppRoutes
    },
    {
        'name': 'DateRangePicker', 'category': 'Editors', 'order': '03', 'path': 'daterangepicker', 'samples': dateRangePickerAppRoutes, "type": "update"
    },
    {
        'name': 'DateTimePicker', 'category': 'Editors', 'order': '03', 'path': 'datetimepicker', 'samples': dateTimePickerAppRoutes, "type": "preview"
    }, 
    {
        "name": "DropDownList", "category": "Editors", 'order': '03', "path": "dropdownlist", "samples": dropdownlistAppRoutes, "type": "update"
    },
    {
        "name": "MultiSelect", "category": "Editors", 'order': '03', "path": "multiselect", "samples": multiselectAppRoutes, "type": "update"
    },
    {
        'name': 'MaskedTextBox', 'category': 'Editors', 'order': '03', 'path': 'maskedtextbox', 'samples': maskedTextBoxAppRoutes
    },
    {
        'name': 'NumericTextBox', 'category': 'Editors', 'order': '03', 'path': 'numerictextbox', 'samples': numericAppRoutes
    },
    {
        "name": "Slider", "category": "Editors", 'order': '03', "path": "slider", "samples": sliderAppRoutes, "type": "preview"
    },
    {
        'name': 'TextBoxes', 'category': 'Editors', 'order': '03', 'path': 'textboxes', 'samples': textboxesAppRoutes
    },
    {
        "name": "TimePicker", "category": "Editors", 'order': '03', "path": "timepicker", "samples": timePickerAppRoutes, "type": "update"
    },  
    {
        "name": "Uploader", "category": "Editors", 'order': '03', "path": "uploader", "samples": uploaderAppRoutes, "type": "preview"
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '04', 'path': 'listview', 'samples': listAppRoutes, "type": "update"
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '04', 'path': 'dialog', 'samples': dialogAppRoutes, "type": "update"
    },
    {
        'name': 'Tooltip', 'category': 'Layout', 'order': '04', 'path': 'tooltip', 'samples': tooltipAppRoutes
    },
    {
        'name': 'Card', 'category': 'Layout', 'order': '05', 'path': 'card', 'samples': cardAppRoutes, "type": "preview"
    },
    {
        'name': 'Sidebar', 'category': 'Navigation', 'order': '05', 'path': 'sidebar', 'samples': sidebarAppRoutes, "type": "preview"
    },
    {
        'name': 'TreeView', 'category': 'Navigation', 'order': '05', 'path': 'treeview', 'samples': treeAppRoutes
    },
    {
        'name': 'Tab', 'category': 'Navigation', 'order': '05', 'path': 'tab', 'samples': tabAppRoutes, "type": "update"
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'order': '05', 'path': 'toolbar', 'samples': toolbarAppRoutes, "type": "update"
    },
    
    {
        'name': 'ContextMenu', 'category': 'Navigation', 'order': '05', 'path': 'contextmenu', 'samples': contextMenuAppRoutes
    },
    {
        'name': 'Accordion', 'category': 'Navigation', 'order': '05', 'path': 'accordion', 'samples': accordionAppRoutes
    }   
];