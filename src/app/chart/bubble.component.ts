import { Component, ViewEncapsulation } from '@angular/core';
import { IPointRenderEventArgs, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
/**
 * Sample for Bubble Series
 */
@Component({
    selector: 'control-content',
    templateUrl: 'bubble.html',
    styleUrls: ['chart.style.css'],
    encapsulation: ViewEncapsulation.None
})

export class BubbleChartComponent {

    public data: Object[] = [
        { Literacy : 92.2, GDPGrowth : 7.8, BubbleSize : 1.347, TooltipMappingName : "China", Text : "China" },
        { Literacy : 74, GDPGrowth : 6.5, BubbleSize : 1.241, TooltipMappingName : "India", Text : "India" },
        { Literacy : 90.4, GDPGrowth : 6.0, BubbleSize : 0.238, TooltipMappingName : Browser.isDevice ? 'ID' : "Indonesia", Text :   "Indonesia" },
        { Literacy : 99.4, GDPGrowth : 2.2, BubbleSize : 0.312, TooltipMappingName : "US", Text : "United States" },
        { Literacy : 88.6, GDPGrowth : 1.3, BubbleSize : 0.197, TooltipMappingName : Browser.isDevice ? 'BR' : "Brazil", Text :  "Brazil" },
        { Literacy : 99, GDPGrowth : 0.7, BubbleSize : 0.0818, TooltipMappingName : Browser.isDevice ? 'DE' :"Germany", Text :   "Germany" },
        { Literacy : 72, GDPGrowth : 2.0, BubbleSize : 0.0826, TooltipMappingName :  Browser.isDevice ? 'EG' :"Egypt", Text :  "Egypt" },
        { Literacy : 99.6, GDPGrowth : 3.4, BubbleSize : 0.143, TooltipMappingName : Browser.isDevice ? 'RUS' :"Russia", Text :   "Russia" },
        { Literacy : 96.5, GDPGrowth : 0.2, BubbleSize : 0.128, TooltipMappingName : Browser.isDevice ? 'JP' : "Japan", Text :   "Japan" },
        { Literacy : 86.1, GDPGrowth : 4.0, BubbleSize : 0.115, TooltipMappingName : "MLI", Text : "MeLiteracy Ion" },
        { Literacy : 92.6, GDPGrowth : 5.2, BubbleSize : 0.096, TooltipMappingName : "PH", Text : "Philipines" },
        { Literacy : 61.3, GDPGrowth : 1.45, BubbleSize : 0.162, TooltipMappingName : "Nigeria", Text : "Nigeria" },
        { Literacy : 82.2, GDPGrowth : 3.97, BubbleSize : 0.7, TooltipMappingName : Browser.isDevice ? 'HK' : "Hong Kong", Text :   "Hong Kong" },
        { Literacy : 79.2, GDPGrowth : 4.9, BubbleSize : 0.162, TooltipMappingName : "NL", Text : "NetherLand" },
        { Literacy : 72.5, GDPGrowth : 4.5, BubbleSize : 0.7, TooltipMappingName : "Jordan", Text : "Jordan" },
        { Literacy : 81, GDPGrowth : 2.5, BubbleSize : 0.21, TooltipMappingName : Browser.isDevice ? 'AU' : "Australia", Text :  "Australia" },
        { Literacy : 66.8, GDPGrowth : 3.9, BubbleSize : 0.028, TooltipMappingName : "MN", Text : "Mongolia" },
        { Literacy : 78.4, GDPGrowth : 2.9, BubbleSize : 0.231, TooltipMappingName : Browser.isDevice ? 'TW' :"Taiwan", Text :   "Taiwan" }
    ];
    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        crossesAt: 5,
        minimum: 65,
        maximum: 102,
        interval: 5
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {
        crossesAt: 85,
        minimum: 0,
        maximum: 10,
        interval: 2.5
    };

    public marker: Object = {
        dataLabel: { name: 'TooltipMappingName' , visible: true , position: 'Middle' , font: { fontWeight: '500'}}
    };
    //Initializing Tooltip
    public tooltip: Object = {
        header: '<b>${point.tooltip}</b>',
        enableMarker: false,
        enable: true,
        format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>"
    };
    public border: Object = {
        width: 2,
    };
    public legend: Object = {
        visible: false
    };
    public minRadius: number = 3;
    public maxRadius: number = 8;
    public pointRender(args: IPointRenderEventArgs): void {
        this.SetTheme(args);
     };
     public SetTheme(args: IPointRenderEventArgs): void {
        let bubblePointMaterialColors: string[] = ['rgba(0, 189, 174, 0.5)', "rgba(64, 64, 65, 0.5)", "rgba(53, 124, 210, 0.5)", "rgba(229, 101, 144, 0.5)", "rgba(248, 184, 131, 0.5)", "rgba(112, 173, 71, 0.5)", "rgba(221, 138, 189, 0.5)",
        "rgba(127, 132, 232, 0.5)", "rgba(123, 180, 235, 0.5)", "rgba(234, 122, 87, 0.5)", "rgba(64, 64, 65, 0.5)", "rgba(0, 189, 174, 0.5)"];
        let bubblePointMaterialDarkColors: string[] = ["rgba(158, 203, 8, 0.5)", "rgba(86, 174, 255, 0.5)", "rgba(197, 122, 255, 0.5)", "rgba(97, 234, 169, 0.5)", "rgba(235, 187, 62, 0.5)", "rgba(244, 92, 92, 0.5)", "rgba(138, 119, 255, 0.5)",
        "rgba(99, 199, 255, 0.5)", "rgba(255, 132, 176, 0.5)", "rgba(247, 201, 40, 0.5)"];
        let bubblePointFabricColors: string[] = ["rgba(68, 114, 196, 0.5)", "rgba(237, 125, 49, 0.5)", "rgba(255, 192, 0, 0.5)", "rgba(112, 173, 71, 0.5)", "rgba(91, 155, 213, 0.5)", "rgba(193, 193, 193, 0.5)", "rgba(111, 111, 226, 0.5)",
        "rgba(226, 105, 174, 0.5)", "rgba(158, 72, 14, 0.5)", "rgba(153, 115, 0, 0.5)", "rgba(68, 114, 196, 0.5)", "rgba(112, 173, 71, 0.5)", "rgba(255, 192, 0, 0.5)", "rgba(237, 125, 49, 0.5)"];
        let bubblePointBootstrapColors: string[] = ["rgba(161, 110, 229, 0.5)", "rgba(247, 206, 105, 0.5)", "rgba(85, 165, 194, 0.5)", "rgba(125, 223, 30, 0.5)", "rgba(255, 110, 166, 0.5)", "rgba(121, 83, 172, 0.5)",
        "rgba(185, 155, 79, 0.5)", "rgba(64, 124, 146, 0.5)", "rgba(94, 167, 22, 0.5)", "rgba(185, 28, 82, 0.5)"];
        let bubblePointHighContrastColors: string[] = ["rgba(121, 236, 228, 0.5)", "rgba(233, 130, 114, 0.5)", "rgba(223, 230, 182, 0.5)", "rgba(198, 231, 115, 0.5)", "rgba(186, 152, 255, 0.5)", "rgba(250, 131, 195, 0.5)", "rgba(0, 194, 122, 0.5)",
        "rgba(67, 172, 239, 0.5)", "rgba(214, 129, 239, 0.5)", "rgba(216, 188, 110, 0.5)"];
        let bubblePointBootstrap5Colors: string[] = ["rgba(38, 46, 11, 0.5)", "rgba(102, 142, 31, 0.5)", "rgba(175, 110, 16, 0.5)", "rgba(134, 44, 11, 0.5)", "rgba(31, 45, 80, 0.5)", "rgba(100, 104, 11, 0.5)", "rgba(49, 21, 8, 0.5)",
        "rgba(76, 76, 129, 0.5)", "rgba(12, 125, 160, 0.5)", "rgba(134, 44, 11, 0.5)"];
        let bubblePointBootstrap5DarkColors: string[] = ["rgba(94, 203, 155, 0.5)", "rgba(168, 96, 241, 0.5)", "rgba(235, 168, 68, 0.5)", "rgba(85, 126, 247, 0.5)", "rgba(233, 89, 155, 0.5)", "rgba(191, 197, 41, 0.5)", "rgba(59, 198, 207, 0.5)",
        "rgba(122, 104, 236, 0.5)", "rgba(116, 183, 6, 0.5)", "rgba(234, 98, 102, 0.5)"];
        let bubblePointFluentColors: string[] = ["rgba(97, 69, 112, 0.5)", "rgba(76, 111, 177, 0.5)", "rgba(204, 105, 82, 0.5)", "rgba(63, 87, 154, 0.5)", "rgba(78, 160, 155, 0.5)", "rgba(110, 122, 137, 0.5)", "rgba(212, 81, 92, 0.5)",
		"rgba(230, 175, 93, 0.5)", "rgba(99, 151, 81, 0.5)", "rgba(157, 77, 105, 0.5)"];
        let bubblePointFluentDarkColors: string[] = ["rgba(138, 177, 19, 0.5)", "rgba(42, 114, 213, 0.5)", "rgba(67, 183, 134, 0.5)", "rgba(88, 78, 198, 0.5)", "rgba(232, 95, 156, 0.5)", "rgba(110, 122, 137, 0.5)", "rgba(234, 98, 102, 0.5)",
		"rgba(235, 168, 68, 0.5)", "rgba(38, 188, 122, 0.5)", "rgba(188, 72, 112, 0.5)"];
        let bubblePointTailwindColors: string[] = ["rgba(90, 97, 246, 0.5)", "rgba(101, 163, 13, 0.5)", "rgba(51, 65, 85, 0.5)", "rgba(20, 184, 166, 0.5)", "rgba(139, 92, 246, 0.5)", "rgba(3, 105, 161, 0.5)", "rgba(249, 115, 22, 0.5)",
        "rgba(147, 51, 234, 0.5)", "rgba(245, 158, 11, 0.5)", "rgba(21, 128, 61, 0.5)"];
        let bubblePointTailwindDarkColors: string[] = ["rgba(139, 92, 246, 0.5)", "rgba(34, 211, 238, 0.5)", "rgba(248, 113, 113, 0.5)", "rgba(74, 222, 128, 0.5)", "rgba(232, 121, 249, 0.5)", "rgba(252, 211, 77, 0.5)", "rgba(249, 115, 22, 0.5)",
        "rgba(45, 212, 191, 0.5)", "rgba(244, 114, 182, 0.5)", "rgba(16, 185, 129, 0.5)"];    

        let pointMaterialColors: string[] = ["#00bdae", "#404041", "#357cd2", "#e56590", "#f8b883", "#70ad47", "#dd8abd", "#7f84e8", "#7bb4eb",
        "#ea7a57", "#404041", "#00bdae"];
        let pointMaterialDarkColors: string[] = ["#9ECB08", "#56AEFF", "#C57AFF", "#61EAA9", "#EBBB3E", "#F45C5C", "#8A77FF", "#63C7FF", "#FF84B0",
        "#F7C928"];
        let pointFabricColors: string[] = ["#4472c4", "#ed7d31", "#ffc000", "#70ad47", "#5b9bd5", "#c1c1c1", "#6f6fe2", "#e269ae", "#9e480e",
        "#997300", "#4472c4", "#70ad47", "#ffc000", "#ed7d31"];
        let pointBootstrapColors: string[] = ["#a16ee5", "#f7ce69", "#55a5c2", "#7ddf1e", "#ff6ea6", "#7953ac", "#b99b4f", "#407c92", "#5ea716",
        "#b91c52"];
        let pointHighContrastColors: string[] = ["#79ECE4", "#E98272", "#DFE6B6", "#C6E773", "#BA98FF", "#FA83C3", "#00C27A", "#43ACEF", "#D681EF",
        "#D8BC6E"];
        let pointBootstrap5Colors: string[] = ["#262E0B", "#668E1F", "#AF6E10", "#862C0B", "#1F2D50", "#64680B", "#311508", "#4C4C81", "#0C7DA0", 
        "#862C0B"];
        let pointBootstrap5DarkColors: string[] = ["#5ECB9B", "#A860F1", "#EBA844", "#557EF7", "#E9599B", "#BFC529", "#3BC6CF", "#7A68EC", "#74B706",
        "#EA6266"];
        let pointFluentColors: string[] = ["#614570", "#4C6FB1", "#CC6952", "#3F579A", "#4EA09B", "#6E7A89", "#D4515C", "#E6AF5D", "#639751",
        "#9D4D69"];
        let pointFluentDarkColors: string[] = ["#8AB113", "#2A72D5", "#43B786", "#584EC6", "#E85F9C", "#6E7A89", "#EA6266", "#EBA844", "#26BC7A", 
        "#BC4870"];
        let pointTailwindColors: string[] = ["#5A61F6", "#65A30D", "#334155", "#14B8A6", "#8B5CF6", "#0369A1", "#F97316", "#9333EA", "#F59E0B",
        "#15803D"];
        let pointTailwindDarkColors: string[] = ["#8B5CF6", "#22D3EE", "#F87171", "#4ADE80", "#E879F9", "#FCD34D", "#F97316", "#2DD4BF", "#F472B6",
        "#10B981"];

        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';

        if (selectedTheme==='material-dark')
        {
            args.fill = bubblePointMaterialDarkColors[args.point.index % 10];
            args.border.color = pointMaterialDarkColors[args.point.index % 10];
        }
        else if(selectedTheme==='material')
        {
            args.fill = bubblePointMaterialColors[args.point.index % 10];
            args.border.color = pointMaterialColors[args.point.index % 10];
        }
        else if (selectedTheme==='fabric-dark' || selectedTheme==='fabric')
        {
            args.fill = bubblePointFabricColors[args.point.index % 10];
            args.border.color = pointFabricColors[args.point.index % 10];
        }
        else if (selectedTheme==='bootstrap5-dark')
        {
            args.fill = bubblePointBootstrap5DarkColors[args.point.index % 10];
            args.border.color = pointBootstrap5DarkColors[args.point.index % 10];
        }
        else if (selectedTheme==='bootstrap5')
        {
            args.fill = bubblePointBootstrap5Colors[args.point.index % 10];
            args.border.color = pointBootstrap5Colors[args.point.index % 10];
        }
        else if (selectedTheme==='fluent-dark')
        {
            args.fill = bubblePointFluentDarkColors[args.point.index % 10];
            args.border.color = pointFluentDarkColors[args.point.index % 10];
        }
        else if (selectedTheme==='fluent')
        {
            args.fill = bubblePointFluentColors[args.point.index % 10];
            args.border.color = pointFluentColors[args.point.index % 10];
        }
        else if (selectedTheme==='bootstrap4' || selectedTheme==='bootstrap')
        {
                args.fill = bubblePointBootstrapColors[args.point.index % 10];
                args.border.color = pointBootstrapColors[args.point.index % 10];           
        }
        else if (selectedTheme==='tailwind-dark')
        {
            args.fill = bubblePointTailwindDarkColors[args.point.index % 10];
            args.border.color = pointTailwindDarkColors[args.point.index % 10];                     

        }
        else if (selectedTheme==='tailwind')
        {                    
            args.fill = bubblePointTailwindColors[args.point.index % 10];
            args.border.color = pointTailwindColors[args.point.index % 10];
        }
        else if (selectedTheme==='highcontrast')
        {
            args.fill = bubblePointHighContrastColors[args.point.index % 10];
            args.border.color = pointHighContrastColors[args.point.index % 10];           
        }
        else
        {
            args.fill = bubblePointBootstrapColors[args.point.index % 10];
            args.border.color = pointBootstrapColors[args.point.index % 10];           
        }
      };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public width: string = Browser.isDevice ? '100%' : '75%';
    public title: string = 'World Countries Details' ;
    constructor() {
        // code
    };
}