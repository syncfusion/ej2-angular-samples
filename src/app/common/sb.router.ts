import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
import { TextAreasModule } from '../textarea/textarea.module';
import { InplaceEditorSampleModule } from '../inplace-editor/inplace-editor.module';
import { TooltipSampleModule } from '../tooltip/tooltip.module';
import { ArcGaugeSampleModule } from '../arc-gauge/arc-gauge.module';
import { CircularGaugeSampleModule } from '../circular-gauge/circular-gauge.module';
import { LinearGaugeSampleModule } from '../linear-gauge/linear-gauge.module';
import { MaskedTextBoxSampleModule } from '../maskedtextbox/maskedtextbox.module';
import { MultiSelectSampleModule } from '../multi-select/multi-select.module';
import { MultiColumnComboBoxSampleModule } from '../multicolumn-combobox/multicolumn-combobox.module';
import { AIAssistSampleModule } from '../ai-assistview/ai-assistview.module';
import { ChatUISampleModule } from '../chat-ui/chat-ui.module';
import { SpeechToTextSampleModule } from '../speech-to-text/speech-to-text.module';
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
import { MDESampleModule } from '../markdown-editor/markdown-editor.module';
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
import { OtpInputSampleModule } from '../otp-input/otp-input.module';
import { RibbonSampleModule } from "../ribbon/ribbon.module";
import { StepperSampleModule } from '../stepper/stepper.module';
import { ThreeDimensionChartSampleModule } from '../three-dimension-chart/three-dimension-chart.module';
import { ThreeDimensionCircularChartSampleModule } from '../three-dimension-circular-chart/three-dimension-circular-chart.module';
import { TimelineSampleModule } from '../timeline/timeline.module';
import { SmartPasteSampleModule } from '../ai-smart-paste/smartpaste.module';
import { SmartTextAreaSampleModule } from '../ai-smart-textarea/smarttextarea.module';
import { AIGridSampleModule } from '../ai-grid/aigrid.module';
import { AIGanttSampleModule } from '../ai-gantt/aigantt.module';
import { AISpreadsheetSampleModule } from '../ai-spreadsheet/aispreadsheet.module';
import { AIQueryBuilderSampleModule } from '../ai-querybuilder/aiquerybuilder.module';
import { AIComboBoxSampleModule } from '../ai-combo-box/aicombobox.module';
import { AIImageEditorSampleModule } from '../ai-image-editor/aiimageeditor.module';
import { AIPivotTableSampleModule } from '../ai-pivot-table/aipivottable.module';
import { AIMapsSampleModule } from '../ai-maps/aimaps.module';
import { AISchedulerSampleModule } from '../ai-schedule/aischedule.module';
import { AIDiagramSampleModule } from '../ai-diagram/aidiagram.module';
import { AIDocumentEditorSampleModule } from '../ai-document-editor/aidocumenteditor.module';
import { AIRichTextEditorSampleModule } from '../ai-rich-text-editor/airichtexteditor.module';


