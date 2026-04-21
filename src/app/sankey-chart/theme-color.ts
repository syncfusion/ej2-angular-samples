import { EmitType } from '@syncfusion/ej2-base';
import { SankeyLoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';

export let loadSankeyTheme: EmitType<SankeyLoadedEventArgs> = (args:SankeyLoadedEventArgs): void => {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
        args.chart.theme =<ChartTheme> (selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/light/i, 'Light')
                .replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
};