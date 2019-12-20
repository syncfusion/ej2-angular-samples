import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Syncfusion
import { DropDownListSampleModule } from '../drop-down-list/drop-down-list.module';
import { ComboBoxSampleModule } from '../combo-box/combo-box.module';
import { AutoCompleteSampleModule } from '../auto-complete/auto-complete.module';
import { CalendarSampleModule } from '../calendar/calendar.module';
import { DatePickerSampleModule } from '../datepicker/datepicker.module';
import { DateTimePickerSampleModule } from '../datetimepicker/datetimepicker.module';
import { DateRangePickerSampleModule } from '../daterangepicker/daterangepicker.module';
import { TimePickerSampleModule } from '../timepicker/timepicker.module';
import { ButtonSampleModule } from '../button/button.module';
import { ChipsSampleModule } from '../chips/chips.module';
import { ListViewSampleModule } from '../listview/listview.module';
import { TreeViewSampleModule } from '../treeview/treeview.module';
import { GridSampleModule } from '../grid/grid.module';
import { splitterSampleModule } from '../splitter/splitter.module';
import { TreeGridSampleModule } from '../treegrid/treegrid.module'
import { ToolbarSampleModule } from '../toolbar/toolbar.module';
import { AccordionSampleModule } from '../accordion/accordion.module';
import { NumericModule } from '../numerictextbox/numerictextbox.module';
import { ChartSampleModule } from '../chart/chart.module';
import { DialogSampleModule } from '../dialog/dialog.module';
import { SliderSampleModule } from '../slider/slider.module';
import { SidebarSampleModule } from '../sidebar/sidebar.module';
import { TextboxesModule } from '../textboxes/textboxes.module';
import { InplaceEditorSampleModule } from '../inplace-editor/inplace-editor.module';
import { TooltipSampleModule } from '../tooltip/tooltip.module';
import { CircularGaugeSampleModule } from '../circular-gauge/circular-gauge.module';
import { LinearGaugeSampleModule } from '../linear-gauge/linear-gauge.module';
import { MaskedTextBoxSampleModule } from '../maskedtextbox/maskedtextbox.module';
import { MultiSelectSampleModule } from '../multi-select/multi-select.module';
import { MenuModule } from '../context-menu/context-menu.module';
import { MenuSampleModule } from '../menu/menu.module';
import { TabSampleModule } from '../tab/tab.module';
import { CardSampleModule } from '../card/card.module';
import { UploaderSampleModule } from '../uploader/uploader.module';
import { MapsSampleModule } from '../maps/maps.module';
import { ScheduleSampleModule } from '../schedule/schedule.module';
import { AvatarSampleModule } from '../avatar/avatar.module';
import { BadgeModule } from '../badge/badge.module';
import { ToastSampleModule } from '../toast/toast.module';
import { RangeNavigatorSampleModule } from '../range-navigator/range-navigator.module';
import { StockChartSampleModule } from '../stock-chart/stock-chart.module';
import { TreemapSampleModule } from '../treemap/treemap.module';
import { HeatmapSampleModule } from '../heatmap/heatmap.module';
import { DiagramSampleModule } from '../diagram/diagram.module';
import { BarcodeSampleModule } from '../barcode/barcode.module';
import { SparklineSampleModule } from '../sparkline/sparkline.module';
import { SmithchartSampleModule } from '../smith-chart/smith-chart.module';
import { ColorPickerSampleModule } from '../color-picker/color-picker.module';
import { PivotTableSampleModule } from '../pivot-table/pivot-table.module';
import { DocumentEditorSampleModule } from '../document-editor/document-editor.module';
import { RTESampleModule } from '../rich-text-editor/rich-text-editor.module';
import { FormValidatorModule } from '../form-validator/form-validator.module';
import { PdfViewerSampleModule } from '../pdfviewer/pdfviewer.module';
import { QueryBuilderSampleModule } from '../query-builder/query-builder.module';
import { GanttSampleModule } from '../gantt/gantt.module';
import { FileSampleModule } from '../file-manager/file-manager.module';
import { DashboardLayoutSampleModule } from '../dashboard-layout/dashboard-layout.module';
import { ListBoxSampleModule } from '../list-box/list-box.module';
import { SpreadsheetSampleModule } from '../spreadsheet/spreadsheet.module';
import { BulletChartSampleModule } from '../bullet-chart/bullet-chart.module'

