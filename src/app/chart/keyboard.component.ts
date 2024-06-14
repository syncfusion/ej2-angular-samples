import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Chart, ChartComponent, Category, ColumnSeries, Legend, StripLine, ILoadedEventArgs, ChartTheme, ILegendClickEventArgs, legendClick, Selection, Zoom, ChartAllModule } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Keyboard Navigation Chart
 */
@Component({
    selector: 'control-content',
    templateUrl: 'keyboard.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, ChartAllModule, SBDescriptionComponent]
})

export class KeyboardComponent {

    @ViewChild('chart')
    public chart: ChartComponent;

    public getStriplineValues(legendClickedName: string) {
        let seriesIndex: number = 0;
        let Segments: number[][] = [[0, 5], [7, 12], [14, 19], [21, 26]];
        for (let i: number = 0; i < this.chart.series.length; i++) {
            let name: string = this.chart.series[i].name;
            let visible: boolean = name === legendClickedName ? !this.chart.series[i].visible : this.chart.series[i].visible;
            if (seriesIndex > 3) {
                seriesIndex = 0;
            }
            if (name == "Quarter 1") {
                this.chart.primaryYAxis.stripLines[0].visible =this.chart.primaryYAxis.stripLines[1].visible = visible;
                if (this.chart.primaryYAxis.stripLines[0].visible) {
                    this.chart.primaryYAxis.stripLines[0].segmentStart = this.chart.primaryYAxis.stripLines[1].segmentStart = Segments[seriesIndex][0];
                    this.chart.primaryYAxis.stripLines[0].segmentEnd = this.chart.primaryYAxis.stripLines[1].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 2") {
                this.chart.primaryYAxis.stripLines[2].visible = this.chart.primaryYAxis.stripLines[3].visible = visible;
                if (this.chart.primaryYAxis.stripLines[2].visible) {
                    this.chart.primaryYAxis.stripLines[2].segmentStart = this.chart.primaryYAxis.stripLines[3].segmentStart = Segments[seriesIndex][0];
                    this.chart.primaryYAxis.stripLines[2].segmentEnd = this.chart.primaryYAxis.stripLines[3].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else if (name == "Quarter 3") {
                this.chart.primaryYAxis.stripLines[4].visible = this.chart.primaryYAxis.stripLines[5].visible = visible;
                if (this.chart.primaryYAxis.stripLines[4].visible) {
                    this.chart.primaryYAxis.stripLines[4].segmentStart = this.chart.primaryYAxis.stripLines[5].segmentStart = Segments[seriesIndex][0];
                    this.chart.primaryYAxis.stripLines[4].segmentEnd = this.chart.primaryYAxis.stripLines[5].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
            else {
                this.chart.primaryYAxis.stripLines[6].visible = this.chart.primaryYAxis.stripLines[7].visible = visible;
                if (this.chart.primaryYAxis.stripLines[6].visible) {
                    this.chart.primaryYAxis.stripLines[6].segmentStart = this.chart.primaryYAxis.stripLines[7].segmentStart = Segments[seriesIndex][0];
                    this.chart.primaryYAxis.stripLines[6].segmentEnd = this.chart.primaryYAxis.stripLines[7].segmentEnd = Segments[seriesIndex][1];
                    seriesIndex++;
                }
            }
        }
        this.chart.refresh();
    }

    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        labelStyle: { size: "0px" },
        majorTickLines: { width: 0 }
    };
    public primaryYAxis: Object = {
        title: "Sales in Percentage",
        labelFormat: "{value}%",
        maximum: 120,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        stripLines: [
            {
                isSegmented: true, start: 33, end: 35.5, visible: true, segmentStart: 0, segmentEnd: 5,
            },
            {
                isSegmented: true, start: 39, end: 39.2, visible: true, text: "Jan - Mar", segmentStart: 0, segmentEnd: 5, color: "transparent"
            },
            {
                isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 7, segmentEnd: 12,
            },
            {
                isSegmented: true, start: 70, end: 70.2, visible: true, text: "Apr - Jun", segmentStart: 7, segmentEnd: 12, color: "transparent"
            },
            {
                isSegmented: true, start: 65, end: 67.5, visible: true, segmentStart: 14, segmentEnd: 19,
            },
            {
                isSegmented: true, start: 70, end: 70.2, visible: true, text: "Jul - Sep", segmentStart: 14, segmentEnd: 19, color: "transparent"
            },
            {
                isSegmented: true, start: 104, end: 106.5, visible: true, segmentStart: 21, segmentEnd: 26,
            },
            {
                isSegmented: true, start: 109, end: 109.2, visible: true, text: "Oct - Dec", segmentStart: 21, segmentEnd: 26, color: "transparent"
            }
        ]
    };

    public enableAnimation: boolean = false;
    
    public enableSideBySidePlacement: boolean = false;

    public selectionMode: string =  'Point';

    public selectionPattern: string =  'DiagonalForward';

    public legendSettings: Object = {
        enable: true,
    };

    public zoomSettings: Object = {
        enableSelectionZooming: true,
    };

    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    //Initializing Chart Series
    public data1: Object[] = [
        { Month: 'Jan 15', Sales: 10 },
        { Month: 'Jan 31', Sales: 15 },
        { Month: 'Feb 15', Sales: 15 },
        { Month: 'Feb 28', Sales: 20 },
        { Month: 'March 15', Sales: 20 },
        { Month: 'March 31', Sales: 25 },
        { Month: 'March', Sales: null },
    ];

    public data2: object[] = [
        { Month: 'Apr 15', Sales: 36 },
        { Month: 'Apr 30', Sales: 48 },
        { Month: 'May 15', Sales: 43 },
        { Month: 'May 31', Sales: 59 },
        { Month: 'Jun 15', Sales: 35 },
        { Month: 'Jun 30', Sales: 50 },
        { Month: 'Jun', Sales: null },
    ];

    public data3: object[] = [
        { Month: 'Jul 15', Sales: 30 },
        { Month: 'Jul 31', Sales: 45 },
        { Month: 'Aug 15', Sales: 30 },
        { Month: 'Aug 31', Sales: 55 },
        { Month: 'Sep 15', Sales: 57 },
        { Month: 'Sep 30', Sales: 60 },
        { Month: 'Sep', Sales: null },
    ];

    public data4: object[] = [
        { Month: 'Oct 15', Sales: 60 },
        { Month: 'Oct 31', Sales: 70 },
        { Month: 'Nov 15', Sales: 70 },
        { Month: 'Nov 30', Sales: 70 },
        { Month: 'Dec 15', Sales: 90 },
        { Month: 'Dec 31', Sales: 100 },
    ];

    //Initializing User Interaction Tooltip
    public tooltip: object = {
        enable: true,
    };

    //Initializing Chart title
    public title: string = 'Quarterly Sales Chart';

    public width: string = Browser.isDevice ? '100%' : '75%';

    public legendClick(args: ILegendClickEventArgs) {
        let seriesIndex = 0;
        this.getStriplineValues(args.series.name);
    };

    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        let materialColors: string[] = ["#00bdae", "#404041", "#357cd2", "#e56590", "#f8b883", "#70ad47", "#dd8abd", "#7f84e8", "#7bb4eb",
            "#ea7a57", "#404041", "#00bdae"];
        let materialDarkColors: string[] = ["#9ECB08", "#56AEFF", "#C57AFF", "#61EAA9", "#EBBB3E", "#F45C5C", "#8A77FF", "#63C7FF", "#FF84B0",
            "#F7C928"];
        let fabricColors: string[] = ["#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e",
            "#997300", "#4472c4", "#70ad47", "#ffc000", "#ed7d31"];
        let bootstrapColors: string[] = ["#a16ee5", "#f7ce69", "#55a5c2", "#7ddf1e", "#ff6ea6", "#7953ac", "#b99b4f", "#407c92", "#5ea716",
            "#b91c52"];
        let highContrastColors: string[] = ["#79ECE4", "#E98272", "#DFE6B6", "#C6E773", "#BA98FF", "#FA83C3", "#00C27A", "#43ACEF", "#D681EF",
            "#D8BC6E"];
        let bootstrap5Colors: string[] = ['#6355C7', '#FFB400', '#2196F5', '#F7523F', '#963C70', '#4BE0BC', '#FD7400', '#C9E422', '#DE3D8A', 
            '#162F88'];
        let bootstrap5DarkColors: string[] = ['#8F80F4', '#FFD46D', '#6CBDFF', '#FF7F71', '#FF6DB3', '#63F5D2', '#FCAA65', '#ECFF77', '#EF8EFF', 
            '#5F82FD'];
        let fluentColors: string[] = ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
        let fluentDarkColors: string[] =  ['#1AC9E6', '#DA4CB2', '#EDBB40', '#AF4BCF', '#FF7266', '#1BD565', '#EE993D', '#5887FF', '#EC548D', 
            '#7D39C0'];
        let tailwindColors: string[] = ["#5A61F6", "#65A30D", "#334155", "#14B8A6", "#8B5CF6", "#0369A1", "#F97316", "#9333EA", "#F59E0B",
            "#15803D"];
        let tailwindDarkColors: string[] = ["#8B5CF6", "#22D3EE", "#F87171", "#4ADE80", "#E879F9", "#FCD34D", "#F97316", "#2DD4BF", "#F472B6",
            "#10B981"];
        let material3Colors: string[] = ["#6355C7", "#00AEE0", "#FFB400", "#F7523F", "#963C70", "#FD7400", "#4BE0BC", "#2196F5", "#DE3D8A", "#162F88"];
        let material3DarkColors: string[] = ["#4EAAFF", "#FA4EAB", "#FFF500", "#17EA58", "#38FFE7",
        "#FF9E45", "#B3F32F", "#B93CE4", "#FC5664", "#9B55FF"];
        let fabricDark: string[] =  ["#4472C4", "#ED7D31", "#FFC000", "#70AD47"];   
        let bootstrap4Colors: string[] =  ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6','#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
        let bootstrapdarkColors: string[] = ["#a16ee5", "#f7ce69", "#55a5c2", "#7ddf1e", "#ff6ea6", "#7953ac", "#b99b4f", "#407c92", "#5ea716", "#b91c52"];
        let fluent2Colors: string[] = ["#6200EE", "#09AF74", "#0076E5", "#CB3587", "#E7910F", "#0364DE", "#66CD15", "#F3A93C", "#107C10",
            "#C19C00"];
        let fluent2DarkColors: string[] = ["#9BB449", "#2A72D5", "#43B786", "#3F579A", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266",
            "#0B6A0B", "#C19C00"];

        let FontColor: string = "#353535";
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        FontColor = args.chart.theme.indexOf("dark") > -1 || args.chart.theme.indexOf("highcontrast") > -1 ? "#F3F2F1" : "#353535";
        let FillColors: string[];
        let TextColor: string;
            if (args.chart.theme === 'MaterialDark') {
                FillColors = materialDarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Material') {
                FillColors = materialColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === "Fabric" ) {
                FillColors = fabricColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme=== 'FabricDark') {
                FillColors = fabricDark;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Bootstrap5Dark') {
                FillColors = bootstrap5DarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Bootstrap4') {
                FillColors = bootstrap4Colors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === 'Bootstrap5') {
                FillColors = bootstrap5Colors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === "Bootstrap") {
                FillColors = bootstrapColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === 'BootstrapDark'){
                FillColors = bootstrapdarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'TailwindDark') {
                FillColors = tailwindDarkColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Tailwind') {
                FillColors = tailwindColors;
                TextColor = "#000000";
            }
            else if (args.chart.theme==="HighContrast") {
                FillColors = highContrastColors;
                TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Fluent') {
                FillColors = fluentColors;
                TextColor = '#000000'
            }
            else if (args.chart.theme === 'FluentDark') {
                FillColors = fluentDarkColors;
                 TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Material3') {
                FillColors = material3Colors;
                 TextColor = "#000000";
            }
            else if (args.chart.theme === 'Material3Dark') {
                FillColors = material3DarkColors;
                 TextColor = "#FFFFFF";
            }
            else if (args.chart.theme === 'Fluent2') {
                FillColors = fluent2Colors;
                TextColor = "#000000";
            }
            else if (args.chart.theme === 'Fluent2Dark') {
                FillColors = fluent2DarkColors;
                TextColor = "#FFFFFF";
            }
            else {
                FillColors = fluentColors;
                TextColor = "#FFFFFF";
            }
            args.chart.primaryYAxis.stripLines[0].color = FillColors[0 % 10];
            args.chart.primaryYAxis.stripLines[1].textStyle.color = TextColor;
            args.chart.primaryYAxis.stripLines[2].color = FillColors[1 % 10];
            args.chart.primaryYAxis.stripLines[3].textStyle.color = TextColor;
            args.chart.primaryYAxis.stripLines[4].color = FillColors[2 % 10];
            args.chart.primaryYAxis.stripLines[5].textStyle.color = TextColor;
            args.chart.primaryYAxis.stripLines[6].color = FillColors[3 % 10];
            args.chart.primaryYAxis.stripLines[7].textStyle.color = TextColor;
    };
} 
