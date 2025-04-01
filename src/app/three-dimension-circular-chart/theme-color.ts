import { CircularChart3DLoadedEventArgs, CircularChart3DTheme } from "@syncfusion/ej2-angular-charts";
import { EmitType } from "@syncfusion/ej2/base";

export let loadCircular3DChartTheme: EmitType<CircularChart3DLoadedEventArgs> = (args: CircularChart3DLoadedEventArgs): void => {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
    args.chart.theme = <CircularChart3DTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
};