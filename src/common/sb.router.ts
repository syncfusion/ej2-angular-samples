import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownListSampleModule } from '../dropdownlist/dropdownlist.module';
import { ComboBoxSampleModule } from '../combobox/combobox.module';
import { AutoCompleteSampleModule } from '../autocomplete/autocomplete.module';
import { CalendarSampleModule } from '../calendar/calendar.module';
import { DatePickerSampleModule } from '../datepicker/datepicker.module';
import { DateTimePickerSampleModule } from '../datetimepicker/datetimepicker.module';
import { DateRangePickerSampleModule } from '../daterangepicker/daterangepicker.module';
import { TimePickerSampleModule } from '../timepicker/timepicker.module';
import { ButtonModule } from '../button/button.module';
import { ListViewSampleModule } from '../listview/listview.module';
import { TreeViewSampleModule } from '../treeview/treeview.module';
import { GridSampleModule } from '../grid/grid.module';
import { ToolbarSampleModule } from '../toolbar/toolbar.module';
import { AccordionSampleModule } from '../accordion/accordion.module';
import { NumericModule } from '../numerictextbox/numerictextbox.module';
import { ChartSampleModule } from '../chart/chart.module';
import { DialogSampleModule } from '../dialog/dialog.module';
import { SliderSampleModule } from '../slider/slider.module';
import { SidebarSampleModule } from '../sidebar/sidebar.module';
import { TextboxesModule } from '../textboxes/textboxes.module';
import { TooltipSampleModule } from '../tooltip/tooltip.module';
import { CircularGaugeSampleModule } from '../circulargauge/circulargauge.module';
import { LinearGaugeSampleModule } from '../lineargauge/lineargauge.module';
import { MaskedTextBoxSampleModule } from '../maskedtextbox/maskedtextbox.module';
import { MultiSelectSampleModule } from '../multiselect/multiselect.module';
import { MenuModule } from '../contextmenu/contextmenu.module';
import { TabSampleModule } from '../tab/tab.module';
import { CardSampleModule } from '../card/card.module';
import { UploaderSampleModule } from '../uploader/uploader.module';
import { MapsSampleModule } from '../maps/maps.module';
import { ScheduleSampleModule } from '../schedule/schedule.module';

const appRoutes: any = [
    { path: 'chart', loadChildren: ChartSampleModule },
    { path: 'maps', loadChildren: MapsSampleModule },
    { path: 'circulargauge', loadChildren: CircularGaugeSampleModule },
    { path: 'lineargauge', loadChildren: LinearGaugeSampleModule },
    { path: 'grid', loadChildren: GridSampleModule },
    { path: 'button', loadChildren: ButtonModule },
    { path: 'dropdownlist', loadChildren: DropDownListSampleModule },
    { path: 'combobox', loadChildren: ComboBoxSampleModule },
    { path: 'autocomplete', loadChildren: AutoCompleteSampleModule },
    { path: 'calendar', loadChildren: CalendarSampleModule },
    { path: 'datepicker', loadChildren: DatePickerSampleModule },
    { path: 'datetimepicker', loadChildren: DateTimePickerSampleModule },
    { path: 'daterangepicker', loadChildren: DateRangePickerSampleModule },
    { path: 'timepicker', loadChildren: TimePickerSampleModule },
    { path: 'numerictextbox', loadChildren: NumericModule },
    { path: 'listview', loadChildren: ListViewSampleModule },
    { path: 'dialog', loadChildren: DialogSampleModule },
    { path: 'uploader', loadChildren: UploaderSampleModule },
    { path: 'schedule', loadChildren: ScheduleSampleModule },
    { path: ':theme/toolbar/:sample', redirectTo: 'material/toolbar/default' },
    { path: ':theme/accordion/:sample', redirectTo: 'material/accordion/default' },
    { path: ':theme/textboxes/:sample', redirectTo: 'material/textboxes/default' },
    { path: ':theme/uploader/:sample', redirectTo: 'material/uploader/default' },
    { path: ':theme/schedule/:sample', redirectTo: 'material/schedule/default' },
    { path: 'treeview', loadChildren: TreeViewSampleModule },
    { path: 'sidebar', loadChildren: SidebarSampleModule },
    { path: 'slider', loadChildren: SliderSampleModule },
    { path: ':theme/card/:sample', redirectTo: 'material/card/default' },
    { path: 'tooltip', loadChildren: TooltipSampleModule },
    { path: 'maskedtextbox', loadChildren: MaskedTextBoxSampleModule },
    { path: 'multiselect', loadChildren: MultiSelectSampleModule },
    { path: 'contextmenu', loadChildren: MenuModule },
    { path: ':theme/button/:sample', redirectTo: 'material/button/default' },
    { path: ':theme/contextmenu/:sample', redirectTo: 'material/contextmenu/default' },
    { path: ':theme/tab/:sample', redirectTo: 'material/tab/default' },
    { path: '', redirectTo: 'material/chart/line', pathMatch: 'full' },
    { path: ':theme/maps/:sample', redirectTo: 'material/maps/default' },
    { path: '**', redirectTo: 'material/chart/line' }
];

@NgModule({
    imports: [
        ChartSampleModule,
        MapsSampleModule,
        CircularGaugeSampleModule,
        LinearGaugeSampleModule,
        GridSampleModule,
        ButtonModule,
        AutoCompleteSampleModule,
        ComboBoxSampleModule,
        DropDownListSampleModule,
        CalendarSampleModule,
        DatePickerSampleModule,
        DateTimePickerSampleModule,
        DateRangePickerSampleModule,
        TimePickerSampleModule,
        NumericModule,
        ListViewSampleModule,
        TextboxesModule,
        DialogSampleModule,
        ToolbarSampleModule,
        AccordionSampleModule,
        TreeViewSampleModule,
        TooltipSampleModule,
        MaskedTextBoxSampleModule,
        MultiSelectSampleModule,
        MenuModule,
        TabSampleModule,
        CardSampleModule,
        SidebarSampleModule,
        SliderSampleModule,
        UploaderSampleModule,
        ScheduleSampleModule,
        RouterModule.forRoot(appRoutes)
    ],

    declarations: [
    ],

    exports: [
        RouterModule,
    ]
})
export class SBRoutingModule { }