const appRoutes: any = [
    // Grids
    { path: 'grid', loadChildren: GridSampleModule },
    { path: '', redirectTo: 'material/grid/over-view', pathMatch: 'full' },
    { path: '**', redirectTo: 'material/grid/over-view' },
    { path: 'treegrid', loadChildren: TreeGridSampleModule },
    { path: 'pivot-table', loadChildren: PivotTableSampleModule },
    { path: ':theme/pivot-table/:sample', redirectTo: 'material/pivot-table/default' },
    { path: 'spreadsheet', loadChildren: SpreadsheetSampleModule },
    { path: ':theme/spreadsheet/:sample', redirectTo: 'material/spreadsheet/default' },
    // Data visualization
    { path: 'chart', loadChildren: ChartSampleModule },
    { path: 'circulargauge', loadChildren: CircularGaugeSampleModule },
    { path: 'lineargauge', loadChildren: LinearGaugeSampleModule },
    { path: 'diagram', loadChildren: DiagramSampleModule },
    { path: 'stockchart', loadChildren: StockChartSampleModule },
    { path: 'maps', loadChildren: MapsSampleModule },
    { path: ':theme/maps/:sample', redirectTo: 'material/maps/default' },
    { path: 'rangenavigator', loadChildren: RangeNavigatorSampleModule },
    { path: ':theme/range-navigator/:sample', redirectTo: 'material/range-navigator/default' },
    { path: 'sparkline', loadChildren: SparklineSampleModule },
    { path: 'smithchart', loadChildren: SmithchartSampleModule },
    { path: 'barcode', loadChildren: BarcodeSampleModule },
    { path: 'treemap', loadChildren: TreemapSampleModule },
    { path: 'heatmap', loadChildren: HeatmapSampleModule },
    { path: 'bulletchart', loadChildren: BulletChartSampleModule },
    // Editors
    { path: 'button', loadChildren: ButtonSampleModule },
    { path: ':theme/button/:sample', redirectTo: 'material/button/default' },
    { path: 'chips', loadChildren: ChipsSampleModule },
    { path: 'document-editor', loadChildren: DocumentEditorSampleModule },
    { path: ':theme/document-editor/:sample', redirectTo: 'material/document-editor/default' },
    { path: 'form-validator', loadChildren: FormValidatorModule },
    { path: 'rich-text-editor', loadChildren: RTESampleModule },
    { path: ':theme/rich-text-editor/:sample', redirectTo: 'material/rich-text-editor/default' },
    { path: 'inplace-editor', loadChildren: InplaceEditorSampleModule },
    // Dropdowns
    { path: 'auto-complete', loadChildren: AutoCompleteSampleModule },
    { path: 'combo-box', loadChildren: ComboBoxSampleModule },
    { path: 'drop-down-list', loadChildren: DropDownListSampleModule },
    { path: 'multi-select', loadChildren: MultiSelectSampleModule },
    { path: 'list-box', loadChildren: ListBoxSampleModule },
    { path: ':theme/list-box/:sample', redirectTo: 'material/list-box/default' },
    // calendars
    { path: 'schedule', loadChildren: ScheduleSampleModule },
    { path: ':theme/schedule/:sample', redirectTo: 'material/schedule/default' },
    { path: 'gantt', loadChildren: GanttSampleModule },
    { path: ':theme/gantt/:sample', redirectTo: 'material/gantt/default' },
    { path: 'calendar', loadChildren: CalendarSampleModule },
    { path: 'date-picker', loadChildren: DatePickerSampleModule },
    { path: 'date-range-picker', loadChildren: DateRangePickerSampleModule },
    { path: 'date-time-picker', loadChildren: DateTimePickerSampleModule },
    { path: 'time-picker', loadChildren: TimePickerSampleModule },
    // Navigation
    { path: ':theme/accordion/:sample', redirectTo: 'material/accordion/default' },
    { path: 'context-menu', loadChildren: MenuModule },
    { path: ':theme/context-menu/:sample', redirectTo: 'material/context-menu/default' },
    { path: 'file-manager', loadChildren: FileSampleModule },
    { path: ':theme/file-manager/:sample', redirectTo: 'material/file-manager/default' },
    { path: 'menu', loadChildren: MenuSampleModule },
    { path: 'sidebar', loadChildren: SidebarSampleModule },
    { path: ':theme/tab/:sample', redirectTo: 'material/tab/default' },
    { path: ':theme/toolbar/:sample', redirectTo: 'material/toolbar/default' },
    { path: 'treeview', loadChildren: TreeViewSampleModule },
    // Notifications
    { path: ':theme/badge/:sample', redirectTo: 'material/badge/default' },
    { path: 'toast', loadChildren: ToastSampleModule },
    { path: ':theme/toast/:sample', redirectTo: 'material/toast/default' },
    // Inputs
    { path: 'maskedtextbox', loadChildren: MaskedTextBoxSampleModule },
    { path: 'numerictextbox', loadChildren: NumericModule },
    { path: 'slider', loadChildren: SliderSampleModule },
    { path: ':theme/textboxes/:sample', redirectTo: 'material/textboxes/default' },
    { path: 'uploader', loadChildren: UploaderSampleModule },
    { path: ':theme/uploader/:sample', redirectTo: 'material/uploader/default' },
    { path: ':theme/color-picker/:sample', redirectTo: 'material/color-picker/default' },
    // layouts
    { path: ':theme/avatar/:sample', redirectTo: 'material/avatar/default' },
    { path: ':theme/card/:sample', redirectTo: 'material/card/default' },
    { path: 'dashboard-layout', loadChildren: DashboardLayoutSampleModule },
    { path: ':theme/dashboard-layout/:sample', redirectTo: 'material/dashboard-layout/default' },
    { path: 'dialog', loadChildren: DialogSampleModule },
    { path: 'listview', loadChildren: ListViewSampleModule },
    { path: 'splitter', loadChildren: splitterSampleModule },
    { path: 'tooltip', loadChildren: TooltipSampleModule },
    // Forms
    { path: 'query-builder', loadChildren: QueryBuilderSampleModule },
    { path: ':theme/query-builder/:sample', redirectTo: 'material/query-builder/default' },
    // Viewer
    { path: 'pdfviewer', loadChildren: PdfViewerSampleModule },
    { path: ':theme/pdfviewer/:sample', redirectTo: 'material/pdfviewer/default' },
];