const appRoutes: any = [
    //SmartPasteButton
    { path: 'ai-smart-paste', loadChildren: import('../ai-smart-paste/smartpaste.module').then(m => m.SmartPasteSampleModule) },
    { path: ':theme/ai-smart-paste/:sample', redirectTo: 'fluent2/ai-smart-paste/default' },
    //SmartTextArea
    { path: 'ai-smart-textarea', loadChildren: import('../ai-smart-textarea/smarttextarea.module').then(m => m.SmartTextAreaSampleModule) },
    { path: ':theme/ai-smart-textarea/:sample', redirectTo: 'fluent2/ai-smart-textarea/default' },
    //AI Data Grid
    { path: 'ai-grid', loadChildren: import('../ai-grid/aigrid.module').then(m => m.AIGridSampleModule) },
    //AI Gantt
    { path: 'ai-gantt', loadChildren: import('../ai-gantt/aigantt.module').then(m => m.AIGanttSampleModule) },
    // AI Diagram
    { path: 'ai-diagram', loadChildren: import('../ai-diagram/aidiagram.module').then(m => m.AIDiagramSampleModule) },
    //AI Spreadsheet
    { path: 'ai-spreadsheet', loadChildren: import('../ai-spreadsheet/aispreadsheet.module').then(m => m.AISpreadsheetSampleModule) },
    //AI Query Builder
    { path: 'ai-querybuilder', loadChildren: import('../ai-querybuilder/aiquerybuilder.module').then(m => m.AIQueryBuilderSampleModule) },
    //AI ComboBox
    { path: 'ai-combo-box', loadChildren: import('../ai-combo-box/aicombobox.module').then(m => m.AIComboBoxSampleModule) },
    // AI Image Editor
    { path: 'ai-image-editor', loadChildren: import('../ai-image-editor/aiimageeditor.module').then(m => m.AIImageEditorSampleModule) },
    // AI Pivot Table
    { path: 'ai-pivot-table', loadChildren: import('../ai-pivot-table/aipivottable.module').then(m => m.AIPivotTableSampleModule) },
    // AI Rich Text Editor
    { path: 'ai-rich-text-editor', loadChildren: import('../ai-rich-text-editor/airichtexteditor.module').then(m => m.AIRichTextEditorSampleModule) },
    // AI Maps
    { path: 'ai-maps', loadChildren: import('../ai-maps/aimaps.module').then(m => m.AIMapsSampleModule) },
    // AI Document Editor
    { path: 'ai-document-editor', loadChildren: import('../ai-document-editor/aidocumenteditor.module').then(m => m.AIDocumentEditorSampleModule) },
    // AI Scheduler
    { path: 'ai-schedule', loadChildren: import('../ai-schedule/aischedule.module').then(m => m.AISchedulerSampleModule) },
    // Grids
    { path: 'grid', loadChildren: import('../grid/grid.module').then(m => m.GridSampleModule) },
    { path: '', redirectTo: 'material/grid/over-view', pathMatch: 'full' },
    { path: '**', redirectTo: 'material/grid/over-view' },
    { path: 'treegrid', loadChildren: import('../treegrid/treegrid.module').then(m=>m.TreeGridSampleModule) },
    { path: 'pivot-table', loadChildren: import('../pivot-table/pivot-table.module').then(m=>m.PivotTableSampleModule) },
    { path: ':theme/pivot-table/:sample', redirectTo: 'material/pivot-table/default' },
    { path: 'spreadsheet', loadChildren: import('../spreadsheet/spreadsheet.module').then(m=>m.SpreadsheetSampleModule) },
    { path: ':theme/spreadsheet/:sample', redirectTo: 'material/spreadsheet/default' },
    //Interactive chat
    { path: 'ai-assistview', loadChildren: import('../ai-assistview/ai-assistview.module').then(m=>m.AIAssistSampleModule) },
    { path: ':theme/ai-assistview/:sample', redirectTo: 'material/ai-assistview/default' },
    { path: 'chat-ui', loadChildren: import('../chat-ui/chat-ui.module').then(m=>m.ChatUISampleModule) },
    { path: ':theme/chat-ui/:sample', redirectTo: 'material/chat-ui/default' },
    // Data visualization
    { path: 'chart', loadChildren: import('../chart/chart.module').then(m=>m.ChartSampleModule) },
    { path: '', redirectTo: 'material/chart/overview-chart', pathMatch: 'full' },
    { path: '**', redirectTo: 'material/chart/overview-chart' },
    { path: 'three-dimension-chart', loadChildren: import('../three-dimension-chart/three-dimension-chart.module').then(m=>m.ThreeDimensionChartSampleModule) },
    { path: 'three-dimension-circular-chart', loadChildren: import('../three-dimension-circular-chart/three-dimension-circular-chart.module').then(m=>m.ThreeDimensionCircularChartSampleModule) },
    { path: 'stockchart', loadChildren: import('../stock-chart/stock-chart.module').then(m=>m.StockChartSampleModule) },
    { path: 'arcgauge', loadChildren: import('../arc-gauge/arc-gauge.module').then(m=>m.ArcGaugeSampleModule) },
    { path: 'circulargauge', loadChildren: import('../circular-gauge/circular-gauge.module').then(m=>m.CircularGaugeSampleModule) },
    { path: 'diagram', loadChildren: import('../diagram/diagram.module').then(m=>m.DiagramSampleModule) },
    { path: 'heatmap-chart', loadChildren: import('../heatmap-chart/heatmap-chart.module').then(m=>m.HeatmapSampleModule) },
    { path: 'lineargauge', loadChildren: import('../linear-gauge/linear-gauge.module').then(m=>m.LinearGaugeSampleModule) },
    { path: 'maps', loadChildren: import('../maps/maps.module').then(m=>m.MapsSampleModule) },
    { path: ':theme/maps/:sample', redirectTo: 'material/maps/default' },
    { path: 'rangenavigator', loadChildren: import('../range-navigator/range-navigator.module').then(m=>m.RangeNavigatorSampleModule) },
    { path: ':theme/range-navigator/:sample', redirectTo: 'material/range-navigator/default' },
    { path: 'smithchart', loadChildren: import('../smith-chart/smith-chart.module').then(m=>m.SmithchartSampleModule) },
    { path: 'barcode', loadChildren: import('../barcode/barcode.module').then(m=>m.BarcodeSampleModule) },
    { path: 'sparkline', loadChildren: import('../sparkline/sparkline.module').then(m=>m.SparklineSampleModule) },
    { path: 'treemap', loadChildren: import('../treemap/treemap.module').then(m=>m.TreemapSampleModule) },
    { path: 'bulletchart', loadChildren: import('../bullet-chart/bullet-chart.module').then(m=>m.BulletChartSampleModule) },
    { path: 'kanban', loadChildren: import('../kanban/kanban.module').then(m=>m.KanbanSampleModule) },
    { path: ':theme/kanban/:sample', redirectTo: 'material/kanban/overview' },
    // Forms
    { path: 'form-validator', loadChildren: import('../form-validator/form-validator.module').then(m=>m.FormValidatorModule) },
    { path: 'query-builder', loadChildren: import('../query-builder/query-builder.module').then(m=>m.QueryBuilderSampleModule) },
    { path: ':theme/query-builder/:sample', redirectTo: 'material/query-builder/default' },
    // File Viewers & Editors
    { path: 'pdfviewer', loadChildren: import('../pdfviewer/pdfviewer.module').then(m=>m.PdfViewerSampleModule) },
    { path: ':theme/pdfviewer/:sample', redirectTo: 'material/pdfviewer/default' },
    { path: 'rich-text-editor', loadChildren: import('../rich-text-editor/rich-text-editor.module').then(m=>m.RTESampleModule) },
    { path: ':theme/rich-text-editor/:sample', redirectTo: 'material/rich-text-editor/default' },
    { path: 'markdown-editor', loadChildren: import('../markdown-editor/markdown-editor.module').then(m=>m.MDESampleModule) },
    { path: ':theme/markdown-editor/:sample', redirectTo: 'material/markdown-editor/overview' },
    { path: 'document-editor', loadChildren: import('../document-editor/document-editor.module').then(m=>m.DocumentEditorSampleModule) },
    { path: ':theme/document-editor/:sample', redirectTo: 'material/document-editor/default' },
    { path: 'image-editor', loadChildren: import('../image-editor/image-editor.module').then(m=>m.ImageEditorSampleModule) },
    // calendars
    { path: 'schedule', loadChildren: import('../schedule/schedule.module').then(m=>m.ScheduleSampleModule) },
    { path: ':theme/schedule/:sample', redirectTo: 'material/schedule/default' },
    { path: 'calendar', loadChildren: import('../calendar/calendar.module').then(m=>m.CalendarSampleModule) },
    { path: 'date-picker', loadChildren: import('../datepicker/datepicker.module').then(m=>m.DatePickerSampleModule) },
    { path: 'date-range-picker', loadChildren: import('../daterangepicker/daterangepicker.module').then(m=>m.DateRangePickerSampleModule) },
    { path: 'date-time-picker', loadChildren: import('../datetimepicker/datetimepicker.module').then(m=>m.DateTimePickerSampleModule) },
    { path: 'time-picker', loadChildren: import('../timepicker/timepicker.module').then(m=>m.TimePickerSampleModule) },
    { path: 'gantt', loadChildren: import('../gantt/gantt.module').then(m=>m.GanttSampleModule) },
    { path: ':theme/gantt/:sample', redirectTo: 'material/gantt/default' },
    // Buttons
    { path: 'button', loadChildren: import('../button/button.module').then(m=>m.ButtonSampleModule) },
    { path: ':theme/button/:sample', redirectTo: 'material/button/default' },
    { path: 'chips', loadChildren: import('../chips/chips.module').then(m=>m.ChipsSampleModule) },
    { path: 'floating-action-button',loadChildren: import('../floating-action-button/floating-action-button.module').then(m=>m.FloatingActionButtonSampleModule)},
    { path: 'speed-dial',loadChildren: import('../speed-dial/speed-dial.module').then(m=>m.SpeedDialSampleModule)},
    // Dropdowns
    { path: 'auto-complete', loadChildren: import('../auto-complete/auto-complete.module').then(m=>m.AutoCompleteSampleModule) },
    { path: 'combo-box', loadChildren: import('../combo-box/combo-box.module').then(m=>m.ComboBoxSampleModule) },
    { path: 'drop-down-list', loadChildren: import('../drop-down-list/drop-down-list.module').then(m=>m.DropDownListSampleModule) },
    { path: 'drop-down-tree', loadChildren: import('../drop-down-tree/drop-down-tree.module').then(m=>m.DropDownTreeSampleModule) },
    { path: 'multi-select', loadChildren: import('../multi-select/multi-select.module').then(m=>m.MultiSelectSampleModule) },
    { path: 'list-box', loadChildren: import('../list-box/list-box.module').then(m=>m.ListBoxSampleModule) },
    { path: ':theme/list-box/:sample', redirectTo: 'material/list-box/default' },
    { path: 'mention', loadChildren: import('../mention/mention.module').then(m=>m.MentionSampleModule) },
    { path: 'multicolumn-combobox', loadChildren: import('../multicolumn-combobox/multicolumn-combobox.module').then(m=>m.MultiColumnComboBoxSampleModule) },
    { path: ':theme/multicolumn-combobox/:sample', redirectTo: 'material/multicolumn-combobox/default' },
    // Navigation
    { path: ':theme/accordion/:sample', redirectTo: 'material/accordion/default' },
    { path: 'appbar', loadChildren: import('../appbar/appbar.module').then(m=>m.AppBarSampleModule) },
    { path: ':theme/appbar/:sample', redirectTo: 'material/appbar/default' },
    { path: 'breadcrumb', loadChildren: import('../breadcrumb/breadcrumb.module').then(m=>m.BreadcrumbSampleModule) },
    { path: ':theme/breadcrumb/:sample', redirectTo: 'material/breadcrumb/default' },
    { path: 'carousel', loadChildren: import('../carousel/carousel.module').then(m=>m.CarouselSampleModule) },
    { path: ':theme/carousel/:sample', redirectTo: 'material/carousel/default' },
    { path: 'context-menu', loadChildren: import('../context-menu/context-menu.module').then(m=>m.MenuModule) },
    { path: ':theme/context-menu/:sample', redirectTo: 'material/context-menu/default' },
    { path: 'menu', loadChildren: import('../menu/menu.module').then(m=>m.MenuSampleModule) },
    { path: 'sidebar', loadChildren: import('../sidebar/sidebar.module').then(m=>m.SidebarSampleModule) },
    { path: ':theme/tab/:sample', redirectTo: 'material/tab/default' },
    { path: ':theme/toolbar/:sample', redirectTo: 'material/toolbar/default' },
    { path: 'treeview', loadChildren: import('../treeview/treeview.module').then(m=>m.TreeViewSampleModule) },
    { path: 'file-manager', loadChildren: import('../file-manager/file-manager.module').then(m=>m.FileSampleModule) },
    { path: ':theme/file-manager/:sample', redirectTo: 'material/file-manager/default' },
    { path: 'ribbon', loadChildren: import('../ribbon/ribbon.module').then(m=>m.RibbonSampleModule) },
    { path: ':theme/ribbon/:sample', redirectTo: 'material/ribbon/default' },
    { path: 'stepper', loadChildren: StepperSampleModule },
    { path: ':theme/stepper/:sample', redirectTo: 'material/stepper/default' },
    // Notifications
    { path: ':theme/badge/:sample', redirectTo: 'material/badge/default' },
    { path: 'message', loadChildren: import('../message/message.module').then(m=>m.MessageSampleModule) },
    { path: ':theme/message/:sample', redirectTo: 'material/message/default' },
    { path: 'toast', loadChildren: import('../toast/toast.module').then(m=>m.ToastSampleModule) },
    { path: ':theme/toast/:sample', redirectTo: 'material/toast/default' },
    { path: 'progressbar', loadChildren: import('../progress-bar/progress-bar.module').then(m=>m.ProgressBarSampleModule) },
    { path: 'skeleton', loadChildren: import('../skeleton/skeleton.module').then(m=>m.SkeletonSampleModule) },
    // Inputs
    { path: ':theme/textboxes/:sample', redirectTo: 'material/textboxes/default' },
    { path: ':theme/textarea/:sample', redirectTo: 'material/textarea/default' },
    { path: 'maskedtextbox', loadChildren: import('../maskedtextbox/maskedtextbox.module').then(m=>m.MaskedTextBoxSampleModule) },
    { path: 'numerictextbox', loadChildren: import('../numerictextbox/numerictextbox.module').then(m=>m.NumericModule) },
    { path: ':theme/color-picker/:sample', redirectTo: 'material/color-picker/default' },
    { path: 'uploader', loadChildren: import('../uploader/uploader.module').then(m=>m.UploaderSampleModule) },
    { path: ':theme/uploader/:sample', redirectTo: 'material/uploader/default' },
    { path: 'range-slider', loadChildren: import('../range-slider/range-slider.module').then(m=>m.SliderSampleModule) },
    { path: 'signature', loadChildren: import('../signature/signature.module').then(m=>m.SignatureSampleModule) },
    { path: 'inplace-editor', loadChildren: import('../inplace-editor/inplace-editor.module').then(m=>m.InplaceEditorSampleModule) },
    { path: 'rating', loadChildren: import('../rating/rating.module').then(m=>m.RatingSampleModule) },
    { path: 'otp-input', loadChildren: import('../otp-input/otp-input.module').then(m=>m.OtpInputSampleModule) },
    { path: ':theme/otp-input/:sample', redirectTo: 'material/otp-input/default' },
    { path: 'speech-to-text', loadChildren: import('../speech-to-text/speech-to-text.module').then(m=>m.SpeechToTextSampleModule) },
    { path: ':theme/speech-to-text/:sample', redirectTo: 'material/speech-to-text/default' },
    // layouts
    { path: ':theme/avatar/:sample', redirectTo: 'material/avatar/default' },
    { path: ':theme/card/:sample', redirectTo: 'material/card/default' },
    { path: 'dialog', loadChildren: import('../dialog/dialog.module').then(m=>m.DialogSampleModule) },
    { path: 'predefined-dialogs', loadChildren: import('../predefined-dialogs/predefined-dialogs.module').then(m=>m.PredefinedDialogsSampleModule) },
    { path: 'listview', loadChildren: import('../listview/listview.module').then(m=>m.ListViewSampleModule) },
    { path: 'tooltip', loadChildren: import('../tooltip/tooltip.module').then(m=>m.TooltipSampleModule) },
    { path: 'splitter', loadChildren: import('../splitter/splitter.module').then(m=>m.splitterSampleModule) },
    { path: 'dashboard-layout', loadChildren: import('../dashboard-layout/dashboard-layout.module').then(m=>m.DashboardLayoutSampleModule) },
    { path: ':theme/dashboard-layout/:sample', redirectTo: 'material/dashboard-layout/default' },
    { path: ':theme/timeline/:sample', redirectTo: 'material/timeline/default' },
    { path: 'timeline', loadChildren: import('../timeline/timeline.module').then(m=>m.TimelineSampleModule) }
];

