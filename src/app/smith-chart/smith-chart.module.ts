import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { SmithchartDefaultComponent} from './default.component';
import { SmithchartCustomComponent} from './custom.component';
import { SmithchartPrintExportComponent} from './print-export.component';
import { SharedModule } from '../common/shared.module';
import { RouterModule } from '@angular/router';
import { SmithchartAllModule} from '@syncfusion/ej2-angular-charts';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

export const smithchartAppRoutes: Object[] = [
   { path: ':theme/smith-chart/default', component: SmithchartDefaultComponent, name: "Default", order: "01", category: "Smith Chart", description: 'This demo for Essential JS2 Smith Chart control visualizes two transmissions. Impedance and admittance are the two types of rendering in smith chart.' },
   { path: ':theme/smith-chart/custom', component: SmithchartCustomComponent, name: "Customization", order: "01", category: "Smith Chart", description: 'This demo for Essential JS2 Smith Chart control visualizes the properties required to render the smith chart.' },
   { path: ':theme/smith-chart/print-export', component: SmithchartPrintExportComponent, name: "Print and Export", order: "01",
     category: "Smith Chart", description: 'This demo for Essential JS2 Smith Chart control explores the exporting and printing functionality of smith chart.'},
];

export const smithchartRouter: ModuleWithProviders = RouterModule.forChild(smithchartAppRoutes);

let declarations: Type<Object>[] = [SmithchartDefaultComponent, SmithchartPrintExportComponent, SmithchartCustomComponent];

@NgModule({
    imports: [smithchartRouter, SmithchartAllModule, SharedModule, SliderModule, DropDownListAllModule, CheckBoxModule],
    exports: [],
    declarations: declarations,
    providers: [SmithchartAllModule]
})
export class SmithchartSampleModule {
}