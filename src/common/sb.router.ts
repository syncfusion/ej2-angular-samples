import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormValidatorModule } from '../form-validator/form-validator.module';
import { CalendarSampleModule } from '../calendar/calendar.module';
import { ButtonModule } from '../button/button.module';
import { ListViewSampleModule } from '../listview/listview.module';
import { GridSampleModule } from '../grid/grid.module';
import { ToolbarSampleModule } from '../toolbar/toolbar.module';
import { NumericModule } from '../numerictextbox/numericTextBox.module';
import { ChartSampleModule } from '../chart/chart.module';
import { DialogSampleModule } from '../dialog/dialog.module';
import { TextboxesModule } from '../textboxes/textboxes.module';
import { TooltipSampleModule } from '../tooltip/tooltip.module';

const appRoutes: any = [
    { path: 'chart', loadChildren: ChartSampleModule },
    { path: 'grid', loadChildren: GridSampleModule },
    { path: 'form-validator', loadChildren: FormValidatorModule },
    { path: 'Button', loadChildren: ButtonModule },
    { path: 'calendar', loadChildren: CalendarSampleModule },
    { path: 'numerictextbox', loadChildren: NumericModule },
    { path: 'listview', loadChildren: ListViewSampleModule },
    { path: 'dialog', loadChildren: DialogSampleModule },
    { path: 'textboxes', loadChildren: TextboxesModule },
    { path: 'toolbar', loadChildren: ToolbarSampleModule },
    { path: 'tooltip', loadChildren: TooltipSampleModule },
    { path: '', redirectTo: 'chart/line', pathMatch: 'full' }
]; 

@NgModule({
    imports: [
        ChartSampleModule,
        GridSampleModule,
        FormValidatorModule,
        ButtonModule,
        CalendarSampleModule,
        NumericModule,
        ListViewSampleModule,
        TextboxesModule,
        DialogSampleModule,
        ToolbarSampleModule,
        TooltipSampleModule,
        RouterModule.forRoot(appRoutes)
    ],

    declarations: [
    ],

    exports: [
        RouterModule,
    ]
})
export class SBRoutingModule { }