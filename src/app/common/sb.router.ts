import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Syncfusion
import { DropDownListSampleModule } from '../drop-down-list/drop-down-list.module';
import { MentionSampleModule } from '../mention/mention.module';
import { DropDownTreeSampleModule } from '../drop-down-tree/drop-down-tree.module';
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
import { PredefinedDialogsSampleModule } from '../predefined-dialogs/predefined-dialogs.module';
import { SliderSampleModule } from '../range-slider/range-slider.module';
import { SidebarSampleModule } from '../sidebar/sidebar.module';
import { TextboxesModule } from '../textboxes/textboxes.module';
import { InplaceEditorSampleModule } from '../inplace-editor/inplace-editor.module';
import { TooltipSampleModule } from '../tooltip/tooltip.module';
import { ArcGaugeSampleModule } from '../arc-gauge/arc-gauge.module';
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
import { MessageSampleModule } from '../message/message.module';
import { RangeNavigatorSampleModule } from '../range-navigator/range-navigator.module';
import { StockChartSampleModule } from '../stock-chart/stock-chart.module';
import { TreemapSampleModule } from '../treemap/treemap.module';
import { HeatmapSampleModule } from '../heatmap-chart/heatmap-chart.module';
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
import { BulletChartSampleModule } from '../bullet-chart/bullet-chart.module';
import { KanbanSampleModule } from '../kanban/kanban.module';
import { ProgressBarSampleModule } from '../progress-bar/progress-bar.module';
import { BreadcrumbSampleModule } from '../breadcrumb/breadcrumb.module';
import { CarouselSampleModule } from '../carousel/carousel.module';
import { AppBarSampleModule } from '../appbar/appbar.module';
import { SignatureSampleModule } from '../signature/signature.module';
import { ImageEditorSampleModule } from '../image-editor/image-editor.module';
import { FloatingActionButtonSampleModule } from "../floating-action-button/floating-action-button.module";
import { SpeedDialSampleModule } from "../speed-dial/speed-dial.module";
import { SkeletonSampleModule } from "../skeleton/skeleton.module";
import { RatingSampleModule } from "../rating/rating.module";

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
    { path: '', redirectTo: 'material/chart/overview-chart', pathMatch: 'full' },
    { path: '**', redirectTo: 'material/chart/overview-chart' },
    { path: 'stockchart', loadChildren: StockChartSampleModule },
    { path: 'arcgauge', loadChildren: ArcGaugeSampleModule },
    { path: 'circulargauge', loadChildren: CircularGaugeSampleModule },
    { path: 'diagram', loadChildren: DiagramSampleModule },
    { path: 'heatmap-chart', loadChildren: HeatmapSampleModule },
    { path: 'lineargauge', loadChildren: LinearGaugeSampleModule },
    { path: 'maps', loadChildren: MapsSampleModule },
    { path: ':theme/maps/:sample', redirectTo: 'material/maps/default' },
    { path: 'rangenavigator', loadChildren: RangeNavigatorSampleModule },
    { path: ':theme/range-navigator/:sample', redirectTo: 'material/range-navigator/default' },
    { path: 'smithchart', loadChildren: SmithchartSampleModule },
    { path: 'barcode', loadChildren: BarcodeSampleModule },
    { path: 'sparkline', loadChildren: SparklineSampleModule },
    { path: 'treemap', loadChildren: TreemapSampleModule },
    { path: 'bulletchart', loadChildren: BulletChartSampleModule },
    { path: 'kanban', loadChildren: KanbanSampleModule },
    { path: ':theme/kanban/:sample', redirectTo: 'material/kanban/overview' },
    // Forms
    { path: 'form-validator', loadChildren: FormValidatorModule },
    { path: 'query-builder', loadChildren: QueryBuilderSampleModule },
    { path: ':theme/query-builder/:sample', redirectTo: 'material/query-builder/default' },
    // File Viewers & Editors
    { path: 'pdfviewer', loadChildren: PdfViewerSampleModule },
    { path: ':theme/pdfviewer/:sample', redirectTo: 'material/pdfviewer/default' },
    { path: 'rich-text-editor', loadChildren: RTESampleModule },
    { path: ':theme/rich-text-editor/:sample', redirectTo: 'material/rich-text-editor/default' },
    { path: 'document-editor', loadChildren: DocumentEditorSampleModule },
    { path: ':theme/document-editor/:sample', redirectTo: 'material/document-editor/default' },
    { path: 'image-editor', loadChildren: ImageEditorSampleModule },
    // calendars
    { path: 'schedule', loadChildren: ScheduleSampleModule },
    { path: ':theme/schedule/:sample', redirectTo: 'material/schedule/default' },
    { path: 'calendar', loadChildren: CalendarSampleModule },
    { path: 'date-picker', loadChildren: DatePickerSampleModule },
    { path: 'date-range-picker', loadChildren: DateRangePickerSampleModule },
    { path: 'date-time-picker', loadChildren: DateTimePickerSampleModule },
    { path: 'time-picker', loadChildren: TimePickerSampleModule },
    { path: 'gantt', loadChildren: GanttSampleModule },
    { path: ':theme/gantt/:sample', redirectTo: 'material/gantt/default' },
    // Buttons
    { path: 'button', loadChildren: ButtonSampleModule },
    { path: ':theme/button/:sample', redirectTo: 'material/button/default' },
    { path: 'chips', loadChildren: ChipsSampleModule },
    { path: 'floating-action-button',loadChildren: FloatingActionButtonSampleModule},
    { path: 'speed-dial',loadChildren: SpeedDialSampleModule},
    // Dropdowns
    { path: 'auto-complete', loadChildren: AutoCompleteSampleModule },
    { path: 'combo-box', loadChildren: ComboBoxSampleModule },
    { path: 'drop-down-list', loadChildren: DropDownListSampleModule },
    { path: 'drop-down-tree', loadChildren: DropDownTreeSampleModule },
    { path: 'multi-select', loadChildren: MultiSelectSampleModule },
    { path: 'list-box', loadChildren: ListBoxSampleModule },
    { path: ':theme/list-box/:sample', redirectTo: 'material/list-box/default' },
    { path: 'mention', loadChildren: MentionSampleModule },
    // Navigation
    { path: ':theme/accordion/:sample', redirectTo: 'material/accordion/default' },
    { path: 'appbar', loadChildren: AppBarSampleModule },
    { path: ':theme/appbar/:sample', redirectTo: 'material/appbar/default' },
    { path: 'breadcrumb', loadChildren: BreadcrumbSampleModule },
    { path: ':theme/breadcrumb/:sample', redirectTo: 'material/breadcrumb/default' },
    { path: 'carousel', loadChildren: CarouselSampleModule },
    { path: ':theme/carousel/:sample', redirectTo: 'material/carousel/default' },
    { path: 'context-menu', loadChildren: MenuModule },
    { path: ':theme/context-menu/:sample', redirectTo: 'material/context-menu/default' },
    { path: 'menu', loadChildren: MenuSampleModule },
    { path: 'sidebar', loadChildren: SidebarSampleModule },
    { path: ':theme/tab/:sample', redirectTo: 'material/tab/default' },
    { path: ':theme/toolbar/:sample', redirectTo: 'material/toolbar/default' },
    { path: 'treeview', loadChildren: TreeViewSampleModule },
    { path: 'file-manager', loadChildren: FileSampleModule },
    { path: ':theme/file-manager/:sample', redirectTo: 'material/file-manager/default' },
    // Notifications
    { path: ':theme/badge/:sample', redirectTo: 'material/badge/default' },
    { path: 'message', loadChildren: MessageSampleModule },
    { path: ':theme/message/:sample', redirectTo: 'material/message/default' },
    { path: 'toast', loadChildren: ToastSampleModule },
    { path: ':theme/toast/:sample', redirectTo: 'material/toast/default' },
    { path: 'progressbar', loadChildren: ProgressBarSampleModule },
    { path: 'skeleton', loadChildren: SkeletonSampleModule },
    // Inputs
    { path: ':theme/textboxes/:sample', redirectTo: 'material/textboxes/default' },
    { path: 'maskedtextbox', loadChildren: MaskedTextBoxSampleModule },
    { path: 'numerictextbox', loadChildren: NumericModule },
    { path: ':theme/color-picker/:sample', redirectTo: 'material/color-picker/default' },
    { path: 'uploader', loadChildren: UploaderSampleModule },
    { path: ':theme/uploader/:sample', redirectTo: 'material/uploader/default' },
    { path: 'range-slider', loadChildren: SliderSampleModule },
    { path: 'signature', loadChildren: SignatureSampleModule },
    { path: 'inplace-editor', loadChildren: InplaceEditorSampleModule },
    { path: 'rating', loadChildren: RatingSampleModule },
    // layouts
    { path: ':theme/avatar/:sample', redirectTo: 'material/avatar/default' },
    { path: ':theme/card/:sample', redirectTo: 'material/card/default' },
    { path: 'dialog', loadChildren: DialogSampleModule },
    { path: 'predefined-dialogs', loadChildren: PredefinedDialogsSampleModule },
    { path: 'listview', loadChildren: ListViewSampleModule },
    { path: 'tooltip', loadChildren: TooltipSampleModule },
    { path: 'splitter', loadChildren: splitterSampleModule },
    { path: 'dashboard-layout', loadChildren: DashboardLayoutSampleModule },
    { path: ':theme/dashboard-layout/:sample', redirectTo: 'material/dashboard-layout/default' },
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
        ArcGaugeSampleModule,
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
        KanbanSampleModule,
        // Editors
        ButtonSampleModule,
        ChipsSampleModule,
        FloatingActionButtonSampleModule,
        SpeedDialSampleModule,
        DocumentEditorSampleModule,
        ImageEditorSampleModule,
        FormValidatorModule,
        RTESampleModule,
        InplaceEditorSampleModule,
        SignatureSampleModule,
        // Dropdowns
        AutoCompleteSampleModule,
        ComboBoxSampleModule,
        DropDownListSampleModule,
        DropDownTreeSampleModule,
        MultiSelectSampleModule,
        ListBoxSampleModule,
        MentionSampleModule,
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
        AppBarSampleModule,
        BreadcrumbSampleModule,
        CarouselSampleModule,
        MenuModule,
        FileSampleModule,
        MenuSampleModule,
        SidebarSampleModule,
        TabSampleModule,
        ToolbarSampleModule,
        TreeViewSampleModule,
        // Notifications
        MessageSampleModule,
        BadgeModule,
        ToastSampleModule,
        ProgressBarSampleModule,
        SkeletonSampleModule,
        // Inputs
        MaskedTextBoxSampleModule,
        NumericModule,
        SliderSampleModule,
        TextboxesModule,
        UploaderSampleModule,
        ColorPickerSampleModule,
        RatingSampleModule,
        // layouts
        AvatarSampleModule,
        CardSampleModule,
        DashboardLayoutSampleModule,
        DialogSampleModule,
        PredefinedDialogsSampleModule,
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
