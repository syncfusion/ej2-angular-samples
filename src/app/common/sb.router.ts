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
import { ButtonModule } from '../button/button.module';
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
import { SparklineSampleModule } from '../sparkline/sparkline.module';
import { SmithchartSampleModule } from '../smith-chart/smith-chart.module';
import { ColorPickerSampleModule } from '../color-picker/color-picker.module';
import { PivotViewSampleModule } from '../pivot-view/pivot-view.module';
import { DocumentEditorSampleModule } from '../document-editor/document-editor.module';
import { RTESampleModule } from '../rich-text-editor/rich-text-editor.module';
import {FormValidatorModule} from '../form-validator/form-validator.module';
import { PdfViewerSampleModule } from '../pdfviewer/pdfviewer.module';
import { QueryBuilderSampleModule } from '../query-builder/query-builder.module';
import { GanttSampleModule } from '../gantt/gantt.module';
import { FileSampleModule } from '../file-manager/file-manager.module';
import { DashboardLayoutSampleModule } from '../dashboard-layout/dashboard-layout.module';
import { ListBoxSampleModule } from '../list-box/list-box.module';

const appRoutes: any = [
    { path: 'chart', loadChildren: ChartSampleModule },
    { path: 'maps', loadChildren: MapsSampleModule },
    { path: 'treemap', loadChildren: TreemapSampleModule },
    { path: 'heatmap', loadChildren: HeatmapSampleModule },
    { path: 'sparkline', loadChildren: SparklineSampleModule },
    { path: 'pivot-view', loadChildren: PivotViewSampleModule },
    { path: ':theme/pivot-view/:sample', redirectTo: 'material/pivot-view/default' },
    { path: 'smithchart', loadChildren: SmithchartSampleModule },
    { path: 'diagram', loadChildren: DiagramSampleModule },
    { path: 'inplace-editor', loadChildren: InplaceEditorSampleModule },
    { path: 'circulargauge', loadChildren: CircularGaugeSampleModule },
    { path: 'lineargauge', loadChildren: LinearGaugeSampleModule },
    { path: 'rangenavigator', loadChildren: RangeNavigatorSampleModule },
    { path: ':theme/range-navigator/:sample', redirectTo: 'material/range-navigator/default' },
    { path: 'grid', loadChildren: GridSampleModule },
    { path: 'treegrid', loadChildren: TreeGridSampleModule },
    { path: 'button', loadChildren: ButtonModule },
    { path: 'drop-down-list', loadChildren: DropDownListSampleModule },
    { path: 'form-validator', loadChildren:FormValidatorModule },
    { path: 'combo-box', loadChildren: ComboBoxSampleModule },
    { path: 'auto-complete', loadChildren: AutoCompleteSampleModule },
    { path: 'calendar', loadChildren: CalendarSampleModule },
    { path: 'date-picker', loadChildren: DatePickerSampleModule },
    { path: 'date-time-picker', loadChildren: DateTimePickerSampleModule },
    { path: 'date-range-picker', loadChildren: DateRangePickerSampleModule },
    { path: 'time-picker', loadChildren: TimePickerSampleModule },
    { path: 'numerictextbox', loadChildren: NumericModule },
    { path: 'listview', loadChildren: ListViewSampleModule },
    { path: 'splitter', loadChildren: splitterSampleModule },
    { path: 'chips', loadChildren: ChipsSampleModule },
    { path: 'dialog', loadChildren: DialogSampleModule },
    { path: 'document-editor', loadChildren: DocumentEditorSampleModule },
    { path: 'uploader', loadChildren: UploaderSampleModule },
    { path: 'schedule', loadChildren: ScheduleSampleModule },
    { path: ':theme/toolbar/:sample', redirectTo: 'material/toolbar/default' },
    { path: ':theme/accordion/:sample', redirectTo: 'material/accordion/default' },
    { path: ':theme/textboxes/:sample', redirectTo: 'material/textboxes/default' },
    { path: ':theme/uploader/:sample', redirectTo: 'material/uploader/default' },
    { path: ':theme/schedule/:sample', redirectTo: 'material/schedule/default' },
    { path: ':theme/document-editor/:sample', redirectTo: 'material/document-editor/default' },
    { path: 'treeview', loadChildren: TreeViewSampleModule },
    { path: 'sidebar', loadChildren: SidebarSampleModule },
    { path: 'toast', loadChildren: ToastSampleModule },
    { path: ':theme/toast/:sample', redirectTo: 'material/toast/default' },
    { path: 'slider', loadChildren: SliderSampleModule },
    { path: ':theme/card/:sample', redirectTo: 'material/card/default' },
    { path: 'tooltip', loadChildren: TooltipSampleModule },
    { path: 'maskedtextbox', loadChildren: MaskedTextBoxSampleModule },
    { path: 'multi-select', loadChildren: MultiSelectSampleModule },
    { path: 'context-menu', loadChildren: MenuModule },
    { path: ':theme/button/:sample', redirectTo: 'material/button/default' },
    { path: ':theme/context-menu/:sample', redirectTo: 'material/context-menu/default' },
    { path: 'menu', loadChildren: MenuSampleModule },
    { path: ':theme/tab/:sample', redirectTo: 'material/tab/default' },
    { path: ':theme/avatar/:sample', redirectTo: 'material/avatar/default' },
    { path: ':theme/badge/:sample', redirectTo: 'material/badge/default' },
    { path: '', redirectTo: 'material/grid/over-view', pathMatch: 'full' },
    { path: ':theme/maps/:sample', redirectTo: 'material/maps/default' },
    { path: '**', redirectTo: 'material/grid/over-view' },
    { path: ':theme/color-picker/:sample', redirectTo: 'material/color-picker/default' },
    { path: 'rich-text-editor', loadChildren: RTESampleModule },
    { path: ':theme/rich-text-editor/:sample', redirectTo: 'material/rich-text-editor/default' },
    { path: 'stockchart', loadChildren: StockChartSampleModule },
    { path: 'pdfviewer', loadChildren: PdfViewerSampleModule },
    { path: ':theme/pdfviewer/:sample', redirectTo: 'material/pdfviewer/default' },
    { path: 'query-builder', loadChildren: QueryBuilderSampleModule },
    { path: ':theme/query-builder/:sample', redirectTo: 'material/query-builder/default' },
    { path: 'gantt', loadChildren: GanttSampleModule },
    { path: ':theme/gantt/:sample', redirectTo: 'material/gantt/default' },
    { path: 'file-manager', loadChildren: FileSampleModule },
    { path: ':theme/file-manager/:sample', redirectTo: 'material/file-manager/default' },
    { path: ':theme/dashboard-layout/:sample', redirectTo: 'material/dashboard-layout/default' },
    { path: 'dashboard-layout', loadChildren: DashboardLayoutSampleModule},
    { path: 'list-box', loadChildren: ListBoxSampleModule },
    { path: ':theme/list-box/:sample', redirectTo: 'material/list-box/default' }
];