@NgModule({
    imports: [
        // Smart Components
        SmartPasteSampleModule,
        SmartTextAreaSampleModule,
        //AI Data Grid
        AIGridSampleModule,
        // AI Gantt
        AIGanttSampleModule,
        // AI Diagram
        AIDiagramSampleModule,
        // AI Spreadsheet
        AISpreadsheetSampleModule,
        // AI Query Builder
        AIQueryBuilderSampleModule,
        // AI ComboBox
        AIComboBoxSampleModule,
        // AI Image Editor
        AIImageEditorSampleModule,
        // AI Pivot Table
        AIPivotTableSampleModule,
        // AI Rich Text Editor
        AIRichTextEditorSampleModule,
        // AI Maps
        AIMapsSampleModule,
        // AI Scheduler
        AISchedulerSampleModule,
        // Document Editor
        AIDocumentEditorSampleModule,
        // Grids
        GridSampleModule,
        PivotTableSampleModule,
        TreeGridSampleModule,
        SpreadsheetSampleModule,
        // Data visualization
        ChartSampleModule,
        ThreeDimensionChartSampleModule,
        ThreeDimensionCircularChartSampleModule,
        StockChartSampleModule,
        ArcGaugeSampleModule,
        CircularGaugeSampleModule,
        DiagramSampleModule,
        HeatmapSampleModule,
        LinearGaugeSampleModule,
        MapsSampleModule,
        RangeNavigatorSampleModule,
        SmithchartSampleModule,
        BarcodeSampleModule,
        SparklineSampleModule,
        TreemapSampleModule,
        BulletChartSampleModule,
        KanbanSampleModule,
        // Forms
        FormValidatorModule,
        QueryBuilderSampleModule,
        // Editors & Viewers
        PdfViewerSampleModule,
        RTESampleModule,
        MDESampleModule,
        DocumentEditorSampleModule,
        ImageEditorSampleModule,
        //Buttons
        ButtonSampleModule,
        ChipsSampleModule,
        FloatingActionButtonSampleModule,
        SpeedDialSampleModule,
        // Dropdowns
        AutoCompleteSampleModule,
        ComboBoxSampleModule,
        DropDownListSampleModule,
        DropDownTreeSampleModule,
        MultiSelectSampleModule,
        ListBoxSampleModule,
        MentionSampleModule,
        MultiColumnComboBoxSampleModule,
        //Interactive chat
        AIAssistSampleModule,
        ChatUISampleModule,
        // Inputs
        TextboxesModule,
        TextAreasModule,
        MaskedTextBoxSampleModule,
        NumericModule,
        ColorPickerSampleModule,
        UploaderSampleModule,
        SliderSampleModule,
        SignatureSampleModule,
        InplaceEditorSampleModule,
        RatingSampleModule,
        OtpInputSampleModule,
        SpeechToTextSampleModule,
        // calendars
        ScheduleSampleModule,
        CalendarSampleModule,
        DatePickerSampleModule,
        DateRangePickerSampleModule,
        DateTimePickerSampleModule,
        TimePickerSampleModule,
        GanttSampleModule,
        // Navigation
        AccordionSampleModule,
        AppBarSampleModule,
        BreadcrumbSampleModule,
        CarouselSampleModule,
        MenuModule,
        MenuSampleModule,
        SidebarSampleModule,
        TabSampleModule,
        ToolbarSampleModule,
        TreeViewSampleModule,
        FileSampleModule,
        RibbonSampleModule,
        StepperSampleModule,
        // Notifications
        BadgeModule,
        MessageSampleModule,
        ToastSampleModule,
        ProgressBarSampleModule,
        SkeletonSampleModule,
        // layouts
        AvatarSampleModule,
        CardSampleModule,
        DialogSampleModule,
        PredefinedDialogsSampleModule,
        ListViewSampleModule,
        TooltipSampleModule,
        splitterSampleModule,
        DashboardLayoutSampleModule,
        TimelineSampleModule,
        RouterModule.forRoot(appRoutes)
    ],

    declarations: [
    ],

    exports: [
        RouterModule,
    ]
})
export class SBRoutingModule { }
