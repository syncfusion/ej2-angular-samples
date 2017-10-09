import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormValidatorModule } from '../form-validator/form-validator.module';
import { DropDownListSampleModule } from '../dropdownlist/dropdownlist.module';
import { ComboBoxSampleModule } from '../combobox/combobox.module';
import { AutoCompleteSampleModule } from '../autocomplete/autocomplete.module';
import { CalendarSampleModule } from '../calendar/calendar.module';
import { DatePickerSampleModule } from '../datepicker/datepicker.module';
import { DateRangePickerSampleModule } from '../daterangepicker/daterangepicker.module';
import { TimePickerSampleModule } from '../timepicker/timepicker.module';
import { ButtonModule } from '../button/button.module';
import { ListViewSampleModule } from '../listview/listview.module';
import { GridSampleModule } from '../grid/grid.module';
import { ToolbarSampleModule } from '../toolbar/toolbar.module';
import { NumericModule } from '../numerictextbox/numerictextbox.module';
import { ChartSampleModule } from '../chart/chart.module';
import { DialogSampleModule } from '../dialog/dialog.module';
import { TextboxesModule } from '../textboxes/textboxes.module';
import { TooltipSampleModule } from '../tooltip/tooltip.module';
import { CircularGaugeSampleModule } from '../circulargauge/circulargauge.module';
import { LinearGaugeSampleModule } from '../lineargauge/lineargauge.module';
import { MaskedTextBoxSampleModule } from '../maskedtextbox/maskedtextbox.module';

const appRoutes: any = [
    { path: 'chart', loadChildren: ChartSampleModule },
    { path: 'circulargauge', loadChildren: CircularGaugeSampleModule },
    { path: 'lineargauge', loadChildren: LinearGaugeSampleModule },
    { path: 'grid', loadChildren: GridSampleModule },
    { path: 'form-validator', loadChildren: FormValidatorModule },
    { path: 'Button', loadChildren: ButtonModule },
    { path: 'dropdownlist', loadChildren: DropDownListSampleModule },
    { path: 'combobox', loadChildren: ComboBoxSampleModule },
    { path: 'autocomplete', loadChildren: AutoCompleteSampleModule },
    { path: 'calendar', loadChildren: CalendarSampleModule },
    { path: 'datepicker', loadChildren: DatePickerSampleModule },
    { path: 'daterangepicker', loadChildren: DateRangePickerSampleModule },
    { path: 'timepicker', loadChildren: TimePickerSampleModule },
    { path: 'numerictextbox', loadChildren: NumericModule },
    { path: 'listview', loadChildren: ListViewSampleModule },
    { path: 'dialog', loadChildren: DialogSampleModule },
    { path: 'textboxes', loadChildren: TextboxesModule },
    { path: 'toolbar', loadChildren: ToolbarSampleModule },
    { path: 'tooltip', loadChildren: TooltipSampleModule },
    { path: 'maskedtextbox', loadChildren: MaskedTextBoxSampleModule },
    { path: '', redirectTo: 'material/chart/line', pathMatch: 'full' }
];

@NgModule({
    imports: [
        ChartSampleModule,
        CircularGaugeSampleModule,
        LinearGaugeSampleModule,
        GridSampleModule,
        FormValidatorModule,
        ButtonModule,
        AutoCompleteSampleModule,
        ComboBoxSampleModule,
        DropDownListSampleModule,
        CalendarSampleModule,
        DatePickerSampleModule,
        DateRangePickerSampleModule,
        TimePickerSampleModule,
        NumericModule,
        ListViewSampleModule,
        TextboxesModule,
        DialogSampleModule,
        ToolbarSampleModule,
        TooltipSampleModule,
        MaskedTextBoxSampleModule,
        RouterModule.forRoot(appRoutes)
    ],

    declarations: [
    ],

    exports: [
        RouterModule,
    ]
})
export class SBRoutingModule { }