@NgModule({
    imports: [
        ChartSampleModule,
        MapsSampleModule,
        TreemapSampleModule,
        HeatmapSampleModule,
        CircularGaugeSampleModule,
        LinearGaugeSampleModule,
        RangeNavigatorSampleModule,
        SparklineSampleModule,
        DiagramSampleModule,
        SmithchartSampleModule,
        GridSampleModule,
        splitterSampleModule,
        TreeGridSampleModule,
        ButtonModule,
        AutoCompleteSampleModule,
        ComboBoxSampleModule,
        DropDownListSampleModule,
        FormValidatorModule,
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
        MenuSampleModule,
        TabSampleModule,
        CardSampleModule,
        SidebarSampleModule,
        SliderSampleModule,
        AvatarSampleModule,
        BadgeModule,
        ToastSampleModule,
        UploaderSampleModule,
        ChipsSampleModule,
        ScheduleSampleModule,
        ColorPickerSampleModule,
        PivotViewSampleModule,
        DocumentEditorSampleModule,
        RTESampleModule,
		InplaceEditorSampleModule,
        StockChartSampleModule,
        PdfViewerSampleModule,
        QueryBuilderSampleModule,
        GanttSampleModule,
        FileSampleModule,
        DashboardLayoutSampleModule,
        ListBoxSampleModule,
        RouterModule.forRoot(appRoutes)
    ],

    declarations: [
    ],

    exports: [
        RouterModule,
    ]
})
export class SBRoutingModule { }
