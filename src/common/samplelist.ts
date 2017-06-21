import { formValidatorAppRoutes } from '../form-validator/form-validator.module';
import { buttonAppRoutes } from '../button/button.module';
import { listAppRoutes } from '../listview/listview.module';
import { gridRouteConfig } from '../grid/grid.module';
import { toolbarAppRoutes } from '../toolbar/toolbar.module';
import { numericAppRoutes } from '../numerictextbox/numericTextBox.module';
import { calendarAppRoutes } from '../calendar/calendar.module';
import { chartAppRoutes } from '../chart/chart.module';
import { dialogAppRoutes } from '../dialog/dialog.module';
import { textboxesAppRoutes } from '../textboxes/textboxes.module';
export let samplesList: any = [
    {
        'name': 'Chart', 'category': 'Datavisualization', 'order': '01', 'path': 'chart', 'samples': chartAppRoutes
    },
    {
        'name': 'Grid', 'category': 'Grids', 'order': '02', 'path': 'grid', 'samples': gridRouteConfig
    },
    {
        'name': 'Form-Validator', 'category': 'Editors', 'order': '03', 'path': 'form-validator', 'samples': formValidatorAppRoutes
    },
    {
        'name': 'Button', 'category': 'Editors', 'order': '03', 'path': 'button', 'samples': buttonAppRoutes
    },
    {
        'name': 'Calendar', 'category': 'Editors', 'order': '03', 'path': 'calendar', 'samples': calendarAppRoutes
    },
    {
        'name': 'NumericTextBox', 'category': 'Editors', 'order': '03', 'path': 'numerictextbox', 'samples': numericAppRoutes
    },
    {
        'name': 'TextBoxes', 'category': 'Editors', 'order': '03', 'path': 'inputboxes', 'samples': textboxesAppRoutes
    },
    {
        'name': 'ListView', 'category': 'Layout', 'order': '04', 'path': 'listview', 'samples': listAppRoutes
    },
    {
        'name': 'Dialog', 'category': 'Layout', 'order': '04', 'path': 'dialog', 'samples': dialogAppRoutes
    },
    {
        'name': 'Toolbar', 'category': 'Navigation', 'order': '05', 'path': 'toolbar', 'samples': toolbarAppRoutes
    }
];