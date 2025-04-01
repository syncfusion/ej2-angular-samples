import { EmitType } from '@syncfusion/ej2-base';
import { SmithchartTheme, ISmithchartLoadEventArgs } from '@syncfusion/ej2-angular-charts';

export let loadSmithChartTheme: EmitType<ISmithchartLoadEventArgs> = (args: ISmithchartLoadEventArgs): void => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Tailwind3';
    args.smithchart.theme = <SmithchartTheme>(theme.charAt(0).toUpperCase() + theme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
};