@NgModule({
    imports: [
        // Grids
        GridSampleModule,
        TreeGridSampleModule,
        PivotTableSampleModule,
        SpreadsheetSampleModule,
        // Data visualization
        ChartSampleModule,
        CircularGaugeSampleModule,
        LinearGaugeSampleModule,
        DiagramSampleModule,
        StockChartSampleModule,
        MapsSampleModule,
        RangeNavigatorSampleModule,
        SparklineSampleModule,
        SmithchartSampleModule,
        BarcodeSampleModule,
        TreemapSampleModule,
        HeatmapSampleModule,
        BulletChartSampleModule,
        // Editors
        ButtonSampleModule,
        ChipsSampleModule,
        DocumentEditorSampleModule,
        FormValidatorModule,
        RTESampleModule,
        InplaceEditorSampleModule,
        // Dropdowns
        AutoCompleteSampleModule,
        ComboBoxSampleModule,
        DropDownListSampleModule,
        MultiSelectSampleModule,
        ListBoxSampleModule,
        // calendars
        ScheduleSampleModule,
        GanttSampleModule,
        CalendarSampleModule,
        DatePickerSampleModule,
        DateRangePickerSampleModule,
        DateTimePickerSampleModule,
        TimePickerSampleModule,
        // Navigation
        AccordionSampleModule,
        MenuModule,
        FileSampleModule,
        MenuSampleModule,
        SidebarSampleModule,
        TabSampleModule,
        ToolbarSampleModule,
        TreeViewSampleModule,
        // Notifications
        BadgeModule,
        ToastSampleModule,
        // Inputs
        MaskedTextBoxSampleModule,
        NumericModule,
        SliderSampleModule,
        TextboxesModule,
        UploaderSampleModule,
        ColorPickerSampleModule,
        // layouts
        AvatarSampleModule,
        CardSampleModule,
        DashboardLayoutSampleModule,
        DialogSampleModule,
        ListViewSampleModule,
        splitterSampleModule,
        TooltipSampleModule,
        // Forms
        QueryBuilderSampleModule,
        // Viewer
        PdfViewerSampleModule,
        RouterModule.forRoot(appRoutes)
    ],

    declarations: [
    ],

    exports: [
        RouterModule,
    ]
})
export class SBRoutingModule { }
